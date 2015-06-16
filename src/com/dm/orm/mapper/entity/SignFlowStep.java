package com.dm.orm.mapper.entity;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * 报考流程关联步骤
 * 
 * @author Anthony
 * 
 */
public class SignFlowStep implements Serializable {

	private static final long serialVersionUID = -5899273834713192277L;

	private int id;
	private int flowid; /* 流程ID */
	private String name; /* 名称 */
	private String description; /* 描述 */
	private Timestamp begintime; /* 开始时间 */
	private Timestamp endtime; /* 结束时间 */
	private Timestamp createtime; /* 创建时间 */
	private Integer iconId;
	private String iconUrl;

	public String getIconUrl() {
		return iconUrl;
	}

	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}

	public Integer getIconId() {
		return iconId;
	}

	public void setIconId(Integer iconId) {
		this.iconId = iconId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getFlowid() {
		return flowid;
	}

	public void setFlowid(int flowid) {
		this.flowid = flowid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Timestamp getBegintime() {
		return begintime;
	}

	public void setBegintime(Timestamp begintime) {
		this.begintime = begintime;
	}

	public Timestamp getEndtime() {
		return endtime;
	}

	public void setEndtime(Timestamp endtime) {
		this.endtime = endtime;
	}

	public Timestamp getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Timestamp createtime) {
		this.createtime = createtime;
	}
}
