package com.informatix.shopmanager.service.impl;

import com.informatix.shopmanager.domain.enumeration.TransactionType;
import com.informatix.shopmanager.service.ProductService;
import com.informatix.shopmanager.service.TransactionService;
import com.informatix.shopmanager.domain.Transaction;
import com.informatix.shopmanager.repository.TransactionRepository;
import com.informatix.shopmanager.service.dto.TransactionDTO;
import com.informatix.shopmanager.service.mapper.TransactionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;


/**
 * Service Implementation for managing Transaction.
 */
@Service
@Transactional
public class TransactionServiceImpl implements TransactionService{

    private final Logger log = LoggerFactory.getLogger(TransactionServiceImpl.class);

    private final ProductService productService;

    private final TransactionRepository transactionRepository;

    private final TransactionMapper transactionMapper;

    public TransactionServiceImpl(ProductService productService, TransactionRepository transactionRepository, TransactionMapper transactionMapper) {
        this.productService =  productService;
        this.transactionRepository = transactionRepository;
        this.transactionMapper = transactionMapper;
    }

    /**
     * Save a transaction.
     *
     * @param transactionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TransactionDTO save(TransactionDTO transactionDTO) {
        log.debug("Request to save Transaction : {}", transactionDTO);
        Transaction transaction = transactionMapper.toEntity(transactionDTO);
        //Revert transaction if it is an update operation
        if(transaction.getId() != null)
            revertTransaction(transactionRepository.findOne(transaction.getId()));
        transaction = transactionRepository.save(transaction);
        //Apply current transaction on product warehouse
        productService.warehouseOperation(transaction.getProduct(), transaction);
        return transactionMapper.toDto(transaction);
    }

    private synchronized void revertTransaction(Transaction transaction) {
        Assert.notNull(transaction, "[RevertTransaction] Transaction must be not null");
        Assert.notNull(transaction, String.format("[RevertTransaction] Product's transaction must be not null\n %s",transaction));
        if (TransactionType.INCOME == transaction.getType()){
            transaction.setType(TransactionType.DEBIT);
        }else {
            transaction.setType(TransactionType.INCOME);
        }
        productService.warehouseOperation(transaction.getProduct(), transaction);
    }

    /**
     * Get all the transactions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TransactionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Transactions");
        return transactionRepository.findAll(pageable)
            .map(transactionMapper::toDto);
    }

    /**
     * Get all the user's transactions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TransactionDTO> findAllByUser(Pageable pageable) {
        log.debug("Request to get all Transactions");
        return transactionRepository.findByUserIsCurrentUser(pageable)
            .map(transactionMapper::toDto);
    }

    /**
     * Get one transaction by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TransactionDTO findOne(Long id) {
        log.debug("Request to get Transaction : {}", id);
        Transaction transaction = transactionRepository.findOne(id);
        return transactionMapper.toDto(transaction);
    }

    /**
     * Delete the transaction by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Transaction : {}", id);
        transactionRepository.delete(id);
    }
}
