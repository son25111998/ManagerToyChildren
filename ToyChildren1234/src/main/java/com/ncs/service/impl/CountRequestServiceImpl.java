package com.ncs.service.impl;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.CountResquest;
import com.ncs.repository.CountRequestRepository;
import com.ncs.service.CountRequestService;
import com.ncs.specifications.CountRequestSpecifications;
@Service
public class CountRequestServiceImpl implements CountRequestService {
	@Autowired
	private CountRequestRepository countRequestRepository;
	private Logger log = Logger.getLogger(CountRequestServiceImpl.class);
	@Override
	public int create(CountResquest countRequest) {
		try {
			CountResquest countRequestExisting = countRequestRepository.findById(countRequest.getId());
			if (countRequestExisting != null) {
				return 0;
			} else {
				countRequestRepository.save(countRequest);
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e);
			return 0;
		}
		return 1;
	}

	@Override
	public Page<CountResquest> search(CountResquest countResquest, Pageable pageable) {
		Page<CountResquest> countResquests = null;
		try {
			countResquests = countRequestRepository.findAll(CountRequestSpecifications.advanceFilter(countResquest),
					pageable);
		} catch (Exception e) {

			e.printStackTrace();
			log.error(e.getMessage());
		}

		return countResquests;
	}

	@Override
	public CountResquest findOne(int id) {
		CountResquest CountResquest= null;

		try {
			CountResquest = countRequestRepository.findById(id);

		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return CountResquest;
	}

}
