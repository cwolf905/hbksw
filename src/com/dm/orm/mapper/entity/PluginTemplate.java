package com.dm.orm.mapper.entity;

/**
 * 插件模版
 * @author M、simple
 *
 */
public class PluginTemplate 
{
	
	/**
	 * 模版Id
	 */
	private String id;
	
	/**
	 * 模版名称
	 */
	private String name;
	
	/**
	 * 模版排序
	 */
	private Integer orderNumber;
	
	private Integer flag;

	public Integer getFlag() {
		return flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(Integer orderNumber) {
		this.orderNumber = orderNumber;
	}
	
}
