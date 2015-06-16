package com.dm.orm.mapper.entity;

/**
 * 第三方提供商实体
 * @author M.simple
 *
 */
public class ThirdProvide 
{
	
	private Integer id;
	
	/**
	 * 第三方名称
	 */
	private String name;
	
	/**
	 * 第三方电话号码
	 */
	private String telephone;
	
	/**
	 * 第三方邮箱
	 */
	private String email;
	
	/**
	 * 第三方初始用户
	 */
	private String username;
	
	/**
	 * 联系人姓名
	 */
	private String linkname;
	
	/**
	 * 密码
	 */
	private String password;
	
	/**
	 * 通讯地址
	 */
	private String postalAddr;
	
	/**
	 * 第三方启用状态；0：已启用，1：已注销
	 */
	private int status;
	
	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	private int pagestart;
	private int pagesize;
	
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

	public String getLinkname() {
		return linkname;
	}

	public void setLinkname(String linkname) {
		this.linkname = linkname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPostalAddr() {
		return postalAddr;
	}

	public void setPostalAddr(String postalAddr) {
		this.postalAddr = postalAddr;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}
