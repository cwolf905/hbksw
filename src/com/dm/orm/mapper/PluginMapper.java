package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

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
import com.dm.orm.mapper.entity.SearchWidget;
import com.dm.orm.mapper.entity.SearchWidgetGroup;

public interface PluginMapper extends ISqlMapper {
	
	public Plugin findPluginByName(String name);
	
	public List<PluginExpire> findAllExpirePlugin(PluginExpire cond) throws SQLException;

	public int countPlugins(Plugin cond) throws SQLException;

	public List<Plugin> findPluginsByPage(Plugin cond) throws SQLException;

	public List<Plugin> findAllPlugins(Plugin cond) throws SQLException;
	
	public List<Plugin> findAllReleasePlugins(Plugin cond) throws SQLException;

	public Plugin getPlugin(int id) throws SQLException;

	public Plugin getReleasePlugin(int id) throws SQLException;
	
	public int addPlugin(Plugin obj) throws SQLException;

	public int updatePlugin(Plugin obj) throws SQLException;

	public int defaultPlugin(Plugin obj) throws SQLException;

	public int recommendPlugin(Plugin obj) throws SQLException;

	public int deletePlugin(int id) throws SQLException;
	
	public List<PluginCategory> typelist() throws SQLException; 
	
	public List<PluginTag> labellist() throws SQLException; 

	public int pluginStatus(Plugin obj) throws SQLException;
	
	public int addPluginCategory(PluginAndCategory pluginAndCategory) throws SQLException;
	
	public int addPluginTag(PluginAndTag pluginAndTag) throws SQLException;

	public List<PluginCategory> selecttypelist(int id) throws SQLException; 
	
	public List<PluginTag> selectlabellist(int id) throws SQLException; 

	public List<PluginCategory> notselecttypelist(int id) throws SQLException; 
	
	public List<PluginTag> notselectlabellist(int id) throws SQLException; 
	
	public int delPluginCategory(int id) throws SQLException; 
	
	public int delPluginTag(int id) throws SQLException; 

	public List<Plugin> pluginsByPage(Plugin cond) throws SQLException;

	public int pluginreview(Plugin obj) throws SQLException;

	public List<Plugin> getknowledgeread(int id) throws SQLException;

	public List<Plugin> getchoiceexercises(int id) throws SQLException;
	
	public int deletePluginById(Integer id);
	
	public int deleteRightByPluginId(Integer id);
	
	/**
	 * 获取所有的插件模版
	 * @return
	 */
	public List<PluginTemplate> findAllPluginTemplate();
	
	/**
	 * 获取所有的考试类型
	 * @return
	 */
	public List<DictExamType> findAllDictExamType();
	
	/**
	 * 根据考试类型与模版Id获取插件
	 * @param obj
	 * @return
	 * @throws SQLException
	 */
	public List<Plugin> findPluginByExamTypeAndTemplateId(Plugin obj) throws SQLException;
	
	/**
	 * 根据插件ID查找资讯tab页列表
	 */
	public List<InformationTab> selectInformationTabListByPluginId(int pluginId);
	
	/**
	 * 添加资讯tab页
	 */
	public int addInformationTab(InformationTab informationTab);
	
	/**
	 * 修改咨询tab页
	 */
	public int updateInformationTab(InformationTab informationTab);
	
	/**
	 * 删除此讯tab页
	 */
	public int deleteInformationTab(int id);
	
	/**
	 * 根据ID查询资讯tab
	 */
	public InformationTab findInformationTab(int id);
		
	/**
	 * 院校tab页方法--begin
	 */
	/**
	 * 根据插件ID查询院校tab页列表
	 */
	public List<CollegeTab> selectCollegeTabListByPluginId(int pluginId);
	
	/**
	 * 添加院校tab页
	 */
	public int addCollegeTab(CollegeTab collegeTab);
	
	/**
	 * 根据主键查找院校tab页信息
	 */
	public CollegeTab selectCollegeTabById(int id);
	
	/**
	 * 修改院校tab页
	 */
	public int updateCollegeTab(CollegeTab collegeTab);
	
	/**
	 * 删除院校tab页
	 */
	public int deleteCollegeTab(int tabid);
	
	/**
	 * 根据院校tabid查询搜索区域
	 */
	public List<SearchWidgetGroup> selectSearchWidgetGroupListByTabId(int tabid);
	
	/**
	 * 添加搜索区域
	 */
	public int addSearchWidgetGroup(SearchWidgetGroup group);
	
	/**
	 * 根据主键查找搜索区域
	 */
	public SearchWidgetGroup selectSearchWidgetGroupById(int id);
	
	/**
	 * 修改搜索区域
	 */
	public int updateSearchWidgetGroup(SearchWidgetGroup group);
	
	/**
	 * 根据主键删除搜索区域
	 */
	public int deleteSearchWidgetGroup(int swgid);
	
	/**
	 * 查询所有的院校tab页参数列表
	 */
	public List<CollegeTabDefine> selectAllCollegeTabDefine();
	
	/**
	 * 根据主键查询院校tab页参数
	 */
	public CollegeTabDefine selectCollegeTabDefineById(int id);
	
	/**
	 * 查询所有控件
	 */
	public List<SearchWidget> selectAllSearchWidget();
	
	/**
	 * 根据主键查询控件
	 */
	public SearchWidget selectSearchWidgetById(int swid);
	
	/**
	 * 管理搜索区域（根据控件id分配）
	 */
	public int manageSearchWidgetGroup(SearchWidgetGroup group);
	
	/**
	 * 对院校tab页进行排序（只更新序号）
	 */
	public int sortCollegeTab(CollegeTab collegeTab);
	
	/**
	 * 对搜索区域排序（至更新序号）
	 */
	public int sortSearchWidgetGroup(SearchWidgetGroup group);
	
	/**
	 * 对资讯tab页进行排序
	 */
	public int sortInformationTab(InformationTab informationTab);
	
	/**
	 * 院校tab页方法--end
	 */
}
