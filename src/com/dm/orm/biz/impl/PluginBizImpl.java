package com.dm.orm.biz.impl;

import java.io.File;
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

import com.dm.core.SysConfig;
import com.dm.orm.biz.IPluginBiz;
import com.dm.orm.mapper.PluginMapper;
import com.dm.orm.mapper.RightsMapper;
import com.dm.orm.mapper.entity.CollegeTab;
import com.dm.orm.mapper.entity.CollegeTabDefine;
import com.dm.orm.mapper.entity.DictExamType;
import com.dm.orm.mapper.entity.InformationTab;
import com.dm.orm.mapper.entity.Plugin;
import com.dm.orm.mapper.entity.PluginAndCategory;
import com.dm.orm.mapper.entity.PluginAndTag;
import com.dm.orm.mapper.entity.PluginCategory;
import com.dm.orm.mapper.entity.PluginExpire;
import com.dm.orm.mapper.entity.PluginTag;
import com.dm.orm.mapper.entity.PluginTemplate;
import com.dm.orm.mapper.entity.Rights;
import com.dm.orm.mapper.entity.SearchWidget;
import com.dm.orm.mapper.entity.SearchWidgetGroup;
import com.dm.rest.resource.BasicRSInterceptor;
import com.dm.rest.resource.RSCache;
import com.google.gson.Gson;


public class PluginBizImpl implements IPluginBiz {

	private Logger log = Logger.getLogger(PluginBizImpl.class);

	private PluginMapper mapper;
	
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
	public void setMapper(PluginMapper mapper) {
		this.mapper = mapper;
	}
	
	public void setRightsMapper(RightsMapper rightsMapper) {
		this.rightsMapper = rightsMapper;
	}
	
	public int deletePluginById(Integer id)
	{
		int deletePlugin = 0;
		try 
		{
			//删除插件
			deletePlugin = mapper.deletePlugin(id);
			//删除插件菜单
			deletePlugin = mapper.deleteRightByPluginId(id);
			//通知后台重新加载plugin
			String uri = RSCache.getURI() + "/userService/visitor/reloadindexType";
			restTemplate.getForObject(uri, String.class);
		}
		catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return deletePlugin;
	}

