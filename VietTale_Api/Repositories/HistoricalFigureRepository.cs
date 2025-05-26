using Microsoft.EntityFrameworkCore;
using VietTale_Api.Database;
using VietTale_Api.Dtos;
using VietTale_Api.Interfaces;
using VietTale_Api.Mappers;
using VietTale_Api.Queries;
using VietTale_Api.Utils;

namespace VietTale_Api.Repositories
{
    public class HistoricalFigureRepository : IHistoricalFigureRepository
    {
        private readonly ApplicationDbContext _context;

        public HistoricalFigureRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<HistoricalFigureDto>> GetAllAsync(HistoricalFigureFilterQueryObject queryObject)
        {
            var query = _context.HistoricalFigures.AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryObject.Name))
            {
                query = query.Where(f => f.Name!.Contains(queryObject.Name));
            }

            return await query
                .Select(f => f.ToDtoFromEntity())
                .ToListAsync();
        }

        public async Task<PagedResult<HistoricalFigureDto>> GetPagedAsync(HistoricalFigureQueryObject queryObject)
        {
            var data = _context.HistoricalFigures
                .Select(f => f.ToDtoFromEntity())
                .AsQueryable();

            var totalCount = data.Count();
            var skipNumber = (queryObject.PageIndex - 1) * queryObject.PageSize;

            var pagedData = await data.Skip(skipNumber).Take(queryObject.PageSize).ToListAsync();

            return new PagedResult<HistoricalFigureDto>(pagedData,
                queryObject.PageIndex, queryObject.PageSize, totalCount);
        }
    }
}
