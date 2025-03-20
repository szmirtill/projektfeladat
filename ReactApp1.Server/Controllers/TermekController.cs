using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using MyApp.Models;
using System.Linq;

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

        // GET api/termekek?kategoriaId=1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetTermekek([FromQuery] int? kategoriaId)
        {
            var query = _context.Termekek.AsQueryable();

            if (kategoriaId.HasValue)
            {
                query = query.Where(t => t.kategoria_id == kategoriaId.Value);
            }

            var termekek = await query
                .Select(t => new { t.Id, t.Nev, t.Ar })
                .ToListAsync();

            return Ok(termekek);
        }
    }
}
