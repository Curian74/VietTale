using Microsoft.AspNetCore.Mvc;
using VietTale_Api.Interfaces;
using VietTale_Api.Queries;
using VietTale_Api.Repositories;

namespace VietTale_Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HistoricalFigureController : ControllerBase
    {
        private readonly IHistoricalFigureRepository _historicalFigureRepository;

        public HistoricalFigureController(IHistoricalFigureRepository historicalFigureRepository)
        {
            _historicalFigureRepository = historicalFigureRepository;
        }

        [HttpGet]
        public async Task<IActionResult> All([FromQuery] HistoricalFigureFilterQueryObject queryObject)
        {
            return Ok(await _historicalFigureRepository.GetAllAsync(queryObject));
        }

        [HttpGet]
        public async Task<IActionResult> Paged([FromQuery] HistoricalFigureQueryObject queryObject)
        {
            return Ok(await _historicalFigureRepository.GetPagedAsync(queryObject));
        }
    }
}
