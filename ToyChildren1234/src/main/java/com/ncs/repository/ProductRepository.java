package com.ncs.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ncs.entity.ProductEntity;


public interface ProductRepository extends JpaRepository<ProductEntity, Integer>,JpaSpecificationExecutor<ProductEntity>  {
	
		// search by name
		@Query(value = "SELECT * FROM product WHERE name_product LIKE %:name% AND statuss LIKE %:status%", nativeQuery = true)
        Page<ProductEntity> findAllProduct(@Param("name") String name, @Param("status") String status, Pageable pageable);
		
		@Query(value = "SELECT * FROM product WHERE name_product LIKE %:name%", nativeQuery = true)
        Page<ProductEntity> findNameProduct(@Param("name") String name, Pageable pageable);
		
		@Query(value = "SELECT * FROM product WHERE statuss LIKE %:status%", nativeQuery = true)
        Page<ProductEntity> findStatusProduct(@Param("status") String status, Pageable pageable);

		ProductEntity findById(int id);

	    Page<ProductEntity> findAll(Specification<ProductEntity> advanceFilter, Pageable pageable);
	    List<ProductEntity> findByManufacturerId(int manufacturerId);
	    List<ProductEntity> findByCategoryId(int categoryId);
		@Query(value = "SELECT * FROM product\n" + 
				"ORDER BY product.PRICE desc", nativeQuery = true)
        Page<ProductEntity> findAllOderByPriceDesc(Pageable pageable);
		@Query(value = "SELECT * FROM product\n" + 
				"ORDER BY product.PRICE ", nativeQuery = true)
		Page<ProductEntity> findAllOderByPriceAsc(Pageable pageable);
		@Query(value = "SELECT * FROM product\n" + 
				"where product.CATEGORY_ID = a and product.MANUFACTURER_ID=b ", nativeQuery = true)
		Page<ProductEntity> findAllProductCategoryandManufacturer(@Param("a") int a, @Param("b") int  b,Pageable pageable);

	
	
}
