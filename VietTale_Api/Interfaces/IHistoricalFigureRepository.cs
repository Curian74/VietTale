using VietTale_Api.Dtos;
using VietTale_Api.Queries;
using VietTale_Api.Utils;

namespace VietTale_Api.Interfaces
{
    public interface IHistoricalFigureRepository
    {
        Task<PagedResult<HistoricalFigureDto>> GetPagedAsync(HistoricalFigureQueryObject queryObject);
        Task<IEnumerable<HistoricalFigureDto>> GetAllAsync(HistoricalFigureFilterQueryObject queryObject);
    }
}
