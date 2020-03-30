package com.ncs.service;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ncs.entity.AmActionHistory;


/**
 * @author SonNV
 * @created 28/9/2019
 * 
 * @modified 
 * @modifier 
 */
public interface ActionHistoryService {

	Page<AmActionHistory> findAll(Pageable pageable);

	AmActionHistory findOne(int id);

	int create(AmActionHistory amActionHistory);

	int update(AmActionHistory amActionHistory);

	int delete(int id);

	 int deleteAllBatch(Iterable<AmActionHistory> entities);

	Page<AmActionHistory> advanceFilterSearch(AmActionHistory actionHistory, Date startDate, Date endDate, Pageable pageable);
	
	void createActionHistoryItem(AmActionHistory actionHistory);

//	Page<AmActionHistory> search(AmActionHistory actionHistory, Pageable pageable);

}
