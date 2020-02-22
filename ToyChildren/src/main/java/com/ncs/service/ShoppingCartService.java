package com.ncs.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.ShoppingCartEntity;;
@Service
public interface ShoppingCartService {
	Page<ShoppingCartEntity> findPaging(Pageable pageable);

	int create(ShoppingCartEntity shoppingCart);

	List<ShoppingCartEntity> findAll();

	ShoppingCartEntity findOne(int id);

	int update(ShoppingCartEntity shoppingCart);

	int delete(int id);

	int deleteAllBatch(Iterable<ShoppingCartEntity> shoppingCart);

	Page<ShoppingCartEntity> searchAllShoppingCart(String name, String status, Pageable pageable);

	Page<ShoppingCartEntity> searchNameShoppingCart(String name, Pageable pageable);

	//Page<CategoryEntity> searchStatusProduct(String status, Pageable pageable);

	Page<ShoppingCartEntity> search(ShoppingCartEntity shoppingCart, Pageable pageable);
}
