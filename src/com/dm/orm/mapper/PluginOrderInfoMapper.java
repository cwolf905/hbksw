package com.dm.orm.mapper;

import java.util.List;
import java.util.Map;

import com.dm.core.io.ChartData;
import com.dm.orm.mapper.entity.PluginOrderInfo;
import com.dm.orm.mapper.entity.ThirdProvide;
/**
 * 插件明细和插件统计报表
 * @author M、simple
 *
 */
public interface PluginOrderInfoMapper extends ISqlMapper 
{
	
	/**
	 * 对第三方数据根据年份月份统计
	 * @param paramMap
	 * @return
	 */
	public List<ChartData> collectionByYearAndMonth(Map<String, Integer> paramMap);
	
	/**
	 * 对某第三方按照月份维度进行统计
	 * @param thirdProvideId
	 * @return
	 */
	public List<ChartData> collectionByMonth(Map<String, Integer> paramMap);
	
	/**
	 * 对某第三方按照年份维度进行统计
	 * @param thirdProvideId
	 * @return
	 */
	public List<ChartData> collectionByYear(Integer thirdProvideId);
	
	/**
	 * 查询所有插件订单
	 * @param thirdProvide
	 * @return
	 */
	public List<PluginOrderInfo>  findAllPluginOrderInfo(PluginOrderInfo pluginOrderInfo);
	
	/**
	 *  统计所有的插件数据量
	 * @param cond
	 * @return
	 */
	public int countPluginOrderInfos(PluginOrderInfo pluginOrderInfo);	
	
	/**
	 * 查询全部第三方名称
	 */
	public List<ThirdProvide>findAllThrirdProvideList();
	
	/**
	 * 查询所有插件订单通过页码
	 * 
	 * @param 
	 * @return
	 */
	public List<PluginOrderInfo> findAllPluginOrderInfoByPage(PluginOrderInfo pluginOrderInfo);
	
	

}
