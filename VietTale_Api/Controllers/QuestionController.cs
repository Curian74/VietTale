using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VietTale_Api.Database;

namespace VietTale_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuestionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{lessonId}")]
        public async Task<IActionResult> GetByQuestionId(int lessonId)
        {
            var questions = await _context.Question
                .Where(x => x.LessonId == lessonId)
                .ToListAsync();

            return Ok(questions);
        }
    }
}
