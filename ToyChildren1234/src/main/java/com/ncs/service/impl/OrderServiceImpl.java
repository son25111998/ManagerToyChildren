package com.ncs.service.impl;

import java.util.List;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.OrderDetailEntity;
import com.ncs.entity.OrderEntity;
import com.ncs.entity.ProductEntity;
import com.ncs.repository.OrderDetailRepository;
import com.ncs.repository.OrderRepository;
import com.ncs.service.OrderService;
import com.ncs.specifications.OderSpecifications;
@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private OrderDetailRepository orderDetailRepository;
	
	private Logger log = Logger.getLogger(OrderServiceImpl.class);
	@Override
	public Page<OrderEntity> findPaging(Pageable pageable) {
		try {
			return orderRepository.findAll(pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public int create(OrderEntity order) {
		try {
			OrderEntity orderEntityeExisting = orderRepository.findById(order.getId());
			if (orderEntityeExisting != null) {
				return 0;
			} else {
				orderRepository.save(order);
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e);
			return 0;
		}
		return 1;
	}

	@Override
	public List<OrderEntity> findAll() {
		try {
			return orderRepository.findAll();
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public OrderEntity findOne(int id) {
		OrderEntity order = null;
		try {
			order = orderRepository.findById(id);
		} catch (Exception e) {
		
			log.error(e.getMessage());
		}
		return order;
	}

	@Override
	public int update(OrderEntity order) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int delete(int id) {
		try {
			orderRepository.deleteById(id);
			return 1;
		} catch (Exception e) {
			log.error(e.getMessage());
			return 0;
		}
	}

	@Override
	public int deleteAllBatch(Iterable<OrderEntity> order) {
		try {
			orderRepository.deleteInBatch(order);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
			return 0;
		}
		return 1;
	}

	@Override
	public Page<OrderEntity> searchAllOrder(String name, String status, Pageable pageable) {
		try {
			return orderRepository.findAllOrder(name, status, pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Page<OrderEntity> searchNameOrder(String name, Pageable pageable) {
		try {
			return orderRepository.findNameOrder(name, pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Page<OrderEntity> search(OrderEntity order, Pageable pageable) {
		Page<OrderEntity> orders = null;
		try {
			orders = orderRepository.findAll(OderSpecifications.advanceFilter(order), pageable);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return orders;
	}

	@Override
	public List<OrderDetailEntity> getListOrderDetail(int orderId) {
		List<OrderDetailEntity> orderDetailList = null;
		try {
			orderDetailList = orderDetailRepository.findByOrderId(orderId);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e);
		}
		return orderDetailList;
	}

}
