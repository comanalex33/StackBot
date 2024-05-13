using StackBot.Domain.Enums;

namespace StackBot.Business.Dtos.StorageDtos
{
    public class StorageResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public StorageType Type { get; set; }
        public string Description { get; set; }
        public Guid? ParentStorageId { get; set; }
    }
}
