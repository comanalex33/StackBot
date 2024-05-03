using Stackbot.DataAccess.Entities;

namespace StackBot.Business.Dtos.ItemDtos
{
    public class ItemResponseDto
    {
        public Guid ItemId { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
        public string Description { get; set; }
        public DateOnly? ExpirationDate { get; set; }
        public DateOnly? WarrantyDate { get; set; }

        public static ItemResponseDto FromItem(Item item)
        {
            return new ItemResponseDto
            {
                ItemId = item.Id,
                Name = item.Name,
                Count = item.Count,
                Description = item.Description,
                ExpirationDate = item.ExpirationDate,
                WarrantyDate = item.WarrantyDate
            };
        }
    }
}
