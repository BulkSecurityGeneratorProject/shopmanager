package com.informatix.shopmanager.service.mapper;

import com.informatix.shopmanager.domain.*;
import com.informatix.shopmanager.service.dto.WarehouseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Warehouse and its DTO WarehouseDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface WarehouseMapper extends EntityMapper<WarehouseDTO, Warehouse> {

    @Mapping(source = "product.id", target = "productId")
    WarehouseDTO toDto(Warehouse warehouse); 

    @Mapping(source = "productId", target = "product")
    Warehouse toEntity(WarehouseDTO warehouseDTO);

    default Warehouse fromId(Long id) {
        if (id == null) {
            return null;
        }
        Warehouse warehouse = new Warehouse();
        warehouse.setId(id);
        return warehouse;
    }
}
