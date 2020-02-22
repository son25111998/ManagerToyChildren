package com.ncs.service.impl;

import java.util.List;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.ManufacturerEntity;
import com.ncs.repository.ManufacturerRepository;
import com.ncs.service.ManufacturerService;

@Service
public class ManufacturerServiceImpl implements ManufacturerService{

	@Autowired
	private ManufacturerRepository manufacturerRepository;

	
	private Logger log = Logger.getLogger(ManufacturerServiceImpl.class);
	
	
	@Override
	public Page<ManufacturerEntity> findPaging(Pageable pageable) {
		try {
			return manufacturerRepository.findAll(pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public int create(ManufacturerEntity manufacturer) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<ManufacturerEntity> findAll() {
		try {
			return manufacturerRepository.findAll();
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public ManufacturerEntity findOne(int id) {
		ManufacturerEntity manufacturer = null;
		try {
			manufacturer = manufacturerRepository.findById(id);
		} catch (Exception e) {
		
			log.error(e.getMessage());
		}
		return manufacturer;
	}

	@Override
	public int update(ManufacturerEntity manufacturer) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int delete(int id) {
		try {
			manufacturerRepository.deleteById(id);
			return 1;
		} catch (Exception e) {
			log.error(e.getMessage());
			return 0;
		}
	}

	@Override
	public int deleteAllBatch(Iterable<ManufacturerEntity> manufacturer) {
		try {
			manufacturerRepository.deleteInBatch(manufacturer);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
			return 0;
		}
		return 1;
	}

	@Override
	public Page<ManufacturerEntity> searchAllManufacturer(String name, String status, Pageable pageable) {
		try {
			return manufacturerRepository.findAllManufacturer(name, status, pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Page<ManufacturerEntity> searchManufacturer(String name, Pageable pageable) {
		try {
			return manufacturerRepository.findNameManufacturer(name, pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Page<ManufacturerEntity> search(ManufacturerEntity category, Pageable pageable) {
//		Page<ManufacturerEntity> categorys = null;
//		try {
//			categorys = manufacturerRepository.findAll(ProductSpecifications.advanceFilter(category), pageable);
//		} catch (Exception e) {
//			e.printStackTrace();
//			log.error(e.getMessage());
//		}
//		return categorys;
		return null;
	}

}
