package com.ncs.common;

import java.util.Date;

public class ActionHistoryDTO {
	private int actionHistoryId;
	private String userName;
	private String action;
	private String module;
	private String detailAction;
	private Date dateAction;
	private Date startDate;
	private Date endDate;

	public ActionHistoryDTO() {
	}

	public int getActionHistoryId() {
		return actionHistoryId;
	}

	public void setActionHistoryId(int actionHistoryId) {
		this.actionHistoryId = actionHistoryId;
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

	public String getDetailAction() {
		return detailAction;
	}

	public void setDetailAction(String detailAction) {
		this.detailAction = detailAction;
	}

	public Date getDateAction() {
		return dateAction;
	}

	public void setDateAction(Date dateAction) {
		this.dateAction = dateAction;
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

	public ActionHistoryDTO(int actionHistoryId, String userName, String action, String module, String detailAction, Date dateAction, Date startDate, Date endDate) {
		this.actionHistoryId = actionHistoryId;
		this.userName = userName;
		this.action = action;
		this.module = module;
		this.detailAction = detailAction;
		this.dateAction = dateAction;
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
