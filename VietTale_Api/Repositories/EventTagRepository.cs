using Microsoft.EntityFrameworkCore;
using VietTale_Api.Database;
using VietTale_Api.Dtos;
using VietTale_Api.Interfaces;
using VietTale_Api.Mappers;
using VietTale_Api.Queries;

namespace VietTale_Api.Repositories
{
    public class EventTagRepository : IEventTagRepository
    {
        private readonly ApplicationDbContext _context;

        public EventTagRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EventTagDto>> GetAllAsync(EventTagQueryObject queryObject)
        {
            var eventTags = _context.EventTags.AsQueryable();

            if (!string.IsNullOrEmpty(queryObject.TagName))
            {
                eventTags = eventTags.Where(t => t.TagName.Contains(queryObject.TagName));
            }

            var dtoEntities = await eventTags
                .Select(t => t.ToDtoFromEntity())
                .ToListAsync();

            return dtoEntities;
        }
    }
}
