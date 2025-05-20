using System.ComponentModel.DataAnnotations.Schema;
using VietTale_Api.Models;

namespace VietTale_Api.Dtos
{
    public class EventDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateOnly EventTime { get; set; }
        public string? Thumbnail { get; set; }

        public int MajorTimelineId { get; set; }
    }
}
