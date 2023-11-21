using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(DataContext context)
    {
        if(await context.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("./Data/userSeedData.json");

        var options = new JsonSerializerOptions()
        {
            PropertyNameCaseInsensitive = true
        };

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);
        
        foreach (var appUser in users)
        {
            using var hmac = new HMACSHA512();

            appUser.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
            appUser.PasswordSalt = hmac.Key;

            context.Users.Add(appUser);
        }
        await context.SaveChangesAsync();
        
    }
}