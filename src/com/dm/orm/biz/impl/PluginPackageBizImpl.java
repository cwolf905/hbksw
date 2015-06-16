package com.dm.orm.biz.impl;

import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.core.SysConfig;
import com.dm.orm.biz.IPluginPackageBiz;
import com.dm.orm.mapper.PluginMapper;
import com.dm.orm.mapper.PluginPackageMapper;
import com.dm.orm.mapper.ProductBuyWayMapper;
import com.dm.orm.mapper.entity.Plugin;
import com.dm.orm.mapper.entity.PluginPackage;
import com.dm.orm.mapper.entity.Pricess;
import com.dm.orm.mapper.entity.ProductBuyWay;

public class PluginPackageBizImpl implements IPluginPackageBiz {

	private Logger log = Logger.getLogger(PluginPackageBizImpl.class);

	private PluginPackageMapper mapper;
	
	private PluginMapper pluginMapper;
	
	private ProductBuyWayMapper buyWayMapper;

	public void setBuyWayMapper(ProductBuyWayMapper buyWayMapper) {
		this.buyWayMapper = buyWayMapper;
	}

	public void setMapper(PluginPackageMapper mapper) {
		this.mapper = mapper;
	}
	
	public void setPluginMapper(PluginMapper pluginMapper) {
		this.pluginMapper = pluginMapper;
	}
	
	public int applyPluginPackageRecommend(PluginPackage obj) {
		log.debug("applyPluginPackageRecommend starting...");
		int retval = 0;
		retval = mapper.recommendPluginPackage(obj);
		if (retval == 0) {
			throw new BizException(BizErr.EX_UPDATE_FAIL);
		}
		log.debug("applyPluginPackageRecommend end");
		return retval;
	}
	
	/**
	 * 获取插件包的收费定义方式
	 * @param id
	 * @return
	 */
	public List<ProductBuyWay> getProductBuywayByPluginPackId(Integer id)
	{
		
		List<ProductBuyWay> list = buyWayMapper.getProductBuywayByPluginPackId(id);
		
		return list;
	}
	
	/**
	 * 获取插件的收费定义方式
	 * @param id
	 * @return
	 */
	public List<ProductBuyWay> getProductBuywayByPluginId(Integer id)
	{
		
		List<ProductBuyWay> list = buyWayMapper.getProductBuywayByPluginId(id);
		
		return list;
	}
	
	/**
	 * 清空插件包定义方式数据
	 * @param id
	 * @return
	 */
	public int delectBuyWayASPluginPackage(int id)
	{
		
		log.debug("delectBuyWayASPluginPackage starting...");
		
		int count = buyWayMapper.delectBuyWayASPluginPackage(id);
		
		log.debug("delectBuyWayASPluginPackage end...");
		return count;
	}
	
	/**
	 * 定义插件购买方式
	 * @param productBuyWay
	 * @return
	 */
	public boolean definePluginPackFee(ProductBuyWay[] productBuyWays)
	{
		
		log.debug("definePluginPackFee starting...");
		
		boolean flag;
		
		try
		{
			for(ProductBuyWay productBuyWay : productBuyWays)
			{
				Pricess pricess = buyWayMapper.getPricesByPrice(productBuyWay.getPrice());
				productBuyWay.setAppleId(pricess.getAppleId());
				buyWayMapper.definePluginPackFee(productBuyWay);
			}
			
			flag = true;
		}catch(Exception e)
		{
			flag = false;
		}
		
		log.debug("definePluginPackFee end...");
		return flag;
		
	}
	
	/**
	 * 删除图片
	 * @param type
	 * @param file
	 * @return
	 */
	@Override
	public int deletePluginPictureFile(String type, String file) 
	{
		
		log.debug("deletePluginPictureFile starting...");
		
		String uri = SysConfig.concat(SysConfig.getWebAddr(), "uploadify",
				type, file);
		File f = new File(uri);
		if (f.exists())
			f.delete();
		
		log.debug("deletePluginPictureFile end");
		return 1;
	}
	
	/**
	 * 发布插件
	 * @return
	 */
	public int releasePluginPackage(int id)
	{
		log.debug("releasePluginPackage starting...");
		
		int count = mapper.releasePluginPackage(id);
		
		log.debug("releasePluginPackage end...");
		return count;
		
	}

	/**
	 * 取消发布插件包
	 */
	public int unReleasePluginPackage(int id)
	{
		log.debug("releasePluginPackage starting...");
		
		int count = mapper.unReleasePluginPackage(id);
		
		log.debug("releasePluginPackage end...");
		return count;
	}
	
