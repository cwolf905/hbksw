package com.dm.orm.mapper.entity;

/**
 * 资讯tab页实体类
 * @author Huge
 */
public class InformationTab
{
	//主键ID
	private Integer id;
	
	//标签页名称
	private String tabname;
	
	//列表请求参数ids
	private String iids;
	
	//考试类型
	private Integer type;
	
	//考试类型名称(用于关联考试类型表查询)
	private String name;

	//标签页序号
	private Integer tabid;
	
	//关联插件ID
	private Integer pluginId;

	public Integer getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTabname() {
		return tabname;
	}

	public void setTabname(String tabname) {
		this.tabname = tabname;
	}

	public String getIids() {
		return iids;
	}

	public void setIids(String iids) {
		this.iids = iids;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getTabid() {
		return tabid;
	}

	public void setTabid(Integer tabid) {
		this.tabid = tabid;
	}

	public Integer getPluginId() {
		return pluginId;
	}

	public void setPluginId(Integer pluginId) {
		this.pluginId = pluginId;
	}
	
}
