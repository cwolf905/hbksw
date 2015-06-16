package com.dm.orm.mapper.entity;

import java.io.Serializable;

public class Role implements Serializable
{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7787398684490355464L;
	
	/**
	 * 角色Id
	 */
	private Integer id;
	
	/**
	 * 角色名称
	 */
	private String name;
	
	/**
	 * 角色标示 0:普通角色  可以删除   1：admin角色  不可删除
	 */
	private Integer flag;
	
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

	public Integer getFlag() {
		return flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
	}
}
