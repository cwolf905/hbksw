package com.dm.orm.mapper.entity;

import java.io.Serializable;

public class InfoSubjectContent implements Serializable {

	private static final long serialVersionUID = -1508204131212402278L;
	// 对应表是 infosubjectcontent
	private int id;
	private String title;
	private int type;
	private String content;
	private int infosubid;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}


	public int getInfosubid() {
		return infosubid;
	}

	public void setInfosubid(int infosubid) {
		this.infosubid = infosubid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
