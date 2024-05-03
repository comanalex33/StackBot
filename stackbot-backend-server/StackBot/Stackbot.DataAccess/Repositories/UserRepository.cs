using Microsoft.EntityFrameworkCore;
using Stackbot.DataAccess.Entities;
using StackBot.Business.Interfaces;

namespace Stackbot.DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> CreateUser(User user)
        {
            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return user;
        }

        public async Task DeleteUser(Guid userId)
        {
            var userForDelete = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (userForDelete == null)
            {
                throw new ApplicationException("User not found!");
            }

            _context.Users.Remove(userForDelete);

            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> UpdateUser(User user)
        {
            var userForUpdate = await _context.Items.FirstOrDefaultAsync(u => u.Id == user.Id);

            if (userForUpdate == null)
            {
                throw new ApplicationException("User not found!");
            }

            _context.Users.Update(user);

            await _context.SaveChangesAsync();

            return user;
        }
    }
}
