package com.dm.orm.mapper;

import java.util.List;

import com.dm.orm.mapper.entity.Plugin;
import com.dm.orm.mapper.entity.PluginOrderStatistic;
import com.dm.orm.mapper.entity.ThirdProvide;

public interface PluginOrderStatisticMapper extends ISqlMapper {
	
	
	/**
	 * 查询所有插件订单
	 * @param thirdProvide
	 * @return
	 */
	public List<PluginOrderStatistic>  findAllPluginOrderStatistic(PluginOrderStatistic pluginOrderStatistic);
	
	/**
	 *  统计所有的插件数据量
	 * @param cond
	 * @return
	 */
	public List<Integer> countPluginOrderStatistics(PluginOrderStatistic pluginOrderStatistic);		
	
	/**
	 * 查询全部第三方名称
	 */
	public List<ThirdProvide>findAllThrirdProvideList();
	/**
	 * 查询订单名称
	 * @return
	 */
	public List<Plugin> findAllPluginNameList();
	/**
	 * 查询总金额
	 */
	public List<PluginOrderStatistic>pluginPricetotal(PluginOrderStatistic pluginOrderStatistic);
}
