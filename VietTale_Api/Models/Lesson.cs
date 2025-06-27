using System.ComponentModel.DataAnnotations.Schema;

namespace VietTale_Api.Models
{
    public class Lesson
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int NumberOfQuestions { get; set; }
        public DateOnly CreatedAt { get; set; }
        public int NumberOfLearners { get; set; }

        [ForeignKey(nameof(User))]
        public string? CreatedBy { get; set; }
        public AppUser? User { get; set; }

        public IList<Question>? Questions { get; set; }
    }
}
