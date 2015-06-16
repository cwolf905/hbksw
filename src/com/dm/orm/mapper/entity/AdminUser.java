package com.dm.orm.mapper.entity;

import java.io.Serializable;

public class AdminUser implements Serializable {

	private static final long serialVersionUID = -4921293970817872935L;

	private int adminid;
	private String loginname;
	private String password;
	private String truename;
	private int powertype;
	private String regdate;
	private String logindate;
	private String loginip;
	private int logins;

	private String lastip; // 上次登录的IP
	
	/**
	 * 角色标示
	 */
	private int roleId;

	private int pagestart;
	private int pagesize;

	public AdminUser() {
		super();
	}

	public int getRoleId() {
		return roleId;
	}


	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}


	public int getAdminid() {
		return adminid;
	}

	public void setAdminid(int adminid) {
		this.adminid = adminid;
	}

	public String getLoginname() {
		return loginname;
	}

	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getTruename() {
		return truename;
	}

	public void setTruename(String truename) {
		this.truename = truename;
	}

	public int getPowertype() {
		return powertype;
	}

	public void setPowertype(int powertype) {
		this.powertype = powertype;
	}

	public String getRegdate() {
		return regdate;
	}

	public void setRegdate(String regdate) {
		this.regdate = regdate;
	}

	public String getLogindate() {
		return logindate;
	}

	public void setLogindate(String logindate) {
		this.logindate = logindate;
	}

	public String getLoginip() {
		return loginip;
	}

	public void setLoginip(String loginip) {
		this.loginip = loginip;
	}

	public int getLogins() {
		return logins;
	}

	public void setLogins(int logins) {
		this.logins = logins;
	}

	public String getLastip() {
		return lastip;
	}

	public void setLastip(String lastip) {
		this.lastip = lastip;
	}

	public int getPagestart() {
		return pagestart;
	}

	public void setPagestart(int pagestart) {
		this.pagestart = pagestart;
	}

	public int getPagesize() {
		return pagesize;
	}

	public void setPagesize(int pagesize) {
		this.pagesize = pagesize;
	}

	@Override
	public String toString() {
		return adminid + "#" + loginname + "#" + password + "#" + truename
				+ "#" + powertype + "#" + regdate + "#" + logindate + "#"
				+ loginip + "#" + logins;
	}
}
