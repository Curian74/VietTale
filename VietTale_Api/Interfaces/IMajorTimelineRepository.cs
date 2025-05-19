using VietTale_Api.Dtos;

namespace VietTale_Api.Interfaces
{
    public interface IMajorTimelineRepository
    {
        Task<IEnumerable<MajorTimelineDto>> GetAllAsync();
    }
}
