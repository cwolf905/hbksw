package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.PluginCategory;


/**
 * 第三方提供商
 * @author M.simple
 *
 */
public interface PluginCategoryMapper extends ISqlMapper 
{

	/**
	 * 排序
	 * @param pluginCategory
	 * @return
	 */
	public Integer orderPluginCategory(PluginCategory pluginCategory);
	
	/**
	 * 统计所有的数据量
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public int countPluginCategorys(PluginCategory pluginCategory) throws SQLException;
	
	/**
	 * 查询所有的插件类别数据量
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public List<PluginCategory> findAllPluginCategorys(PluginCategory pluginCategory) throws SQLException;
	
	/**
	 * 添加插件类别
	 * @param pluginCategory
	 * @return
	 */
	public int addPluginCategory(PluginCategory pluginCategory);
	
	/**
	 * 修改插件类别
	 * @param pluginCategory
	 * @return
	 */
	public int updatePluginCategory(PluginCategory pluginCategory);
	
	/**
	 * 删除插件类别
	 * @param pluginCategory
	 * @return
	 */
	public int deletePluginCategory(PluginCategory pluginCategory);
	
	/**
	 * 根据id查询插件类别数据
	 * @param id
	 * @return
	 */
	public PluginCategory findPluginCategory(int id);
	
	/**
	 * 根据名称查询插件类别
	 * @param name
	 * @return
	 */
	public PluginCategory selectPluginCategoryByName(String name);
}
