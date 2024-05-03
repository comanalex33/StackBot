using MediatR;
using StackBot.Business.Dtos.ItemDtos;
using StackBot.Business.Interfaces;

namespace StackBot.Business.Items.Queries
{
    public record GetItemsByStorageName(string storageName) : IRequest<ICollection<ItemResponseDto>>;

    public class GetItemsByStorageNameHandler : IRequestHandler<GetItemsByStorageName, ICollection<ItemResponseDto>>
    {
        private readonly IItemRepository _itemRepository;
        private readonly IStorageRepository _storageRepostiory;

        public GetItemsByStorageNameHandler(IItemRepository itemRepository, IStorageRepository storageRepostiory)
        {
            _itemRepository = itemRepository;
            _storageRepostiory = storageRepostiory;
        }

        public async Task<ICollection<ItemResponseDto>> Handle(GetItemsByStorageName request, CancellationToken cancellationToken)
        {
            var getStorage = await _storageRepostiory.GetStorageByName(request.storageName);

            if (getStorage == null)
            {
                throw new ApplicationException("Storage not found!");
            }

            var items = await _itemRepository.GetAllItemsByStorageId(getStorage.Id);

            var itemDtos = new List<ItemResponseDto>();

            foreach( var item in items)
            {
                itemDtos.Add(ItemResponseDto.FromItem(item));
            }

            return itemDtos;
        }
    }
}
