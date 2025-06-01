using Microsoft.EntityFrameworkCore;
using VietTale_Api.Database;
using VietTale_Api.Interfaces;
using VietTale_Api.Models;

namespace VietTale_Api.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly ApplicationDbContext _context;

        public EventRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Event> GetEventByIdAsync(int id)
        {
            return await _context.Events
                .Include(e => e.EventTags)
                .Include(e => e.EventsImages)
                .FirstOrDefaultAsync(e => e.Id == id);
        }
    }
} 