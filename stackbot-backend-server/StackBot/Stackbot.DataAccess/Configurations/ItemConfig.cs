using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StackBot.Domain.Entities;

namespace Stackbot.DataAccess.Configurations
{
    public class ItemConfig : IEntityTypeConfiguration<Item>
    {
        public void Configure(EntityTypeBuilder<Item> builder)
        {
            builder.HasOne(i => i.Storage)
                .WithMany(s => s.Items)
                .HasForeignKey(i => i.StorageId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
