using Microsoft.EntityFrameworkCore;

namespace TestCodeEF.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        //DbSet goes here
        public DbSet<Country> Countries => Set<Country>();
        public DbSet<State> States => Set<State>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Builder Entities goes here

        }
    }
}
