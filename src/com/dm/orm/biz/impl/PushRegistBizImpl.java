package com.dm.orm.biz.impl;

import java.util.ArrayList;
import java.util.List;

import com.dm.orm.biz.PushRegistBiz;
import com.dm.orm.mapper.UserJpushMappingMapper;
import com.dm.orm.mapper.entity.MobileUser;
import com.dm.orm.mapper.entity.UserJpushMapping;

/**
 * 极光服务
 * @author M.simple
 *
 */
public class PushRegistBizImpl implements PushRegistBiz 
{
	
	private UserJpushMappingMapper mapper;

	public void setMapper(UserJpushMappingMapper mapper) {
		this.mapper = mapper;
	}

	public UserJpushMapping findAuraroPushIdByUserId(String userId) 
	{

		UserJpushMapping userJpush = mapper.findAuraroPushIdByUserId(userId);
		
		return userJpush;
	}
	
	public List<MobileUser> findAllUser()
	{
		
		List<MobileUser> findAllUser = new ArrayList<MobileUser>();
		try{
			
			findAllUser = mapper.findAllUser();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
		return findAllUser;
	}

}
