package com.ncs.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ncs.entity.CountResquest;;

public interface CountRequestService {
	int create(CountResquest countRequest);
	Page<CountResquest> search(CountResquest countResquest, Pageable pageable);
	CountResquest findOne(int id);
}
