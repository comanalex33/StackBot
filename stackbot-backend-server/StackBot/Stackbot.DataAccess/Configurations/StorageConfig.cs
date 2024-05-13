using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StackBot.Domain.Entities;

namespace Stackbot.DataAccess.Configurations
{
    public class StorageConfig : IEntityTypeConfiguration<Storage>
    {
        public void Configure(EntityTypeBuilder<Storage> builder)
        {
            builder.HasOne(s => s.ParentStorage)
                .WithMany(s => s.SubStorages)
                .HasForeignKey(s => s.ParentStorageId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
