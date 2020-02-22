package com.ncs.service.impl;

import java.util.List;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ncs.entity.AccountEntity;

import com.ncs.repository.AccountRepository;
import com.ncs.service.AccountService;
@Service
public class AccountServiceImpl implements AccountService{

	
	@Autowired
	private AccountRepository accountRepository;

	
	private Logger log = Logger.getLogger(AccountServiceImpl.class);
	@Override
	public Page<AccountEntity> findPaging(Pageable pageable) {
		try {
			return accountRepository.findAll(pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public int create(AccountEntity account) {
		try {
			AccountEntity accountExisting = new AccountEntity();
			accountExisting.setId(account.getId());
			accountExisting.setUsername(account.getUsername());
			accountExisting.setPassword(account.getPassword());
			accountExisting.setEmail(account.getEmail()+"@gmail.com");
			//accountExisting.setCreateTime(new Date);
			//accountExisting.setActive("1");
			//productsExisting.setStatuss(amphitheaters.getStatuss());

			accountRepository.save(accountExisting);
			return 1;
		} catch (Exception e) {
			log.error(e.getMessage());
			return 0;
		}
	}

	@Override
	public List<AccountEntity> findAll() {
		try {
			return accountRepository.findAll();
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public AccountEntity findOne(int id) {
		AccountEntity account = null;
		try {
			account = accountRepository.findById(id);
		} catch (Exception e) {
		
			log.error(e.getMessage());
		}
		return account;
	}

	@Override
	public int update(AccountEntity account) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int delete(int id) {
		try {
			accountRepository.deleteById(id);
			return 1;
		} catch (Exception e) {
			log.error(e.getMessage());
			return 0;
		}
	}

	@Override
	public int deleteAllBatch(Iterable<AccountEntity> account) {
		try {
			accountRepository.deleteInBatch(account);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
			return 0;
		}
		return 1;
	}

	@Override
	public Page<AccountEntity> searchAllAccount(String name, String status, Pageable pageable) {
		try {
			return accountRepository.findAllAccount(name, status, pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Page<AccountEntity> searchNameAccount(String name, Pageable pageable) {
		try {
			return accountRepository.findNameAccount(name, pageable);
		}catch(Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Page<AccountEntity> search(AccountEntity account, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

}
