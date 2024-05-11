using MediatR;
using StackBot.Business.Dtos.ItemDtos;
using StackBot.Business.Interfaces;
using StackBot.Domain.Entities;

namespace StackBot.Business.Items.Commands
{
    public record CreateItem(CreateItemRequestDto createItemRequestDto) : IRequest<ItemResponseDto>;

    public class CreateItemHandler : IRequestHandler<CreateItem, ItemResponseDto>
    {
        private readonly IItemRepository _itemRepository;
        private readonly IStorageRepository _storageRepostiory;

        public CreateItemHandler(IItemRepository itemRepository, IStorageRepository storageRepostiory)
        {
            _itemRepository = itemRepository;
            _storageRepostiory = storageRepostiory;
        }
        public async Task<ItemResponseDto> Handle(CreateItem request, CancellationToken cancellationToken)
        {
            var getStorage = await _storageRepostiory.GetStorageByName(request.createItemRequestDto.StorageName);

            var item = new Item()
            {
                Name = request.createItemRequestDto.Name,
                Count = request.createItemRequestDto.Count,
                Description = request.createItemRequestDto.Description,
                ExpirationDate = request.createItemRequestDto.ExpirationDate,
                WarrantyDate = request.createItemRequestDto.WarrantyDate,
                StorageId = getStorage.Id,
                Storage = getStorage
            };

            var createdItem = await _itemRepository.CreateItem(item);

            return ItemResponseDto.FromItem(createdItem);
        }
    }
}
