package com.dm.orm.mapper.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class Information implements Serializable {

	private static final long serialVersionUID = 7217461811274413832L;
	
	public Integer iid;
	public String title; // 标题
	public String subTitle;
	public String titleColor;
	public String infoRemark;
	public String author; // 作者
	public String source; // 来源
	public Integer browse;
	public Integer inforOrder;
	public Integer infoCheck;
	public String keyword;
	public Timestamp addTime; //
	public String content; // 内容
	public Integer cid; // 类目
	public String involveCid;
	public String img;
	public String newsLink;
	public Integer commend;
	public Timestamp commendTime;
	public Integer push;
	public Integer getIid() {
		return iid;
	}
	public void setIid(Integer iid) {
		this.iid = iid;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSubTitle() {
		return subTitle;
	}
	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}
	public String getTitleColor() {
		return titleColor;
	}
	public void setTitleColor(String titleColor) {
		this.titleColor = titleColor;
	}
	public String getInfoRemark() {
		return infoRemark;
	}
	public void setInfoRemark(String infoRemark) {
		this.infoRemark = infoRemark;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public Integer getBrowse() {
		return browse;
	}
	public void setBrowse(Integer browse) {
		this.browse = browse;
	}
	public Integer getInforOrder() {
		return inforOrder;
	}
	public void setInforOrder(Integer inforOrder) {
		this.inforOrder = inforOrder;
	}
	public Integer getInfoCheck() {
		return infoCheck;
	}
	public void setInfoCheck(Integer infoCheck) {
		this.infoCheck = infoCheck;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public Timestamp getAddTime() {
		return addTime;
	}
	public void setAddTime(Timestamp addTime) {
		this.addTime = addTime;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Integer getCid() {
		return cid;
	}
	public void setCid(Integer cid) {
		this.cid = cid;
	}
	public String getInvolveCid() {
		return involveCid;
	}
	public void setInvolveCid(String involveCid) {
		this.involveCid = involveCid;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getNewsLink() {
		return newsLink;
	}
	public void setNewsLink(String newsLink) {
		this.newsLink = newsLink;
	}
	public Integer getCommend() {
		return commend;
	}
	public void setCommend(Integer commend) {
		this.commend = commend;
	}
	public Timestamp getCommendTime() {
		return commendTime;
	}
	public void setCommendTime(Timestamp commendTime) {
		this.commendTime = commendTime;
	}
	public Integer getPush() {
		return push;
	}
	public void setPush(Integer push) {
		this.push = push;
	}

}
