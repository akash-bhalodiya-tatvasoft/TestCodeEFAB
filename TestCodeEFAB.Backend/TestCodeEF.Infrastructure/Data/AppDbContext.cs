using Microsoft.EntityFrameworkCore;

namespace TestCodeEF.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        //DbSet goes here

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            //Builder Entities goes here

        }
    }
}
