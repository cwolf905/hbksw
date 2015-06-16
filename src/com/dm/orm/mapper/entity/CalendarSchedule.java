package com.dm.orm.mapper.entity;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * 考试日历考试安排表
 * 
 * @author Anthony
 * 
 */
public class CalendarSchedule implements Serializable {

	private static final long serialVersionUID = 3467227859011526461L;

	private int id;
	private int examtype; /* 考试类型 */
	private String name; /* 名称 */
	private String content; /* 内容 */
	private Timestamp timing; /* 时间点 */
	private Timestamp createtime; /* 创建时间 */
	private Integer pluginId;
	
	private String starttime;
	private String endtime;

	private int pagestart;
	private int pagesize;

	public Integer getPluginId() {
		return pluginId;
	}

	public void setPluginId(Integer pluginId) {
		this.pluginId = pluginId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getExamtype() {
		return examtype;
	}

	public void setExamtype(int examtype) {
		this.examtype = examtype;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Timestamp getTiming() {
		return timing;
	}

	public void setTiming(Timestamp timing) {
		this.timing = timing;
	}

	public Timestamp getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Timestamp createtime) {
		this.createtime = createtime;
	}

	public String getStarttime() {
		return starttime;
	}

	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}

	public String getEndtime() {
		return endtime;
	}

	public void setEndtime(String endtime) {
		this.endtime = endtime;
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
