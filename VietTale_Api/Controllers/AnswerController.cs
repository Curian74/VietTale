using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VietTale_Api.Database;

namespace VietTale_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AnswerController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{questionId}")]
        public async Task<IActionResult> GetByQuestionId(int questionId)
        {
            var answers = await _context.Answers
                .Where(x => x.QuestionId == questionId).ToListAsync();

            return Ok(answers);
        }
    }
}
