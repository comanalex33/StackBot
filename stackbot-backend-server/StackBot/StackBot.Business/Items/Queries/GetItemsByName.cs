using AutoMapper;
using MediatR;
using StackBot.Business.Dtos.ItemDtos;
using StackBot.Business.Interfaces;

namespace StackBot.Business.Items.Queries
{
    public record GetItemsByName(string itemName) : IRequest<ICollection<ItemResponseDto>>;

    public class GetItemsByNameHandler : IRequestHandler<GetItemsByName, ICollection<ItemResponseDto>>
    {
        private readonly IItemRepository _itemRepository;
        private readonly IMapper _mapper;

        public GetItemsByNameHandler(IItemRepository itemRepository, IMapper mapper)
        {
            _itemRepository = itemRepository;
            _mapper = mapper;
        }

        public async Task<ICollection<ItemResponseDto>> Handle(GetItemsByName request, CancellationToken cancellationToken)
        {
            var items = await _itemRepository.GetAllItemsByName(request.itemName);

            return _mapper.Map<ICollection<ItemResponseDto>>(items);
        }
    }
}
