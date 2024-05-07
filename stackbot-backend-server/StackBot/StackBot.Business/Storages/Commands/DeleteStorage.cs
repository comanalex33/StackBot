using MediatR;
using Stackbot.DataAccess.Repositories;
using StackBot.Business.Dtos.StorageDtos;
using StackBot.Business.Interfaces;

namespace StackBot.Business.Storages.Commands
{
    public record DeleteStorage(string storageName, Guid? parentStorageId) : IRequest<Unit>;

    public class DeleteStorageHandler : IRequestHandler<DeleteStorage, Unit>
    {
        private readonly IStorageRepository _storageRepository;

        public DeleteStorageHandler(IStorageRepository storageRepository)
        {
            _storageRepository = storageRepository;
        }

        public async Task<Unit> Handle(DeleteStorage request, CancellationToken cancellationToken)
        {
            if (request.parentStorageId == null)
            {
                var storagesCount = await _storageRepository.CountStoragesWithTheSameName(request.storageName);

                if(storagesCount > 1)
                {
                    throw new ApplicationException("Exception Error 409: CONFLICT!");
                }
            }

            var storageToRemove = await _storageRepository.GetStorageByName(request.storageName);

            if (storageToRemove == null)
            {
                throw new ApplicationException("Storage not found!");
            }

            await _storageRepository.DeleteStorageById(storageToRemove.Id);

            return Unit.Value;
        }
    }
}
