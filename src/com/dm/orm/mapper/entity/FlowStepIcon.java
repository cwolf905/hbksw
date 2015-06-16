package com.dm.orm.mapper.entity;

/**
 * 流程步骤图标
 * @author M、simple
 *
 */
public class FlowStepIcon 
{
	
	private Integer id;
	
	/**
	 * 图标路径
	 */
	private String iconUrl;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getIconUrl() {
		return iconUrl;
	}

	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}

}
