using Microsoft.AspNetCore.Identity;
using Stackbot.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace StackBot.Domain.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        // Relationship with Storage - through UserStorage
        public ICollection<UserStorage> UserStorages { get; set; }
    }
}
