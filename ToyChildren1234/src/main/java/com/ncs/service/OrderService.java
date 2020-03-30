package com.ncs.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.OrderDetailEntity;
import com.ncs.entity.OrderEntity;
import com.ncs.entity.ProductEntity;;
@Service
public interface OrderService {
	Page<OrderEntity> findPaging(Pageable pageable);

	int create(OrderEntity order);

	List<OrderEntity> findAll();

	OrderEntity findOne(int id);

	int update(OrderEntity order);

	int delete(int id);

	int deleteAllBatch(Iterable<OrderEntity> order);

	Page<OrderEntity> searchAllOrder(String name, String status, Pageable pageable);

	Page<OrderEntity> searchNameOrder(String name, Pageable pageable);

	//Page<CategoryEntity> searchStatusProduct(String status, Pageable pageable);

	Page<OrderEntity> search(OrderEntity order, Pageable pageable);
	List<OrderDetailEntity> getListOrderDetail(int orderId);
}
