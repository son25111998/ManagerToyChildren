package com.ncs.specifications;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.ncs.entity.CountResquest;;

public class CountRequestSpecifications {
	public static Specification<CountResquest> advanceFilter(CountResquest countResquest){
		return new Specification<CountResquest>() {
			
			@Override
			public Predicate toPredicate(Root<CountResquest> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicateList = new ArrayList<>();
				Predicate obj = null;
				
//				if(countResquest.getIdProduct() != null && !countResquest.getIdProduct().equals("")) {
//					obj = cb.like(cb.lower(root.get("name")), "%" + CommonUtil.standardized(countResquest.getIdProduct()+ "%");
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
