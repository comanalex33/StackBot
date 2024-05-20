using Stackbot.Domain.Entities;
using StackBot.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace StackBot.Domain.Entities
{
    public class Storage
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public StorageType Type { get; set; }
        public string Description { get; set; }

        // Relationship with User - through UserStorage
        public ICollection<UserStorage> UserStorages { get; set; }

        // Relationship with Item
        public ICollection<Item> Items { get; set; }

        // Relationship with itself - parent
        public Guid? ParentStorageId { get; set; }
        public Storage ParentStorage { get; set; }

        // Relationship with itself - children
        public ICollection<Storage> SubStorages { get; set; }
    }
}
