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
                StartYear = majorTimeline.StartYear,
                EndYear = majorTimeline.EndYear,
                Description = majorTimeline.Description,
                Events = majorTimeline.Events.Select(x => new EventDto
                {
                    Description = x.Description,
                    EventTime = x.EventTime,
                    Id = x.Id,
                    MajorTimelineId = x.MajorTimelineId,
                    Thumbnail = x.Thumbnail,
                    Title = x.Title,
                })
                .ToList()
            };
        }
    }
}
