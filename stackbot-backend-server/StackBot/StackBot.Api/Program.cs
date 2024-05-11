using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Stackbot.DataAccess;
using StackBot.Api.Extensions;
using StackBot.Api.Middleware;
using StackBot.Api.Models;
using StackBot.Api.Options;
using StackBot.Business.Services;
using StackBot.Domain.Entities;

var builder = WebApplication.CreateBuilder(args);

// Register authentication configurations
builder.RegisterAuthentication();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
// Configure Swagger with Authorization
builder.Services.AddSwagger();

// Database
var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .Build();

using StreamReader r = new(config.GetValue<string>("SecretsFile"));
string json = r.ReadToEnd();
var secrets = JsonConvert.DeserializeObject<SecretsModel>(json);
if (secrets == null)
{
    return;
}
builder.Services.AddSingleton(secrets);
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(string.Format(
     config.GetConnectionString("Database"),
     secrets.DatabaseHost,
     secrets.DatabaseName,
     secrets.DatabaseUsername,
     secrets.DatabasePassword
    )));

// ASP.NET Identity
builder.Services.AddIdentity<User, IdentityRole<Guid>>()
    .AddEntityFrameworkStores<AppDbContext>();

// JWT settings and custom Identity Service
builder.Services.Configure<JwtSettings>(config.GetSection("JwtSettings"));
builder.Services.AddSingleton<IdentityService>();

// MediatR
builder.Services.AddMediatR();

// Repositories
builder.Services.AddRepositories();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Custom Exception middleware
app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

// Authentication and authorization middleware
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
