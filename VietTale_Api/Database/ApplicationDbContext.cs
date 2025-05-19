using Microsoft.EntityFrameworkCore;
using VietTale_Api.Models;

namespace VietTale_Api.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        public DbSet<MajorTimeLine> MajorTimeLines { get; set; }
    }
}
