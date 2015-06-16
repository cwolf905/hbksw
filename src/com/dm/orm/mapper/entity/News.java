package com.dm.orm.mapper.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.dm.rest.model.PushRequest;

public class News implements Serializable {

	private static final long serialVersionUID = 5984807424309658741L;

	public Integer nid;
	public Integer cid; // 院校id
	public String title; // 标题
	public Timestamp addTime;
	public String content; // 内容
	public Integer t;// 考试类型
	public Integer newsType; // 资讯类型，1简讯，2文章
	public Integer push;
	
	public Integer newBackId;
	public String editContent; // 内容
	public Integer topStatus;
	public String topTime;
	public Integer contentAudit;
	public String pushTitle;
	public Integer pushTitleAudit;
	public String tagName;

	public String getTagName() {
		return tagName;
	}
	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

	private int pagestart;
	private int pagesize;
	public Integer getNid() {
		return nid;
	}
	public void setNid(Integer nid) {
		this.nid = nid;
	}
	public Integer getCid() {
		return cid;
	}
	public void setCid(Integer cid) {
		this.cid = cid;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
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
	public Integer getT() {
		return t;
	}
	public void setT(Integer t) {
		this.t = t;
	}
	public Integer getNewsType() {
		return newsType;
	}
	public void setNewsType(Integer newsType) {
		this.newsType = newsType;
	}
	public Integer getPush() {
		return push;
	}
	public void setPush(Integer push) {
		this.push = push;
	}
	public Integer getNewBackId() {
		return newBackId;
	}
	public void setNewBackId(Integer newBackId) {
		this.newBackId = newBackId;
	}
	public String getEditContent() {
		return editContent;
	}
	public void setEditContent(String editContent) {
		this.editContent = editContent;
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
	/**
	 * 
	* @Title: toAuraroPush 
	* @Description: 院校资讯推送 
	* @param @return    设定文件 
	* @return PushRequest    返回类型 
	* @throws
	 */
	public PushRequest toAuraroPush()
	{
		
		PushRequest pushRequest = new PushRequest();
		pushRequest.setMsg(this.getPushTitle());
		pushRequest.setType("9");
		pushRequest.setC_id(this.getNid().toString());
		List<String> tag = new ArrayList<String>();
		String infoTab = this.getTagName();
		if(!"".equals(infoTab))
		{
			String[] split = infoTab.split(",");
			for(String tab : split)
			{
				tag.add(tab);
			}
		}	
		pushRequest.setTag(tag);
		
		return pushRequest;
	}
	
	/**
	 * 
	* @Title: toAuraroPushNew 
	* @Description: 老师回答后提醒学生推送 
	* @param @return    设定文件 
	* @return PushRequest    返回类型 
	* @throws
	 */
	public PushRequest toAuraroPushNew()
	{
		
		PushRequest pushRequest = new PushRequest();
		pushRequest.setMsg(this.getPushTitle());
		pushRequest.setType(this.getNewsType().toString());
		pushRequest.setQa_id(this.getNid().toString());
		List<String> rId = new ArrayList<String>();
		String rid = this.getTagName();
		if(!"".equals(rid))
		{
			String[] split = rid.split(",");
			for(String str : split)
			{
				rId.add(str);
			}
		}	
		pushRequest.setRegistration_id(rId);
		
		return pushRequest;
	}
}
