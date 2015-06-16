package com.dm.orm.biz;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.ThirdProvide;

/**
 * 第三方提供商接口
 * @author M.simple
 *
 */
public interface IThirdProvideBiz 
{

	/**
	 * 重置第三方默认用户密码
	 * @return
	 */
	public int ResetThirdAdminPass(Integer id);
	
	/**
	 * 注销第三方提供商
	 * @param thirdProvide
	 * @return
	 */
	public boolean logoutThirdProvide(ThirdProvide thirdProvide);
	
	/**
	 * 启用第三方提供商
	 */
	public int restartThirdProvide(ThirdProvide thirdProvide);
	
	/**
	 * 增加第三方数据
	 * @param thirdProvide
	 */
	public int addThirdProvide(ThirdProvide thirdProvide);
	
	/**
	 * 更新第三方数据
	 * @param thirdProvide
	 */
	public int updateThirdProvide(ThirdProvide thirdProvide);
	
	/**
	 * 根据Id查询第三方数据
	 * 
	 * @param thirdProvide
	 * @return
	 */
	public ThirdProvide findThirdProvide(int id) throws SQLException;;
	
	/**
	 * 查询所有第三方
	 * 
	 * @param thirdProvide
	 * @return
	 */
	public List<ThirdProvide> findAllThirdProvide(ThirdProvide thirdProvide);
	
	/**
	 * 统计所有的数据量
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public int countThirdProvides(ThirdProvide thirdProvide) throws SQLException;
}
