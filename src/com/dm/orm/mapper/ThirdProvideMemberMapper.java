package com.dm.orm.mapper;

import com.dm.orm.mapper.entity.ThirdProvideMember;

/**
 * 第三方平台用户实体
 * @author M.simple
 *
 */
public interface ThirdProvideMemberMapper extends ISqlMapper 
{

	/**
	 * 增加第三方用户
	 * @param thirdProvide
	 */
	public int addThirdProvideMember(ThirdProvideMember member);
	
	/**
	 * 重置第三方默认用户密码
	 * @return
	 */
	public int ResetThirdAdminPass(Integer id);
	
}
