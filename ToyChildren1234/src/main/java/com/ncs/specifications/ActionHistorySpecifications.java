package com.ncs.specifications;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.ncs.entity.AmActionHistory;

/**
 * @author SonHD
 * @created 15/09/2017
 * 
 * @modified 
 * @modifier 
 */
public class ActionHistorySpecifications {
	public static Specification<AmActionHistory> advanceFilter(AmActionHistory actionHistory, Date startDate, Date endDate) {
		return new Specification<AmActionHistory>() {

			@Override
			public Predicate toPredicate(Root<AmActionHistory> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicateList = new ArrayList<>();
				Predicate obj = null;
				String empty = "";
				// action History properties.
				int id = actionHistory.getId();
				String userName = actionHistory.getUserName();
				String action = actionHistory.getAction();
				String module = actionHistory.getModule();
				String product = actionHistory.getProduct();
				String account = actionHistory.getAccount();
				String category = actionHistory.getCategory();
				String status = actionHistory.getStatus();

				if (id != 0) {
					obj = cb.equal(root.get("id"), id);
					predicateList.add(obj);
				}
				if (userName != null && !empty.equals(userName)) {
					obj = cb.like(cb.lower(root.get("userName")), "%" + userName.toLowerCase() + "%");
					predicateList.add(obj);
				}
				if (action != null && !empty.equals(action)) {
					obj = cb.like(cb.lower(root.get("action")), "%" + action.toLowerCase() + "%");
					predicateList.add(obj);
				}
				if (module != null && !empty.equals(module)) {
					obj = cb.like(cb.lower(root.get("module")), "%" + module.toLowerCase() + "%");
					predicateList.add(obj);
				}
				if (product != null && !empty.equals(product)) {
					obj = cb.like(cb.lower(root.get("product")), "%" + product.toLowerCase() + "%");
					predicateList.add(obj);
				}
				if (category != null && !empty.equals(category)) {
					obj = cb.like(cb.lower(root.get("category")), "%" + category.toLowerCase() + "%");
					predicateList.add(obj);
				}
				if (account != null && !empty.equals(account)) {
					obj = cb.like(cb.lower(root.get("account")), "%" + account.toLowerCase() + "%");
					predicateList.add(obj);
				}
				if (status != null && !empty.equals(status)) {
					obj = cb.like(cb.lower(root.get("status")), "%" + status.toLowerCase() + "%");
					predicateList.add(obj);
				}

				if (startDate != null) {
					obj = cb.greaterThanOrEqualTo(root.get("dateAction"), startDate);
					predicateList.add(obj);
				}
				if (endDate != null) {
					obj = cb.lessThanOrEqualTo(root.get("dateAction"), endDate);
					predicateList.add(obj);
				}
				
				query.orderBy(cb.desc(root.get("id")));
				return cb.and(predicateList.toArray(new Predicate[predicateList.size()]));
			}

		};
	}
}
