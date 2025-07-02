using System.ComponentModel.DataAnnotations.Schema;

namespace VietTale_Api.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string? Content { get; set; }

        [ForeignKey(nameof(Lesson))]
        public int LessonId { get; set; }
        public Lesson? Lesson { get; set; }

        public IList<Answer>? Answer { get; set; }
    }
}
