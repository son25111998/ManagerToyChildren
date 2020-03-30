package com.ncs.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.ShoppingCartDetailEntity;
import com.ncs.entity.ShoppingCartEntity;;
@Service
public interface ShoppingCartService {
	Page<ShoppingCartDetailEntity> findPaging(Pageable pageable);

	int create(ShoppingCartDetailEntity shoppingCart);

	List<ShoppingCartDetailEntity> findAll();

	ShoppingCartDetailEntity findOne(int id);

	int update(ShoppingCartDetailEntity shoppingCart);

	int delete(int id);

	int deleteAllBatch(Iterable<ShoppingCartDetailEntity> shoppingCart);

	Page<ShoppingCartDetailEntity> searchAllShoppingCart(String name, String status, Pageable pageable);

	Page<ShoppingCartDetailEntity> searchNameShoppingCart(String name, Pageable pageable);

	//Page<CategoryEntity> searchStatusProduct(String status, Pageable pageable);

	Page<ShoppingCartDetailEntity> search(ShoppingCartDetailEntity shoppingCart, Pageable pageable);
}
