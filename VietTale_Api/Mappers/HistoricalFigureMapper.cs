using VietTale_Api.Dtos;
using VietTale_Api.Models;

namespace VietTale_Api.Mappers
{
    public static class HistoricalFigureMapper
    {
        public static HistoricalFigureDto ToDtoFromEntity(this HistoricalFigure historicalFigure)
        {
            return new HistoricalFigureDto
            {
                Id = historicalFigure.Id,
                Name = historicalFigure.Name,
                Avatar = historicalFigure.Avatar,
                Description = historicalFigure.Description,
            };
        }
    }
}
