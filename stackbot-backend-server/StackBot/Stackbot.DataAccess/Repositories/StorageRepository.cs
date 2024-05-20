using Microsoft.EntityFrameworkCore;
using Stackbot.DataAccess.Exceptions;
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
            var userStorages = await _context.UserStorage.Where(us => us.UserId == userId).ToListAsync();

            foreach (var existingUserStorage in userStorages)
            {
                var getStorage = await _context.Storages
                                               .FirstOrDefaultAsync(s => s.Id == existingUserStorage.StorageId);

                if (getStorage != null && getStorage.Name == storage.Name)
                {
                    throw new EntityAlreadyExistsException(nameof(Storage), storage.Name);
                }
            }

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

        public async Task DeleteStorageById(Guid userId, Guid storageId)
        {
            var storageForDelete = await _context.Storages.FirstOrDefaultAsync(s => s.Id == storageId);

            if (storageForDelete == null)
            {
                throw new EntityNotFoundException(nameof(Storage), storageId);
            }

            var userStorages = await _context.UserStorage
                                             .Where(us => us.UserId == userId && us.StorageId == storageId)
                                             .ToListAsync();

            _context.UserStorage.RemoveRange(userStorages);
            _context.Storages.Remove(storageForDelete);

            await _context.SaveChangesAsync();
        }

        public async Task<Storage> GetStorageByName(Guid userId, string storageName)
        {
            var userStorages = await _context.UserStorage.Where(us => us.UserId == userId).ToListAsync();

            foreach(var userStorage in userStorages)
            {
                var getStorage = await _context.Storages.FirstOrDefaultAsync(s => s.Id == userStorage.StorageId);

                if(getStorage.Name == storageName)
                {
                    return getStorage;
                }
            }
           
            return null;
        }

        public async Task<Storage> UpdateStorage(Storage storage)
        {

            var storageForUpdate = await _context.Storages.FirstOrDefaultAsync(s => s.Id == storage.Id);

            if (storageForUpdate == null)
            {
                throw new EntityNotFoundException(nameof(Storage), storage.Name);
            }

            _context.Storages.Update(storage);

            await _context.SaveChangesAsync();

            return storage;
        }

        public async Task<ICollection<Storage>> GetHousesByUserId(Guid userId)
        {
            var getStorages = await _context.Storages.Where(s => s.UserStorages.Any(u => u.UserId == userId) && s.Type == StorageType.House).ToListAsync();

            return getStorages;
        }

        public async Task<ICollection<Storage>> GetRoomsByHouseId(Guid userId, Guid parentId)
        {
            var userStorages = await _context.UserStorage.Where(us => us.UserId == userId).ToListAsync();

            var storages = new List<Storage>();

            foreach(var userStorage in userStorages)
            {
                var getStorage = await _context.Storages.FirstOrDefaultAsync(s => s.Id == userStorage.StorageId);

                storages.Add(getStorage);
            }

            return storages.Where(s => s.ParentStorageId == parentId && s.Type == StorageType.Room).ToList();
        }

        public async Task<ICollection<Storage>> GetSubStoragesByRoomId(Guid userId, Guid parentId)
        {
            var userStorages = await _context.UserStorage.Where(us => us.UserId == userId).ToListAsync();

            var storages = new List<Storage>();

            foreach (var userStorage in userStorages)
            {
                var getStorage = await _context.Storages.FirstOrDefaultAsync(s => s.Id == userStorage.StorageId);

                storages.Add(getStorage);
            }

            return storages.Where(s => s.ParentStorageId == parentId && (s.Type == StorageType.Deposit || s.Type == StorageType.Fridge)).ToList();
        }
    }
}
