package com.ncs.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.AccountEntity;;
@Service
public interface AccountService {
	Page<AccountEntity> findPaging(Pageable pageable);

	int create(AccountEntity account);

	List<AccountEntity> findAll();

	AccountEntity findOne(int id);

	int update(AccountEntity account);

	int delete(int id);

	int deleteAllBatch(Iterable<AccountEntity> account);

	Page<AccountEntity> searchAllAccount(String name, String status, Pageable pageable);

	Page<AccountEntity> searchNameAccount(String name, Pageable pageable);

	//Page<CategoryEntity> searchStatusProduct(String status, Pageable pageable);

	Page<AccountEntity> search(AccountEntity account, Pageable pageable);
}
