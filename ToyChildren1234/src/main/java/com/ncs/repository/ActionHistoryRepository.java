package com.ncs.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.ncs.entity.AmActionHistory;

/**
 * @author 
 * @created 
 * 
 * @modified 
 * @modifier 
 */
public interface ActionHistoryRepository extends JpaRepository<AmActionHistory, Integer>,JpaSpecificationExecutor<AmActionHistory> {
	
	Page<AmActionHistory> findByOrderByIdDesc(Pageable pageable);
	AmActionHistory findById(int id);
	
}
