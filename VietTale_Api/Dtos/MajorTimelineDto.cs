namespace VietTale_Api.Dtos
{
    public class MajorTimelineDto
    {
        public string? Name { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public string? Description { get; set; }
        public List<EventDto>? Events { get; set; }
    }
}