	/**
	 * 根据插件包Id获取插件列表数据
	 * @param pluginIds
	 * @return
	 */
	public List<Plugin> getPluginListByPluginPackId(String pluginPackId)
	{
		
		log.debug("getPluginListByPluginPackId starting...");
		
		PluginPackage pluginPackage = getPluginPackage(Integer.valueOf((pluginPackId)).intValue());
		List<Plugin> pluginList = new ArrayList<Plugin>();
		if(null != pluginPackage.getPluginids() && !"".equals(pluginPackage.getPluginids()))
		{
			String[] pluginArr = pluginPackage.getPluginids().split(",");
			for(String pluginId : pluginArr)
			{
				Plugin plugin = new Plugin();
				try {
					plugin = pluginMapper.getPlugin(Integer.valueOf(pluginId).intValue());
				} catch (NumberFormatException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				if(null != plugin)
				{
					pluginList.add(plugin);
				}
			}
		}
		
		log.debug("getPluginListByPluginPackId starting...");
		return pluginList;
		
	}

	/**
	 * 根据插件Id获取插件列表数据
	 * @param pluginIds
	 * @return
	 */
	public List<List<Plugin>> getPluginListByPluginIds(String pluginIds)
	{
		
		log.debug("getPluginListByPluginIds starting...");
		
		List<List<Plugin>> list = new ArrayList<List<Plugin>>();
		List<Plugin> allPluginList = new ArrayList<Plugin>(); 
		try {
			allPluginList = pluginMapper.findAllReleasePlugins(new Plugin());
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		List<Plugin> pluginList = new ArrayList<Plugin>();
		if(!"".equals(pluginIds) && !(null == pluginIds))
		{
			
			String[] pluginArr = pluginIds.split(",");
			for(String pluginId : pluginArr)
			{
				Plugin plugin = new Plugin();
				try {
					plugin = pluginMapper.getReleasePlugin(Integer.valueOf(pluginId).intValue());
				} catch (NumberFormatException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				pluginList.add(plugin);
				allPluginList.remove(plugin);
			}
			
		}
		list.add(pluginList);
		list.add(allPluginList);
		
		
		log.debug("getPluginListByPluginIds end...");
		return list;
	}

	@Override
	public int countPluginPackages(PluginPackage cond) {
		log.debug("countPluginPackages starting...");
		int count = 0;
		try {
			count = mapper.countPluginPackages(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countPluginPackages end");
		return count;
	}

	@Override
	public List<PluginPackage> findPluginPackagesByPage(PluginPackage cond) {
		log.debug("findPluginPackagesByPage starting...");
		List<PluginPackage> list = null;
		try {
			list = mapper.findPluginPackagesByPage(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findPluginPackagesByPage end");
		return list;
	}

	@Override
	public PluginPackage getPluginPackage(int id) {
		log.debug("getPluginPackage starting...");
		PluginPackage obj = null;
		try {
			obj = mapper.getPluginPackage(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getPluginPackage end");
		return obj;
	}

	@Override
	public int addPluginPackage(PluginPackage obj) {
		log.debug("addUniversity starting...");
		int retval = 0;
		try {
			retval = mapper.addPluginPackage(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addUniversity end");
		return retval;
	}

	@Override
	public int updatePluginPackage(PluginPackage obj) {
		log.debug("updatePluginPackage starting...");
		int retval = 0;
		try {
			retval = mapper.updatePluginPackage(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updatePluginPackage end");
		return retval;
	}
	
	@Override
	public int managePluginPackage(PluginPackage obj) {
		log.debug("updatePluginPackage starting...");
		int retval = 0;
		try {
			retval = mapper.managePluginPackage(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updatePluginPackage end");
		return retval;
	}

	@Override
	public int deletePluginPackage(int id) {
		log.debug("deletePluginPackage starting...");
		int retval = 0;
		try {
			retval = mapper.deletePluginPackage(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deletePluginPackage end");
		return retval;
	}
	
	
	/**
	 * 定义插件购买方式
	 * @param productBuyWay
	 * @return
	 */
	public int definePluginFee(ProductBuyWay[] productBuyWays)
	{
		
		log.debug("definePluginPackFee starting...");
		int count = 0;
		
		if(productBuyWays.length>0){
			int id = productBuyWays[0].getProductId();
			buyWayMapper.delectBuyWayASPlugin(id);
			for(int i=0;i<productBuyWays.length;i++){
				ProductBuyWay ProductBuyWay = productBuyWays[i];
				Pricess pricess = buyWayMapper.getPricesByPrice(ProductBuyWay.getPrice());
				ProductBuyWay.setAppleId(pricess.getAppleId());
				count = buyWayMapper.definePluginPackFee(ProductBuyWay);
				
				log.debug("definePluginPackFee end...");
			}
		}
		return count;
	}

	/**
	 * 清空插件定义方式数据
	 * @param id
	 * @return
	 */
	public int delectBuyWayASPlugin(int id)
	{
		
		log.debug("delectBuyWayASPlugin starting...");
		
		int count = buyWayMapper.delectBuyWayASPlugin(id);
		
		log.debug("delectBuyWayASPlugin end...");
		return count;
	}
	
	//何鹏start
	/**
	 * 查询下拉框的钱
	 */
	public List<Pricess> findPrices(){
		
		log.debug("findPrices starting...");
		List<Pricess> list=null;
		list = buyWayMapper.findPrices();
		log.debug("findPrices end...");
		return list;
	}
	
	
	//hepeng END
	
	
}
