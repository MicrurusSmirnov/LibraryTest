using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LibraryBackend.DAL;
using LibraryBackend.DTO;
using LibraryBackend.Models;
using LibraryBackend.Helpers;

namespace LibraryBackend.Controllers
{
    
    [Route("api/")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly JWTService _jWTService;

        public UsersController(ApplicationContext context, JWTService jWTService)
        {
            _context = context;
            _jWTService = jWTService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            try
            {
                User user = new User
                {
                    Email = userDto.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("login")]
        public IActionResult Login(UserDto userDto)
        {
            User user = _context.Users.FirstOrDefault(p => p.Email == userDto.Email);
            if (user == null)
                return BadRequest(new { message = "Пользователь не найден" });

            if (!BCrypt.Net.BCrypt.Verify(userDto.Password, user.Password))
                return BadRequest(new { message = "Пользователь не найден" });

            var jwt = _jWTService.Generate(user.Id);

            Response.Cookies.Append("libraryjwt", jwt, new CookieOptions { HttpOnly = true });

            return Ok();
        }

        [HttpGet("user")]
        public IActionResult GetUser()
        {
            try
            {
                var jwt = Request.Cookies["libraryjwt"];

                var token = _jWTService.Verify(jwt);

                var userId = int.Parse(token.Issuer);                

                User user = _context.Users.FirstOrDefault(p => p.Id == userId);

                if (user == null)
                    return BadRequest(new { message = "Пользователь не найден" });

                return Ok(user);
            }
            catch
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("libraryjwt");

            return Ok();
        }
    }
}
