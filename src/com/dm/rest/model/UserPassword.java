package com.dm.rest.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class UserPassword {

	private String userName;
	private String password;
	private String newPassword;

	public UserPassword() {
		super();
	}

	public UserPassword(String userName, String password, String newPassword) {
		super();
		this.userName = userName;
		this.password = password;
		this.newPassword = newPassword;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
}
