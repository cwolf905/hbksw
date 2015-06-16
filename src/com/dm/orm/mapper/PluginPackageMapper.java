package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.Plugin;
import com.dm.orm.mapper.entity.PluginPackage;

public interface PluginPackageMapper extends ISqlMapper {

	public int countPluginPackages(PluginPackage cond) throws SQLException;

	public List<PluginPackage> findPluginPackagesByPage(PluginPackage cond)
			throws SQLException;

	public PluginPackage getPluginPackage(int id) throws SQLException;

	public int addPluginPackage(PluginPackage obj) throws SQLException;

	public int updatePluginPackage(PluginPackage obj) throws SQLException;

	public int deletePluginPackage(int id) throws SQLException;
	
	/**
	 * 根据插件Id获取插件列表数据
	 * @param pluginIds
	 * @return
	 */
	public List<Plugin> getPluginListByPluginIds(String pluginIds);
	
	/**
	 * 根据插件包Id获取插件列表数据
	 * @param pluginIds
	 * @return
	 */
	public List<Plugin> getPluginListByPluginPackId(String pluginPackId);
	
	/**
	 * 发布插件包
	 * @return
	 */
	public int releasePluginPackage(int id);
	
	/**
	 * 取消发布插件包（下架）
	 */
	public int unReleasePluginPackage(int id);
	
	public int recommendPluginPackage(PluginPackage obj);
	
	/**
	 * 插件收费管理
	 * @param obj
	 * @return
	 */
	public int managePluginPackage(PluginPackage obj) throws SQLException;;
	
}
