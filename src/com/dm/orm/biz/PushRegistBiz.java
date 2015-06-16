package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.MobileUser;
import com.dm.orm.mapper.entity.UserJpushMapping;

/**
 * 
 * @author M.simple
 *
 */
public interface PushRegistBiz 
{
	
	/**
	 * 根据用户获取用户对应的极光Id
	 * @param userId
	 * @return
	 */
	public UserJpushMapping findAuraroPushIdByUserId(String userId);
	
	public List<MobileUser> findAllUser();

}
