package com.dm.orm.mapper.entity;

import java.io.Serializable;

/**
 * 插件广告
 * 
 * @author Anthony
 * 
 */
public class MobileAdNew implements Serializable {

	private static final long serialVersionUID = -3262562641855076404L;

	private int id;
	private int examtype;
	private int adtype;
	private int pluginid;
	private String img;
	private String value;
	private int adorder;

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

	public int getAdtype() {
		return adtype;
	}

	public void setAdtype(int adtype) {
		this.adtype = adtype;
	}

	public int getPluginid() {
		return pluginid;
	}

	public void setPluginid(int pluginid) {
		this.pluginid = pluginid;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public int getAdorder() {
		return adorder;
	}

	public void setAdorder(int adorder) {
		this.adorder = adorder;
	}
}
