package com.dm.orm.biz;

import java.math.BigDecimal;
import java.util.List;

import com.dm.orm.mapper.entity.PluginOrderStatistic;
import com.dm.orm.mapper.entity.PluginPackage;

public interface PluginOrderPackageBiz {
	
	/**
	 * 查询所有插件包订单统计
	 */
	public List<PluginOrderStatistic> findAllPluginPackageList(PluginOrderStatistic pluginOrderStatistic);
	
	/**
	 * 查询所有插件包订单统计 数据量
	 */
	public int countPluginPackages (PluginOrderStatistic pluginOrderStatistic) ;
	
	/**
	 * 查询全部插件包名
	 */
	public List<PluginPackage> findAllPluginPackageNameList();
	/**
	 * 计算总金额
	 */
	public BigDecimal pluginPricetotal(PluginOrderStatistic pluginOrderStatistic);

}
