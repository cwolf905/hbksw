package com.dm.orm.biz;

import java.math.BigDecimal;
import java.util.List;

import com.dm.orm.mapper.entity.Plugin;
import com.dm.orm.mapper.entity.PluginOrderStatistic;
import com.dm.orm.mapper.entity.ThirdProvide;

public interface PluginOrderStatisticBiz {
	
	/**
	 * 查询所有插件订单统计
	 * 
	 * @param 
	 * @return
	 */
	public List<PluginOrderStatistic> findAllPluginOrderStatisticList(PluginOrderStatistic pluginOrderStatistic);
	
	/**
	 * 查询所有插件订单统计 数据量
	 * @param cond
	 * @return
	 */
	public int countPluginOrderStatistics(PluginOrderStatistic pluginOrderStatistic) ;
	
	/**
	 * 导出功能
	 */
	public String exportPluginOrderStatisticExcelList (PluginOrderStatistic pluginOrderStatistic) ;
	/**
	 * 查询全部提供方名称
	 */
	
	public List<ThirdProvide> findAllThrirdProvideList();
	//计算总金额
	public BigDecimal pluginPricetotal(PluginOrderStatistic pluginOrderStatistic);
	/**
	 * 查询插件名称
	 */
	public List<Plugin> findAllPluginNameList();

}
