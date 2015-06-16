package com.dm.orm.mapper.entity;

/**
 * 院校控件搜索区域实体类
 * @author Huge
 */
public class SearchWidgetGroup
{
	//主键
	private Integer swgid;
	
	//标签名称
	private String title;
	
	//所属标签页id
	private Integer tabid;
	
	//文本框输入框
	private String textfield;
	
	//一级下拉框
	private String combobox1;
	
	//二级下拉框
	private String combobox2;
	
	//三级下拉框
	private String combobox3;
	
	//最小分数框
	private String minbox;
	
	//最大分数框
	private String maxbox;
	
	//区域序号
	private Integer orderid;
	
	//控件ID序列（用于管理时传值）
	private String swIds;

	public String getSwIds() {
		return swIds;
	}

	public void setSwIds(String swIds) {
		this.swIds = swIds;
	}

	public Integer getSwgid() {
		return swgid;
	}

	public void setSwgid(Integer swgid) {
		this.swgid = swgid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getTabid() {
		return tabid;
	}

	public void setTabid(Integer tabid) {
		this.tabid = tabid;
	}

	public String getTextfield() {
		return textfield;
	}

	public void setTextfield(String textfield) {
		this.textfield = textfield;
	}

	public String getCombobox1() {
		return combobox1;
	}

	public void setCombobox1(String combobox1) {
		this.combobox1 = combobox1;
	}

	public String getCombobox2() {
		return combobox2;
	}

	public void setCombobox2(String combobox2) {
		this.combobox2 = combobox2;
	}

	public String getCombobox3() {
		return combobox3;
	}

	public void setCombobox3(String combobox3) {
		this.combobox3 = combobox3;
	}

	public String getMinbox() {
		return minbox;
	}

	public void setMinbox(String minbox) {
		this.minbox = minbox;
	}

	public String getMaxbox() {
		return maxbox;
	}

	public void setMaxbox(String maxbox) {
		this.maxbox = maxbox;
	}

	public Integer getOrderid() {
		return orderid;
	}

	public void setOrderid(Integer orderid) {
		this.orderid = orderid;
	}
}
