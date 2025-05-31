using Microsoft.AspNetCore.Mvc;
using VietTale_Api.Interfaces;
using VietTale_Api.Queries;

namespace VietTale_Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EventTagController : ControllerBase
    {
        private readonly IEventTagRepository _eventTagRepository;

        public EventTagController(IEventTagRepository eventTagRepository)
        {
            _eventTagRepository = eventTagRepository;
        }

        [HttpGet]
        public async Task<IActionResult> All([FromQuery] EventTagQueryObject queryObject)
        {
            return Ok(await _eventTagRepository.GetAllAsync(queryObject));
        }
    }
}
