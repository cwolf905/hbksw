package com.dm.orm.mapper.entity;

/**
 * 插件与插件类型对应实体
 * @author M.simple
 *
 */
public class PluginAndCategory 
{
	
	private Integer id;
	
	/**
	 * 插件表主键
	 */
	private Integer pluginId;
	
	/**
	 * 插件类型表主键
	 */
	private Integer pluginCategoryId;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getPluginId() {
		return pluginId;
	}

	public void setPluginId(Integer pluginId) {
		this.pluginId = pluginId;
	}

	public Integer getPluginCategoryId() {
		return pluginCategoryId;
	}

	public void setPluginCategoryId(Integer pluginCategoryId) {
		this.pluginCategoryId = pluginCategoryId;
	}
	
}
