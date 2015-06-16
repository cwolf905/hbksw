package com.dm.orm.mapper.entity;

/**
 * 搜索控件实体类
 * @author Huge
 */
public class SearchWidget
{
	//主键
	private Integer swid;
	
	//控件类型
	private String type;
	
	//默认文字描述
	private String txt;
	
	//下拉框获取列表内容的请求参数；非下拉框为""
	private String listid;
	
	//搜索院校列表时请求参数名
	private String parameter;

	public Integer getSwid() {
		return swid;
	}

	public void setSwid(Integer swid) {
		this.swid = swid;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTxt() {
		return txt;
	}

	public void setTxt(String txt) {
		this.txt = txt;
	}

	public String getListid() {
		return listid;
	}

	public void setListid(String listid) {
		this.listid = listid;
	}

	public String getParameter() {
		return parameter;
	}

	public void setParameter(String parameter) {
		this.parameter = parameter;
	}
}
