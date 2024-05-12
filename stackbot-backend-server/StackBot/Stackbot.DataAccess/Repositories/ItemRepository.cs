﻿using Microsoft.EntityFrameworkCore;
using StackBot.Business.Interfaces;
using StackBot.Domain.Entities;

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

        public async Task<ICollection<Item>> GetAllItemsByName(string itemName)
        {
            return await _context.Items.Where(i => i.Name.Contains(itemName)).ToListAsync();
        }

        public async Task<ICollection<Item>> GetAllItemsByStorageId(Guid storageId)
        {
            return await _context.Items.Where(i => i.StorageId == storageId).ToListAsync();
        }

        public async Task<Item> GetItemByName(string name)
        {
            var getItem = await _context.Items.FirstOrDefaultAsync(i => i.Name == name);

            if (getItem == null)
            {
                throw new ApplicationException($"{name} does not exist");
            }

            return getItem;
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
