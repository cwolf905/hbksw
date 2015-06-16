package com.dm.orm.mapper.entity;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * 复习备考插件关联知识点卡片
 * 
 * @author Anthony
 * 
 */
public class ReviewCard implements Serializable {

	private static final long serialVersionUID = 3560245455807827214L;

	private int id;
	private int pluginid;
	private String title; /* 标题 */
	private String content; /* 内容 */
	private int sn; /* 序号 */
	private Timestamp createtime; /* 创建时间 */

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPluginid() {
		return pluginid;
	}

	public void setPluginid(int pluginid) {
		this.pluginid = pluginid;
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

	public int getSn() {
		return sn;
	}

	public void setSn(int sn) {
		this.sn = sn;
	}

	public Timestamp getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Timestamp createtime) {
		this.createtime = createtime;
	}
}
