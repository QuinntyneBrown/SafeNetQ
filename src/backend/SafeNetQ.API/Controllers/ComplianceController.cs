using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeNetQ.Application.DTOs;

namespace SafeNetQ.API.Controllers;

[ApiController]
[Route("api/v1/compliance")]
[Authorize(Roles = "Admin,ComplianceOfficer")]
public class ComplianceController : ControllerBase
{
    [HttpPost("str")]
    public ActionResult SubmitStr([FromBody] SubmitStrDto dto)
    {
        // Placeholder: submit suspicious transaction report
        return Ok(new { message = "STR submitted", id = Guid.NewGuid() });
    }

    [HttpGet("reports")]
    public ActionResult<IReadOnlyList<ComplianceReportDto>> GetReports()
    {
        // Placeholder: return compliance reports
        return Ok(Array.Empty<ComplianceReportDto>());
    }
}
