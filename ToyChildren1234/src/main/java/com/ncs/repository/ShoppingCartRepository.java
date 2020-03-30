package com.ncs.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ncs.entity.ShoppingCartDetailEntity;;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCartDetailEntity, Integer>,JpaSpecificationExecutor<ShoppingCartDetailEntity> {
	@Query(value = "SELECT * FROM shopping_cart_detail WHERE name_shopping_cart LIKE %:name% AND statuss LIKE %:status%", nativeQuery = true)
    Page<ShoppingCartDetailEntity> findAllShoppingCart(@Param("name") String name, @Param("status") String status, Pageable pageable);
	
	@Query(value = "SELECT * FROM shopping_cart_detail WHERE name_shopping_cart  LIKE %:name%", nativeQuery = true)
    Page<ShoppingCartDetailEntity> findNameShoppingCart(@Param("name") String name, Pageable pageable);
	
	@Query(value = "SELECT * FROM shopping_cart_detail WHERE statuss LIKE %:status%", nativeQuery = true)
    Page<ShoppingCartDetailEntity> findStatusShoppingCart(@Param("status") String status, Pageable pageable);

	ShoppingCartDetailEntity findById(int shoppingCartId);

   // Page<ShoppingCartEntity> findAll(Specification<CategoryEntity> advanceFilter,Pageable pagerable);
}
