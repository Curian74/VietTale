using Microsoft.EntityFrameworkCore;
using VietTale_Api.Database;
using VietTale_Api.Dtos;
using VietTale_Api.Interfaces;
using VietTale_Api.Mappers;

namespace VietTale_Api.Repositories
{
    public class MajorTimelineRepository : IMajorTimelineRepository
    {
        private readonly ApplicationDbContext _context;

        public MajorTimelineRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MajorTimelineDto>> GetAllAsync()
        {
            var data = await _context.MajorTimelines
                .Select(m => m.ToDtoFromEntity())
                .ToListAsync();

            return data;
        }
    }
}
