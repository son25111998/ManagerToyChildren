package com.ncs.specifications;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.ncs.common.CommonUtil;
import com.ncs.entity.ManufacturerEntity;

public class ManufacturerSpecifications {
	public static Specification<ManufacturerEntity> advanceFilter(ManufacturerEntity manufacturerEntity){
		return new Specification<ManufacturerEntity>() {
			
			@Override
			public Predicate toPredicate(Root<ManufacturerEntity> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicateList = new ArrayList<>();
				Predicate obj = null;
				
				if(manufacturerEntity.getName() != null && !manufacturerEntity.getName().equals("")) {
					obj = cb.like(cb.lower(root.get("username")), "%" + CommonUtil.standardized(manufacturerEntity.getName().toLowerCase()) + "%");
					predicateList.add(obj);	
				}
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
