package com.dm.orm.mapper.entity;

import java.io.Serializable;

public class UserJpushMapping implements Serializable 
{

	private static final long serialVersionUID = -4921293970817872935L;
	
	private Integer id;
	
	private String userId;
	
	private String alias;
	
	private String registration_id;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getRegistration_id() {
		return registration_id;
	}

	public void setRegistration_id(String registrationId) {
		registration_id = registrationId;
	}

}
