package com.dm.rest.model;

public class Notification {

	private String userId = "";
	private CtxMessage message = new CtxMessage();

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public CtxMessage getMessage() {
		return message;
	}

	public void setMessage(CtxMessage message) {
		this.message = message;
	}
}
