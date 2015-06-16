package com.dm.orm.mapper.entity;

/**
 * 院校tab页实体类
 * @author Huge
 */
public class CollegeTab
{
	//主键ID
	private Integer tabid;
	
	//标签页名字
	private String tabname;
	
	//搜索院校列表时请求参数名
	private String parameter;
	
	//标签页序号
	private Integer tabindex;
	
	//该选项下有列表时用于获取列表的参数，-1为无列表，>0则有列表
	private String listid;
	
	//考试类型
	private Integer collegetype;
	
	//考试类型名称（用于关联考试类型表查询）
	private String name;
	
	//关联插件
	private Integer pluginId;

	//参数列表ID（用于插入数据）
	private Integer definedId;

	public Integer getDefinedId() {
		return definedId;
	}

	public void setDefinedId(Integer definedId) {
		this.definedId = definedId;
	}

	public Integer getTabid() {
		return tabid;
	}

	public void setTabid(Integer tabid) {
		this.tabid = tabid;
	}

	public String getTabname() {
		return tabname;
	}

	public void setTabname(String tabname) {
		this.tabname = tabname;
	}

	public String getParameter() {
		return parameter;
	}

	public void setParameter(String parameter) {
		this.parameter = parameter;
	}

	public Integer getTabindex() {
		return tabindex;
	}

	public void setTabindex(Integer tabindex) {
		this.tabindex = tabindex;
	}

	public String getListid() {
		return listid;
	}

	public void setListid(String listid) {
		this.listid = listid;
	}

	public Integer getCollegetype() {
		return collegetype;
	}

	public void setCollegetype(Integer collegetype) {
		this.collegetype = collegetype;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getPluginId() {
		return pluginId;
	}

	public void setPluginId(Integer pluginId) {
		this.pluginId = pluginId;
	}
	
}
