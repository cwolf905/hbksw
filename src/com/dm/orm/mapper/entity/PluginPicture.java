package com.dm.orm.mapper.entity;

import java.io.Serializable;

public class PluginPicture implements Serializable {

	private static final long serialVersionUID = -547018219630990912L;

	private int id;
	private int pluginid;
	private String picture;

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

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}
}
