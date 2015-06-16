package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.PluginIndex;


/**
 * 第三方提供商
 * @author M.simple
 *
 */
public interface PluginIndexMapper extends ISqlMapper 
{

	/**
	 * 统计所有的数据量
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public int countPluginIndexs(PluginIndex pluginIndex) throws SQLException;
	
	/**
	 * 查询所有的游客访问数据量
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public List<PluginIndex> findAllPluginIndexs(PluginIndex pluginIndex) throws SQLException;
	
	/**
	 * 添加游客访问
	 * @param pluginIndex
	 * @return
	 */
	public int addPluginIndex(PluginIndex pluginIndex);
	
	/**
	 * 修改游客访问
	 * @param pluginIndex
	 * @return
	 */
	public int updatePluginIndex(PluginIndex pluginIndex);
	
	/**
	 * 删除游客访问
	 * @param pluginIndex
	 * @return
	 */
	public int deletePluginIndex(PluginIndex pluginIndex);
	/**
	 * 根据id查询游客访问数据
	 * @param id
	 * @return
	 */
	public PluginIndex findPluginIndex(int id);
	
	/**
	 * 根据名称查询游客访问
	 * @param name
	 * @return
	 */
	public PluginIndex selectPluginIndexByName(String name);
	
	/**
	 * 排序
	 * @param pluginIndex
	 * @return
	 */
	public Integer orderPluginIndex(PluginIndex pluginIndex);
}
