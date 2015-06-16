package com.dm.orm.mapper.entity;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * 报考流程关联步骤的关联政策
 * 
 * @author Anthony
 * 
 */
public class SignFlowStepPolicy implements Serializable {

	private static final long serialVersionUID = 7268326040238868399L;

	private int id;
	private int stepid; /* 步骤ID */
	private String title; /* 标题 */
	private String content; /* 内容 */
	private String picture; /* 图片 */
	private Timestamp createtime; /* 创建时间 */

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getStepid() {
		return stepid;
	}

	public void setStepid(int stepid) {
		this.stepid = stepid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public Timestamp getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Timestamp createtime) {
		this.createtime = createtime;
	}
}
