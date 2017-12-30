package com.informatix.shopmanager.service.mapper;

import com.informatix.shopmanager.domain.*;
import com.informatix.shopmanager.service.dto.ProductDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Product and its DTO ProductDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {

    @Mapping(source = "user.id", target = "userId")
    ProductDTO toDto(Product product);

    @Mapping(target = "transactions", ignore = true)
    @Mapping(source = "userId", target = "user")
    Product toEntity(ProductDTO productDTO);

    default Product fromId(Long id) {
        if (id == null) {
            return null;
        }
        Product product = new Product();
        product.setId(id);
        return product;
    }
}
