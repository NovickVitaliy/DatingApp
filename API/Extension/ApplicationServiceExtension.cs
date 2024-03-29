using System.Text;
using API.Data;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.Services;
using API.SignalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Extension;

public static class ApplicationServiceExtension
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<LogUserActivity>();
        services.Configure<CloudinarySettings>(configuration.GetSection("CloudinarySetting"));
        services.AddAutoMapper(typeof(AutoMapperProfiles));
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<ILikesRepository, LikesRepository>();
        services.AddScoped<IMessageRepository, MessageRepository>();
        services.AddSignalR();
        services.AddSingleton<PresenceTracker>();
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(policyBuilder =>
            {
                policyBuilder
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .AllowAnyMethod();
            });
        });
        services.AddDbContext<DataContext>(optionsBuilder =>
        {
            optionsBuilder.UseSqlite(configuration.GetConnectionString("Default"));
        });
        
        services.AddControllers();
        services.AddScoped<IPhotoService, PhotoService>();


        return services;
    }
}