package com.dm.orm.mapper.entity;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * 推荐时间点设置
 * 
 * @author Anthony
 * 
 */
public class PushTemplate implements Serializable {

	private static final long serialVersionUID = -7503910318041730923L;

	private int id;
	private int pushtype; // 推送类型
	private int examtype; // 考试类型
	private String clock;
	private String message; // 消息模板
	private Timestamp createtime;

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

	public int getExamtype() {
		return examtype;
	}

	public void setExamtype(int examtype) {
		this.examtype = examtype;
	}

	public String getClock() {
		return clock;
	}

	public void setClock(String clock) {
		this.clock = clock;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Timestamp getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Timestamp createtime) {
		this.createtime = createtime;
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
