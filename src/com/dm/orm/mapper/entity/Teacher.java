package com.dm.orm.mapper.entity;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Teacher {

	private int teacherId;
	private String userName;
	private String password;
	private String powertype;
	private int cid;
	private int role;// 0答疑 1审核
	private int t; // 考试类型：101 高考， 102 自考， 103 成考， 104 考研， 105 综合考试
	private Date registerDate;
	private Date lastLogin;
	private String mobileNo;
	
	/**
	 * 是否需要短信通知，0：不通知 1：通知 默认为不通知
	 */
	private int isSms;

	public String getPowertype() {
		return powertype;
	}

	public void setPowertype(String powertype) {
		this.powertype = powertype;
	}

	public int getIsSms() {
		return isSms;
	}

	public void setIsSms(int isSms) {
		this.isSms = isSms;
	}

	public int getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(int teacherId) {
		this.teacherId = teacherId;
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

	public int getCid() {
		return cid;
	}

	public void setCid(int cid) {
		this.cid = cid;
	}

	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}

	public int getT() {
		return t;
	}

	public void setT(int t) {
		this.t = t;
	}

	public Date getRegisterDate() {
		return registerDate;
	}

	public void setRegisterDate(Date registerDate) {
		this.registerDate = registerDate;
	}

	public Date getLastLogin() {
		return lastLogin;
	}

	public void setLastLogin(Date lastLogin) {
		this.lastLogin = lastLogin;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
}
