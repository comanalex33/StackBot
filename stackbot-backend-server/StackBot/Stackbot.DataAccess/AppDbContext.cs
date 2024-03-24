using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Stackbot.DataAccess.Configurations;
using Stackbot.DataAccess.Entities;

namespace Stackbot.DataAccess
{
    public class AppDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public DbSet<User> Users {  get; set; }
        public DbSet<Storage> Storages { get; set; }
        public DbSet<Item> Items { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new UserConfig());
            builder.ApplyConfiguration(new StorageConfig());
            builder.ApplyConfiguration(new UserStorageConfig());
            builder.ApplyConfiguration(new ItemConfig());
        }
    }
}
