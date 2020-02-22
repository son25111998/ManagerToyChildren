package com.ncs.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ncs.entity.ShoppingCartEntity;;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCartEntity, Integer>,JpaSpecificationExecutor<ShoppingCartEntity> {
	@Query(value = "SELECT * FROM shopping_cart WHERE name_shopping_cart LIKE %:name% AND statuss LIKE %:status%", nativeQuery = true)
    Page<ShoppingCartEntity> findAllShoppingCart(@Param("name") String name, @Param("status") String status, Pageable pageable);
	
	@Query(value = "SELECT * FROM shopping_cart WHERE name_shopping_cart  LIKE %:name%", nativeQuery = true)
    Page<ShoppingCartEntity> findNameShoppingCart(@Param("name") String name, Pageable pageable);
	
	@Query(value = "SELECT * FROM shopping_cart WHERE statuss LIKE %:status%", nativeQuery = true)
    Page<ShoppingCartEntity> findStatusShoppingCart(@Param("status") String status, Pageable pageable);

	ShoppingCartEntity findById(int id);

   // Page<ShoppingCartEntity> findAll(Specification<CategoryEntity> advanceFilter,Pageable pagerable);
}
