namespace VietTale_Api.Models
{
    public class MajorTimeline
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public string? Description { get; set; }

        public ICollection<Event>? Events { get; set; }
    }
}
