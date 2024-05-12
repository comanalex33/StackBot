using AutoMapper;
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
        private readonly IMapper _mapper;

        public GetItemsByStorageNameHandler(IItemRepository itemRepository, IStorageRepository storageRepostiory, IMapper mapper)
        {
            _itemRepository = itemRepository;
            _storageRepostiory = storageRepostiory;
            _mapper = mapper;
        }

        public async Task<ICollection<ItemResponseDto>> Handle(GetItemsByStorageName request, CancellationToken cancellationToken)
        {
            var getStorage = await _storageRepostiory.GetStorageByName(request.storageName);

            if (getStorage == null)
            {
                throw new ApplicationException("Storage not found!");
            }

            var items = await _itemRepository.GetAllItemsByStorageId(getStorage.Id);

            return _mapper.Map<ICollection<ItemResponseDto>>(items);
        }
    }
}
