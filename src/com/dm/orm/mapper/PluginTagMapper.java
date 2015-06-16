package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.PluginTag;


/**
 * 第三方提供商
 * @author M.simple
 *
 */
public interface PluginTagMapper extends ISqlMapper 
{

	/**
	 * 统计所有的数据量
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public int countPluginTags(PluginTag pluginTag) throws SQLException;
	
	/**
	 * 查询所有的插件标签数据量
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public List<PluginTag> findAllPluginTags(PluginTag pluginTag) throws SQLException;
	
	/**
	 * 添加插件标签
	 * @param pluginTag
	 * @return
	 */
	public int addPluginTag(PluginTag pluginTag);
	
	/**
	 * 修改插件标签
	 * @param pluginTag
	 * @return
	 */
	public int updatePluginTag(PluginTag pluginTag);
	
	/**
	 * 删除插件标签
	 * @param pluginTag
	 * @return
	 */
	public int deletePluginTag(PluginTag pluginTag);
	/**
	 * 根据id查询插件标签数据
	 * @param id
	 * @return
	 */
	public PluginTag findPluginTag(int id);
	
	/**
	 * 根据名称查询插件标签
	 * @param name
	 * @return
	 */
	public PluginTag selectPluginTagByName(String name);
	
	/**
	 * 排序
	 * @param pluginTag
	 * @return
	 */
	public Integer orderPluginTag(PluginTag pluginTag);
}
