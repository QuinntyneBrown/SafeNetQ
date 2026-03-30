using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeNetQ.Application.Commands.Documents;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Interfaces;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.API.Controllers;

[ApiController]
[Route("api/v1/documents")]
[Authorize]
public class DocumentController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IDocumentRepository _docRepo;
    private readonly IStorageService _storage;

    public DocumentController(IMediator mediator, IDocumentRepository docRepo, IStorageService storage)
    {
        _mediator = mediator;
        _docRepo = docRepo;
        _storage = storage;
    }

    [HttpPost("upload")]
    public async Task<ActionResult<DocumentDto>> Upload(IFormFile file, [FromQuery] Guid? requestId, CancellationToken ct)
    {
        using var stream = file.OpenReadStream();
        var result = await _mediator.Send(new UploadDocumentCommand(requestId, file.FileName, file.ContentType, file.Length, stream), ct);
        return Ok(result);
    }

    [HttpGet("{id:guid}/url")]
    public async Task<ActionResult<DocumentUrlDto>> GetUrl(Guid id, CancellationToken ct)
    {
        var doc = await _docRepo.GetByIdAsync(id, ct);
        if (doc == null) return NotFound();

        var url = await _storage.GetPresignedUrlAsync(doc.StorageUrl, TimeSpan.FromMinutes(15), ct);
        return Ok(new DocumentUrlDto(url, DateTime.UtcNow.AddMinutes(15)));
    }
}
