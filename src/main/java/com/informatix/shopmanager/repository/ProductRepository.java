package com.informatix.shopmanager.repository;

import com.informatix.shopmanager.domain.Product;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.awt.print.Pageable;
import java.util.List;

/**
 * Spring Data JPA repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select product from Product product where product.user.login = ?#{principal.username}")
    List<Product> findByUserIsCurrentUser();

    @Query("select product from Product product where product.user.login = ?#{principal.username}")
    List<Product> findByUserIsCurrentUser(Pageable pageable);

}
