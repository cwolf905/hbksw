package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.Plugin;
import com.dm.orm.mapper.entity.ThirdProvide;

/**
 * 第三方提供商
 * @author M.simple
 *
 */
public interface ThirdProvideMapper extends ISqlMapper 
{

	/**
	 * 删除第三方提供商
	 * @param thirdProvide
	 * @return
	 */
	public int deleteThirdProvide(Integer thirdProvide);
	
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
	public ThirdProvide findThirdProvide(int id) throws SQLException;
	
	/**
	 * 查询所有的第三方提供商
	 * @param thirdProvide
	 * @return
	 * @throws SQLException
	 */
	public List<ThirdProvide> findAllThirdProvide(ThirdProvide thirdProvide) throws SQLException;
	/**
	 * 根据名称查询第三方提供商
	 * @param thirdProvide
	 * @return
	 * @throws SQLException
	 */
	public ThirdProvide findThirdProvideByName(String name) throws SQLException;
	
	/**
	 * 统计所有的数据量
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public int countThirdProvides(ThirdProvide thirdProvide) throws SQLException;
	
	/**
	 * 查询第三方发布的插件
	 * @return
	 */
	public List<Plugin> selectPluginByThirdProvideId(Integer id);
	
	/**
	 * 注销（启用）第三方
	 */
	public int updateThirdProvideStatus(ThirdProvide thirdProvide);
	
}
