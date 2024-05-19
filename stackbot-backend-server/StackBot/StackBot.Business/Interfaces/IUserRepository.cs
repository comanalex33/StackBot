using StackBot.Domain.Entities;

namespace StackBot.Business.Interfaces
{
    public interface IUserRepository
    {
        Task<User> RegisterUser(User user, string password);
        Task<User> LoginUser(string email, string password);
        Task<User> GetUserByEmail(string email);
        Task<User> GetUserById(Guid userId);
        Task<User> UpdateUser(User user);
        Task DeleteUser(Guid userId);
        Task AddUserToStorage(Guid ownerId, Guid houseId, Guid userId);
    }
}
