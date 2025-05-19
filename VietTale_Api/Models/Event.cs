using System.ComponentModel.DataAnnotations.Schema;

namespace VietTale_Api.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateOnly EventDate { get; set; }
        public string? Thumbnail { get; set; }

        [ForeignKey(nameof(MajorTimeline))]
        public int MajorTimelineId { get; set; }
        public MajorTimeline? MajorTimeline { get; set; }

        public ICollection<EventTag>? EventTags { get; set; }

    }
}
