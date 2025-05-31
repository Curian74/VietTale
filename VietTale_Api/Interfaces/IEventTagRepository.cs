using VietTale_Api.Dtos;
using VietTale_Api.Queries;

namespace VietTale_Api.Interfaces
{
    public interface IEventTagRepository
    {
        Task<IEnumerable<EventTagDto>> GetAllAsync(EventTagQueryObject queryObject);
    }
}
