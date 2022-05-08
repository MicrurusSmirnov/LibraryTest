using LibraryBackend.DAL;
using LibraryBackend.Helpers;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

string connection = builder.Configuration.GetConnectionString("LibraryConnection");

builder.Services.AddCors();
builder.Services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connection));
builder.Services.AddControllers();
builder.Services.AddScoped<JWTService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(option => option
.WithOrigins(new[] { "http://localhost:3000" })
.AllowAnyHeader()
.AllowAnyMethod()
.AllowCredentials()
);

app.UseAuthorization();

app.MapControllers();

app.Run();
