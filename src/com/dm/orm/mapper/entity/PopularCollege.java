package com.dm.orm.mapper.entity;

import java.io.Serializable;

/**
 * 推荐院校
 * 
 * @author Anthony
 * 
 */
public class PopularCollege implements Serializable {

	private static final long serialVersionUID = -9107676501462966133L;

	private int t; // 考试类型
	private int cid;
	private String schoolName;
	private int popularity; // 推荐顺序号

	public PopularCollege() {
		super();
	}

	public PopularCollege(int t, int cid, String schoolName, int popularity) {
		super();
		this.t = t;
		this.cid = cid;
		this.schoolName = schoolName;
		this.popularity = popularity;
	}

	public int getT() {
		return t;
	}

	public void setT(int t) {
		this.t = t;
	}

	public int getCid() {
		return cid;
	}

	public void setCid(int cid) {
		this.cid = cid;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public int getPopularity() {
		return popularity;
	}

	public void setPopularity(int popularity) {
		this.popularity = popularity;
	}
}
