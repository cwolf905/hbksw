package com.dm.orm.mapper.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class InfoSubject implements Serializable {

	private static final long serialVersionUID = -1508204131212402278L;

	private int id;
	private int examtype;
	private int sid;
	private String title;
	private String iids;
	private int recommend;
	private Timestamp recommendtime;
	private Timestamp createtime;
	private String description;

	private int pagestart;
	private int pagesize;
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public int getSid() {
		return sid;
	}

	public void setSid(int sid) {
		this.sid = sid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getIids() {
		return iids;
	}

	public void setIids(String iids) {
		this.iids = iids;
	}

	public int getRecommend() {
		return recommend;
	}

	public void setRecommend(int recommend) {
		this.recommend = recommend;
	}

	public Timestamp getRecommendtime() {
		return recommendtime;
	}

	public void setRecommendtime(Timestamp recommendtime) {
		this.recommendtime = recommendtime;
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
