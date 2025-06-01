using Microsoft.AspNetCore.Mvc;
using VietTale_Api.Interfaces;
using VietTale_Api.Models;
using VietTale_Api.Dtos;
using VietTale_Api.Mappers;

namespace VietTale_Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent(int id)
        {
            var eventDetail = await _eventRepository.GetEventByIdAsync(id);

            if (eventDetail == null)
            {
                return NotFound();
            }

            var eventDto = EventMapper.ToDto(eventDetail);

            return Ok(eventDto);
        }
    }
} 