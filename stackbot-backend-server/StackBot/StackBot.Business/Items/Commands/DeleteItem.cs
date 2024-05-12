using MediatR;
using StackBot.Business.Interfaces;

namespace StackBot.Business.Items.Commands
{
    public record DeleteItem(string name) : IRequest<Unit>;

    public class DeleteItemHandler : IRequestHandler<DeleteItem, Unit>
    {
        private readonly IItemRepository _itemRepository;

        public DeleteItemHandler(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        public async Task<Unit> Handle(DeleteItem request, CancellationToken cancellationToken)
        {
            var itemToRemove = await _itemRepository.GetItemByName(request.name);

            if (itemToRemove == null)
            {
                throw new ApplicationException("Item not found!");
            }

            await _itemRepository.DeleteItemById(itemToRemove.Id);

            return Unit.Value;
        }
    }

}