	/**
	 * 获取所有的订购快过期的插件
	 * @return
	 */
	public List<PluginExpire> findAllExpirePlugin(PluginExpire cond)
	{
	
		List<PluginExpire> list = new ArrayList<PluginExpire>();
		try {
			list = mapper.findAllExpirePlugin(cond);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}

	/**
	 * 获取所有的考试类型
	 * @return
	 */
	public List<DictExamType> findAllDictExamType()
	{
		
		List<DictExamType> dictExamTypeList = mapper.findAllDictExamType();
		
		return dictExamTypeList;
	}
	
	/**
	 * 获取所有的插件模版
	 * @return
	 */
	public List<PluginTemplate> findAllPluginTemplate()
	{
		
		List<PluginTemplate> pluginTemplateList = mapper.findAllPluginTemplate();
		
		return pluginTemplateList;
	}

	@Override
	public int countPlugins(Plugin cond) {
		log.debug("countPlugins starting...");
		int count = 0;
		try {
			count = mapper.countPlugins(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countPlugins end");
		return count;
	}

	@Override
	public List<Plugin> findPluginsByPage(Plugin cond) {
		log.debug("findPluginsByPage starting...");
		List<Plugin> list = null;
		try {
			//list = mapper.findPluginsByPage(cond);
			list = mapper.pluginsByPage(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findPluginsByPage end");
		return list;
	}

	@Override
	public List<Plugin> findAllPlugins(Plugin cond) {
		log.debug("findAllPlugins starting...");
		List<Plugin> list = null;
		try {
			list = mapper.findAllPlugins(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findAllPlugins end");
		return list;
	}

	@Override
	public Plugin getPlugin(int id) {
		log.debug("getPlugin starting...");
		Plugin obj = null;
		try {
			obj = mapper.getPlugin(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getPlugin end");
		return obj;
	}

	@Override
	public int updatePlugin(Plugin obj) {
		log.debug("updatePlugin starting...");
		int retval = 0;
		try {
//			List<Plugin> pluginList = mapper.findPluginByExamTypeAndTemplateId(obj);
//			if(null != pluginList && pluginList.size() != 0)
//			{
//				throw new BizException(BizErr.EX_PLUGIN_EXIST);
//			}
			retval = mapper.updatePlugin(obj);
			int pluginid = obj.getId();
			String c_id = obj.getPluginCategoryId();
			String t_id = obj.getPluginTagId();
			mapper.delPluginCategory(pluginid);
			if(!c_id.equals("")){
				c_id = c_id.substring(0, c_id.length()-1);
				String[] ids = c_id.split(",");
				for(int i=0;i<ids.length;i++){
					int id = Integer.parseInt(ids[i].toString());
					PluginAndCategory pluginAndCategory = new PluginAndCategory();
					pluginAndCategory.setPluginId(pluginid);
					pluginAndCategory.setPluginCategoryId(id);
					retval = mapper.addPluginCategory(pluginAndCategory);
				}
			}
			mapper.delPluginTag(pluginid);
			if(!t_id.equals("")){
				t_id = t_id.substring(0, t_id.length()-1);
				String[] ids = t_id.split(",");
				for(int i=0;i<ids.length;i++){
					int id = Integer.parseInt(ids[i].toString());
					PluginAndTag pluginAndTag = new PluginAndTag();
					pluginAndTag.setPluginId(pluginid);
					pluginAndTag.setPluginTagId(id);
					retval = mapper.addPluginTag(pluginAndTag);
				}
			}
			
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
			//通知后台重新加载plugin
			String uri = RSCache.getURI() + "/userService/visitor/reloadindexType";
			restTemplate.getForObject(uri, String.class);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updatePlugin end");
		return retval;
	}

	@Override
	public int applyPluginDefault(Plugin obj) {
		log.debug("applyPluginDefault starting...");
		int retval = 0;
		try {
			retval = mapper.defaultPlugin(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("applyPluginDefault end");
		return retval;
	}

	@Override
	public int applyPluginRecommend(Plugin obj) {
		log.debug("applyPluginRecommend starting...");
		int retval = 0;
		try {
			retval = mapper.recommendPlugin(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("applyPluginRecommend end");
		return retval;
	}
	
	@Override
	public int deletePluginFile(String type, String file) {
		log.debug("deletePluginFile starting...");
		String uri = SysConfig.concat(SysConfig.getWebAddr(), "uploadify",
				type, file);
		File f = new File(uri);
		if (f.exists())
			f.delete();
		log.debug("deletePluginFile end");
		return 1;
	}
	
	//add gaoxiang
	@Override
	public int addPlugin(Plugin obj) {
		log.debug("addPlugin starting...");
		int retval = 0;
		Integer pluginId = null;
		try {
//			List<Plugin> pluginList = null;
			Plugin findPluginByName = mapper.findPluginByName(obj.getName());
			if(null != findPluginByName)
			{
				throw new BizException(BizErr.EX_PLUGIN_NAME_EXIST);
			}
			List<Plugin> pluginList = mapper.findPluginByExamTypeAndTemplateId(obj);
			if(null != pluginList && pluginList.size() != 0)
			{
				throw new BizException(BizErr.EX_PLUGIN_EXIST);
			}
			retval = mapper.addPlugin(obj);
			pluginId = obj.getId();
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			int pluginid = obj.getId();
			String c_id = obj.getPluginCategoryId();
			String t_id = obj.getPluginTagId();
			if(!c_id.equals("")){
				c_id = c_id.substring(0, c_id.length()-1);
				String[] ids = c_id.split(",");
				for(int i=0;i<ids.length;i++){
					int id = Integer.parseInt(ids[i].toString());
					PluginAndCategory pluginAndCategory = new PluginAndCategory();
					pluginAndCategory.setPluginId(pluginid);
					pluginAndCategory.setPluginCategoryId(id);
					retval = mapper.addPluginCategory(pluginAndCategory);
				}
			}
			if(!t_id.equals("")){
				t_id = t_id.substring(0, t_id.length()-1);
				String[] ids = t_id.split(",");
				for(int i=0;i<ids.length;i++){
					int id = Integer.parseInt(ids[i].toString());
					PluginAndTag pluginAndTag = new PluginAndTag();
					pluginAndTag.setPluginId(pluginid);
					pluginAndTag.setPluginTagId(id);
					retval = mapper.addPluginTag(pluginAndTag);
				}
			}
			
			if(pluginid<0){
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			
			/**
			 * 增加菜单逻辑
			 * 1.添加一个父级菜单
			 * 2.添加子菜单
			 */
			//添加一个父级菜单
			Rights parentRights = new Rights();
			//添加子菜单
			Rights childRights = new Rights();
			//添加子菜单
			Rights childRights1 = new Rights();
			//添加子菜单
			Rights childRights2 = new Rights();
			Rights childRights3 = new Rights();
			Rights childRights4 = new Rights();
			Rights childRights5 = new Rights();
			//如果添加的是资讯插件
			if("Information".equals(obj.getTemplateId()))
			{
				parentRights.setLabelId("informationMenu_" + obj.getExamtype());
				parentRights.setParentID(0);
				parentRights.setDelFlag(pluginId);
				parentRights.setChecked(1);
				parentRights.setResourceName(obj.getName());
				
				childRights.setLabelId("informationlist_" + obj.getExamtype());
				childRights.setDelFlag(pluginId);
				childRights.setChecked(1);
//				childRights.setParentID(parentRights.getResourceID());
				childRights.setResourceName("资讯列表");
				
				
				childRights1.setLabelId("informationContentAuditlist_" + obj.getExamtype());
				childRights1.setDelFlag(pluginId);
				childRights1.setChecked(1);
//				childRights1.setParentID(parentRights.getResourceID());
				childRights1.setResourceName("资讯内容审核");
				
				childRights2.setLabelId("informationPushAuditlist_" + obj.getExamtype());
				childRights2.setDelFlag(pluginId);
				childRights2.setChecked(1);
//				childRights2.setParentID(parentRights.getResourceID());
				childRights2.setResourceName("资讯推送审核");
				
				childRights3.setLabelId("infosubjectlist_" + obj.getExamtype());
				childRights3.setDelFlag(pluginId);
				childRights3.setChecked(1);
//				childRights3.setParentID(parentRights.getResourceID());
				childRights3.setResourceName("专题列表");
				
//				childRights4.setLabelId("infosubjectadd_" + obj.getExamtype());
//				childRights4.setParentID(parentRights.getResourceID());
//				childRights4.setResourceName("新增专题");
				
				parentRights.setParentID(0);
				rightsMapper.addRights(parentRights);
				childRights.setParentID(parentRights.getResourceID());
				rightsMapper.addRights(childRights);
				childRights1.setParentID(parentRights.getResourceID());
				rightsMapper.addRights(childRights1);
				childRights2.setParentID(parentRights.getResourceID());
				rightsMapper.addRights(childRights2);
				childRights3.setParentID(parentRights.getResourceID());
				rightsMapper.addRights(childRights3);
//				childRights4.setParentID(parentRights.getResourceID());
//				rightsMapper.addRights(childRights4);
			}else if("College".equals(obj.getTemplateId()))
			{
				parentRights.setLabelId("academynewsMenu_" + obj.getExamtype());
				parentRights.setDelFlag(pluginId);
				parentRights.setChecked(1);
				parentRights.setResourceName(obj.getName());
				
				childRights.setLabelId("academynewsList_" + obj.getExamtype());
				childRights.setChecked(1);
				childRights.setDelFlag(pluginId);
				childRights.setResourceName("院校资讯列表");
				
				childRights1.setLabelId("academynewsContentAuditList_" + obj.getExamtype());
				childRights1.setChecked(1);
				childRights1.setDelFlag(pluginId);
				childRights1.setResourceName("院校资讯内容审核");
				
				childRights2.setLabelId("academynewsPushAuditList_" + obj.getExamtype());
				childRights2.setChecked(1);
				childRights2.setDelFlag(pluginId);
				childRights2.setResourceName("院校资讯推送审核");
				
				childRights3.setLabelId("collegelist_" + obj.getExamtype());
				childRights3.setChecked(1);
				parentRights.setDelFlag(pluginId);
				childRights3.setResourceName("院校列表");
				
				childRights4.setLabelId("collegeorder_" + obj.getExamtype());
				childRights4.setChecked(1);
				childRights4.setDelFlag(pluginId);
				childRights4.setResourceName("推荐院校管理");
				
//				childRights5.setLabelId("qrcodelist_" + obj.getExamtype());
//				childRights5.setResourceName("二维码列表");
				
				parentRights.setParentID(0);
				rightsMapper.addRights(parentRights);
				childRights.setParentID(parentRights.getResourceID());
				rightsMapper.addRights(childRights);
				childRights1.setParentID(parentRights.getResourceID());
				rightsMapper.addRights(childRights1);
				childRights2.setParentID(parentRights.getResourceID());
				rightsMapper.addRights(childRights2);
				childRights3.setParentID(parentRights.getResourceID());
				rightsMapper.addRights(childRights3);
				childRights4.setParentID(parentRights.getResourceID());
				rightsMapper.addRights(childRights4);
//				childRights5.setParentID(parentRights.getResourceID());
//				rightsMapper.addRights(childRights5);
			}else if("Calendar".equals(obj.getTemplateId()))
			{
				parentRights.setLabelId("calendarMenu_" + obj.getExamtype());
				parentRights.setChecked(1);
				parentRights.setDelFlag(pluginId);
				parentRights.setResourceName(obj.getName());
				
				childRights.setLabelId("calendartimerlist_" + obj.getExamtype() + "_" + pluginId);
				childRights.setChecked(1);
				childRights.setDelFlag(pluginId);
				childRights.setResourceName("倒计时列表");
				
//				childRights1.setLabelId("calendartimeradd_" + obj.getExamtype() + "_" + pluginId);
//				childRights1.setResourceName("新增倒计时");
				
				childRights2.setLabelId("calendarschedulelist_" + obj.getExamtype() + "_" + pluginId);
				childRights2.setChecked(1);
				childRights2.setDelFlag(pluginId);
				childRights2.setResourceName("考试安排列表");
				
//				childRights3.setLabelId("calendarscheduleadd_" + obj.getExamtype());
//				childRights3.setResourceName("新增考试安排");
				
				childRights4.setLabelId("calendareventlist_" + obj.getExamtype() + "_" + pluginId);
				childRights4.setChecked(1);
				childRights4.setDelFlag(pluginId);
				childRights4.setResourceName("系统事件列表");
				
//				childRights5.setLabelId("calendareventadd_" + obj.getExamtype() + "_" + pluginId);
//				childRights5.setResourceName("新增系统事件");
				
				parentRights.setParentID(0);
				rightsMapper.addRights(parentRights);
				childRights.setParentID(parentRights.getResourceID());
				rightsMapper.addRights(childRights);
//				childRights1.setParentID(parentRights.getResourceID());
//				rightsMapper.addRights(childRights1);
				childRights2.setParentID(parentRights.getResourceID());
				rightsMapper.addRights(childRights2);
//				childRights3.setParentID(parentRights.getResourceID());
//				rightsMapper.addRights(childRights3);
				childRights4.setParentID(parentRights.getResourceID());
				rightsMapper.addRights(childRights4);
//				childRights5.setParentID(parentRights.getResourceID());
//				rightsMapper.addRights(childRights5);
			}else if("Flow".equals(obj.getTemplateId()))
			{
				parentRights.setLabelId("signflowMenu_" + obj.getExamtype());
				parentRights.setChecked(1);
				parentRights.setDelFlag(pluginId);
				parentRights.setResourceName(obj.getName());
				
				childRights.setLabelId("signflowlist_" + obj.getExamtype());
				childRights.setChecked(1);
				childRights.setDelFlag(pluginId);
				childRights.setResourceName("报考流程类别列表");
				
//				childRights1.setLabelId("signflowadd_" + obj.getExamtype());
//				childRights1.setResourceName("新增报考流程类别");
				
				parentRights.setParentID(0);
				rightsMapper.addRights(parentRights);
				childRights.setParentID(parentRights.getResourceID());
				rightsMapper.addRights(childRights);
//				childRights1.setParentID(parentRights.getResourceID());
//				rightsMapper.addRights(childRights1);
			}
			//通知后台重新加载plugin
			String uri = RSCache.getURI() + "/userService/visitor/reloadindexType";
			restTemplate.getForObject(uri, String.class);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addPlugin end");
		return retval;
	}

	@Override
	public String typelist() {
		log.debug("typelist starting...");
		List<PluginCategory> list = null;
		String json = null;
		try {
			list = mapper.typelist();
			Gson gson = new Gson();
			json = gson.toJson(list);
			if (list == null) {
				throw new BizException(BizErr.EX_TRANSACTION_FAIL);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		log.debug("typelist end");
		return json;
	}
	
	@Override
	public String labellist() {
		log.debug("labellist starting...");
		List<PluginTag> list = null;
		String json = null;
		try {
			list = mapper.labellist();
			Gson gson = new Gson();
			json = gson.toJson(list);
			if (list == null) {
				throw new BizException(BizErr.EX_TRANSACTION_FAIL);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		log.debug("labellist end");
		return json;
	}
	
	@Override
	public int applyPluginStatus(Plugin obj) {
		log.debug("applyPluginStatus starting...");
		int retval = 0;
		try {
			retval = mapper.pluginStatus(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("applyPluginStatus end");
		//通知后台重新加载plugin
		String uri = RSCache.getURI() + "/userService/visitor/reloadindexType";
		restTemplate.getForObject(uri, String.class);
		return retval;
	}

	@Override
	public String updatetypelist(int id) {
		log.debug("typelist starting...");
		List<PluginCategory> list1 = null;
		List<PluginCategory> list2 = null;
		String json = null;
		try {
			list1 = mapper.selecttypelist(id);
			list2 = mapper.notselecttypelist(id);
			Gson gson = new Gson();
			json = gson.toJson(list1);
			json +="#";
			json += gson.toJson(list2);
			if (json == null) {
				throw new BizException(BizErr.EX_TRANSACTION_FAIL);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		log.debug("typelist end");
		return json;
	}
	
	@Override
	public String updatelabellist(int id) {
		log.debug("labellist starting...");
		List<PluginTag> list1 = null;
		List<PluginTag> list2 = null;
		String json = null;
		try {
			list1 = mapper.selectlabellist(id);
			list2 = mapper.notselectlabellist(id);
			Gson gson = new Gson();
			json = gson.toJson(list1);
			json +="#";
			json += gson.toJson(list2);
			if (json == null) {
				throw new BizException(BizErr.EX_TRANSACTION_FAIL);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		log.debug("labellist end");
		return json;
	}
	
	@Override
	public List<Plugin> getPluginReview(Plugin obj) {
		log.debug("getPluginReview starting...");
		int plugintype = obj.getPluginType();
		int id = obj.getId();
		List<Plugin> p_obj = null;
		
		if(plugintype==0){
			try {
				p_obj = mapper.getknowledgeread(id);
			} catch (SQLException ex) {
				log.error("exception:", ex);
				throw new BizException(BizErr.EX_TRANSACTION_FAIL);
			}
		}
		if(plugintype==1){
			try {
				p_obj = mapper.getchoiceexercises(id);
			} catch (SQLException ex) {
				log.error("exception:", ex);
				throw new BizException(BizErr.EX_TRANSACTION_FAIL);
			}
				}
		log.debug("getPluginReview end");
		return p_obj;
	}
	
	@Override
	public int pluginreview(Plugin obj) {
		log.debug("pluginreview starting...");
		int retval = 0;
		try {
			retval = mapper.pluginreview(obj);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("pluginreview end");
		//通知后台重新加载plugin
		String uri = RSCache.getURI() + "/userService/visitor/reloadindexType";
		restTemplate.getForObject(uri, String.class);
		return retval;
	}
	
	/**
	 * 咨询tab页--Huge
	 */
	/**
	 * 根据插件ID查询资讯列表
	 */
	public List<InformationTab> selectInformationTabList(int pluginId)
	{
		log.debug("selectInformationTabList starting...");
		List<InformationTab> tabList = null;
		try
		{
			tabList = mapper.selectInformationTabListByPluginId(pluginId);
		}
		catch (Exception ex)
		{
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("selectInformationTabList end");
		return tabList;
	}
	
	/**
	 * 添加资讯tab信息
	 */
	public int addInformationTab(InformationTab informationTab)
	{
		log.debug("addInformationTab starting...");
		int tabId;
		try
		{
			tabId = mapper.addInformationTab(informationTab);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addInformationTab end");
		return tabId;
	}
	
	/**
	 * 修改tab信息
	 */
	public int updateInformationTab(InformationTab informationTab)
	{
		log.debug("updateInformationTab starting...");
		int flag;
		try
		{
			flag = mapper.updateInformationTab(informationTab);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateInformationTab end");
		return flag;
	}
	
	/**
	 * 删除tab信息
	 */
	public int deleteInformationTab(int id)
	{
		log.debug("deleteInformationTab starting...");
		int flag;
		try
		{
			flag = mapper.deleteInformationTab(id);
		}
		catch (Exception ex)
		{
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteInformationTab end");
		return flag;
	}
	
	/**
	 * 根据ID查询资讯tab
	 */
	public InformationTab findInformationTab(int id)
	{
		
		InformationTab informationTab = mapper.findInformationTab(id);
		
		return informationTab;
	}
	
	/**
	 * 根据插件ID查询院校tab页列表
	 */
	public List<CollegeTab> selectCollegeTabList(int pluginId)
	{
		log.debug("selectCollegeTabList starting...");
		List<CollegeTab> list = null;
		try
		{
			list = mapper.selectCollegeTabListByPluginId(pluginId);
		}
		catch (Exception ex)
		{
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("selectCollegeTabList end");
		return list;
	}
	
	/**
	 * 添加院校tab页信息
	 */
	public int addCollegeTab(CollegeTab collegeTab)
	{
		log.debug("addCollegeTab starting...");
		int tabId;
		try
		{
			//根据参数列表ID查询参数，插入院校tab实体中
			CollegeTabDefine collegeTabDefine = this.selectCollegeTabDefineById(collegeTab.getDefinedId());
			
			if(null != collegeTabDefine)
			{
				collegeTab.setTabname(collegeTabDefine.getTabName());
				
				collegeTab.setParameter(collegeTabDefine.getParameter());
				
				collegeTab.setListid(collegeTabDefine.getListId());
			}
			
			tabId = mapper.addCollegeTab(collegeTab);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addCollegeTab end");
		return tabId;
	}
	
	/**
	 * 根据主键查找院校tab页信息
	 */
	public CollegeTab selectCollegeTabById(int tabid)
	{
		log.debug("selectCollegeTabById starting...");
		CollegeTab collegeTab = null;
		try
		{
			collegeTab = mapper.selectCollegeTabById(tabid);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("selectCollegeTabById end");
		return collegeTab;
	}
	
	/**
	 * 修改院校tab页信息
	 */
	public int updateCollegeTab(CollegeTab collegeTab)
	{
		log.debug("updateCollegeTab starting...");
		int flag;
		try
		{
			//根据参数列表ID查询参数，插入院校tab实体中
			CollegeTabDefine collegeTabDefine = this.selectCollegeTabDefineById(collegeTab.getDefinedId());
			
			if(null != collegeTabDefine)
			{
				collegeTab.setTabname(collegeTabDefine.getTabName());
				
				collegeTab.setParameter(collegeTabDefine.getParameter());
				
				collegeTab.setListid(collegeTabDefine.getListId());
			}
			
			flag = mapper.updateCollegeTab(collegeTab);
		}
		catch (Exception ex)
		{
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateCollegeTab end");
		return flag;
	}
	
	/**
	 * 删除院校tab页信息
	 */
	public int deleteCollegeTab(int tabid)
	{
		log.debug("deleteCollegeTab starting...");
		int flag;
		try
		{
			flag = mapper.deleteCollegeTab(tabid);
		}
		catch (Exception ex)
		{
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteCollegeTab end");
		return flag;
	}
	
	/**
	 * 根据院校tabid查询搜索区域
	 */
	public List<SearchWidgetGroup> selectSearchWidgetGroupList(int tabId)
	{
		log.debug("selectSearchWidgetGroupList starting...");
		List<SearchWidgetGroup> list = null;
		try
		{
			list = mapper.selectSearchWidgetGroupListByTabId(tabId);
		}
		catch (Exception ex)
		{
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("selectSearchWidgetGroupList end");
		return list;
	}
	
	/**
	 * 添加搜索区域
	 */
	public int addSearchWidgetGroup(SearchWidgetGroup group)
	{
		log.debug("addSearchWidgetGroup starting...");
		int swgid;
		try
		{
			swgid = mapper.addSearchWidgetGroup(group);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addSearchWidgetGroup end");
		return swgid;
	}
	
	/**
	 * 根据主键查找搜索区域
	 */
	public SearchWidgetGroup selectSearchWidgetGroupById(int id)
	{
		log.debug("selectSearchWidgetGroupById starting...");
		SearchWidgetGroup group = null;
		try
		{
			group = mapper.selectSearchWidgetGroupById(id);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("selectSearchWidgetGroupById end");
		return group;
	}
	
	/**
	 * 修改搜索区域
	 */
	public int updateSearchWidgetGroup(SearchWidgetGroup group)
	{
		log.debug("updateSearchWidgetGroup starting...");
		int flag;
		try
		{
			flag = mapper.updateSearchWidgetGroup(group);
		}
		catch (Exception ex)
		{
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateSearchWidgetGroup end");
		return flag;
	}
	
	/**
	 * 删除搜索区域
	 */
	public int deleteSearchWidgetGroup(int swgid)
	{
		log.debug("deleteSearchWidgetGroup starting...");
		int flag;
		try
		{
			flag = mapper.deleteSearchWidgetGroup(swgid);
		}
		catch (Exception ex)
		{
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteSearchWidgetGroup end");
		return flag;
	}
	
	/**
	 * 查询所有院校tab页参数列表
	 */
	public List<CollegeTabDefine> selectAllCollegeTabDefine()
	{
		log.debug("selectAllCollegeTabDefine starting...");
		List<CollegeTabDefine> list = null;
		try
		{
			list = mapper.selectAllCollegeTabDefine();
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("selectAllCollegeTabDefine end");
		return list;
	}
	
	/**
	 * 根据主键查询院校tab页参数
	 */
	public CollegeTabDefine selectCollegeTabDefineById(int id)
	{
		log.debug("selectCollegeTabDefineById starting...");
		CollegeTabDefine collegeTabDefine = null;
		try
		{
			collegeTabDefine = mapper.selectCollegeTabDefineById(id);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("selectCollegeTabDefineById end");
		return collegeTabDefine;
	}
	
	/**
	 * 查询所有控件
	 */
	public List<SearchWidget> selectAllSearchWidget()
	{
		log.debug("selectAllSearchWidget starting...");
		List<SearchWidget> list = null;
		try
		{
			list = mapper.selectAllSearchWidget();
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("selectAllSearchWidget end");
		return list;
	}
	
	/**
	 * 根据主键查询控件
	 */
	public SearchWidget selectSearchWidgetById(int swid)
	{
		log.debug("selectSearchWidgetById starting...");
		SearchWidget searchWidget = null;
		try
		{
			searchWidget = mapper.selectSearchWidgetById(swid);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("selectSearchWidgetById end");
		return searchWidget;
	}
	
	/**
	 * 根据控件进行搜索区域管理
	 */
	public SearchWidgetGroup manageSearchWidgetGroup(SearchWidgetGroup swg)
	{
		log.debug("manageSearchWidgetGroup starting...");
		SearchWidgetGroup group = null;
		try
		{
			//将控件ID序列分割成数组
			String[] swIds = swg.getSwIds().split(",");
			
			//定义6种控件类型的ID序列
			StringBuilder textfield = new StringBuilder();			
			
			StringBuilder combobox1 = new StringBuilder();
			
			StringBuilder combobox2 = new StringBuilder();
			
			StringBuilder combobox3 = new StringBuilder();
			
			StringBuilder minbox = new StringBuilder();
			
			StringBuilder maxbox = new StringBuilder();
			
			//根据控件类型将其ID分别插入对应的ID序列中
			if(swIds.length > 0)
			{
				for(String swid : swIds)
				{
					if(!"".equals(swid))
					{
						//首先根据ID查出控件实体
						SearchWidget searchWidget = mapper.selectSearchWidgetById(Integer.valueOf(swid));
						
						//然后根据控件类型开始分类
						if(null != searchWidget)
						{
							String swType = searchWidget.getType();
							
							if("textfield".equals(swType))
							{
								textfield.append(swid + ",");
							}
							else if("combobox1".equals(swType))
							{
								combobox1.append(swid + ",");
							}
							else if("combobox2".equals(swType))
							{
								combobox2.append(swid + ",");
							}
							else if("combobox3".equals(swType))
							{
								combobox3.append(swid + ",");
							}
							else if("minbox".equals(swType))
							{
								minbox.append(swid + ",");
							}
							else if("maxbox".equals(swType))
							{
								maxbox.append(swid + ",");
							}
						}
					}
				}
			}
			
			//将每个序列的最后一个逗号去掉
			String textfieldId = "";
			String combobox1Id = "";
			String combobox2Id = "";
			String combobox3Id = "";
			String minboxId = "";
			String maxboxId = "";
			if(textfield.length() > 0)
			{
				textfieldId = textfield.substring(0, textfield.length()-1);
			}
			if(combobox1.length() > 0)
			{
				
				combobox1Id = combobox1.substring(0, combobox1.length()-1);
			}
			if(combobox2.length() > 0)
			{
				combobox2Id = combobox2.substring(0, combobox2.length()-1);
			}
			if(combobox3.length() > 0)
			{
				combobox3Id = combobox3.substring(0, combobox3.length()-1);
			}
			if(minbox.length() > 0)
			{
				minboxId = minbox.substring(0, minbox.length()-1);
			}
			if(maxbox.length() > 0)
			{
				maxboxId = maxbox.substring(0, maxbox.length()-1);
			}
			
			//根据区域ID查询出搜索区域
			group = mapper.selectSearchWidgetGroupById(swg.getSwgid());
			
			if(null != group)
			{
				group.setTextfield(textfieldId);
				
				group.setCombobox1(combobox1Id);
				
				group.setCombobox2(combobox2Id);
				
				group.setCombobox3(combobox3Id);
				
				group.setMinbox(minboxId);
				
				group.setMaxbox(maxboxId);
				
				mapper.manageSearchWidgetGroup(group);
			}
			
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("manageSearchWidgetGroup end");
		return group;
	}
	
	/**
	 * 根据区域id查询出该区域中已有的控件ID集合
	 */
	public List<Integer> selectSearchWidgetIdListByGroupId(int groupId)
	{
		log.debug("selectSearchWidgetIdListByGroupId starting...");
		List<Integer> list = new ArrayList<Integer>();
		try
		{
			//根据主键查出区域实体
			SearchWidgetGroup group = mapper.selectSearchWidgetGroupById(groupId);
			
			if(null != group)
			{
				if(null != group.getTextfield() && !"".equals(group.getTextfield()))
				{
					String[] textfield = group.getTextfield().split(",");
					
					for(String textfieldId : textfield)
					{
						if(!"".equals(textfieldId))
						{
							list.add(Integer.valueOf(textfieldId));
						}
					}
				}
				
				if(null != group.getCombobox1() && !"".equals(group.getCombobox1()))
				{
					String[] combobox1 = group.getCombobox1().split(",");
					
					for(String combobox1Id : combobox1)
					{
						if(!"".equals(combobox1Id))
						{
							list.add(Integer.valueOf(combobox1Id));
						}
					}
				}
				
				if(null != group.getCombobox2() && !"".equals(group.getCombobox2()))
				{
					String[] combobox2 = group.getCombobox2().split(",");
					
					for(String combobox2Id : combobox2)
					{
						if(!"".equals(combobox2Id))
						{
							list.add(Integer.valueOf(combobox2Id));
						}
					}
				}
				
				if(null != group.getCombobox3() && !"".equals(group.getCombobox3()))
				{
					String[] combobox3 = group.getCombobox3().split(",");
					
					for(String combobox3Id : combobox3)
					{
						if(!"".equals(combobox3Id))
						{
							list.add(Integer.valueOf(combobox3Id));
						}
					}
				}
				
				if(null != group.getMinbox() && !"".equals(group.getMinbox()))
				{
					String[] minbox = group.getMinbox().split(",");
					
					for(String minboxId : minbox)
					{
						if(!"".equals(minboxId))
						{
							list.add(Integer.valueOf(minboxId));
						}
					}
				}
				
				if(null != group.getMaxbox() && !"".equals(group.getMaxbox()))
				{
					String[] maxbox = group.getMaxbox().split(",");
					
					for(String maxboxId : maxbox)
					{
						if(!"".equals(maxboxId))
						{
							list.add(Integer.valueOf(maxboxId));
						}
					}
				}
			}
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("selectSearchWidgetIdListByGroupId end");
		return list;
	}
	
	/**
	 * 资讯tab页排序
	 */
	public int doSortInformationTab(String[] tabIds)
	{
		log.debug("doSortInformationTab starting...");
		int flag = 0;
		try
		{
			if(tabIds.length > 0)
			{
				for(int i = 0; i < tabIds.length; i ++)
				{
					if(!"".equals(tabIds[i]))
					{
						InformationTab informationTab = mapper.findInformationTab(Integer.valueOf(tabIds[i]));
						
						if(null != informationTab)
						{
							informationTab.setTabid(i + 1);
							
							flag = mapper.sortInformationTab(informationTab);
						}
					}
				}
			}
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("doSortInformationTab end");
		return flag;
	}
	
	/**
	 * 院校tab页排序
	 */
	public int doSortCollegeTab(String[] tabIds)
	{
		log.debug("doSortCollegeTab starting...");
		int flag = 0;
		try
		{
			if(tabIds.length > 0)
			{
				for(int i = 0; i < tabIds.length; i ++)
				{
					if(!"".equals(tabIds[i]))
					{
						CollegeTab collegeTab = mapper.selectCollegeTabById(Integer.valueOf(tabIds[i]));
						
						if(null != collegeTab)
						{
							collegeTab.setTabindex(i + 1);
							
							flag = mapper.sortCollegeTab(collegeTab);
						}
					}
				}
			}
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("doSortCollegeTab end");
		return flag;
	}
	
	/**
	 * 搜索区域排序
	 */
	public int doSortSearchWidgetGroup(String[] swgIds)
	{
		log.debug("doSortCollegeTab starting...");
		int flag = 0;
		try
		{
			if(swgIds.length > 0)
			{
				for(int i = 0; i < swgIds.length; i ++)
				{
					if(!"".equals(swgIds[i]))
					{
						SearchWidgetGroup group = mapper.selectSearchWidgetGroupById(Integer.valueOf(swgIds[i]));
						
						if(null != group)
						{
							group.setOrderid(i + 1);
							
							flag = mapper.sortSearchWidgetGroup(group);
						}
					}
				}
			}
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("doSortCollegeTab end");
		return flag;
	}
}
