﻿using StackBot.Domain.Enums;

namespace StackBot.Business.Dtos.StorageDtos
{
    public class CreateStorageDto
    {
        public string Name { get; set; }
        public StorageType Type { get; set; }
        public string Description { get; set; }
        public string? ParentStorageName { get; set; }
    }
}