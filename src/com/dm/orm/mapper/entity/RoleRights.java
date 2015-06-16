package com.dm.orm.mapper.entity;

/**
 * 权限菜单表
 * @author M.simple
 */
public class RoleRights 
{
	private Integer id;
	
	private Integer roleid;
	
	private Integer rightid;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getRoleid() {
		return roleid;
	}

	public void setRoleid(Integer roleid) {
		this.roleid = roleid;
	}

	public Integer getRightid() {
		return rightid;
	}

	public void setRightid(Integer rightid) {
		this.rightid = rightid;
	}

}
