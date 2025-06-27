using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VietTale_Api.Database;

namespace VietTale_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LessonController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularLesson()
        {
            var lessons = await _context.Lessons
                .Include(x => x.User)
                .OrderByDescending(x => x.NumberOfLearners)
                .ToListAsync();

            return Ok(lessons);
        }
    }
}
