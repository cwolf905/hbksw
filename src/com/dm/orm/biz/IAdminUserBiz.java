package com.dm.orm.biz;

import java.util.List;

import org.jfree.chart.JFreeChart;

import com.dm.orm.mapper.entity.AdminUser;
import com.dm.orm.mapper.entity.Rights;
import com.dm.orm.mapper.entity.Role;
import com.dm.orm.mapper.entity.RoleRights;

public interface IAdminUserBiz 
{
	
	/**
	 * 初始化年份下拉框
	 * @return
	 */
	public List<Integer> initYearSelect();
	
	/**
	 * 查询父菜单下的子菜单
	 * @return
	 */
	public List<Rights> findChildrenByParent(Integer parentId);
	
	/**
	 * 添加角色功能权限
	 * @param roleRights
	 * @return
	 */
	public boolean manageRoleRights(RoleRights[] roleRights);
	
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
	public Role getRoleByName(String roleName);
	
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
	
	
	/**
	 * 获取所有的角色
	 * @return
	 */
	public List<Role> findAllRole();

	/**
	 * 统计用户数
	 * 
	 * @param adminid
	 * @param area
	 * @return
	 */
	public int countUsers(AdminUser adminUser);

	/**
	 * 分页查询
	 * 
	 * @param adminid
	 * @param area
	 * @param page
	 * @param pagesize
	 * @return
	 */
	public List<AdminUser> findUsersByPage(AdminUser adminUser);

	/**
	 * 查看用户信息
	 * 
	 * @param adminid
	 * @return
	 */
	public AdminUser getUser(int adminid);
	
	/**
	 * 根据用户登录名查询用户信息
	 * @param loginName 登录名
	 * @return
	 */
	public AdminUser getUserByLoginName(String loginName);

	/**
	 * 添加用户
	 * 
	 * @param user
	 * @return
	 */
	public int addUser(AdminUser user);
	
	/**
	 * 添加用户 （M.simple）
	 * 
	 * @param user
	 * @return
	 */
	public int addAdminUser(AdminUser user);

	/**
	 * 修改用户信息
	 * 
	 * @param user
	 * @return
	 */
	public int updateUser(AdminUser user);

	/**
	 * 修改用户密码
	 * 
	 * @param adminid
	 * @param oldpass
	 * @param newpass
	 * @return
	 */
	public int updateUserPassword(int adminid, String oldpass, String newpass);

	/**
	 * 用户登录，首先校验用户名和密码，再检查是否已经登录， 再检查是否为同一IP
	 * 
	 * @param loginname
	 * @param password
	 * @return
	 */
	public AdminUser applyUserLogin(String loginname, String password);

	/**
	 * 登录检查，首先检查用户是否被删除，再检查用户是否已经被强制登出，再检查用户是否已经在别的机器登录，再检查用户是否已经过期；
	 * 
	 * @param adminid
	 * @return
	 */
	public AdminUser applyUserCheck(int adminid);

	/**
	 * 退出登录，首先检查用户是否被删除，再检查用户是否已经被强制登出， 再检查用户是否已经在别的机器登录
	 * 
	 * @param adminid
	 * @return
	 */
	public AdminUser applyUserLogout(int adminid);

	/**
	 * 删除用户
	 * 
	 * @param adminid
	 * @return
	 */
	public int deleteUser(int adminid);
	
	/**
	 * 生成一个图表
	 * @return
	 */
	public String[] generateChartData(Integer selectYear);
}
