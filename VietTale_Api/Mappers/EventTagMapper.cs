using VietTale_Api.Dtos;
using VietTale_Api.Models;

namespace VietTale_Api.Mappers
{
    public static class EventTagMapper
    {
        public static EventTagDto ToDtoFromEntity(this EventTag entity)
        {
            return new EventTagDto
            {
                Id = entity.Id,
                TagName = entity.TagName,
            };
        }
    }
}
