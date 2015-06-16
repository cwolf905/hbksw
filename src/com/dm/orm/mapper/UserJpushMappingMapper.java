package com.dm.orm.mapper;

import java.util.List;

import com.dm.orm.mapper.entity.MobileUser;
import com.dm.orm.mapper.entity.UserJpushMapping;



/**
 * 极光数据库交互
 * @author M.simple
 *
 */
public interface UserJpushMappingMapper extends ISqlMapper 
{

	/**
	 * 根据用户获取用户对应的极光Id
	 * @param userId
	 * @return
	 */
	public UserJpushMapping findAuraroPushIdByUserId(String userId);
	
	public List<MobileUser> findAllUser();
}
