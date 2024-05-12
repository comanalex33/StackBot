namespace StackBot.Business.Dtos.ItemDtos
{
    public class UpdateItemDto
    {
        public string Name { get; set; }
        public int Count { get; set; }
        public string Description { get; set; }
        public DateOnly? ExpirationDate { get; set; }
        public DateOnly? WarrantyDate { get; set; }
    }
}
