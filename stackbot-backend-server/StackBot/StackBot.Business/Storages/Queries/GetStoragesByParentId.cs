using MediatR;
using StackBot.Business.Dtos.StorageDtos;
using StackBot.Business.Interfaces;

namespace StackBot.Business.Storages.Queries
{
    public record GetStoragesByParentId(Guid parentId) : IRequest<ICollection<StorageResponseDto>>;

    public class GetStoragesByParentIdHandler : IRequestHandler<GetStoragesByParentId, ICollection<StorageResponseDto>>
    {
        private readonly IStorageRepository _storageRepository;

        public GetStoragesByParentIdHandler(IStorageRepository storageRepository)
        {
            _storageRepository = storageRepository;
        }

        public async Task<ICollection<StorageResponseDto>> Handle(GetStoragesByParentId request, CancellationToken cancellationToken)
        {
            var storages = await _storageRepository.GetStoragesByParentId(request.parentId);

            if(storages == null)
            {
                throw new ApplicationException("No storages were found for the given parent storage!");
            }

            var storageDtos = new List<StorageResponseDto>();

            foreach (var storage in storages)
            {
                storageDtos.Add(StorageResponseDto.FromStorage(storage));
            }

            return storageDtos;

        }
    }
}
