using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace VietTale_Api.Models
{
    public class UserFlashcardAttempt
    {
        public int Id { get; set; }
        public int CurrentQuestionNumber { get; set; }

        [ForeignKey(nameof(Lesson))]
        public int LessonId { get; set; }
        public Lesson? Lesson { get; set; }

        [ForeignKey(nameof(User))]
        public string? UserId { get; set; }
        public AppUser? User { get; set; }
    }
}
