using System.ComponentModel.DataAnnotations.Schema;

namespace VietTale_Api.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string? Content { get; set; }
        public bool? IsStared { get; set; }

        [ForeignKey(nameof(Lesson))]
        public int LessonId { get; set; }
        public Lesson? Lesson { get; set; }

        public Answer? Answer { get; set; }
    }
}
