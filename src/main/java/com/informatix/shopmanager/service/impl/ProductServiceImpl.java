package com.informatix.shopmanager.service.impl;

import com.informatix.shopmanager.domain.Transaction;
import com.informatix.shopmanager.domain.enumeration.TransactionType;
import com.informatix.shopmanager.repository.TransactionRepository;
import com.informatix.shopmanager.service.ProductService;
import com.informatix.shopmanager.domain.Product;
import com.informatix.shopmanager.repository.ProductRepository;
import com.informatix.shopmanager.service.dto.ProductDTO;
import com.informatix.shopmanager.service.mapper.ProductMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;


/**
 * Service Implementation for managing Product.
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService{

    private final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    private final TransactionRepository transactionRepository;

    public ProductServiceImpl(ProductRepository productRepository, TransactionRepository transactionRepository, ProductMapper productMapper) {
        this.transactionRepository= transactionRepository;
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    /**
     * Save a product.
     *
     * @param productDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProductDTO save(ProductDTO productDTO) {
        log.debug("Request to save Product : {}", productDTO);
        Product product = productMapper.toEntity(productDTO);
        product = productRepository.save(product);
        return productMapper.toDto(product);
    }

    /**
     * Get all the products.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProductDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Products");
        return productRepository.findAll(pageable)
            .map(productMapper::toDto);
    }

    /**
     * Get all user's products.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProductDTO> findAllByUser(Pageable pageable) {
        log.debug("Request to get all Products");
        return productRepository.findByUserIsCurrentUser(pageable)
            .map(productMapper::toDto);
    }

    /**
     * Get one product by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProductDTO findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        Product product = productRepository.findOne(id);
        return productMapper.toDto(product);
    }

    /**
     * Delete the product by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Product : {}", id);
        productRepository.delete(id);
    }

    @Override
    public synchronized boolean warehouseOperation(Product product, Transaction transaction){
        Assert.notNull(product);
        Assert.notNull(transaction);
        Assert.isTrue(product.equals(transaction.getProduct()), String.format("[WarehouseOperation] product %d and transaction %d mismatch ", product.getId(), transaction.getId()));
        int diff = (TransactionType.INCOME.equals(transaction.getType()))
            ?transaction.getAmount()
            :transaction.getAmount()*-1;
        if (diff > 0){
            product.setAmount(product.getAmount()+diff);
        }
        product.setStays(product.getStays()+diff);
        return true;
    }

    @Override
    public Float getProfit(LocalDate from, Long productId){
        Product product = productRepository.findOne(productId);
        Assert.notNull(product);
        if (from == null) {
            //Compute from the beginning
            return computeProfit(product.getTransactions());
        }

        return computeProfit(transactionRepository.findAfterDone(from, product));
    }

    private Float computeProfit(Collection<Transaction> transactions){
        AtomicReference<Float> result = new AtomicReference<>(0f);
        transactions.forEach((transaction) -> {
            if (TransactionType.INCOME == transaction.getType()) {
                result.updateAndGet(v -> v - transaction.getAmount() * transaction.getSellingPrice());
            }else {
                //TransactionType.DEBIT == transaction.getType()
                result.updateAndGet(v -> v + transaction.getAmount() * transaction.getSellingPrice());
            }
        });
        return result.get();
    }
}
