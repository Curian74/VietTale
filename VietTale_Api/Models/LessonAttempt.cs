using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VietTale_Api.Models
{
    public class LessonAttempt
    {
        [Key]
        public int Id { get; set; }
        
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public AppUser User { get; set; }
        
        public int LessonId { get; set; }
        [ForeignKey("LessonId")]
        public Lesson Lesson { get; set; }
        
        public DateTime StartTime { get; set; }
        public DateTime? CompletionTime { get; set; }
        public int Score { get; set; }
        public int TotalQuestions { get; set; }
        public int CorrectAnswers { get; set; }
        public bool IsCompleted { get; set; }
    }
} 