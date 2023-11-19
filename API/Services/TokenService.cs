using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace API.Services;

public class TokenService : ITokenService
{
    private readonly SymmetricSecurityKey _key;

    public TokenService(IConfiguration configuration)
    {
        _key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration.GetValue<string>("TokenKey")));
    }
    
    public string CreateToken(AppUser user)
    {
        List<Claim> claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.NameId, user.UserName),
        };

        var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512);

        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}