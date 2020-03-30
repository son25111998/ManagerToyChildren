package com.ncs.service.impl;

import java.util.List;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.OrderDetailEntity;
import com.ncs.entity.OrderEntity;
import com.ncs.repository.OrderDetailRepository;
import com.ncs.service.OrderDetailService;
import com.ncs.service.OrderService;
import com.ncs.specifications.OrderDetailSpecifications;

@Service
public class OrderDetailServiceImpl implements OrderDetailService{
	@Autowired
	private OrderDetailRepository orderDetailRepository;
	private Logger log = Logger.getLogger(OrderDetailServiceImpl.class);
	@Override
	public Page<OrderDetailEntity> findPaging(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public int create(OrderDetailEntity order) {
		try {
			OrderDetailEntity orderEntityeExisting = orderDetailRepository.findById(order.getId());
			if (orderEntityeExisting != null) {
				return 0;
			} else {
				orderDetailRepository.save(order);
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e);
			return 0;
		}
		return 1;
	}
	@Override
	public List<OrderDetailEntity> findAll() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public OrderDetailEntity findOne(int id) {
		OrderDetailEntity order = null;
		try {
			order = orderDetailRepository.findById(id);
		} catch (Exception e) {
		
			log.error(e.getMessage());
		}
		return order; 
	}
	@Override
	public int update(OrderDetailEntity order) {
		// TODO Auto-generated method stub
		return 0;
	}
	@Override
	public int delete(int id) {
		// TODO Auto-generated method stub
		return 0;
	}
	@Override
	public int deleteAllBatch(Iterable<OrderDetailEntity> order) {
		// TODO Auto-generated method stub
		return 0;
	}
	@Override
	public Page<OrderDetailEntity> searchAllOrder(String name, String status, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Page<OrderDetailEntity> searchNameOrder(String name, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Page<OrderDetailEntity> search(OrderDetailEntity order, Pageable pageable) {
		Page<OrderDetailEntity> orders = null;
		try {
			orders = orderDetailRepository.findAll(OrderDetailSpecifications.advanceFilter(order), pageable);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return orders;
	}
	@Override
	public List<OrderDetailEntity> findbyOrderId(int orderId) {
		// TODO Auto-generated method stub
		return null;
	}
	

}
