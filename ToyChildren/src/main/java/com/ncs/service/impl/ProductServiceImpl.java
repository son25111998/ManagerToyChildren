package com.ncs.service.impl;

import java.util.List;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.ProductEntity;
import com.ncs.repository.ProductRepository;
import com.ncs.service.ProductService;
import com.ncs.specifications.ProductSpecifications;



@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductRepository productRepository;

	
	private Logger log = Logger.getLogger(ProductServiceImpl.class);
	@Override
	public Page<ProductEntity> findPaging(Pageable pageable) {
		try {
			return productRepository.findAll(pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public int create(ProductEntity products) {
		try {
			ProductEntity productsExisting = new ProductEntity();
			productsExisting.setId(products.getId());
			productsExisting.setName(products.getName());
			//productsExisting.set(new Date());
			//productsExisting.set(CommonConstants.DEFAULT_USER);
			//productsExisting.setStatuss(amphitheaters.getStatuss());

			productRepository.save(productsExisting);
			return 1;
		} catch (Exception e) {
			log.error(e.getMessage());
			return 0;
		}
	}

	@Override
	public List<ProductEntity> findAll() {
		try {
			return productRepository.findAll();
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public ProductEntity findOne(int id) {
		ProductEntity product = null;
		try {
			//product = productRepository.findByIdProduct(id);
		} catch (Exception e) {
		
			log.error(e.getMessage());
		}
		return product;
	}

	@Override
	public int update(ProductEntity products) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int delete(int id) {
		try {
			productRepository.deleteById(id);
			return 1;
		} catch (Exception e) {
			log.error(e.getMessage());
			return 0;
		}
	}

	@Override
	public int deleteAllBatch(Iterable<ProductEntity> products) {
		try {
			productRepository.deleteInBatch(products);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
			return 0;
		}
		return 1;
	}

	@Override
	public Page<ProductEntity> searchAllProduct(String name, String status, Pageable pageable) {
		try {
			return productRepository.findAllProduct(name, status, pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Page<ProductEntity> searchNameProduct(String name, Pageable pageable) {
		try {
			return productRepository.findNameProduct(name, pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Page<ProductEntity> searchStatusProduct(String status, Pageable pageable) {
		try {
			return productRepository.findStatusProduct(status, pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Page<ProductEntity> search(ProductEntity products, Pageable pageable) {
		Page<ProductEntity> product = null;
		try {
			product = productRepository.findAll(ProductSpecifications.advanceFilter(products), pageable);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return product;
	}



}
