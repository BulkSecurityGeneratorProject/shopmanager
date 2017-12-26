package com.informatix.shopmanager.service.impl;

import com.informatix.shopmanager.domain.Product;
import com.informatix.shopmanager.domain.Warehouse;
import com.informatix.shopmanager.domain.enumeration.TransactionType;
import com.informatix.shopmanager.repository.WarehouseRepository;
import com.informatix.shopmanager.service.TransactionService;
import com.informatix.shopmanager.domain.Transaction;
import com.informatix.shopmanager.repository.TransactionRepository;
import com.informatix.shopmanager.service.dto.TransactionDTO;
import com.informatix.shopmanager.service.mapper.TransactionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sun.util.resources.LocaleData;

import java.time.LocalDate;
import java.util.Date;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing Transaction.
 */
@Service
@Transactional
public class TransactionServiceImpl implements TransactionService{

    private final Logger log = LoggerFactory.getLogger(TransactionServiceImpl.class);

    private final TransactionRepository transactionRepository;

    private final WarehouseRepository warehouseRepository;

    private final TransactionMapper transactionMapper;

    public TransactionServiceImpl(TransactionRepository transactionRepository, WarehouseRepository warehouseRepository, TransactionMapper transactionMapper) {
        this.transactionRepository = transactionRepository;
        this.transactionMapper = transactionMapper;
        this.warehouseRepository = warehouseRepository;
    }

    /**
     * Save a transaction.
     *
     * @param transactionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TransactionDTO saveForAdmin(TransactionDTO transactionDTO) {
        log.debug("Request to save Transaction : {}", transactionDTO);
        Transaction transaction = transactionMapper.toEntity(transactionDTO);
        if (transaction.getDone() == null || LocalDate.MIN.isEqual(transaction.getDone())){
            transaction.setDone(LocalDate.now());
        }
        transaction = transactionRepository.save(transaction);
        return transactionMapper.toDto(transaction);
    }


    /**
     * Save a transaction after some controls.
     *
     * @param transactionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TransactionDTO save(TransactionDTO transactionDTO) {
        log.debug("Request to save Transaction : {}", transactionDTO);
        Transaction transaction = transactionMapper.toEntity(transactionDTO);
        if (transaction.getDone() == null || LocalDate.MIN.isEqual(transaction.getDone())){
            transaction.setDone(LocalDate.now());
        }
        transaction = transactionRepository.save(transaction);
        //Add an entry on Warehouse table only when transaction type is INCOME
        switch (transaction.getType()){
            case INCOME:
                Warehouse warehouse = new Warehouse();
                warehouse.setId(null);
                warehouse.setAmount(transaction.getAmount());
                warehouse.setStays(transaction.getAmount());
                warehouse.setProduct(transaction.getProduct());
                warehouse.setModified(LocalDate.now());
                warehouseRepository.save(warehouse);
                log.debug("Request to save Warehouse : {}", warehouse);
                break;

            case DEBIT:
                Product product = transaction.getProduct();
                if( transaction.getAmount() > product.getStays()){
                    log.error("Try to record transaction with {} unit and don't have enough in warehouse {}"
                        , transaction.getAmount()
                        ,product.getStays());
                }else {
                    //TODO check the difference between selling and buying prices
                }
                break;

        }
        return transactionMapper.toDto(transaction);
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
     * Get all the transactions for authenticated user.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TransactionDTO> findAllByUser(Pageable pageable) {
        log.debug("Request to get all Transactions for authenticated user");
        return new  PageImpl<> (transactionRepository.findByUserIsCurrentUser().
            stream()
            .skip(pageable.getOffset())
            .limit(pageable.getPageSize())
            .map(transactionMapper::toDto).collect(Collectors.toList()));
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
