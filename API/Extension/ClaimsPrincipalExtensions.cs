using System.Security.Claims;

namespace API.Extension;

public static class ClaimsPrincipalExtensions
{
    public static string GetUsername(this ClaimsPrincipal claimsPrincipal)
    {
        return claimsPrincipal.FindFirst(ClaimTypes.Name)?.Value;
    }

    public static int GetUserId(this ClaimsPrincipal claimsPrincipal)
    {
        return  int.Parse(claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
    }
}