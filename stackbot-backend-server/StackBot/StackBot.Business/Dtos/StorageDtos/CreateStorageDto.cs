using StackBot.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace StackBot.Business.Dtos.StorageDtos
{
    public class CreateStorageDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public StorageType Type { get; set; }

        [Required]
        public string Description { get; set; }

        public string? ParentStorageName { get; set; }
    }
}
