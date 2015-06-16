package com.dm.orm.mapper;

import java.util.List;

import com.dm.orm.mapper.entity.PluginOrderStatistic;
import com.dm.orm.mapper.entity.PluginSaleStatistics;

public interface PluginSaleStatisticsMapper extends ISqlMapper {
	
	/**
	 * 查询所有插件订单
	 * @param thirdProvide
	 * @return
	 */
	public List<PluginSaleStatistics>  findAllPluginSaleStatistics(PluginSaleStatistics pluginSaleStatistics);
	
	/**
	 *  统计所有的插件数据量
	 * @param cond
	 * @return
	 */
	public List<PluginSaleStatistics> countPluginSaleStatistics(PluginSaleStatistics pluginSaleStatistics);	
	
	public List<PluginSaleStatistics>  findAllPluginSaleStatisticsOrderByCounts(PluginSaleStatistics pluginSaleStatistics);

	public List<PluginSaleStatistics>  findAllPluginSaleStatisticsExport(PluginSaleStatistics pluginSaleStatistics);
	public List<PluginSaleStatistics>  findAllPluginSaleStatisticsOrderByCountsExport(PluginSaleStatistics pluginSaleStatistics);
}
