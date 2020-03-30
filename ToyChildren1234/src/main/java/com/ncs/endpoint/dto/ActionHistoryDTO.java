package com.ncs.endpoint.dto;

import java.util.Date;


public class ActionHistoryDTO {
	private int id;
	private String userName;
	private String action;
	private String module;
	private Date dateAction;
	private String detailAction;
	private String recordId;
	private String product;
	private String category;
	private String account;
	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	private String manipulation;
	private String status;
	private Object oldData;
	private Object newData;
	private Date startDate;
	private Date endDate;

	public ActionHistoryDTO() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public Date getDateAction() {
		return dateAction;
	}

	public void setDateAction(Date dateAction) {
		this.dateAction = dateAction;
	}

	public String getDetailAction() {
		return detailAction;
	}

	public void setDetailAction(String detailAction) {
		this.detailAction = detailAction;
	}

	public String getRecordId() {
		return recordId;
	}

	public void setRecordId(String recordId) {
		this.recordId = recordId;
	}

	public String getManipulation() {
		return manipulation;
	}

	public void setManipulation(String manipulation) {
		this.manipulation = manipulation;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Object getOldData() {
		return oldData;
	}

	public void setOldData(Object oldData) {
		this.oldData = oldData;
	}

	public Object getNewData() {
		return newData;
	}

	public void setNewData(Object newData) {
		this.newData = newData;
	}
}
