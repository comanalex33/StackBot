using Stackbot.DataAccess.Entities;

namespace StackBot.Business.Interfaces
{
    public interface IItemRepository
    {
        Task<Item> CreateItem(Item item);
        Task<Item> UpdateItemById(Item item);
        Task DeleteItemById(Guid itemId);
        Task<ICollection<Item>> GetAllItems();
    }
}
