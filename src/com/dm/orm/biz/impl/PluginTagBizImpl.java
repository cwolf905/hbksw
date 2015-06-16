package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.orm.biz.PluginTagBiz;
import com.dm.orm.mapper.PluginTagMapper;
import com.dm.orm.mapper.entity.PluginTag;

public class PluginTagBizImpl implements PluginTagBiz {

	private Logger log = Logger.getLogger(PluginTagBizImpl.class);

	private PluginTagMapper mapper;
	
	public void setMapper(PluginTagMapper mapper) 
	{
		this.mapper = mapper;
	}
	
	@Override
	public int applyPluginTagOrder(int[] ids) {
		log.debug("applyPluginTagOrder starting...");
		int retval = 1;
		for (int i = 0; i < ids.length; i++) {
			PluginTag pluginTag = new PluginTag();
			pluginTag.setId(ids[i]);
			pluginTag.setOrderId(i + 1);
			retval = retval & mapper.orderPluginTag(pluginTag);
		}
		if (retval == 0) {
			throw new BizException(BizErr.EX_UPDATE_FAIL);
		}
		log.debug("applyPluginTagOrder end");
		return retval;
	}
	
	/**
	 * 根据名称查询插件标签
	 * @param name
	 * @return
	 */
	public PluginTag selectPluginTagByName(String name)
	{
		
		log.debug("selectPluginTagByName starting...");
		
		PluginTag pluginTag = mapper.selectPluginTagByName(name);
		
		log.debug("selectPluginTagByName starting...");
		return pluginTag;
	}
	
		/**
	 * 根据id查询插件标签数据
	 * @param id
	 * @return
	 */
	public PluginTag findPluginTag(int id)
	{
		
		log.debug("findPluginTag starting...");
		
		PluginTag pluginTag = null;
		pluginTag = mapper.findPluginTag(id);
		
		log.debug("findPluginTag end");
		return pluginTag;
	}
	
	/**
	 * 添加插件类别
	 * @param pluginTag
	 * @return
	 */
	public int addPluginTag(PluginTag pluginTag)
	{
		
		log.debug("addPluginTag starting...");
		
		int flag = 1;
		PluginTag pluginTagVulid = mapper.selectPluginTagByName(pluginTag.getName());
		if(pluginTagVulid != null)
		{
			flag = 0;
		}else
		{
			mapper.addPluginTag(pluginTag);
		}
		
		log.debug("addPluginTag end...");
		return flag;
		 
	}
	
	/**
	 * 修改插件类别
	 * @param pluginTag
	 * @return
	 */
	public int updatePluginTag(PluginTag pluginTag)
	{
		
		log.debug("updatePluginTag starting...");
		int count = 0;
		count = mapper.updatePluginTag(pluginTag);
		
		log.debug("updatePluginTag end");
		return count;
	}
	
	/**
	 * 删除插件类别
	 * @param pluginTag
	 * @return
	 */
	
	public int deletePluginTag(PluginTag pluginTag)
	{
		
		log.debug("deletePluginTag starting...");
		int count = 0;
		count = mapper.deletePluginTag(pluginTag);
		
		log.debug("deletePluginTag end");
		return count;
	}
	
	/**
	 * 查询所有的插件标签数据量
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public List<PluginTag> findAllPluginTags(PluginTag pluginTag) throws SQLException
	{
		
		log.debug("findAllPluginTags starting...");
		List<PluginTag> list = null;
		try {
			list = mapper.findAllPluginTags(pluginTag);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findAllPluginTags end");
		return list;
	}

	/**
	 * 统计所有的数据量
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public int countPluginTags(PluginTag pluginTag) throws SQLException
	{
		
		log.debug("countPluginTags starting...");
		int count = 0;
		try {
			count = mapper.countPluginTags(pluginTag);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countPluginTags end");
		return count;
	}
	
	
}
