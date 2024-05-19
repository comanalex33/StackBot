using System.ComponentModel.DataAnnotations;

namespace StackBot.Business.Dtos.StorageDtos
{
    public class UpdateStorageDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
