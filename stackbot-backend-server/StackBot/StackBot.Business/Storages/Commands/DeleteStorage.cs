using MediatR;
using Stackbot.DataAccess.Exceptions;
using StackBot.Business.Interfaces;

namespace StackBot.Business.Storages.Commands
{
    public record DeleteStorage(Guid userId, string storageName, Guid? parentStorageId) : IRequest<Unit>;

    public class DeleteStorageHandler : IRequestHandler<DeleteStorage, Unit>
    {
        private readonly IStorageRepository _storageRepository;

        public DeleteStorageHandler(IStorageRepository storageRepository)
        {
            _storageRepository = storageRepository;
        }

        public async Task<Unit> Handle(DeleteStorage request, CancellationToken cancellationToken)
        {
            var storageToRemove = await _storageRepository.GetStorageByName(request.userId, request.storageName);

            if (storageToRemove == null)
            {
                throw new StorageNotFoundException(request.storageName);
            }

            await _storageRepository.DeleteStorageById(request.userId,storageToRemove.Id);

            return Unit.Value;
        }
    }
}
