using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
    {
        if(await userManager.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("./Data/userSeedData.json");

        var options = new JsonSerializerOptions()
        {
            PropertyNameCaseInsensitive = true
        };

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);
        var roles = new List<AppRole>
        {
            new AppRole(){Name = "Member"},
            new AppRole(){Name = "Admini"},
            new AppRole(){Name = "Moderator"}
        };

        foreach (var role in roles)
        {
            await roleManager.CreateAsync(role);
        }
        
        foreach (var appUser in users)
        {
            appUser.UserName = appUser.UserName!.ToLower();
            await userManager.CreateAsync(appUser, "Pa$$w0rd");
            await userManager.AddToRoleAsync(appUser, "Member");
        }

        var admin = new AppUser()
        {
            UserName = "admin"
        };

        await userManager.CreateAsync(admin, "Pa$$w0rd");
        await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
    }
}