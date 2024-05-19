using StackBot.Domain.Entities;

namespace StackBot.Business.Interfaces
{
    public interface IStorageRepository
    {
        Task<Storage> CreateStorage(Storage storage, Guid userId);
        Task<Storage> UpdateStorage(Storage storage);
        Task DeleteStorageById(Guid userId, Guid storageId);
        Task<Storage> GetStorageByName(Guid userId, string storageName);
        Task<ICollection<Storage>> GetHousesByUserId(Guid userId);
        Task<ICollection<Storage>> GetRoomsByHouseId(Guid userId, Guid parentId);
        Task<ICollection<Storage>> GetSubStoragesByRoomId(Guid userId, Guid parentId);
    }
}
