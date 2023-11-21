using System.Text;
using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Extension;

public static class ApplicationServiceExtension
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAutoMapper(typeof(AutoMapperProfiles));
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(policyBuilder =>
            {
                policyBuilder
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });
        services.AddDbContext<DataContext>(optionsBuilder =>
        {
            optionsBuilder.UseSqlite(configuration.GetConnectionString("Default"));
        });

        services.AddControllers();


        return services;
    }
}