package com.informatix.shopmanager.service.mapper;

import com.informatix.shopmanager.domain.*;
import com.informatix.shopmanager.service.dto.TransactionTagDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TransactionTag and its DTO TransactionTagDTO.
 */
@Mapper(componentModel = "spring", uses = {TransactionMapper.class})
public interface TransactionTagMapper extends EntityMapper<TransactionTagDTO, TransactionTag> {

    @Mapping(source = "transaction.id", target = "transactionId")
    TransactionTagDTO toDto(TransactionTag transactionTag); 

    @Mapping(source = "transactionId", target = "transaction")
    TransactionTag toEntity(TransactionTagDTO transactionTagDTO);

    default TransactionTag fromId(Long id) {
        if (id == null) {
            return null;
        }
        TransactionTag transactionTag = new TransactionTag();
        transactionTag.setId(id);
        return transactionTag;
    }
}
