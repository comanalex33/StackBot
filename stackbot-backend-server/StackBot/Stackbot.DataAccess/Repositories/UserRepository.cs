using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Stackbot.DataAccess.Entities;
using Stackbot.DataAccess.Exceptions;
using StackBot.Business.Interfaces;

namespace Stackbot.DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;

        public UserRepository(AppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<User> CreateUser(User user, string password)
        {
            var existingIdentity = await _userManager.FindByEmailAsync(user.UserName);
            if (existingIdentity != null)
            {
                throw new UserAlreadyExistsException(user.UserName);
            }

            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                throw new Exception("User creation failed: " + result.Errors.FirstOrDefault()?.Description);
            }
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
