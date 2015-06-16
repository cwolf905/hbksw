package com.dm.orm.mapper.entity;


/**
 * 资讯消息备份实体(information的备份)
 * @author M.simple
 *
 */
public class InformationBack 
{
	
	private Integer id;
	
	private Integer informationId;
	
	private String title;
	
	private String content;
	
	private String pushTitle;
	
	private Integer contentAudit;
	
	private Integer pushTitleAudit;
	
	private Integer topStatus;
	
	private String topTime;
	
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

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getInformationId() {
		return informationId;
	}

	public void setInformationId(Integer informationId) {
		this.informationId = informationId;
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

	public String getPushTitle() {
		return pushTitle;
	}

	public void setPushTitle(String pushTitle) {
		this.pushTitle = pushTitle;
	}

	public Integer getContentAudit() {
		return contentAudit;
	}

	public void setContentAudit(Integer contentAudit) {
		this.contentAudit = contentAudit;
	}

	public Integer getPushTitleAudit() {
		return pushTitleAudit;
	}

	public void setPushTitleAudit(Integer pushTitleAudit) {
		this.pushTitleAudit = pushTitleAudit;
	}
	
}
