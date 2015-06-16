package com.dm.orm.biz.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;

import com.dm.core.SysConfig;
import com.dm.core.io.ChartData;
import com.dm.core.io.PropertyReader;
import com.dm.orm.biz.IAdminUserBiz;
import com.dm.orm.mapper.AdminUserMapper;
import com.dm.orm.mapper.RoleMapper;
import com.dm.orm.mapper.entity.AdminUser;
import com.dm.orm.mapper.entity.Rights;
import com.dm.orm.mapper.entity.Role;
import com.dm.orm.mapper.entity.RoleRights;
import com.dm.utils.DateUtil;
import com.dm.utils.EncryptUtils;
import com.dm.utils.TimeUtils;

public class AdminUserBizImpl implements IAdminUserBiz {

	private Logger log = Logger.getLogger(AdminUserBizImpl.class);

	private AdminUserMapper mapper;
	
	private RoleMapper roleMapper;

	public void setRoleMapper(RoleMapper roleMapper) {
		this.roleMapper = roleMapper;
	}

	public void setMapper(AdminUserMapper mapper) {
		this.mapper = mapper;
	}
	
	/**
	 * 初始化年份下拉框
	 * @return
	 */
	public List<Integer> initYearSelect()
	{
		List<Integer> yearSelect = DateUtil.initYearSelect();
		
		return yearSelect;
	}
	
