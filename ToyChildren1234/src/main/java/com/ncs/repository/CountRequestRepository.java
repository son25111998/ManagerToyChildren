package com.ncs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.ncs.entity.CountResquest;;

public interface CountRequestRepository extends JpaRepository<CountResquest, Integer>,JpaSpecificationExecutor<CountResquest>{


	CountResquest findById(int id);


}
