namespace StackBot.Business.Dtos.ItemDtos
{
    public class UpdateItemRequestDto
    {
        public Guid ItemId { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
        public string Description { get; set; }
        public string StorageName { get; set; }
        public DateOnly? ExpirationDate { get; set; }
        public DateOnly? WarrantyDate { get; set; }
    }
}
