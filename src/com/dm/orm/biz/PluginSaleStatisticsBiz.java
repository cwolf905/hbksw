package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.PluginSaleStatistics;

public interface PluginSaleStatisticsBiz {
	
	/**
	 * 查询所有插件订单统计
	 * 
	 * @param 
	 * @return
	 */
	public List<PluginSaleStatistics> findAllPluginSaleStatisticsList(PluginSaleStatistics pluginSaleStatistics);
	
	/**
	 * 查询所有插件订单统计 数据量
	 * @param cond
	 * @return
	 */
	public int countPluginSaleStatistics(PluginSaleStatistics pluginSaleStatistics) ;
	
	/**
	 * 导出功能
	 */

	public String  exportPluginSaleStatisticsExcelList(
			PluginSaleStatistics pluginSaleStatistics);
	
	

}
