using System.ComponentModel.DataAnnotations.Schema;

namespace VietTale_Api.Models
{
    public class EventImages
    {
        public int Id { get; set; }
        public string? Url { get; set; }

        [ForeignKey(nameof(Event))]
        public int EventId { get; set; }
        public Event? Event { get; set; }
    }
}
