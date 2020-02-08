package com.ncs.specifications;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.ncs.common.CommonUtil;
import com.ncs.entity.ProductEntity;


/**
 * @author: SonNH - SAVIS
 * @created: 9/12/19
 * @Time: 15:23
 * @modified 9/12/19
 **/
public class ProductSpecifications {
	public static Specification<ProductEntity> advanceFilter(ProductEntity product){
		return new Specification<ProductEntity>() {
			
			@Override
			public Predicate toPredicate(Root<ProductEntity> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicateList = new ArrayList<>();
				Predicate obj = null;
				
				if(product.getName() != null && !product.getName().equals("")) {
					obj = cb.like(cb.lower(root.get("nameProduct")), "%" + CommonUtil.standardized(product.getName().toLowerCase()) + "%");
					predicateList.add(obj);	
				}
//				if (product.getStatuss() != null && !product.getStatuss().equals("")) {
//					obj = cb.like(cb.lower(root.get("statuss")), "%" + product.getStatuss().toLowerCase() + "%");
//					predicateList.add(obj);
//				}
				
				query.orderBy(cb.desc(root.get("idAmphitheater")));
				return cb.and(predicateList.toArray(new Predicate[predicateList.size()]));
			}
		};
	}
}
