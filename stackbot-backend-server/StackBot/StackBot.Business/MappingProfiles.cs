using AutoMapper;
using StackBot.Business.Dtos.ItemDtos;
using StackBot.Business.Dtos.StorageDtos;
using StackBot.Business.Dtos.UserDtos;
using StackBot.Domain.Entities;

namespace StackBot.Business
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<User, UserResponseDto>();
            CreateMap<Storage, StorageResponseDto>();
            CreateMap<Item, ItemResponseDto>();
        }
    }
}
