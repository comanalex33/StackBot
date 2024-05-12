﻿using AutoMapper;
using MediatR;
using StackBot.Business.Dtos.StorageDtos;
using StackBot.Business.Interfaces;

namespace StackBot.Business.Storages.Queries
{
    public record GetStoragesByParentId(Guid parentId) : IRequest<ICollection<StorageResponseDto>>;

    public class GetStoragesByParentIdHandler : IRequestHandler<GetStoragesByParentId, ICollection<StorageResponseDto>>
    {
        private readonly IStorageRepository _storageRepository;
        private readonly IMapper _mapper;

        public GetStoragesByParentIdHandler(IStorageRepository storageRepository, IMapper mapper)
        {
            _storageRepository = storageRepository;
            _mapper = mapper;
        }

        public async Task<ICollection<StorageResponseDto>> Handle(GetStoragesByParentId request, CancellationToken cancellationToken)
        {
            var storages = await _storageRepository.GetStoragesByParentId(request.parentId);

            if(storages == null)
            {
                throw new ApplicationException("No storages were found for the given parent storage!");
            }

            return _mapper.Map<ICollection<StorageResponseDto>>(storages);

        }
    }
}
