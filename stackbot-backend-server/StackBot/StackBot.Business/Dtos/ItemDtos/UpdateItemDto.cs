﻿using System.ComponentModel.DataAnnotations;

namespace StackBot.Business.Dtos.ItemDtos
{
    public class UpdateItemDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Item count should be at least 1.")]
        public int Count { get; set; }

        [Required]
        public string Description { get; set; }

        public DateOnly? ExpirationDate { get; set; }
        public DateOnly? WarrantyDate { get; set; }
    }
}
