using VietTale_Api.Models;

namespace VietTale_Api.Dtos
{
    public class SavedLessonDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int NumberOfQuestions { get; set; }
        public int NumberOfLearners { get; set; }
        public AppUser? User { get; set; }
    }
}
