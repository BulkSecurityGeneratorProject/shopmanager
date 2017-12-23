package com.informatix.shopmanager.service;

import com.informatix.shopmanager.service.dto.TransactionTagDTO;
import java.util.List;

/**
 * Service Interface for managing TransactionTag.
 */
public interface TransactionTagService {

    /**
     * Save a transactionTag.
     *
     * @param transactionTagDTO the entity to save
     * @return the persisted entity
     */
    TransactionTagDTO save(TransactionTagDTO transactionTagDTO);

    /**
     * Get all the transactionTags.
     *
     * @return the list of entities
     */
    List<TransactionTagDTO> findAll();

    /**
     * Get the "id" transactionTag.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TransactionTagDTO findOne(Long id);

    /**
     * Delete the "id" transactionTag.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the transactionTag corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TransactionTagDTO> search(String query);
}
