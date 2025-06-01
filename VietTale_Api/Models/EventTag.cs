namespace VietTale_Api.Models
{
    public class EventTag
    {
        public int Id { get; set; }
        public string? TagName { get; set; }

        public ICollection<Event>? Events { get; set; }
    }
}
