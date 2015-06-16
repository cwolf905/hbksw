package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.core.io.ChartData;
import com.dm.orm.mapper.entity.AdminUser;

public interface AdminUserMapper extends ISqlMapper {

	public int countUsers(AdminUser user) throws SQLException;

	public List<AdminUser> findUsersByPage(AdminUser user) throws SQLException;

	public AdminUser getUserByLoginName(String loginname) throws SQLException;

	public AdminUser getUser(int adminid) throws SQLException;

	public int addUser(AdminUser user) throws SQLException;

	public int updateUser(AdminUser user) throws SQLException;

	public int updateUserPassword(AdminUser user) throws SQLException;

	public int loginUser(AdminUser user) throws SQLException;

	public int deleteUser(int adminid) throws SQLException;
	
	/**
	 * 按照年份统计
	 * @return
	 */
	public List<ChartData> collectionByYear();
	
	/**
	 * 按照月份统计
	 * @return
	 */
	public List<ChartData> collectionByMonth(Integer year);
}
