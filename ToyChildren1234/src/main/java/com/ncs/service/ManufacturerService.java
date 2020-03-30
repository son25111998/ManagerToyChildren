package com.ncs.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.ManufacturerEntity;;
@Service
public interface ManufacturerService {
	Page<ManufacturerEntity> findPaging(Pageable pageable);

	int create(ManufacturerEntity manufacturer);

	List<ManufacturerEntity> findAll();

	ManufacturerEntity findOne(int id);

	int update(ManufacturerEntity manufacturer);

	int delete(int id);

	int deleteAllBatch(Iterable<ManufacturerEntity> manufacturer);

	Page<ManufacturerEntity> searchAllManufacturer(String name, String status, Pageable pageable);

	Page<ManufacturerEntity> searchManufacturer(String name, Pageable pageable);

	//Page<CategoryEntity> searchStatusProduct(String status, Pageable pageable);

	Page<ManufacturerEntity> search(ManufacturerEntity manufacturer, Pageable pageable);
}
