using Microsoft.EntityFrameworkCore;
using Stackbot.DataAccess.Entities;
using StackBot.Business.Interfaces;

namespace Stackbot.DataAccess.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly AppDbContext _context;

        public ItemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Item> CreateItem(Item item)
        {
            _context.Items.Add(item);

            await _context.SaveChangesAsync();

            return item;
        }

        public async Task DeleteItemById(Guid itemId)
        {
            var itemForDelete = await _context.Items.FirstOrDefaultAsync(i => i.Id == itemId);

            if (itemForDelete == null)
            {
                throw new ApplicationException("Item not found!");
            }

            _context.Items.Remove(itemForDelete);
           
            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<Item>> GetAllItems()
        {
            return await _context.Items.ToListAsync();
        }

        public async Task<Item> UpdateItemById(Item item)
        {
            var itemForUpdate = await _context.Items.FirstOrDefaultAsync(i => i.Id == item.Id);

            if (itemForUpdate == null)
            {
                throw new ApplicationException("Item not found!");
            }

            _context.Items.Update(item);
            
            await _context.SaveChangesAsync();

            return item;
        }
    }
}
