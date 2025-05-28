using VietTale_Api.Models;

namespace VietTale_Api.Interfaces
{
    public interface IEventRepository
    {
        Task<Event> GetEventByIdAsync(int id);
    }
} 