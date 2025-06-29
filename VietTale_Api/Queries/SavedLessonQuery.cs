namespace VietTale_Api.Queries
{
    public class SavedLessonQuery : PagedQueryObject
    {
        public string? Name { get; set; }
        public string? SortBy { get; set; }
        public bool IsDescending { get; set; } = true;
    }
}
