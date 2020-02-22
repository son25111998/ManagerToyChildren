package com.ncs.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.CategoryEntity;

@Service
public interface CategoryService {
	Page<CategoryEntity> findPaging(Pageable pageable);

	int create(CategoryEntity category);

	List<CategoryEntity> findAll();

	CategoryEntity findOne(int id);

	int update(CategoryEntity category);

	int delete(int id);

	int deleteAllBatch(Iterable<CategoryEntity> category);

	Page<CategoryEntity> searchAllCategory(String name, String status, Pageable pageable);

	Page<CategoryEntity> searchNameCategory(String name, Pageable pageable);

	//Page<CategoryEntity> searchStatusProduct(String status, Pageable pageable);

	Page<CategoryEntity> search(CategoryEntity category, Pageable pageable);
}
