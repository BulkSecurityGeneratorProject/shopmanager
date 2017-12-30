package com.informatix.shopmanager.service;

import com.informatix.shopmanager.domain.Product;
import com.informatix.shopmanager.domain.Transaction;
import com.informatix.shopmanager.service.dto.ProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

/**
 * Service Interface for managing Product.
 */
public interface ProductService {

    /**
     * Save a product.
     *
     * @param productDTO the entity to save
     * @return the persisted entity
     */
    ProductDTO save(ProductDTO productDTO);

    /**
     * Get all the products.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ProductDTO> findAll(Pageable pageable);

    @Transactional(readOnly = true)
    Page<ProductDTO> findAllByUser(Pageable pageable);

    /**
     * Get the "id" product.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ProductDTO findOne(Long id);

    /**
     * Delete the "id" product.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Apply transaction on product
     *
     * @param transaction current transaction to apply on product
     * @param product the product concerned by transaction
     */
    boolean warehouseOperation(Product product, Transaction transaction);

    /**
     * Apply transaction on product
     *
     * @param from current transaction to apply on product
     * @param productId the product concerned by transaction
     */
    Float getProfit(LocalDate from, Long productId);
}
