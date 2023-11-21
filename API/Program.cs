using API.Data;
using API.Extension;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
var app = builder.Build();

app.UseExceptionMiddleware();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();

try
{

    var context = scope.ServiceProvider.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(context);

}
catch (Exception ex)
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();
