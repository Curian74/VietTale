using VietTale_Api.Dtos;
using VietTale_Api.Models;

namespace VietTale_Api.Mappers
{
    public static class MajorTimelineMapper
    {
        public static MajorTimelineDto ToDtoFromEntity(this MajorTimeline majorTimeline)
        {
            return new MajorTimelineDto
            {
                Name = majorTimeline.Name,
            };
        }
    }
}
