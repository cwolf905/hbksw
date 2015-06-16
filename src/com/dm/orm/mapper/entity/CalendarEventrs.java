package com.dm.orm.mapper.entity;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * 考试日历系统事件关联资源
 * 
 * @author Anthony
 * 
 */
public class CalendarEventrs implements Serializable {

	private static final long serialVersionUID = 6910624378121238153L;

	private int id;
	private int eventid; /* 考试类型 */
	private String title;
	private int rstype; /* 资源类型（资讯、院校、院校资讯、外部链接） */
	private String rsvalue; /* 资源的取值 */
	private Timestamp createtime; /* 创建时间 */

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getEventid() {
		return eventid;
	}

	public void setEventid(int eventid) {
		this.eventid = eventid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getRstype() {
		return rstype;
	}

	public void setRstype(int rstype) {
		this.rstype = rstype;
	}

	public String getRsvalue() {
		return rsvalue;
	}

	public void setRsvalue(String rsvalue) {
		this.rsvalue = rsvalue;
	}

	public Timestamp getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Timestamp createtime) {
		this.createtime = createtime;
	}
}
