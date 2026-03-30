using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Interfaces;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.API.Controllers;

[ApiController]
[Route("api/v1/profile")]
[Authorize]
public class ProfileController : ControllerBase
{
    private readonly IUserRepository _userRepo;
    private readonly ICurrentUserService _currentUser;
    private readonly IUnitOfWork _uow;

    public ProfileController(IUserRepository userRepo, ICurrentUserService currentUser, IUnitOfWork uow)
    {
        _userRepo = userRepo;
        _currentUser = currentUser;
        _uow = uow;
    }

    [HttpGet]
    public async Task<ActionResult<ProfileDto>> GetProfile(CancellationToken ct)
    {
        var userId = _currentUser.UserId ?? throw new UnauthorizedAccessException();
        var user = await _userRepo.GetByIdAsync(userId, ct);
        if (user == null) return NotFound();

        return Ok(new ProfileDto(user.Id, user.Email, user.FirstName, user.LastName, user.Phone, user.Status, user.KycStatus, user.MfaEnabled, user.CreatedAt));
    }

    [HttpPut("update")]
    public async Task<ActionResult<ProfileDto>> UpdateProfile([FromBody] UpdateProfileDto dto, CancellationToken ct)
    {
        var userId = _currentUser.UserId ?? throw new UnauthorizedAccessException();
        var user = await _userRepo.GetByIdAsync(userId, ct);
        if (user == null) return NotFound();

        if (dto.FirstName != null) user.FirstName = dto.FirstName;
        if (dto.LastName != null) user.LastName = dto.LastName;
        if (dto.Phone != null) user.Phone = dto.Phone;
        user.UpdatedAt = DateTime.UtcNow;

        await _userRepo.UpdateAsync(user, ct);
        await _uow.SaveChangesAsync(ct);

        return Ok(new ProfileDto(user.Id, user.Email, user.FirstName, user.LastName, user.Phone, user.Status, user.KycStatus, user.MfaEnabled, user.CreatedAt));
    }
}
