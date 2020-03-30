package com.ncs.service.impl;

import java.util.List;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.CategoryEntity;
import com.ncs.repository.CategoryRepository;
import com.ncs.service.CategoryService;
import com.ncs.specifications.CategorySpecifications;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	private Logger log = Logger.getLogger(ProductServiceImpl.class);

	@Override
	public Page<CategoryEntity> findPaging(Pageable pageable) {
		try {
			return categoryRepository.findAll(pageable);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public int create(CategoryEntity category) {
		try {
			CategoryEntity categoryExisting = new CategoryEntity();
			categoryExisting.setId(category.getId());
			categoryExisting.setName(category.getName());
			// productsExisting.setStatuss(amphitheaters.getStatuss());
			categoryExisting.setStatus(1);

			categoryRepository.save(categoryExisting);
			return 1;
		} catch (Exception e) {
			log.error(e.getMessage());
			return 0;
		}
	}

	@Override
	public List<CategoryEntity> findAll() {
		try {
			return categoryRepository.findAll();
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public CategoryEntity findOne(int id) {
		CategoryEntity category = null;
		try {
			category = categoryRepository.findById(id);
		} catch (Exception e) {

			log.error(e.getMessage());
		}
		return category;
	}

	@Override
	public int update(CategoryEntity category) {
		try {
			CategoryEntity categoryExisting = categoryRepository.findById(category.getId());
			categoryExisting.setName(category.getName());
//		productsExisting.setStatus(category.getStatus());
//		productsExisting.setUpdateTime(new Date());
//		productsExisting.setUpdatedBy(CommonConstants.DEFAULT_USER);

			categoryRepository.save(categoryExisting);

			return 1;
		} catch (Exception e) {
			log.error(e.getMessage());
			return 0;
		}
	}

	@Override
	public int delete(int id) {
		try {
			categoryRepository.deleteById(id);
			return 1;
		} catch (Exception e) {
			log.error(e.getMessage());
			return 0;
		}
	}

	@Override
	public int deleteAllBatch(Iterable<CategoryEntity> category) {
		try {
			categoryRepository.deleteInBatch(category);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
			return 0;
		}
		return 1;
	}

	@Override
	public Page<CategoryEntity> searchAllCategory(String name, String status, Pageable pageable) {
		try {
			return categoryRepository.findAllCategory(name, status, pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Page<CategoryEntity> searchNameCategory(String name, Pageable pageable) {
		try {
			return categoryRepository.findNameCategory(name, pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Page<CategoryEntity> search(CategoryEntity categorys, Pageable pageable) {
		Page<CategoryEntity> category = null;
		try {
			category = categoryRepository.findAll(CategorySpecifications.advanceFilter(categorys), pageable);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return category;
	}

}
