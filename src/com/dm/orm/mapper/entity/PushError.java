package com.dm.orm.mapper.entity;

import java.io.Serializable;

/**
 * 推送失败日志
 * 
 * @author Anthonyxw
 * 
 */
public class PushError implements Serializable {

	private static final long serialVersionUID = 8895461947416140739L;

	private int id;
	private int pushtype;
	private String context;
	private String addtime;
	
	private int pagestart;
	private int pagesize;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPushtype() {
		return pushtype;
	}

	public void setPushtype(int pushtype) {
		this.pushtype = pushtype;
	}

	public String getContext() {
		return context;
	}

	public void setContext(String context) {
		this.context = context;
	}

	public String getAddtime() {
		return addtime;
	}

	public void setAddtime(String addtime) {
		this.addtime = addtime;
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
}
