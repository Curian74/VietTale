using VietTale_Api.Dtos;
using VietTale_Api.Queries;
using VietTale_Api.Utils;

namespace VietTale_Api.Interfaces
{
    public interface IMajorTimelineRepository
    {
        Task<IEnumerable<MajorTimelineDto>> GetAllAsync();
        Task<PagedResult<MajorTimelineDto>> GetPagedAsync(MajorTimelineQueryObject queryObject);
    }
}
