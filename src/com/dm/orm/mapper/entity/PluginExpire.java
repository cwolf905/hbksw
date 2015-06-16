package com.dm.orm.mapper.entity;

import java.io.Serializable;

/**
 * 插件订购到期实体
 * @author M.simple
 *
 */
public class PluginExpire implements Serializable 
{

	private static final long serialVersionUID = -4921293970817872935L;

	private String userId;
	
	private Integer pluginid;
	
	private String pluginName;
	
	private String registrationId;
	
	private String startTime;
	
	private String endTime;


	
	
	public String getRegistrationId() {
		return registrationId;
	}

	public void setRegistrationId(String registrationId) {
		this.registrationId = registrationId;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Integer getPluginid() {
		return pluginid;
	}

	public void setPluginid(Integer pluginid) {
		this.pluginid = pluginid;
	}

	public String getPluginName() {
		return pluginName;
	}

	public void setPluginName(String pluginName) {
		this.pluginName = pluginName;
	}
	
}
