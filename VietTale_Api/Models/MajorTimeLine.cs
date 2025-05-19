namespace VietTale_Api.Models
{
    public class MajorTimeline
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateOnly? From { get; set; }
        public DateOnly? To { get; set; }

        public ICollection<Event>? Events { get; set; }
    }
}
