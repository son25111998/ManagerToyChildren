package com.ncs.service.impl;

import java.util.ArrayList;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ncs.entity.AccountEntity;
import com.ncs.service.UserDetailServices;




@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService,UserDetailServices{

	EntityManager entityManager;
	
	
	@Autowired
	public UserDetailsServiceImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Session session = entityManager.unwrap(Session.class);
		if(username!=null) {
			AccountEntity user = session.createQuery(" from AccountEntity u where u.username=:username",AccountEntity.class)
						.setParameter("username", username).getSingleResult();
			return new org.springframework.security.core.userdetails.User(username, user.getPassword(),new ArrayList<GrantedAuthority>());
		}
		session.close();
		entityManager.close();
		return null;
	}

	@Override
	public AccountEntity loadByUsername(String username) {
		Session session = entityManager.unwrap(Session.class);
		if(username!=null) {
			AccountEntity user = session.createQuery(" from AccountEntity u where u.username=:username",AccountEntity.class)
						.setParameter("username", username).getResultList().get(0);
			return user;
		}
		session.close();
		entityManager.close();
		return null;
	}

}
