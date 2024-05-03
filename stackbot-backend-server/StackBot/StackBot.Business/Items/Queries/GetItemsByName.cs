using MediatR;
using StackBot.Business.Dtos.ItemDtos;
using StackBot.Business.Interfaces;

namespace StackBot.Business.Items.Queries
{
    public record GetItemsByName(string itemName) : IRequest<ICollection<ItemResponseDto>>;

    public class GetItemsByNameHandler : IRequestHandler<GetItemsByName, ICollection<ItemResponseDto>>
    {
        private readonly IItemRepository _itemRepository;

        public GetItemsByNameHandler(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        public async Task<ICollection<ItemResponseDto>> Handle(GetItemsByName request, CancellationToken cancellationToken)
        {
            var items = await _itemRepository.GetAllItemsByName(request.itemName);

            var itemDtos = new List<ItemResponseDto>();

            foreach (var item in items)
            {
                itemDtos.Add(ItemResponseDto.FromItem(item));
            }

            return itemDtos;
        }
    }
}
