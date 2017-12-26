package com.informatix.shopmanager.service.mapper;

import com.informatix.shopmanager.domain.*;
import com.informatix.shopmanager.service.dto.TransactionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Transaction and its DTO TransactionDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class, UserMapper.class})
public interface TransactionMapper extends EntityMapper<TransactionDTO, Transaction> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "product.id", target = "productId")
    TransactionDTO toDto(Transaction transaction); 

    @Mapping(source = "productId", target = "product")
    @Mapping(source = "userId", target = "user")
    @Mapping(source = "productId", target = "product")
    Transaction toEntity(TransactionDTO transactionDTO);

    default Transaction fromId(Long id) {
        if (id == null) {
            return null;
        }
        Transaction transaction = new Transaction();
        transaction.setId(id);
        return transaction;
    }
}
