package com.ncs.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.ProductEntity;



@Service
public interface ProductService {
	Page<ProductEntity> findPaging(Pageable pageable);

	int create(ProductEntity products);

	List<ProductEntity> findAll();

	ProductEntity findOne(int id);

	int update(ProductEntity products);

	int delete(int id);

	int deleteAllBatch(Iterable<ProductEntity> products);

	Page<ProductEntity> searchAllProduct(String name, String status, Pageable pageable);

	Page<ProductEntity> searchNameProduct(String name, Pageable pageable);

	Page<ProductEntity> searchStatusProduct(String status, Pageable pageable);

	Page<ProductEntity> search(ProductEntity products, Pageable pageable);
}
