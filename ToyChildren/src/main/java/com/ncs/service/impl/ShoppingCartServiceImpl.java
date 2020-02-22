package com.ncs.service.impl;

import java.util.List;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.ShoppingCartEntity;
import com.ncs.repository.ShoppingCartRepository;
import com.ncs.service.ShoppingCartService;
@Service
public class ShoppingCartServiceImpl implements ShoppingCartService{

	
	@Autowired
	private ShoppingCartRepository shoppingCartRepository;
	
	private Logger log = Logger.getLogger(ShoppingCartServiceImpl.class);
	@Override
	public Page<ShoppingCartEntity> findPaging(Pageable pageable) {
		try {
			return shoppingCartRepository.findAll(pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public int create(ShoppingCartEntity shoppingCart) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<ShoppingCartEntity> findAll() {
		try {
			return shoppingCartRepository.findAll();
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public ShoppingCartEntity findOne(int id) {
		ShoppingCartEntity shoppingCart = null;
		try {
			shoppingCart = shoppingCartRepository.findById(id);
		} catch (Exception e) {
		
			log.error(e.getMessage());
		}
		return shoppingCart;
	}

	@Override
	public int update(ShoppingCartEntity shoppingCart) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int delete(int id) {
		try {
			shoppingCartRepository.deleteById(id);
			return 1;
		} catch (Exception e) {
			log.error(e.getMessage());
			return 0;
		}
	}

	@Override
	public int deleteAllBatch(Iterable<ShoppingCartEntity> shoppingCart) {
		try {
			shoppingCartRepository.deleteInBatch(shoppingCart);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
			return 0;
		}
		return 1;
	}

	@Override
	public Page<ShoppingCartEntity> searchAllShoppingCart(String name, String status, Pageable pageable) {
		try {
			return shoppingCartRepository.findAllShoppingCart(name, status, pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Page<ShoppingCartEntity> searchNameShoppingCart(String name, Pageable pageable) {
		try {
			return shoppingCartRepository.findNameShoppingCart(name, pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Page<ShoppingCartEntity> search(ShoppingCartEntity shoppingCart, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

} 
