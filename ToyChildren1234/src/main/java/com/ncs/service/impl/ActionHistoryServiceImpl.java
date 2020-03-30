package com.ncs.service.impl;

import java.util.Date;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.AmActionHistory;
import com.ncs.repository.ActionHistoryRepository;
import com.ncs.service.ActionHistoryService;
import com.ncs.specifications.ActionHistorySpecifications;

@Service
public class ActionHistoryServiceImpl implements ActionHistoryService {

	@Autowired
	private ActionHistoryRepository actionHistoryRepository;

	private Logger log = Logger.getLogger(ActionHistoryServiceImpl.class);

	@Override
	public Page<AmActionHistory> findAll(Pageable pageable) {
		Page<AmActionHistory> apiLcEvents = null;
		try {
			apiLcEvents = actionHistoryRepository.findByOrderByIdDesc(pageable);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e);
		}
		return apiLcEvents;
	}

	@Override
	public AmActionHistory findOne(int id) {
		AmActionHistory amActionHistory = null;
		try {
			amActionHistory = actionHistoryRepository.findById(id);
		} catch (Exception e) {

			log.error(e.getMessage());
		}
		return amActionHistory;
	}

	@Override
	public int create(AmActionHistory actionHistory) {
		try {
			actionHistoryRepository.save(actionHistory);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e);
			return 0;
		}
		return 1;
	}

	@Override
	public int update(AmActionHistory actionHistory) {
		try {
			AmActionHistory actionHistoryExisting = actionHistoryRepository.findById(actionHistory.getId());
			if (actionHistoryExisting != null) {
				actionHistoryRepository.save(actionHistory);
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e);
			return 0;
		}
		return 1;
	}

	@Override
	public int delete(int id) {
		try {
			actionHistoryRepository.deleteById(id);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e);
		}
		return 1;
	}

	@Override
	public int deleteAllBatch(Iterable<AmActionHistory> entities) {
		try {
			actionHistoryRepository.deleteInBatch(entities);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
			return 0;
		}
		return 1;
	}

	@Override
	public Page<AmActionHistory> advanceFilterSearch(AmActionHistory actionHistory, Date startDate, Date endDate, Pageable pageable) {
		Page<AmActionHistory> actionHistories = null;
		try {
			actionHistories = actionHistoryRepository.findAll(ActionHistorySpecifications.advanceFilter(actionHistory, startDate, endDate), pageable);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e);
		}
		return actionHistories;
	}


	public void createActionHistoryItem(AmActionHistory actionHistory) {
		AmActionHistory actionHistoryItem = new AmActionHistory();
		actionHistoryItem.setUserName(actionHistory.getUserName());
		actionHistoryItem.setAction(actionHistory.getAction());
		actionHistoryItem.setModule(actionHistory.getModule());
		actionHistoryItem.setDateAction(new Date());
		actionHistoryItem.setDetailAction(actionHistory.getDetailAction());
		actionHistoryItem.setManipulation(actionHistory.getManipulation());
		actionHistoryItem.setRecordId(actionHistory.getRecordId());
		actionHistoryItem.setProduct(actionHistory.getProduct());
		actionHistoryItem.setAccount(actionHistory.getAccount());
		actionHistoryItem.setCategory(actionHistory.getCategory());
		actionHistoryItem.setManufacturer(actionHistory.getManufacturer());
		
		actionHistoryItem.setStatus(actionHistory.getStatus());
		actionHistoryItem.setDetailAction1(actionHistory.getDetailAction1());
		actionHistoryRepository.save(actionHistoryItem);
	}


}
