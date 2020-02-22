package com.ncs.specifications;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.ncs.common.CommonUtil;
import com.ncs.entity.ShoppingCartEntity;;

public class ShoppingCartSpecifications {
	public static Specification<ShoppingCartEntity> advanceFilter(ShoppingCartEntity shoppingCartEntity){
		return new Specification<ShoppingCartEntity>() {
			
			@Override
			public Predicate toPredicate(Root<ShoppingCartEntity> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicateList = new ArrayList<>();
				Predicate obj = null;
				
//				if(shoppingCartEntity.getId() != 0) {
//					obj = cb.like(cb.lower(root.get("username")), "%" + CommonUtil.standardized(shoppingCartEntity.getUsername().toLowerCase()) + "%");
//					predicateList.add(obj);	
//				}
//				if (product.getStatuss() != null && !product.getStatuss().equals("")) {
//					obj = cb.like(cb.lower(root.get("statuss")), "%" + product.getStatuss().toLowerCase() + "%");
//					predicateList.add(obj);
//				}
				
				query.orderBy(cb.desc(root.get("id")));
				return cb.and(predicateList.toArray(new Predicate[predicateList.size()]));
			}
		};
	}
}
