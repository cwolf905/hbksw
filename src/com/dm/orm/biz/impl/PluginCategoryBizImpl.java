package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.orm.biz.PluginCategoryBiz;
import com.dm.orm.mapper.PluginCategoryMapper;
import com.dm.orm.mapper.entity.PluginCategory;

public class PluginCategoryBizImpl implements PluginCategoryBiz {

	private Logger log = Logger.getLogger(PluginCategoryBizImpl.class);

	private PluginCategoryMapper mapper;
	
	public void setMapper(PluginCategoryMapper mapper) {
		this.mapper = mapper;
	}
	
	@Override
	public int applyPluginCategoryOrder(int[] ids) {
		log.debug("applyPluginCategoryOrder starting...");
		int retval = 1;
		for (int i = 0; i < ids.length; i++) {
			PluginCategory pluginCategory = new PluginCategory();
			pluginCategory.setId(ids[i]);
			pluginCategory.setOrderId(i + 1);
			retval = retval & mapper.orderPluginCategory(pluginCategory);
		}
		if (retval == 0) {
			throw new BizException(BizErr.EX_UPDATE_FAIL);
		}
		log.debug("applyPluginCategoryOrder end");
		return retval;
	}
	
	/**
	 * 根据名称查询插件类别
	 * @param name
	 * @return
	 */
	public PluginCategory selectPluginCategoryByName(String name)
	{
		
		log.debug("findPluginCategory starting...");
		
		PluginCategory pluginCate = mapper.selectPluginCategoryByName(name);
		
		log.debug("findPluginCategory starting...");
		return pluginCate;
	}
	
	/**
	 * 根据id查询插件类别数据
	 * @param id
	 * @return
	 */
	public PluginCategory findPluginCategory(int id)
	{
		
		log.debug("findPluginCategory starting...");
		
		PluginCategory pluginCate = null;
		pluginCate = mapper.findPluginCategory(id);
		
		log.debug("findPluginCategory end");
		return pluginCate;
	}
	
	/**
	 * 添加插件类别
	 * @param pluginCategory
	 * @return
	 */
	public int addPluginCategory(PluginCategory pluginCategory)
	{
		
		log.debug("addPluginCategory starting...");
		int count = 1;
		
		PluginCategory pluginCate = mapper.selectPluginCategoryByName(pluginCategory.getName());
		if(pluginCate != null)
		{
			count = 0;
		}else
		{
			mapper.addPluginCategory(pluginCategory);
		}
		
		log.debug("addPluginCategory end...");
		return count;
		 
	}
	
	/**
	 * 修改插件类别
	 * @param pluginCategory
	 * @return
	 */
	public int updatePluginCategory(PluginCategory pluginCategory)
	{
		
		log.debug("updatePluginCategory starting...");
		int count = 0;
		count = mapper.updatePluginCategory(pluginCategory);
		
		log.debug("updatePluginCategory end");
		return count;
	}
	
	/**
	 * 删除插件类别
	 * @param pluginCategory
	 * @return
	 */
	
	public int deletePluginCategory(PluginCategory pluginCategory)
	{
		
		log.debug("deletePluginCategory starting...");
		int count = 0;
		count = mapper.deletePluginCategory(pluginCategory);
		
		log.debug("deletePluginCategory end");
		return count;
	}
	
	/**
	 * 查询所有的插件类别数据量
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public List<PluginCategory> findAllPluginCategorys(PluginCategory pluginCategory) throws SQLException
	{
		
		log.debug("findAllPluginCategorys starting...");
		List<PluginCategory> list = null;
		try {
			list = mapper.findAllPluginCategorys(pluginCategory);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findAllPluginCategorys end");
		return list;
	}

	/**
	 * 统计所有的数据量
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public int countPluginCategorys(PluginCategory pluginCategory) throws SQLException
	{
		
		log.debug("countPluginCategorys starting...");
		int count = 0;
		try {
			count = mapper.countPluginCategorys(pluginCategory);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countPluginCategorys end");
		return count;
	}
	
	
}
