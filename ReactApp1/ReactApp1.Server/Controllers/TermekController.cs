using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using MyApp.Models;

namespace MyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TermekekController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TermekekController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET api/termekek
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Termek>>> GetTermekek()
        {
            var termekek = await _context.Termekek.ToListAsync();
            return Ok(termekek);
        }
    }
}
