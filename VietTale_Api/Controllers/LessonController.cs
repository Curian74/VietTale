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

        [HttpGet("last-active")]
        public async Task<IActionResult> GetLastActive([FromQuery] int lessonId, [FromQuery] string userId)
        {
            var savedLesson = await _context.UserSavedLessons
                .FirstOrDefaultAsync(x => x.UserId == userId && x.LessonId == lessonId);

            if (savedLesson == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                lessonId,
                userId,
                lastActive = savedLesson.LastActive
            });
        }

        [HttpGet("questions/{id}")]
        public async Task<IActionResult> GetLessonWithQuestions(int id)
        {
            var lesson = await _context.Lessons
                .Include(x => x.User)
                .Include(x => x.Questions)
                    .ThenInclude(q => q.Answer)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (lesson == null)
            {
                return NotFound("Lesson not found");
            }

            return Ok(new
            {
                Id = lesson.Id,
                Name = lesson.Name,
                User = lesson.User,
                Questions = lesson.Questions.Select(q => new
                {
                    Id = q.Id,
                    Content = q.Content,
                    Answers = q.Answer.Select(a => new
                    {
                        Id = a.Id,
                        Content = a.Content,
                        IsCorrect = a.IsCorrect
                    })
                })
            });
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
        public async Task<IActionResult> UpdateLastActivity([FromQuery] int lessonId, [FromQuery] string userId)
        {
            var entry = await _context.UserSavedLessons
                .FirstOrDefaultAsync(x => x.UserId == userId && x.LessonId == lessonId);

            if (entry == null)
            {
                // Check if lesson and user exist
                var lesson = await _context.Lessons.FindAsync(lessonId);
                var user = await _context.Users.FindAsync(userId);

                if (lesson == null || user == null)
                {
                    return NotFound("Lesson or user not found");
                }

                // Create new entry
                entry = new UserSavedLesson
                {
                    LessonId = lessonId,
                    UserId = userId,
                    LastActive = DateTime.Now
                };

                await _context.UserSavedLessons.AddAsync(entry);
            }
            else
            {
                entry.LastActive = DateTime.Now;
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                lessonId,
                userId,
                lastActive = entry.LastActive
            });
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

        [HttpPost("start")]
        public async Task<IActionResult> StartLesson([FromBody] StartLessonAttemptDto dto)
        {
            var lesson = await _context.Lessons
                .Include(x => x.Questions)
                .FirstOrDefaultAsync(x => x.Id == dto.LessonId);

            if (lesson == null)
            {
                return NotFound("Lesson not found");
            }

            var attempt = new LessonAttempt
            {
                UserId = dto.UserId,
                LessonId = dto.LessonId,
                StartTime = DateTime.Now,
                TotalQuestions = lesson.Questions.Count,
                IsCompleted = false
            };

            await _context.LessonAttempts.AddAsync(attempt);
            await _context.SaveChangesAsync();

            return Ok(new { attemptId = attempt.Id });
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitLesson([FromBody] SubmitLessonAnswerDto dto)
        {
            var attempt = await _context.LessonAttempts
                .Include(x => x.Lesson)
                .ThenInclude(l => l.Questions)
                .ThenInclude(q => q.Answer)
                .FirstOrDefaultAsync(x => x.Id == dto.AttemptId);

            if (attempt == null)
            {
                return NotFound("Attempt not found");
            }

            if (attempt.IsCompleted)
            {
                return BadRequest("This attempt has already been completed");
            }

            int correctAnswers = 0;
            foreach (var submission in dto.Answers)
            {
                var question = attempt.Lesson.Questions.FirstOrDefault(q => q.Id == submission.QuestionId);
                if (question != null)
                {
                    var correctAnswer = question.Answer.FirstOrDefault(a => a.IsCorrect);
                    if (correctAnswer != null && correctAnswer.Id == submission.SelectedAnswerId)
                    {
                        correctAnswers++;
                    }
                }
            }

            attempt.CorrectAnswers = correctAnswers;
            attempt.Score = (int)((double)correctAnswers / attempt.TotalQuestions * 100);
            attempt.CompletionTime = DateTime.Now;
            attempt.IsCompleted = true;

            await _context.SaveChangesAsync();

            return Ok(new LessonAttemptResultDto
            {
                Id = attempt.Id,
                UserId = attempt.UserId,
                LessonId = attempt.LessonId,
                StartTime = attempt.StartTime,
                CompletionTime = attempt.CompletionTime,
                Score = attempt.Score,
                TotalQuestions = attempt.TotalQuestions,
                CorrectAnswers = attempt.CorrectAnswers,
                IsCompleted = attempt.IsCompleted
            });
        }

        [HttpGet("attempts/{userId}")]
        public async Task<IActionResult> GetUserAttempts(string userId)
        {
            var attempts = await _context.LessonAttempts
                .Include(x => x.Lesson)
                .Include(x => x.User)
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.StartTime)
                .Select(x => new LessonAttemptResultDto
                {
                    Id = x.Id,
                    UserId = x.UserId,
                    User = x.User,
                    LessonId = x.LessonId,
                    Lesson = x.Lesson,
                    StartTime = x.StartTime,
                    CompletionTime = x.CompletionTime,
                    Score = x.Score,
                    TotalQuestions = x.TotalQuestions,
                    CorrectAnswers = x.CorrectAnswers,
                    IsCompleted = x.IsCompleted
                })
                .ToListAsync();

            return Ok(attempts);
        }

        [HttpGet("last-attempt")]
        public async Task<IActionResult> GetLastUserAttempts([FromQuery] int lessonId, [FromQuery] string userId)
        {
            var attempt = await _context.LessonAttempts
                .Include(x => x.Lesson)
                .Include(x => x.User)
                .Where(x => x.UserId == userId && x.LessonId == lessonId && x.IsCompleted)
                .OrderByDescending(x => x.CompletionTime)
                .Select(x => new LessonAttemptResultDto
                {
                    Id = x.Id,
                    UserId = x.UserId,
                    User = x.User,
                    LessonId = x.LessonId,
                    Lesson = x.Lesson,
                    StartTime = x.StartTime,
                    CompletionTime = x.CompletionTime,
                    Score = x.Score,
                    TotalQuestions = x.TotalQuestions,
                    CorrectAnswers = x.CorrectAnswers,
                    IsCompleted = x.IsCompleted
                })
                .FirstOrDefaultAsync();

            return Ok(attempt);
        }
        [HttpGet("attempt/{id}")]
        public async Task<IActionResult> GetAttemptById(int id)
        {
            var attempt = await _context.LessonAttempts
                .Include(x => x.Lesson)
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (attempt == null)
            {
                return NotFound();
            }

            return Ok(new LessonAttemptResultDto
            {
                Id = attempt.Id,
                UserId = attempt.UserId,
                User = attempt.User,
                LessonId = attempt.LessonId,
                Lesson = attempt.Lesson,
                StartTime = attempt.StartTime,
                CompletionTime = attempt.CompletionTime,
                Score = attempt.Score,
                TotalQuestions = attempt.TotalQuestions,
                CorrectAnswers = attempt.CorrectAnswers,
                IsCompleted = attempt.IsCompleted
            });
        }
    }
}
