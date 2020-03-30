package com.ncs.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ncs.entity.AccountEntity;

public interface AccountRepository extends JpaRepository<AccountEntity, Integer>,JpaSpecificationExecutor<AccountEntity>{
	@Query(value = "SELECT * FROM account WHERE name_account LIKE %:name% AND statuss LIKE %:status%", nativeQuery = true)
    Page<AccountEntity> findAllAccount(@Param("name") String name, @Param("status") String status, Pageable pageable);
	
	@Query(value = "SELECT * FROM account WHERE name_account LIKE %:name%", nativeQuery = true)
    Page<AccountEntity> findNameAccount(@Param("name") String name, Pageable pageable);
	
	@Query(value = "SELECT * FROM account WHERE statuss LIKE %:status%", nativeQuery = true)
    Page<AccountEntity> findStatusAccount(@Param("status") String status, Pageable pageable);

	AccountEntity findById(int id);

    Page<AccountEntity> findAll(Specification<AccountEntity> advanceFilter,Pageable pagerable);
}
