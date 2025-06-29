using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VietTale_Api.Database;
using VietTale_Api.Dtos;
using VietTale_Api.Dtos.Requests;
using VietTale_Api.Models;

namespace VietTale_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFlashcardAttemptController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserFlashcardAttemptController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var lesson = await _context.UserFlashcardAttempt
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (lesson == null)
            {
                return NotFound();
            }

            return Ok(lesson);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateFlashcardAttemptDto dto)
        {
            var oldAttempt = await _context.UserFlashcardAttempt
                .FirstOrDefaultAsync(x => x.LessonId == dto.LessonId);

            if (oldAttempt == null)
            {
                var newAttempt = new UserFlashcardAttempt
                {
                    LessonId = dto.LessonId,
                    UserId = dto.UserId,
                    CurrentQuestionNumber = 1
                };

                var lesson = await _context.Lessons.FindAsync(dto.LessonId);

                lesson!.NumberOfLearners++;

                await _context.UserFlashcardAttempt.AddAsync(newAttempt);
                await _context.SaveChangesAsync();

                return Ok(newAttempt);
            }

            return Ok(oldAttempt);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAttempt(int id, UpdateFlashcardAttemptDto dto)
        {
            var attempt = await _context.UserFlashcardAttempt
                .FirstOrDefaultAsync(x => x.Id == id);

            if (attempt == null)
            {
                return NotFound();
            }

            attempt.CurrentQuestionNumber = dto.CurrentQuestionNumber;

            await _context.SaveChangesAsync();

            return Ok(attempt);
        }
    }
}
