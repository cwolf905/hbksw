package com.dm.rest.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class QRCode {

	private long id;
	private int cid;
	private String schoolName;
	private String schoolUrl;
	private String imgPath;
	private String examtype;

	public QRCode() {
		super();
	}

	public QRCode(long id, int cid, String schoolName, String schoolUrl,
			String imgPath) {
		super();
		this.id = id;
		this.cid = cid;
		this.schoolName = schoolName;
		this.schoolUrl = schoolUrl;
		this.imgPath = imgPath;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public String getSchoolUrl() {
		return schoolUrl;
	}

	public void setSchoolUrl(String schoolUrl) {
		this.schoolUrl = schoolUrl;
	}

	public String getImgPath() {
		return imgPath;
	}

	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}

	public String getExamtype() {
		return examtype;
	}

	public void setExamtype(String examtype) {
		this.examtype = examtype;
	}

}
