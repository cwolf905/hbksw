package com.dm.orm.mapper.entity;

import java.sql.Timestamp;

/**
 * 自定义客户端推送实体类
* @ClassName: CustomPush 
* @Description: TODO(自定义客户端推送实体类) 
* @author Wanglei weejion.com 
* @date 2015年4月22日 下午3:35:57 
*
 */
public class CustomPush 
{
	 
	private Long id;
	
	private String title;
	
	private String content;
	
	private String pushTitle;
	
	private String pushType;
	
	private Integer examType;
	
	private String pushTag;
	
	private Integer contentAudit;
	
	private Integer pushTitleAudit;
	
	private String source;
	
	private Timestamp createTime;
	
	private Integer topStatus;
	
	private String topTime;
	
	// modified by yanfulei 增加推送标签和院校ID
	private Integer collegeId;
	
	private String infoType;
	
	private int pagestart;
	
	private int pagesize;
	
	public int getPagestart() {
		return pagestart;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public Integer getCollegeId() {
		return collegeId;
	}

	public void setCollegeId(Integer collegeId) {
		this.collegeId = collegeId;
	}

	public String getInfoType() {
		return infoType;
	}

	public void setInfoType(String infoType) {
		this.infoType = infoType;
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

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getPushType() {
		return pushType;
	}

	public void setPushType(String pushType) {
		this.pushType = pushType;
	}

	public Integer getExamType() {
		return examType;
	}

	public void setExamType(Integer examType) {
		this.examType = examType;
	}

	public String getPushTag() {
		return pushTag;
	}

	public void setPushTag(String pushTag) {
		this.pushTag = pushTag;
	}
	
}
