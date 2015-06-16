package com.dm.orm.biz;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.PluginCategory;

/**
 * 插件类别接口
 * @author M.simple
 *
 */
public interface PluginCategoryBiz 
{
	
	/**
	 * 插件类别排序
	 * @param ids
	 * @return
	 */
	public int applyPluginCategoryOrder(int[] ids);
	
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
