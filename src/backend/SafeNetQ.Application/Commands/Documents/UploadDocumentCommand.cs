using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Interfaces;
using SafeNetQ.Domain.Entities;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Commands.Documents;

public record UploadDocumentCommand(Guid? RequestId, string FileName, string ContentType, long SizeBytes, Stream FileStream) : IRequest<DocumentDto>;

public class UploadDocumentCommandHandler : IRequestHandler<UploadDocumentCommand, DocumentDto>
{
    private readonly IDocumentRepository _docRepo;
    private readonly ICurrentUserService _currentUser;
    private readonly IStorageService _storage;
    private readonly IUnitOfWork _uow;

    public UploadDocumentCommandHandler(IDocumentRepository docRepo, ICurrentUserService currentUser, IStorageService storage, IUnitOfWork uow)
    {
        _docRepo = docRepo;
        _currentUser = currentUser;
        _storage = storage;
        _uow = uow;
    }

    public async Task<DocumentDto> Handle(UploadDocumentCommand request, CancellationToken ct)
    {
        var userId = _currentUser.UserId ?? throw new UnauthorizedAccessException();

        var storageUrl = await _storage.UploadAsync(request.FileStream, request.FileName, request.ContentType, ct);

        var doc = new Document
        {
            UserId = userId,
            RequestId = request.RequestId,
            FileName = request.FileName,
            ContentType = request.ContentType,
            SizeBytes = request.SizeBytes,
            StorageUrl = storageUrl,
            ExpiresAt = DateTime.UtcNow.AddDays(90)
        };

        await _docRepo.AddAsync(doc, ct);
        await _uow.SaveChangesAsync(ct);

        return new DocumentDto(doc.Id, doc.FileName, doc.ContentType, doc.SizeBytes, doc.CreatedAt, doc.ExpiresAt);
    }
}
