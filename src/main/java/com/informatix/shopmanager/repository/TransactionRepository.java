package com.informatix.shopmanager.repository;

import com.informatix.shopmanager.domain.Product;
import com.informatix.shopmanager.domain.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.LocalDate;
import java.util.List;

/**
 * Spring Data JPA repository for the Transaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("select transaction from Transaction transaction where transaction.user.login = ?#{principal.username}")
    List<Transaction> findByUserIsCurrentUser();

    @Query("select transaction from Transaction transaction where transaction.user.login = ?#{principal.username}")
    Page<Transaction> findByUserIsCurrentUser(Pageable pageable);

    @Query("select transaction from Transaction transaction " +
        "where transaction.done > :fromDate " +
          "and transaction.product = :product " +
          "and transaction.user.login = ?#{principal.username}")
    List<Transaction> findAfterDone(@Param("fromDate") LocalDate from, @Param("product") Product product);
}
