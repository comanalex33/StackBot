using Stackbot.DataAccess.Entities;

namespace StackBot.Business.Interfaces
{
    public interface IUserRepository
    {
        Task<User> CreateUser(User user);
        Task<User> UpdateUser(User user);
        Task DeleteUser(Guid userId);
        Task<ICollection<User>> GetAllUsers();
    }
}
