package com.ncs.service;


import com.ncs.entity.AccountEntity;

public interface UserDetailServices {

	public AccountEntity loadByUsername(String username);
}
