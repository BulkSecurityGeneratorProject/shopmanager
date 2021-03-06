package com.informatix.shopmanager.repository;

import com.informatix.shopmanager.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select product from Product product where product.user.login = ?#{principal.username} order by product.modified desc")
    List<Product> findByUserIsCurrentUser();

    @Query("select product from Product product where product.user.login = ?#{principal.username} order by product.modified desc")
    Page<Product> queryFirstBy(Pageable pageable);

}
