﻿using Microsoft.EntityFrameworkCore;
using VietTale_Api.Database;
using VietTale_Api.Dtos;
using VietTale_Api.Interfaces;
using VietTale_Api.Mappers;
using VietTale_Api.Queries;
using VietTale_Api.Utils;

namespace VietTale_Api.Repositories
{
    public class MajorTimelineRepository : IMajorTimelineRepository
    {
        private readonly ApplicationDbContext _context;

        public MajorTimelineRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MajorTimelineDto>> GetAllAsync()
        {
            var data = await _context.MajorTimelines
                .Include(m => m.Events)
                .Select(m => m.ToDtoFromEntity())
                .ToListAsync();

            return data;
        }

        public async Task<PagedResult<MajorTimelineDto>> GetPagedAsync(
            MajorTimelineQueryObject queryObject)
        {
            var majorTimelines = _context.MajorTimelines
                .Include(m => m.Events)
                .AsQueryable();

            if (queryObject.MajorTimelineId.HasValue)
            {
                majorTimelines = majorTimelines.Where(t => t.Id == queryObject.MajorTimelineId);
            }

            var skip = (queryObject.PageIndex - 1) * queryObject.PageSize;

            var pagedEntities = await majorTimelines
                .Skip(skip)
                .Take(queryObject.PageSize)
                .ToListAsync();

            var pagedData = pagedEntities.Select(t => t.ToDtoFromEntity()).ToList();

            var totalCount = await majorTimelines.CountAsync();

            return new PagedResult<MajorTimelineDto>(pagedData, queryObject.PageIndex,
                queryObject.PageSize, totalCount);
        }
    }
}
