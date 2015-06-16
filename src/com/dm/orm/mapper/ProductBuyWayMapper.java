package com.dm.orm.mapper;

import java.util.List;

import com.dm.orm.mapper.entity.Pricess;
import com.dm.orm.mapper.entity.ProductBuyWay;

/**
 * 插件或插件包购买方式
 * @author M.simple
 *
 */
public interface ProductBuyWayMapper extends ISqlMapper
{
	
	/**
	 * 根据价格获取appleId
	 * @param price
	 * @return
	 */
	public Pricess getPricesByPrice(float price);
	
	/**
	 * 获取插件包的收费定义方式
	 * @param id
	 * @return
	 */
	public List<ProductBuyWay> getProductBuywayByPluginPackId(Integer id);
	
	/**
	 * 获取插件的收费定义方式
	 * @param id 
	 * @return
	 */
	public List<ProductBuyWay> getProductBuywayByPluginId(Integer id);
	
	/**
	 * 定义插件购买方式
	 * @param productBuyWay
	 * @return
	 */
	public int definePluginPackFee(ProductBuyWay productBuyWays);
	
	/**
	 * 清空插件包定义方式数据
	 * @param id
	 * @return
	 */
	public int delectBuyWayASPluginPackage(int id);
	
	/**
	 * 清空插件定义方式数据
	 * @param id
	 * @return
	 */
	public int delectBuyWayASPlugin(int id);
	//何鹏start
	/**
	 * 查询下拉框的钱
	 */
	public List<Pricess> findPrices();
	//hepeng END
}
