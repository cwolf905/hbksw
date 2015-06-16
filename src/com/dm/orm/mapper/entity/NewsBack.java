package com.dm.orm.mapper.entity;



/**
 * 资讯消息备份实体(information的备份)
 * @author M.simple
 *
 */
public class NewsBack 
{

	private static final long serialVersionUID = 5984807424309658741L;

	public Integer id;
	public Integer newsId;
	public String title; // 标题
	public String content; // 内容
	public Integer topStatus;
	private String topTime;
	public Integer contentAudit;
	public String pushTitle;
	public Integer pushTitleAudit;

	private int pagestart;
	private int pagesize;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getNewsId() {
		return newsId;
	}
	public void setNewsId(Integer newsId) {
		this.newsId = newsId;
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
	public Integer getTopStatus() {
		return topStatus;
	}
	public void setTopStatus(Integer topStatus) {
		this.topStatus = topStatus;
	}
	public String getTopTime() {
		return topTime;
	}
	public void setTopTime(String topTime) {
		this.topTime = topTime;
	}
	public Integer getContentAudit() {
		return contentAudit;
	}
	public void setContentAudit(Integer contentAudit) {
		this.contentAudit = contentAudit;
	}
	public String getPushTitle() {
		return pushTitle;
	}
	public void setPushTitle(String pushTitle) {
		this.pushTitle = pushTitle;
	}
	public Integer getPushTitleAudit() {
		return pushTitleAudit;
	}
	public void setPushTitleAudit(Integer pushTitleAudit) {
		this.pushTitleAudit = pushTitleAudit;
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
