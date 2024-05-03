using Stackbot.DataAccess.Entities;

namespace StackBot.Business.Interfaces
{
    public interface IStorageRepository
    {
        Task<Storage> CreateStorage(Storage storage);
        Task<Storage> UpdateStorage(Storage storage);
        Task DeleteStorageById(Guid storageId);
        Task<ICollection<Storage>> GetAllStorages();
    }
}
