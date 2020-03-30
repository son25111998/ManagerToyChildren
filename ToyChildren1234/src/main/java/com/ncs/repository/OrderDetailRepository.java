package com.ncs.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ncs.entity.OrderDetailEntity;
import com.ncs.entity.OrderEntity;;

public interface OrderDetailRepository extends JpaRepository<OrderDetailEntity, Integer>,JpaSpecificationExecutor<OrderDetailEntity> {
	@Query(value = "SELECT * FROM order_detail WHERE name_oder LIKE %:name% AND statuss LIKE %:status%", nativeQuery = true)
    Page<OrderDetailEntity> findAllOrder(@Param("name") String name, @Param("status") String status, Pageable pageable);
	
	@Query(value = "SELECT * FROM order_detail WHERE name_oder  LIKE %:name%", nativeQuery = true)
    Page<OrderDetailEntity> findNameOrder(@Param("name") String name, Pageable pageable);
	
	@Query(value = "SELECT * FROM order_detail WHERE statuss LIKE %:status%", nativeQuery = true)
    Page<OrderDetailEntity> findStatusOrder(@Param("status") String status, Pageable pageable);

	OrderDetailEntity findById(int id);
	// List<OrderDetailEntity> findByOderId(int oderId);
    Page<OrderDetailEntity> findAll(Specification<OrderDetailEntity> advanceFilter,Pageable pagerable);
    List<OrderDetailEntity> findByOrderId(int orderId);
}
