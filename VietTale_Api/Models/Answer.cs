using System.ComponentModel.DataAnnotations.Schema;

namespace VietTale_Api.Models
{
    public class Answer
    {
        public int Id { get; set; }
        public string? Content { get; set; }

        [ForeignKey(nameof(Question))]
        public int QuestionId { get; set; }
        public Question? Question { get; set; }
    }
}
