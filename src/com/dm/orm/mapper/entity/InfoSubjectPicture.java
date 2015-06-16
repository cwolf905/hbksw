package com.dm.orm.mapper.entity;

import java.io.Serializable;

public class InfoSubjectPicture implements Serializable {

	private static final long serialVersionUID = -547018219630990912L;

	private int id;
	private int infoSubjectId;
	private String picture;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getInfoSubjectId() {
		return infoSubjectId;
	}

	public void setInfoSubjectId(int infoSubjectId) {
		this.infoSubjectId = infoSubjectId;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}
}
