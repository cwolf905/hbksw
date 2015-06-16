package com.dm.orm.mapper;

import java.math.BigDecimal;
import java.util.List;

import com.dm.orm.mapper.entity.PluginOrderStatistic;
import com.dm.orm.mapper.entity.PluginPackage;

public interface PluginOrderPackageMapper  extends ISqlMapper {
	/**
	 * 查询全部插件包名
	 */
	public List<PluginPackage> findAllPluginPackageNameList();
	/**
	 * 查询所有插件包订单统计 数据量
	 * @param pluginOrderStatistic
	 * @return
	 */
	public List<Integer> countPluginPackages(PluginOrderStatistic pluginOrderStatistic);
	
	/**
	 * 查询所有插件包订单统计
	 * @param pluginOrderStatistic
	 * @return
	 */
	public List<PluginOrderStatistic> findAllPluginPackageList(PluginOrderStatistic pluginOrderStatistic);
   
	/**
	 * 计算总金额
	 */
	public List<PluginOrderStatistic> pluginPricetotal(PluginOrderStatistic pluginOrderStatistic);
	
	
}
