using API.Helpers;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
[EnableCors]
[ServiceFilter(typeof(LogUserActivity))]
public class BaseApiController : ControllerBase
{
    
}