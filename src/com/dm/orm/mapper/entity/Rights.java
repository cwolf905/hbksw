package com.dm.orm.mapper.entity;

import java.util.List;

/**
 * 权限表
 * @author M.simple
 *
 */
@SuppressWarnings("unchecked")
public class Rights implements Comparable
{
	private Integer resourceID;
	
	private String labelId;
	
	private Integer checked;
	
	private Integer delFlag;
	
	private Integer parentID;
	
	private String resourceCode;
	
	private String resourceDesc;
	
	private Integer resourceGrade;
	
	private String resourceName;
	
	private Integer resourceOrder;
	
	private String resourceType;
	
	/**
	 * 子菜单
	 */
	private List<Rights> childRights;

	public List<Rights> getChildRights() {
		return childRights;
	}

	public void setChildRights(List<Rights> childRights) {
		this.childRights = childRights;
	}

	public Integer getResourceID() {
		return resourceID;
	}

	public void setResourceID(Integer resourceID) {
		this.resourceID = resourceID;
	}

	public String getLabelId() {
		return labelId;
	}

	public void setLabelId(String labelId) {
		this.labelId = labelId;
	}

	public Integer getChecked() {
		return checked;
	}

	public void setChecked(Integer checked) {
		this.checked = checked;
	}

	public Integer getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
	}

	public Integer getParentID() {
		return parentID;
	}

	public void setParentID(Integer parentID) {
		this.parentID = parentID;
	}

	public String getResourceCode() {
		return resourceCode;
	}

	public void setResourceCode(String resourceCode) {
		this.resourceCode = resourceCode;
	}

	public String getResourceDesc() {
		return resourceDesc;
	}

	public void setResourceDesc(String resourceDesc) {
		this.resourceDesc = resourceDesc;
	}

	public Integer getResourceGrade() {
		return resourceGrade;
	}

	public void setResourceGrade(Integer resourceGrade) {
		this.resourceGrade = resourceGrade;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public Integer getResourceOrder() {
		return resourceOrder;
	}

	public void setResourceOrder(Integer resourceOrder) {
		this.resourceOrder = resourceOrder;
	}

	public String getResourceType() {
		return resourceType;
	}

	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}

	public int compareTo(Object o) 
	{
		Rights rights = (Rights)o;
		return this.resourceID - rights.resourceID; 
	}
	
	public String toString()
	{
		return this.getResourceName();
	}
	
}
