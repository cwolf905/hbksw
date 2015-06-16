package com.dm.orm.mapper.entity;

/**
 * 院校tab页参数实体类
 * @author Huge
 */
public class CollegeTabDefine
{
	//主键
	private Integer id;
	
	//标签页名称
	private String tabName;
	
	//搜索院校列表时请求参数名
	private String parameter;
	
	//该选项下有列表时用于获取列表的参数，-1为无列表，>0则有列表
	private String listId;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTabName() {
		return tabName;
	}

	public void setTabName(String tabName) {
		this.tabName = tabName;
	}

	public String getParameter() {
		return parameter;
	}

	public void setParameter(String parameter) {
		this.parameter = parameter;
	}

	public String getListId() {
		return listId;
	}

	public void setListId(String listId) {
		this.listId = listId;
	}
}
