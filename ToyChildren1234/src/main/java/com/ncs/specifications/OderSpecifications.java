package com.ncs.specifications;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.ncs.entity.OrderEntity;;

public class OderSpecifications {
	public static Specification<OrderEntity> advanceFilter(OrderEntity orderEntity){
		return new Specification<OrderEntity>() {
			
			@Override
			public Predicate toPredicate(Root<OrderEntity> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicateList = new ArrayList<>();
				Predicate obj = null;
				if (orderEntity.getPaymentType() != null  ) {
					obj = cb.equal(root.get("paymentType"), orderEntity.getPaymentType());
					predicateList.add(obj);
				}
				
//				if(orderDetailEntity.getPaymentType() != null) {
//					obj = cb.like(cb.lower(root.get("paymentType")), "%" + CommonUtil.standardized(orderDetailEntity.getUsername().toLowerCase()) + "%");
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
