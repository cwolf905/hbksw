package com.dm.orm.mapper.entity;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * App版本管理
 * 
 * @author Anthony
 * 
 */
public class AppRelease implements Serializable {

	private static final long serialVersionUID = 3831411438970596265L;

	private int id;
	private String appType;
	private String version; // 255
	private Timestamp releaseDate;
	private String releaseNote; // 255
	private String url; // 255

	private int pagestart;
	private int pagesize;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAppType() {
		return appType;
	}

	public void setAppType(String appType) {
		this.appType = appType;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public Timestamp getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Timestamp releaseDate) {
		this.releaseDate = releaseDate;
	}

	public String getReleaseNote() {
		return releaseNote;
	}

	public void setReleaseNote(String releaseNote) {
		this.releaseNote = releaseNote;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
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
