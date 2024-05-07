using Microsoft.EntityFrameworkCore;
using Stackbot.DataAccess.Entities;
using StackBot.Business.Interfaces;

namespace Stackbot.DataAccess.Repositories
{
    public class StorageRepository : IStorageRepository
    {
        private readonly AppDbContext _context;

        public StorageRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Storage> CreateStorage(Storage storage)
        {
            _context.Storages.Add(storage);

            await _context.SaveChangesAsync();

            return storage;
        }

        public async Task DeleteStorageById(Guid storageId)
        {
            var storageForDelete = await _context.Storages.FirstOrDefaultAsync(s => s.Id == storageId);

            if (storageForDelete == null)
            {
                throw new ApplicationException("Storage not found!");
            }

            _context.Storages.Remove(storageForDelete);

            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<Storage>> GetAllStorages()
        {
            return await _context.Storages.ToListAsync();
        }

        public async Task<Storage> GetStorageByName(string storageName)
        {
            var getStorage = await _context.Storages.FirstOrDefaultAsync(s => s.Name == storageName);

            if (getStorage == null)
            {
                throw new ApplicationException($"{storageName} does not exist");
            }

            return getStorage;
        }

        public async Task<Storage> UpdateStorage(Storage storage)
        {
            var storageForUpdate = await _context.Items.FirstOrDefaultAsync(s => s.Id == storage.Id);

            if (storageForUpdate == null)
            {
                throw new ApplicationException("Storage not found!");
            }

            _context.Storages.Update(storage);

            await _context.SaveChangesAsync();

            return storage;
        }

        public async Task<int> CountStoragesWithTheSameName(string storageName)
        {
            var getStorages = await _context.Storages.Where(s => s.Name == storageName).ToListAsync();
            
            return getStorages.Count;
        }

        public async Task<ICollection<Storage>> GetHousesByUserId(Guid userId)
        {
            var getStorages = await _context.Storages.Where(s => s.UserStorages.Any(u => u.UserId == userId)).ToListAsync();

            return getStorages;
        }

        public async Task<ICollection<Storage>> GetStoragesByParentId(Guid parentId)
        {
            var getStorages = await _context.Storages.Where(s => s.ParentStorage.Id == parentId).ToListAsync();

            return getStorages;
        }
    }
}
