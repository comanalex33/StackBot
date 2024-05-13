using StackBot.Domain.Entities;

namespace StackBot.Business.Interfaces
{
    public interface IUserRepository
    {
        Task<User> RegisterUser(User user, string password);
        Task<User> LoginUser(string email, string password);
        Task<User> GetUserById(Guid userId);
        //Task<ICollection<User>> GetAllUsers();
        Task<User> UpdateUser(User user);
        Task DeleteUser(Guid userId);
    }
}
