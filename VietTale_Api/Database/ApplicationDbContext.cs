using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using VietTale_Api.Models;

namespace VietTale_Api.Database
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        public DbSet<MajorTimeline> MajorTimelines { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventTag> EventTags { get; set; }
        public DbSet<EventImages> EventsImages { get; set; }
        public DbSet<HistoricalFigure> HistoricalFigures { get; set; }
    }
}
