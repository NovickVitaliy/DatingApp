using System.Security.Claims;

namespace API.Extension;

public static class ClaimsPrincipalExtensions
{
    public static string GetUsername(this ClaimsPrincipal claimsPrincipal)
    {
        return claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }
}