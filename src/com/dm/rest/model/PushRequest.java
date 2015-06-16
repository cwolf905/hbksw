package com.dm.rest.model;

import java.util.ArrayList;
import java.util.List;

public class PushRequest {
	
	/*
	 * 推送类型
          1资讯2专题3分数4录取5招生答疑6院校答疑7日历事件8日历倒计时 9院校资讯 10客户插件到期提醒11院校介绍
       1、      资讯id，titil:推送标题    information_back:pushTitle
       2、      专题id，titil :推送标题  infosubject:title
       3、4、examType,title：查询结果   后台
       5、6、问题id,title:问题标题  另写一个取问题详情的接口
       7、      examType,templateId，插件id,事件id，title:事件标题   
       8、      examType,   templateId,插件 id,倒计时id,title:倒计时文本
       9    院校资讯id，titil:推送标题
       10   title:提示文本（您的XXX插件既将到期）,点击启动APP
       11   院校id，titil:推送标题
	 */

	public List<String> tag = new ArrayList<String>();
	public List<String> tag_and = new ArrayList<String>();
	public List<String> alias = new ArrayList<String>();
	public List<String> registration_id = new ArrayList<String>();
	
	public String msg = "";
	public String type = "";
	
	//1
	public String info_id = "";
	
	//2
	public String sub_id = "";
	
	//3,4
	public String examtype = "";
	
	//5,6
	public String qa_id = "";
	
	//7
//	public String examtype = "";
	public String template_id = "";
	public String plugin_id = "";
	public String event_id = "";
	
	//8
//	public String examtype = "";
//	public String template_id = "";
//	public String plugin_id = "";
	public String timer_id = "";
	
	//9
	public String c_id = "";
	//11
	public String collegeId = "";
	
	/**
	 * 是否自定义推送
	 */
	public String isCustomPush = "0";

	public List<String> getTag() {
		return tag;
	}

	public void setTag(List<String> tag) {
		this.tag = tag;
	}

	public List<String> getTag_and() {
		return tag_and;
	}

	public void setTag_and(List<String> tagAnd) {
		tag_and = tagAnd;
	}

	public List<String> getAlias() {
		return alias;
	}

	public void setAlias(List<String> alias) {
		this.alias = alias;
	}

	public List<String> getRegistration_id() {
		return registration_id;
	}

	public void setRegistration_id(List<String> registrationId) {
		registration_id = registrationId;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getInfo_id() {
		return info_id;
	}

	public void setInfo_id(String infoId) {
		info_id = infoId;
	}

	public String getSub_id() {
		return sub_id;
	}

	public void setSub_id(String subId) {
		sub_id = subId;
	}

	public String getExamtype() {
		return examtype;
	}

	public void setExamtype(String examtype) {
		this.examtype = examtype;
	}

	public String getQa_id() {
		return qa_id;
	}

	public void setQa_id(String qaId) {
		qa_id = qaId;
	}

	public String getTemplate_id() {
		return template_id;
	}

	public void setTemplate_id(String templateId) {
		template_id = templateId;
	}

	public String getPlugin_id() {
		return plugin_id;
	}

	public void setPlugin_id(String pluginId) {
		plugin_id = pluginId;
	}

	public String getEvent_id() {
		return event_id;
	}

	public void setEvent_id(String eventId) {
		event_id = eventId;
	}

	public String getTimer_id() {
		return timer_id;
	}

	public void setTimer_id(String timerId) {
		timer_id = timerId;
	}

	public String getC_id() {
		return c_id;
	}

	public void setC_id(String cId) {
		c_id = cId;
	}

	public String getCollegeId() {
		return collegeId;
	}

	public void setCollegeId(String collegeId) {
		this.collegeId = collegeId;
	}

	public String getIsCustomPush() {
		return isCustomPush;
	}

	public void setIsCustomPush(String isCustomPush) {
		this.isCustomPush = isCustomPush;
	}

	
}

