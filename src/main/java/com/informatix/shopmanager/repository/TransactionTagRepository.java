package com.informatix.shopmanager.repository;

import com.informatix.shopmanager.domain.TransactionTag;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TransactionTag entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransactionTagRepository extends JpaRepository<TransactionTag, Long> {

}
