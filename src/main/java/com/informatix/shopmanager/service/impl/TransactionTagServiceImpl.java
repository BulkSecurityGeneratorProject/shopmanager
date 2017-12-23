package com.informatix.shopmanager.service.impl;

import com.informatix.shopmanager.service.TransactionTagService;
import com.informatix.shopmanager.domain.TransactionTag;
import com.informatix.shopmanager.repository.TransactionTagRepository;
import com.informatix.shopmanager.repository.search.TransactionTagSearchRepository;
import com.informatix.shopmanager.service.dto.TransactionTagDTO;
import com.informatix.shopmanager.service.mapper.TransactionTagMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing TransactionTag.
 */
@Service
@Transactional
public class TransactionTagServiceImpl implements TransactionTagService{

    private final Logger log = LoggerFactory.getLogger(TransactionTagServiceImpl.class);

    private final TransactionTagRepository transactionTagRepository;

    private final TransactionTagMapper transactionTagMapper;

    private final TransactionTagSearchRepository transactionTagSearchRepository;

    public TransactionTagServiceImpl(TransactionTagRepository transactionTagRepository, TransactionTagMapper transactionTagMapper, TransactionTagSearchRepository transactionTagSearchRepository) {
        this.transactionTagRepository = transactionTagRepository;
        this.transactionTagMapper = transactionTagMapper;
        this.transactionTagSearchRepository = transactionTagSearchRepository;
    }

    /**
     * Save a transactionTag.
     *
     * @param transactionTagDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TransactionTagDTO save(TransactionTagDTO transactionTagDTO) {
        log.debug("Request to save TransactionTag : {}", transactionTagDTO);
        TransactionTag transactionTag = transactionTagMapper.toEntity(transactionTagDTO);
        transactionTag = transactionTagRepository.save(transactionTag);
        TransactionTagDTO result = transactionTagMapper.toDto(transactionTag);
        transactionTagSearchRepository.save(transactionTag);
        return result;
    }

    /**
     * Get all the transactionTags.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TransactionTagDTO> findAll() {
        log.debug("Request to get all TransactionTags");
        return transactionTagRepository.findAll().stream()
            .map(transactionTagMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one transactionTag by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TransactionTagDTO findOne(Long id) {
        log.debug("Request to get TransactionTag : {}", id);
        TransactionTag transactionTag = transactionTagRepository.findOne(id);
        return transactionTagMapper.toDto(transactionTag);
    }

    /**
     * Delete the transactionTag by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TransactionTag : {}", id);
        transactionTagRepository.delete(id);
        transactionTagSearchRepository.delete(id);
    }

    /**
     * Search for the transactionTag corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TransactionTagDTO> search(String query) {
        log.debug("Request to search TransactionTags for query {}", query);
        return StreamSupport
            .stream(transactionTagSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(transactionTagMapper::toDto)
            .collect(Collectors.toList());
    }
}
