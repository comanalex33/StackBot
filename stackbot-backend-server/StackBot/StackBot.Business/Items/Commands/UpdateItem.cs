using MediatR;
using StackBot.Business.Dtos.ItemDtos;
using StackBot.Business.Interfaces;

namespace StackBot.Business.Items.Commands
{
    public record UpdateItem(UpdateItemRequestDto updateItemRequestDto) : IRequest<ItemResponseDto>;

    public class UpdateItemHandler : IRequestHandler<UpdateItem, ItemResponseDto>
    {
        private readonly IItemRepository _itemRepository;

        public UpdateItemHandler(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        public async Task<ItemResponseDto> Handle(UpdateItem request, CancellationToken cancellationToken)
        {
            var itemToUpdate = await _itemRepository.GetItemById(request.updateItemRequestDto.ItemId);

            if (itemToUpdate == null)
            {
                throw new ApplicationException("Item not found!");
            }

            itemToUpdate.Name = request.updateItemRequestDto.Name;
            itemToUpdate.Description = request.updateItemRequestDto.Description;
            itemToUpdate.Count = request.updateItemRequestDto.Count;
            itemToUpdate.ExpirationDate = request.updateItemRequestDto.ExpirationDate;
            itemToUpdate.WarrantyDate = request.updateItemRequestDto.WarrantyDate;
            
            var updatedItem = await _itemRepository.UpdateItemById(itemToUpdate);

            return ItemResponseDto.FromItem(updatedItem);
        }
    }
}
