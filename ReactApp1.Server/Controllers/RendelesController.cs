using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RendelesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RendelesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 🔹 Rendelési előzmények lekérése
        [HttpGet("history/{vevoId}")]
        public async Task<IActionResult> GetOrderHistory(int vevoId)
        {
            var rendelesek = await _context.rendelesek
                .Where(r => r.vevo_id == vevoId)
                .OrderByDescending(r => r.rendeles_datum)
                .Select(r => new
                {
                    r.Id,
                    r.rendeles_datum,
                    r.allapot,
                    Termekek = _context.rendeles_tetelek
                        .Where(rt => rt.rendeles_id == r.Id)
                        .Select(rt => new
                        {
                            rt.termek_id,
                            TermekNev = _context.Termekek
                                .Where(t => t.Id == rt.termek_id)
                                .Select(t => t.Nev)
                                .FirstOrDefault(),
                            rt.mennyiseg,
                            rt.osszeg
                        }).ToList()
                })
                .ToListAsync();

            return Ok(rendelesek);
        }

        // 🔹 Rendelés mentése + azonnali visszaküldés a frontendnek
        [HttpPost("mentes")]
        public async Task<IActionResult> MentesRendeles([FromBody] RendelesRequest request)
        {
            if (request == null || request.Termekek == null || request.Termekek.Count == 0)
            {
                return BadRequest("Nincs kiválasztott termék.");
            }

            var ujRendeles = new Rendeles
            {
                vevo_id = request.vevo_id,
                rendeles_datum = DateTime.Now,
                allapot = "Függőben"
            };

            _context.rendelesek.Add(ujRendeles);
            await _context.SaveChangesAsync();

            foreach (var termek in request.Termekek)
            {
                var tetel = new RendelesTetel
                {
                    rendeles_id = ujRendeles.Id,
                    termek_id = termek.TermekId,
                    mennyiseg = termek.Mennyiseg,
                    osszeg = termek.Mennyiseg * termek.Ar
                };
                _context.rendeles_tetelek.Add(tetel);
            }

            await _context.SaveChangesAsync();

            // 🔹 Az új rendelési előzményeket visszaküldjük a frontendnek
            return await GetOrderHistory(request.vevo_id);
        }
    }

    // DTO osztályok
    public class RendelesRequest
    {
        public int vevo_id { get; set; }
        public List<TermekTetel> Termekek { get; set; }
    }

    public class TermekTetel
    {
        public int TermekId { get; set; }
        public int Mennyiseg { get; set; }
        public int Ar { get; set; }
    }
}
