using MediatR;
using StackBot.Business.Dtos.StorageDtos;
using StackBot.Business.Interfaces;
using StackBot.Domain.Entities;

namespace StackBot.Business.Storages.Commands
{
    public record CreateStorage(CreateStorageRequestDto createStorageRequestDto) : IRequest<StorageResponseDto>;

    public class CreateStorageHandler : IRequestHandler<CreateStorage, StorageResponseDto>
    {
        private readonly IStorageRepository _storageRepository;

        public CreateStorageHandler(IStorageRepository storageRepository)
        {
            _storageRepository = storageRepository;
        }

        public async Task<StorageResponseDto> Handle(CreateStorage request, CancellationToken cancellationToken)
        {
            var storageParent = await _storageRepository.GetStorageByName(request.createStorageRequestDto.ParentStorageName);

            var storage = new Storage
            {
                Name = request.createStorageRequestDto.Name,
                Type = request.createStorageRequestDto.Type,
                Description = request.createStorageRequestDto.Description,
                ParentStorageId = storageParent.Id
            };

            await _storageRepository.CreateStorage(storage);

            return StorageResponseDto.FromStorage(storage);
        }
    }
}
