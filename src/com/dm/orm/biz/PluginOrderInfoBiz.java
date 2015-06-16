package com.dm.orm.biz;


import java.math.BigDecimal;
import java.util.List;

import com.dm.orm.mapper.entity.PluginOrderInfo;
import com.dm.orm.mapper.entity.ThirdProvide;

/**
 * 插件明细和统计报表
 * @author Administrator
 *
 */
public interface PluginOrderInfoBiz 
{
	
	/**
	 * 生成饼图数据
	 * @param paramArray
	 * @return
	 */
	public String[] generatePieChartData(Integer[] paramArray);
	
	/**
	 * 对某第三方按照年份维度进行统计
	 * @param thirdProvideId
	 * @return
	 */
	public String[] generateChartData (Integer[] paramArray);
	
	/**
	 * 查询所有插件订单
	 * 
	 * @param 
	 * @return
	 */
	public List<PluginOrderInfo> findAllPluginOrderInfoList(PluginOrderInfo pluginOrderInfo);
	
	/**
	 * 统计所有的插件数据量
	 * @param cond
	 * @return
	 */
	public int countPluginOrderInfos(PluginOrderInfo pluginOrderInfo) ;
	
	/**
	 * 查询全部提供方名称
	 */
	
	public List<ThirdProvide> findAllThrirdProvideList();
	
	/**
	 * 统计所有插件订单金额
	 * 
	 * @param 
	 * @return
	 */
	public BigDecimal countPluginOrderPrice(PluginOrderInfo pluginOrderInfo); 
	
}


