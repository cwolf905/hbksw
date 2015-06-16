package com.dm.orm.biz.impl;

public class BizException extends RuntimeException {

	private static final long serialVersionUID = 3145729259252721091L;

	private String description = "";

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BizException() {
		super();
	}

	public BizException(String message) {
		super(message);
	}

	public BizException(String message, String description) {
		super(message);
		this.description = description;
	}
}
