package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.Plugin;
import com.dm.orm.mapper.entity.PluginPackage;
import com.dm.orm.mapper.entity.Pricess;
import com.dm.orm.mapper.entity.ProductBuyWay;

public interface IPluginPackageBiz 
{
	
	/**
	 * 插件收费管理
	 * @param obj
	 * @return
	 */
	public int managePluginPackage(PluginPackage obj);
	
	public int applyPluginPackageRecommend(PluginPackage obj);
	
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
	 * 删除图片
	 * @param type
	 * @param file
	 * @return
	 */
	public int deletePluginPictureFile(String type, String file);
	
	/**
	 * 查询插件包总数
	 * 
	 * @param cond
	 * @return
	 */
	public int countPluginPackages(PluginPackage cond);

	/**
	 * 分页查询
	 * 
	 * @param cond
	 * @return
	 */
	public List<PluginPackage> findPluginPackagesByPage(PluginPackage cond);

	/**
	 * 查询某个插件包的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public PluginPackage getPluginPackage(int id);

	/**
	 * 发布插件包
	 * 
	 * @param obj
	 * @return
	 */
	public int addPluginPackage(PluginPackage obj);
	
	/**
	 * 取消发布插件包
	 */
	public int unReleasePluginPackage(int id);

	/**
	 * 修改插件包信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updatePluginPackage(PluginPackage obj);
	
	/**
	 * 删除插件包
	 * 
	 * @param id
	 * @return
	 */
	public int deletePluginPackage(int id);
	
	/**
	 * 根据插件Id获取插件列表数据
	 * @param pluginIds
	 * @return
	 */
	public List<List<Plugin>> getPluginListByPluginIds(String pluginIds);
	
	/**
	 * 根据插件包Id获取插件列表数据
	 * @param pluginIds
	 * @return
	 */
	public List<Plugin> getPluginListByPluginPackId(String pluginPackId);
	
	/**
	 * 发布插件
	 * @return
	 */
	public int releasePluginPackage(int id);
	
	/**
	 * 定义插件购买方式
	 * @param productBuyWay
	 * @return
	 */
	public boolean definePluginPackFee(ProductBuyWay[] productBuyWays);
	
	/**
	 * 清空插件包定义方式数据
	 * @param id
	 * @return
	 */
	public int delectBuyWayASPluginPackage(int id);
	

	
	/**
	 * 定义插件购买方式
	 * @param productBuyWay
	 * @return
	 */
	public int definePluginFee(ProductBuyWay[] productBuyWay);
	
	
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
