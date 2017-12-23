package com.informatix.shopmanager.repository.search;

import com.informatix.shopmanager.domain.TransactionTag;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TransactionTag entity.
 */
public interface TransactionTagSearchRepository extends ElasticsearchRepository<TransactionTag, Long> {
}
