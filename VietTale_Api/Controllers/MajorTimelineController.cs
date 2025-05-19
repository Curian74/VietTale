using Microsoft.AspNetCore.Mvc;
using VietTale_Api.Interfaces;
using VietTale_Api.Repositories;

namespace VietTale_Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MajorTimelineController : ControllerBase
    {
        private readonly IMajorTimelineRepository _majorTimelineRepository;

        public MajorTimelineController(IMajorTimelineRepository majorTimelineRepository)
        {
            _majorTimelineRepository = majorTimelineRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _majorTimelineRepository.GetAllAsync());
        }
    }
}
