using VietTale_Api.Models;

namespace VietTale_Api.Dtos
{
    public class StartLessonAttemptDto
    {
        public int LessonId { get; set; }
        public string UserId { get; set; }
    }

    public class SubmitLessonAnswerDto
    {
        public int AttemptId { get; set; }
        public List<AnswerSubmission> Answers { get; set; }
    }

    public class AnswerSubmission
    {
        public int QuestionId { get; set; }
        public int SelectedAnswerId { get; set; }
    }

    public class LessonAttemptResultDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public int LessonId { get; set; }
        public Lesson Lesson { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? CompletionTime { get; set; }
        public int Score { get; set; }
        public int TotalQuestions { get; set; }
        public int CorrectAnswers { get; set; }
        public bool IsCompleted { get; set; }
    }
} 