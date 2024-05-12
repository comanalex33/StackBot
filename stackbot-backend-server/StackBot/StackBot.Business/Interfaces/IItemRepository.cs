using StackBot.Domain.Entities;

namespace StackBot.Business.Interfaces
{
    public interface IItemRepository
    {
        Task<Item> CreateItem(Item item);
        Task<Item> UpdateItemById(Item item);
        Task DeleteItemById(Guid itemId);
        Task<ICollection<Item>> GetAllItems();
        Task<Item> GetItemByName(string name);
        Task<ICollection<Item>> GetAllItemsByStorageId(Guid storageId);
        Task<ICollection<Item>> GetAllItemsByName(string itemName);
    }
}
