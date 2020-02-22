package com.ncs.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ncs.entity.ManufacturerEntity;;

public interface ManufacturerRepository extends JpaRepository<ManufacturerEntity, Integer>,JpaSpecificationExecutor<ManufacturerEntity>{
	@Query(value = "SELECT * FROM manufacturer WHERE name_manufacturer LIKE %:name% AND statuss LIKE %:status%", nativeQuery = true)
    Page<ManufacturerEntity> findAllManufacturer(@Param("name") String name, @Param("status") String status, Pageable pageable);
	
	@Query(value = "SELECT * FROM manufacturer WHERE name_manufacturerLIKE %:name%", nativeQuery = true)
    Page<ManufacturerEntity> findNameManufacturer(@Param("name") String name, Pageable pageable);
	
	@Query(value = "SELECT * FROM manufacturer WHERE statuss LIKE %:status%", nativeQuery = true)
    Page<ManufacturerEntity> findStatusManufacturer(@Param("status") String status, Pageable pageable);

	ManufacturerEntity findById(int id);

    //Page<ManufacturerEntity> findAll(Specification<CategoryEntity> advanceFilter,Pageable pagerable);
}
