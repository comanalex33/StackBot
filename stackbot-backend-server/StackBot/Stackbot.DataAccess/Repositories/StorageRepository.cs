using Microsoft.EntityFrameworkCore;
using Stackbot.Domain.Entities;
using StackBot.Business.Interfaces;
using StackBot.Domain.Entities;
using StackBot.Domain.Enums;

namespace Stackbot.DataAccess.Repositories
{
    public class StorageRepository : IStorageRepository
    {
        private readonly AppDbContext _context;

        public StorageRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Storage> CreateStorage(Storage storage, Guid userId)
        {
            _context.Storages.Add(storage);

            var userStorage = new UserStorage
            {
                StorageId = storage.Id,
                UserId = userId
            };

            _context.UserStorage.Add(userStorage);

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

            return getStorage;
        }

        public async Task<Storage> UpdateStorage(Storage storage)
        {
            var storageForUpdate = await _context.Storages.FirstOrDefaultAsync(s => s.Id == storage.Id);

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
            var getStorages = await _context.Storages.Where(s => s.UserStorages.Any(u => u.UserId == userId) && s.Type == StorageType.House).ToListAsync();

            return getStorages;
        }

        public async Task<ICollection<Storage>> GetRoomsByHouseId(Guid parentId)
        {
            var getStorages = await _context.Storages.Where(s => s.ParentStorage.Id == parentId && s.Type == StorageType.Room).ToListAsync();

            return getStorages;
        }

        public async Task<ICollection<Storage>> GetSubStoragesByRoomId(Guid parentId)
        {
            var getStorages = await _context.Storages.Where(s => s.ParentStorage.Id == parentId && (s.Type == StorageType.Deposit || s.Type == StorageType.Fridge)).ToListAsync();

            return getStorages;
        }

    }
}
