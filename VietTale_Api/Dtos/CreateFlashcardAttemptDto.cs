using VietTale_Api.Models;

namespace VietTale_Api.Dtos
{
    public class CreateFlashcardAttemptDto
    {
        public int LessonId { get; set; }
        public string? UserId { get; set; }
    }
}
