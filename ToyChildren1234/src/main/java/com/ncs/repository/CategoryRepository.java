package com.ncs.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ncs.entity.CategoryEntity;


public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer>,JpaSpecificationExecutor<CategoryEntity>  {
	// search by name
	@Query(value = "SELECT * FROM category WHERE name_category LIKE %:name% AND statuss LIKE %:status%", nativeQuery = true)
    Page<CategoryEntity> findAllCategory(@Param("name") String name, @Param("status") String status, Pageable pageable);
	
	@Query(value = "SELECT * FROM category WHERE name_category  LIKE %:name%", nativeQuery = true)
    Page<CategoryEntity> findNameCategory(@Param("name") String name, Pageable pageable);
	
	@Query(value = "SELECT * FROM category WHERE statuss LIKE %:status%", nativeQuery = true)
    Page<CategoryEntity> findStatusCategory(@Param("status") String status, Pageable pageable);

	CategoryEntity findById(int id);

    Page<CategoryEntity> findAll(Specification<CategoryEntity> advanceFilter,Pageable pagerable);
}