	/**
	 * 生成一个图表
	 * @return
	 */
	public String[] generateChartData(Integer selectYear)
	{
		
		log.debug("generateJfreeChart start");
		
		String[] chartData = null;
		try
		{
			if(null != selectYear)
			{
				List<ChartData> collectionByMonth = mapper.collectionByMonth(selectYear);
				
				if(null != collectionByMonth && collectionByMonth.size() != 0)
				{
					Integer firstYear = 1;
					//横坐标值
					Integer indexYear = firstYear;
					String horizontalSign = "月";
					Integer lastYear = 12;
					chartData = new String[lastYear - firstYear + 1];
					//list中数据索引
					Integer index = 0;
					for(int m = 0; m < lastYear - firstYear + 1; m++)
					{
						
						Integer horizontal = indexYear;
						String vertical = "0";
						if(index < collectionByMonth.size())
						{
							horizontal = collectionByMonth.get(index).getHorizontal();
							vertical = collectionByMonth.get(index).getVertical().toString();
						}
						if(horizontal.intValue() == indexYear.intValue())
						{
							chartData[m] = "'" + indexYear.toString() + horizontalSign + "'," + vertical;
							index ++;
						}else
						{
							chartData[m] = "'" + indexYear.toString() + horizontalSign + "'," + 0;
						}
						indexYear ++;
					}
				}
			}else
			{
				List<ChartData> collectionByYear = mapper.collectionByYear();
				if(null != collectionByYear && collectionByYear.size() != 0)
				{
					Integer firstYear = collectionByYear.get(0).getHorizontal();
					//横坐标值
					Integer indexYear = collectionByYear.get(0).getHorizontal();
					String horizontalSign = "年";
					Integer lastYear = collectionByYear.get(collectionByYear.size() - 1).getHorizontal();
					chartData = new String[lastYear - firstYear + 1];
					//list中数据索引
					Integer index = 0;
					for(int m = 0; m < lastYear - firstYear + 1; m++)
					{
						
						Integer horizontal = collectionByYear.get(index).getHorizontal();
						String vertical = collectionByYear.get(index).getVertical().toString();
						if(horizontal.intValue() == indexYear.intValue())
						{
							chartData[m] = "'" + indexYear.toString() + horizontalSign + "'," + vertical;
							index ++;
						}else
						{
							chartData[m] = "'" + indexYear.toString() + horizontalSign + "'," + 0;
						}
						indexYear ++;
					}
				}
			}
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
		log.debug("generateJfreeChart end");
		return chartData;
	}

	/**
	 * 查询父菜单下的子菜单
	 * @return
	 */
	public List<Rights> findChildrenByParent(Integer parentId)
	{
		
//		List<Rights> rightList = roleMapper.findChildrenByParent(parentId);
//		
//		return rightList;
		   
		return null;
	}
	
	public boolean manageRoleRights(RoleRights[] roleRights)
	{
		log.debug("manageRoleRights start");
		
		//先做清除动作
		roleMapper.deleteRoleRight(roleRights[0].getRoleid());
		
		boolean flag = true; 
		try
		{
			for(RoleRights rr : roleRights)
			{
				roleMapper.insertRoleRights(rr);
			}
		}
		catch(Exception e)
		{
			flag = false;
			e.printStackTrace();
		}
	
		log.debug("manageRoleRights end");
		return flag;
	}
	
	/**
	 * 通过角色获取角色功能权限
	 * @return
	 */
	public List<Rights> findRightsByRole(Integer roleId)
	{
		
		log.debug("findRightsByRole start");
		
		//查询所有的父菜单
		List<Rights> allRights = roleMapper.findRightsByRole(roleId);
		
		RoleRights roleRights = new RoleRights();
		for(Rights rights : allRights)
		{
			//查询子菜单
			roleRights.setRightid(rights.getResourceID());
			roleRights.setRoleid(roleId);
			List<Rights> rightList = roleMapper.findChildrenByParent(roleRights);
			rights.setChildRights(rightList);
		}
		
		log.debug("findRightsByRole end");
		return allRights;
	}
	
	/**
	 * 获取所有的功能权限
	 * @return
	 */
	public List<Rights> findAllRights()
	{
		
		log.debug("findAllRights start");
		
		List<Rights> allRights = roleMapper.findAllRights();
		List<Rights> findChildRight = new ArrayList<Rights>();
		for(Rights rights : allRights)
		{
			findChildRight = roleMapper.findChildRight(rights.getResourceID());
			rights.setChildRights(findChildRight);
		}
		
		log.debug("findAllRights end");
		return allRights;
	}
	
	/**
	 * 统计角色数
	 * 
	 * @param role
	 * @return
	 */
	public int countRoles(Role role)
	{
		
		log.debug("countRoles starting...");
		
		int count = 0;
		count = roleMapper.countRoles(role);
		
		log.debug("countRoles end");
		return count;
	}
	
	/**
	 * 分页查询
	 * 
	 * @param role
	 * @param page
	 * @param pagesize
	 * @return
	 */
	public List<Role> findRolesByPage(Role role)
	{
		
		log.debug("findRolesByPage starting...");
		
		List<Role> roles = null;
		roles = roleMapper.findRolesByPage(role);
		
		log.debug("findRolesByPage end");
		return roles;
	}
	
	/**
	 * 查看角色信息
	 * 
	 * @param roleId
	 * @return
	 */
	public Role getRole(int roleId)
	{
		
		log.debug("getRole starting...");
		
		Role role = roleMapper.getRole(roleId);
		
		log.debug("getRole end");
		return role;
	}
	
	/**
	 * 根据角色名查询信息
	 * @param roleName 角色名
	 * @return
	 */
	public Role getRoleByName(String roleName)
	{
		
		log.debug("getRoleByName start");
		
		Role role = null;
		try
		{
			List<Role> roles = roleMapper.getRoleByName(roleName);
			if(null != roles && roles.size() > 0)
			{
				role = roles.get(0);
			}
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
		log.debug("getRoleByName start");
		return role;
	}
	
	/**
	 * 添加角色 （M.simple）
	 * 
	 * @param role
	 * @return
	 */
	public int addRole(Role role)
	{
		
		log.debug("addRole starting...");
		
		int retval = 0;
		retval = roleMapper.addRole(role);
		if (retval == 0) {
			throw new BizException(BizErr.EX_ADD_FAIL);
		}
		
		log.debug("addRole end");
		return retval;
	}

	/**
	 * 修改角色信息
	 * 
	 * @param role
	 * @return
	 */
	public int updateRole(Role role)
	{
		
		log.debug("updateRole starting...");
		
		int retval = 0;
		retval = roleMapper.updateRole(role);
		if (retval == 0) {
			throw new BizException(BizErr.EX_UPDATE_FAIL);
		}
		
		log.debug("updateRole end");
		return retval;
	}
	
	/**
	 * 删除用户
	 * 
	 * @param roleId
	 * @return
	 */
	public int deleteRole(int roleId)
	{
		
		log.debug("deleteRole starting...");
		
		int retval = 0;
		retval = roleMapper.deleteRoleRight(roleId);
		retval = roleMapper.deleteRole(roleId);
		
		log.debug("deleteRole end");
		return retval;
	}
	
	/**
	 * 根据用户登录名查询用户信息
	 * @param loginName 登录名
	 * @return
	 */
	public AdminUser getUserByLoginName(String loginName)
	{
		log.debug("getUserByLoginName start");
		
		AdminUser user = new AdminUser();
		try 
		{
			user = mapper.getUserByLoginName(loginName);
		} catch (SQLException e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		log.debug("getUserByLoginName start");
		return user;
	}
	
	/**
	 * 获取所有的角色
	 * @return
	 */
	public List<Role> findAllRole()
	{
		
		log.debug("findAllRole start");
		
		List<Role> roles = roleMapper.findAllRole();
		
		log.debug("findAllRole end");
		return roles;
	}

	private String getNow() {
		return TimeUtils.formatDate(TimeUtils.DB_TIME_PATTERN_F2);
	}

	private String getClientIP() {
		WebContext context = WebContextFactory.get();
		return context.getHttpServletRequest().getRemoteAddr().toString();
	}

	private String getMD5(String text) {
		try {
			return EncryptUtils.encryptMD5(text.getBytes()).toUpperCase();
		} catch (Exception ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
	}

	@Override
	public int countUsers(AdminUser adminUser) {
		log.debug("countUsers starting...");
		int count = 0;
		try {
			count = mapper.countUsers(adminUser);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countUsers end");
		return count;
	}

	@Override
	public List<AdminUser> findUsersByPage(AdminUser adminUser) {
		log.debug("findUsersByPage starting...");
		List<AdminUser> users = null;
		try {
			users = mapper.findUsersByPage(adminUser);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findUsersByPage end");
		return users;
	}

	@Override
	public AdminUser getUser(int adminid) {
		log.debug("getUser starting...");
		AdminUser user = null;
		try {
			user = mapper.getUser(adminid);
			user.setPassword(null);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getUser end");
		return user;
	}

	@Override
	public int addUser(AdminUser user) {
		log.debug("addUser starting...");
		int retval = 0;
		try {
			AdminUser u = mapper.getUserByLoginName(user.getLoginname());
			if (u != null) {
				throw new BizException(BizErr.EX_LOGINNAME_EXIST);
			}
			user.setPassword(getMD5(user.getPassword()));
			user.setRegdate(getNow());
			retval = mapper.addUser(user);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addUser end");
		return retval;
	}
	
	/**
	 * 添加用户
	 */
	@Override
	public int addAdminUser(AdminUser user) 
	{
		
		log.debug("addUser starting...");
		
		//通过配置文件获取数据库信息
		PropertyReader readerConfig = new PropertyReader();
		try {
			readerConfig.init(SysConfig.concat(SysConfig.getPropertyPath(), "config.properties"));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String defaultPass = readerConfig.getProperty("defaultPass");
		
		int retval = 0;
		try 
		{
			
			//密码加密处理
			user.setPassword(getMD5(defaultPass));
			//获取登录时间
			user.setRegdate(getNow());
			retval = mapper.addUser(user);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addUser end");
		return retval;
	}

	@Override
	public int updateUser(AdminUser user) {
		log.debug("updateUser starting...");
		int retval = 0;
		try {
			retval = mapper.updateUser(user);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateUser end");
		return retval;
	}

	@Override
	public int updateUserPassword(int adminid, String oldpass, String newpass) {
		log.debug("updateUserPassword starting...");
		AdminUser user = null;
		try {
			user = mapper.getUser(adminid);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		String pwd = getMD5(oldpass);
		if (user == null || !pwd.equalsIgnoreCase(user.getPassword())) {
			throw new BizException(BizErr.EX_PASSWORD_INVALID);
		}
		int retval = 0;
		try {
			user.setPassword(getMD5(newpass));
			retval = mapper.updateUserPassword(user);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateUserPassword end");
		return retval;
	}

	@Override
	public AdminUser applyUserLogin(String loginname, String password) {
		log.debug("login starting...");
		AdminUser user = null;
		try {
			user = mapper.getUserByLoginName(loginname);
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		String pwd = getMD5(password);
		if (user == null || !pwd.equalsIgnoreCase(user.getPassword())) {
			throw new BizException(BizErr.EX_PASSWORD_INVALID);
		}
		String cip = getClientIP();
		if (user.getLogins() == 1) {
			if (!cip.equals(user.getLoginip())) {
				user.setLastip(user.getLoginip());
			}
		}
		user.setLogindate(getNow());
		user.setLoginip(cip);
		user.setLogins(1);
		user.setPassword(null);
		try {
			mapper.loginUser(user);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("login end");
		return user;
	}

	@Override
	public AdminUser applyUserCheck(int adminid) {
		log.debug("check starting...");
		AdminUser user = null;
		try {
			user = mapper.getUser(adminid);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		if (user == null || user.getLogins() == 0) {
			throw new BizException(BizErr.EX_USER_BYLOGOUT);
		}
		String cip = getClientIP();
		if (!cip.equals(user.getLoginip())) {
			throw new BizException(BizErr.EX_USER_BYLOGIN, user.getLoginip());
		}
		user.setPassword(null);
		log.debug("check end");
		return user;
	}

	@Override
	public AdminUser applyUserLogout(int adminid) {
		log.debug("logout starting...");
		AdminUser user = new AdminUser();
		user.setLogindate(getNow());
		user.setLoginip(getClientIP());
		user.setLogins(0);
		try {
			mapper.loginUser(user);
		} catch (SQLException ex) {
			log.error("exception:", ex);
		}
		log.debug("logout end");
		return user;
	}

	@Override
	public int deleteUser(int adminid) {
		log.debug("deleteUser starting...");
		int retval = 0;
		try {
			retval = mapper.deleteUser(adminid);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteUser end");
		return retval;
	}
}
