using VietTale_Api.Dtos;
using VietTale_Api.Models;

namespace VietTale_Api.Mappers
{
    public static class EventMapper
    {
        public static EventDto ToDto(Event eventModel)
        {
            return new EventDto
            {
                Id = eventModel.Id,
                Title = eventModel.Title,
                Description = eventModel.Description,
                EventTime = eventModel.EventTime,
                Thumbnail = eventModel.Thumbnail,
                EventTags = eventModel.EventTags?.Select(tag => new EventTagDto { Id = tag.Id, TagName = tag.TagName }).ToList(),
                EventsImages = eventModel.EventsImages?.Select(image => new EventImagesDto { Id = image.Id, Url = image.Url }).ToList(),
                MajorTimelineId = eventModel.MajorTimelineId
            };
        }
    }
} 