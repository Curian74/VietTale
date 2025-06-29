namespace VietTale_Api.Models
{
    public class UserSavedLesson
    {
        public int Id { get; set; }
        public DateTime? LastActive { get; set; }
        public string UserId { get; set; } = null!;
        public AppUser User { get; set; } = null!;

        public int LessonId { get; set; }
        public Lesson Lesson { get; set; } = null!;
    }
}
