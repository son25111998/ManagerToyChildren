package com.ncs.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.OrderDetailEntity;;

@Service
public interface OrderDetailService {
	Page<OrderDetailEntity> findPaging(Pageable pageable);

	int create(OrderDetailEntity order);

	List<OrderDetailEntity> findAll();

	OrderDetailEntity findOne(int id);

	int update(OrderDetailEntity order);

	int delete(int id);

	int deleteAllBatch(Iterable<OrderDetailEntity> order);

	Page<OrderDetailEntity> searchAllOrder(String name, String status, Pageable pageable);

	Page<OrderDetailEntity> searchNameOrder(String name, Pageable pageable);

	//Page<CategoryEntity> searchStatusProduct(String status, Pageable pageable);

	Page<OrderDetailEntity> search(OrderDetailEntity order, Pageable pageable);
	List<OrderDetailEntity> findbyOrderId(int orderId);
}
