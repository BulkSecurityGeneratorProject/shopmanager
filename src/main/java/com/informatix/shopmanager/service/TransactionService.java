package com.informatix.shopmanager.service;

import com.informatix.shopmanager.service.dto.TransactionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Interface for managing Transaction.
 */
public interface TransactionService {

    TransactionDTO saveForAdmin(TransactionDTO transactionDTO);

    /**
     * Save a transaction.
     *
     * @param transactionDTO the entity to save
     * @return the persisted entity
     */
    TransactionDTO save(TransactionDTO transactionDTO);

    /**
     * Get all the transactions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TransactionDTO> findAll(Pageable pageable);

    @Transactional(readOnly = true)
    Page<TransactionDTO> findAllByUser(Pageable pageable);

    /**
     * Get the "id" transaction.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TransactionDTO findOne(Long id);

    /**
     * Delete the "id" transaction.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
