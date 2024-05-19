using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Stackbot.DataAccess.Exceptions;
using StackBot.Business.Interfaces;
using StackBot.Domain.Entities;

namespace Stackbot.DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UserRepository(AppDbContext context, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<User> RegisterUser(User user, string password)
        {
            var existingIdentity = await _userManager.FindByEmailAsync(user.UserName);
            if (existingIdentity != null)
            {
                throw new UserAlreadyExistsException(user.UserName);
            }

            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                throw new ApplicationException("User creation failed!");
            }
            return user;
        }

        public async Task<User> LoginUser(string email, string password)
        {
            var identityUser = await _userManager.FindByEmailAsync(email);
            if (identityUser == null)
            {
                throw new InvalidCredentialsException();
            }

            var result = await _signInManager.CheckPasswordSignInAsync(identityUser, password, false);

            if (!result.Succeeded)
            {
                throw new InvalidCredentialsException();
            }

            return identityUser;
        }

        public async Task<User> GetUserById(Guid userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId) ?? throw new EntityNotFoundException("User", userId);
        }

        public async Task<User> UpdateUser(User user)
        {
            var userForUpdate = await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);

            if (userForUpdate == null)
            {
                throw new EntityNotFoundException("User", user.Id);
            }

            _context.Users.Update(user);

            await _context.SaveChangesAsync();

            return user;
        }

        public async Task DeleteUser(Guid userId)
        {
            var userToDelete = await _userManager.FindByIdAsync(userId.ToString());

            if (userToDelete == null)
            {
                throw new EntityNotFoundException("User", userId);
            }

            var result = await _userManager.DeleteAsync(userToDelete);

            if (!result.Succeeded)
            {
                throw new ApplicationException("User deletion failed!");
            }
        }
    }
}
