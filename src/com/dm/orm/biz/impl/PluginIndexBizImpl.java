package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.web.client.RestTemplate;

import com.dm.orm.biz.PluginIndexBiz;
import com.dm.orm.mapper.PluginIndexMapper;
import com.dm.orm.mapper.RightsMapper;
import com.dm.orm.mapper.entity.PluginIndex;
import com.dm.rest.resource.BasicRSInterceptor;
import com.dm.rest.resource.RSCache;

public class PluginIndexBizImpl implements PluginIndexBiz {

	private Logger log = Logger.getLogger(PluginIndexBizImpl.class);

	private PluginIndexMapper mapper;
	
	private RightsMapper rightsMapper;

	@Qualifier("restTemplate")
	@Autowired
	protected RestTemplate restTemplate;

	public void setRestTemplate(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
		ClientHttpRequestInterceptor interceptor = new BasicRSInterceptor();
		List<ClientHttpRequestInterceptor> list = new ArrayList<ClientHttpRequestInterceptor>();
		list.add(interceptor);
		restTemplate.setInterceptors(list);
	}

	public HttpHeaders newHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		return headers;
	}
	
	public void setMapper(PluginIndexMapper mapper) 
	{
		this.mapper = mapper;
	}
	
	/**
	 * 根据名称查询游客访问
	 * @param name
	 * @return
	 */
	public PluginIndex selectPluginIndexByName(String name)
	{
		
		log.debug("selectPluginIndexByName starting...");
		
		PluginIndex pluginIndex = mapper.selectPluginIndexByName(name);
		
		log.debug("selectPluginIndexByName starting...");
		return pluginIndex;
	}
	
		/**
	 * 根据id查询游客访问数据
	 * @param id
	 * @return
	 */
	public PluginIndex findPluginIndex(int id)
	{
		
		log.debug("findPluginIndex starting...");
		
		PluginIndex pluginIndex = null;
		pluginIndex = mapper.findPluginIndex(id);
		
		log.debug("findPluginIndex end");
		return pluginIndex;
	}
	
	/**
	 * 添加插件类别
	 * @param pluginIndex
	 * @return
	 */
	public int addPluginIndex(PluginIndex pluginIndex)
	{
		
		log.debug("addPluginIndex starting...");
		
		int flag = 1;
		PluginIndex pluginIndexVulid = mapper.selectPluginIndexByName(pluginIndex.getName());
		if(pluginIndexVulid != null)
		{
			flag = 0;
		}else
		{
			mapper.addPluginIndex(pluginIndex);
		}
		//通知后台重新加载plugin
		String uri = RSCache.getURI() + "/userService/visitor/reloadindexType";
		restTemplate.getForObject(uri, String.class);
		log.debug("addPluginIndex end...");
		return flag;
		 
	}
	
	/**
	 * 修改插件类别
	 * @param pluginIndex
	 * @return
	 */
	public int updatePluginIndex(PluginIndex pluginIndex)
	{
		
		log.debug("updatePluginIndex starting...");
		int count = 0;
		count = mapper.updatePluginIndex(pluginIndex);
		//通知后台重新加载plugin
		String uri = RSCache.getURI() + "/userService/visitor/reloadindexType";
		restTemplate.getForObject(uri, String.class);
		log.debug("updatePluginIndex end");
		return count;
	}
	
	/**
	 * 删除插件类别
	 * @param pluginIndex
	 * @return
	 */
	
	public int deletePluginIndex(PluginIndex pluginIndex)
	{
		
		log.debug("deletePluginIndex starting...");
		int count = 0;
		count = mapper.deletePluginIndex(pluginIndex);
		//通知后台重新加载plugin
		String uri = RSCache.getURI() + "/userService/visitor/reloadindexType";
		restTemplate.getForObject(uri, String.class);
		log.debug("deletePluginIndex end");
		return count;
	}
	
	/**
	 * 查询所有的游客访问数据量
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public List<PluginIndex> findAllPluginIndexs(PluginIndex pluginIndex) throws SQLException
	{
		
		log.debug("findAllPluginIndexs starting...");
		List<PluginIndex> list = null;
		try {
			list = mapper.findAllPluginIndexs(pluginIndex);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findAllPluginIndexs end");
		return list;
	}

	/**
	 * 统计所有的数据量
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public int countPluginIndexs(PluginIndex pluginIndex) throws SQLException
	{
		
		log.debug("countPluginIndexs starting...");
		int count = 0;
		try {
			count = mapper.countPluginIndexs(pluginIndex);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countPluginIndexs end");
		return count;
	}
	
	
}
