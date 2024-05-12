using AutoMapper;
using MediatR;
using StackBot.Business.Dtos.StorageDtos;
using StackBot.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StackBot.Business.Storages.Queries
{
    public record GetSubStoragesByRoomId(Guid parentId) : IRequest<ICollection<StorageResponseDto>>;

    public class GetSubStoragesByRoomIdhandler : IRequestHandler<GetSubStoragesByRoomId, ICollection<StorageResponseDto>>
    {
        private readonly IStorageRepository _storageRepository;
        private readonly IMapper _mapper;

        public GetSubStoragesByRoomIdhandler(IStorageRepository storageRepository, IMapper mapper)
        {
            _storageRepository = storageRepository;
            _mapper = mapper;
        }

        public async Task<ICollection<StorageResponseDto>> Handle(GetSubStoragesByRoomId request, CancellationToken cancellationToken)
        {
            var storages = await _storageRepository.GetSubStoragesByRoomId(request.parentId);

            if (storages == null)
            {
                throw new ApplicationException("No storages were found for the given parent storage!");
            }

            return _mapper.Map<ICollection<StorageResponseDto>>(storages);

        }
    }
}
