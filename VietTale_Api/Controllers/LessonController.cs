using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VietTale_Api.Database;
using VietTale_Api.Dtos;
using VietTale_Api.Models;
using VietTale_Api.Queries;
using VietTale_Api.Utils;

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

        [HttpGet("library/{userId}")]
        public async Task<IActionResult> GetSavedLesson(string userId, 
            [FromQuery] SavedLessonQuery queryObj)
        {
            var query = _context.UserSavedLessons
                .Include(x => x.User)
                .Include(x => x.Lesson)
                .Where(x => x.UserId == userId)
                .AsQueryable();

            if (!string.IsNullOrEmpty(queryObj.SortBy))
            {
                if (queryObj.SortBy.Equals("LastActive", StringComparison.OrdinalIgnoreCase))
                {
                    query = queryObj.IsDescending
                        ? query.OrderByDescending(x => x.LastActive)
                        : query.OrderBy(x => x.LastActive);
                }
            }

            if (!string.IsNullOrEmpty(queryObj.Name))
            {
                query = query.Where(x => x.Lesson.Name.Contains(queryObj.Name));
            }

            var skip = (queryObj.PageIndex - 1) * queryObj.PageSize;

            var pagedData = query.Skip(skip).Take(queryObj.PageSize);

            var lessons = await pagedData
                .Select(usl => new SavedLessonDto
                {
                    Id = usl.Lesson.Id,
                    Name = usl.Lesson.Name,
                    NumberOfQuestions = usl.Lesson.NumberOfQuestions,
                    NumberOfLearners = usl.Lesson.NumberOfLearners,
                    User = usl.Lesson.User,
                })
                .ToListAsync();

            var totalItems = await query.CountAsync();

            var data = new PagedResult<SavedLessonDto>(lessons,
                queryObj.PageIndex, queryObj.PageSize, totalItems);

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var lesson = await _context.Lessons
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == id);

            return Ok(lesson);
        }

        [HttpGet("saved-lesson")]
        public async Task<IActionResult> CheckSavedLesson(int lessonId, string userId)
        {
            bool isSaved = await _context.UserSavedLessons
                .AnyAsync(x => x.UserId == userId && x.LessonId == lessonId);

            return Ok(new
            {
                lessonId,
                userId,
                isSaved
            });
        }

        [HttpPut("last-active")]
        public async Task<IActionResult> UpdateLastActivity(int lessonId, string userId)
        {
            var entry = await _context.UserSavedLessons
                .FirstOrDefaultAsync(x => x.UserId == userId && x.LessonId == lessonId);

            if (entry == null)
            {
                return NotFound();
            }

            entry.LastActive = DateTime.Now;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveLesson(int lessonId, string userId)
        {
            var lesson = await _context.Lessons
               .Include(x => x.User)
               .FirstOrDefaultAsync(x => x.Id == lessonId);

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if (lesson == null)
            {
                return NotFound();
            }

            var savedLesson = await _context.UserSavedLessons
                .Include(x => x.User)
                .Include(x => x.Lesson)
                .FirstOrDefaultAsync(x => x.LessonId == lessonId && userId == x.UserId);

            if (savedLesson != null)
            {
                _context.UserSavedLessons.Remove(savedLesson);
            }

            else
            {
                var newAttempt = new UserSavedLesson
                {
                    LessonId = lessonId,
                    UserId = userId,
                };

                await _context.UserSavedLessons.AddAsync(newAttempt);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
