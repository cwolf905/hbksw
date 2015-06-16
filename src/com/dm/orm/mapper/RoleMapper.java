package com.dm.orm.mapper;

import java.util.List;

import com.dm.orm.mapper.entity.Rights;
import com.dm.orm.mapper.entity.Role;
import com.dm.orm.mapper.entity.RoleRights;

/**
 * 获取所有的角色
 * @author M.simple
 *
 */
public interface RoleMapper extends ISqlMapper 
{
	
	
	/**
	 * 查询父菜单下的子菜单
	 * @return
	 */
	public List<Rights> findChildRight(Integer rightId);
	
	/**
	 * 查询父菜单下的子菜单
	 * @return
	 */
	public List<Rights> findChildrenByParent(RoleRights roleRights);
	
	/**
	 * 清除中间表数据
	 * @param roleId
	 * @return
	 */
	public int deleteRoleRight(Integer roleId);
	
	/**
	 * 添加角色功能权限
	 * @param roleRights
	 * @return
	 */
	public int insertRoleRights(RoleRights roleRights);
	
	/**
	 * 通过角色获取角色功能权限
	 * @return
	 */
	public List<Rights> findRightsByRole(Integer roleId);
	
	/**
	 * 获取所有的功能权限
	 * @return
	 */
	public List<Rights> findAllRights();
	

	public List<Role> findAllRole();
	
	/**
	 * 统计角色数
	 * 
	 * @param role
	 * @return
	 */
	public int countRoles(Role role);
	
	/**
	 * 分页查询
	 * 
	 * @param role
	 * @param page
	 * @param pagesize
	 * @return
	 */
	public List<Role> findRolesByPage(Role role);
	
	/**
	 * 查看角色信息
	 * 
	 * @param roleId
	 * @return
	 */
	public Role getRole(int roleId);
	
	/**
	 * 根据角色名查询信息
	 * @param roleName 角色名
	 * @return
	 */
	public List<Role> getRoleByName(String roleName);
	
	/**
	 * 添加角色 （M.simple）
	 * 
	 * @param role
	 * @return
	 */
	public int addRole(Role role);

	/**
	 * 修改角色信息
	 * 
	 * @param role
	 * @return
	 */
	public int updateRole(Role role);
	
	/**
	 * 删除用户
	 * 
	 * @param roleId
	 * @return
	 */
	public int deleteRole(int roleId);
}
