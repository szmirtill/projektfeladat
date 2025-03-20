using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Models;
using System.Threading.Tasks;

namespace MyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AccountController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 🔹 1️⃣ Regisztráció végpont
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.felhasznalonev) ||
                string.IsNullOrEmpty(request.email) || string.IsNullOrEmpty(request.jelszo))
            {
                return BadRequest("Minden mező kitöltése kötelező.");
            }

            // Ellenőrizzük, hogy a felhasználónév már létezik-e
            var existingUser = await _context.vevo
                .FirstOrDefaultAsync(u => u.felhasznalonev == request.felhasznalonev || u.email == request.email);

            if (existingUser != null)
            {
                return Conflict("A felhasználónév vagy az e-mail cím már foglalt.");
            }

            // Jelszó titkosítása (bcrypt)
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.jelszo);

            // Új felhasználó mentése
            var newUser = new vevo
            {
                felhasznalonev = request.felhasznalonev,
                email = request.email,
                jelszo = hashedPassword
            };

            _context.vevo.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Sikeres regisztráció!", userId = newUser.Id });
        }
    }

    public class RegisterRequest
    {
        public string felhasznalonev { get; set; }
        public string email { get; set; }
        public string jelszo { get; set; }
    }
}
