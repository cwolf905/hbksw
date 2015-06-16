package com.dm.orm.mapper;

import com.dm.orm.mapper.entity.Rights;


/**
 * 菜单权限
 * @author M.simple
 *
 */
public interface RightsMapper extends ISqlMapper 
{
	
	/**
	 * 添加菜单权限
	 * @param rights
	 * @return
	 */
	public int addRights(Rights rights);
	
}
