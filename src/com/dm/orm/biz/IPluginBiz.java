package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.CollegeTab;
import com.dm.orm.mapper.entity.CollegeTabDefine;
import com.dm.orm.mapper.entity.DictExamType;
import com.dm.orm.mapper.entity.InformationTab;
import com.dm.orm.mapper.entity.Plugin;
import com.dm.orm.mapper.entity.PluginExpire;
import com.dm.orm.mapper.entity.PluginTemplate;
import com.dm.orm.mapper.entity.SearchWidget;
import com.dm.orm.mapper.entity.SearchWidgetGroup;

public interface IPluginBiz 
{

	/**
	 * 根据插件Id删除插件
	 * @param id
	 * @return
	 */
	public int deletePluginById(Integer id);
	
	/**
	 * 获取所有的订购快过期的插件
	 * @return
	 */
	public List<PluginExpire> findAllExpirePlugin(PluginExpire cond);
	
	/**
	 * 获取所有的考试类型
	 * @return
	 */
	public List<DictExamType> findAllDictExamType();
	

	/**
	 * 获取所有的插件模版
	 * @return
	 */
	public List<PluginTemplate> findAllPluginTemplate();
	
	/**
	 * 查询插件总数
	 * 
	 * @param cond
	 * @return
	 */
	public int countPlugins(Plugin cond);

	/**
	 * 分页查询
	 * 
	 * @param cond
	 * @return
	 */
	public List<Plugin> findPluginsByPage(Plugin cond);

	/**
	 * 查询所有插件
	 * 
	 * @param cond
	 * @return
	 */
	public List<Plugin> findAllPlugins(Plugin cond);

	/**
	 * 查询某个插件的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public Plugin getPlugin(int id);

	/**
	 * 修改插件信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updatePlugin(Plugin obj);

	/**
	 * 设置插件为默认插件
	 * 
	 * @param obj
	 * @return
	 */
	public int applyPluginDefault(Plugin obj);

	/**
	 * 设置插件为推荐插件
	 * 
	 * @param obj
	 * @return
	 */
	public int applyPluginRecommend(Plugin obj);

	/**
	 * 删除上传的插件Logo
	 * 
	 * @param type
	 * @param file
	 * @return
	 */
	public int deletePluginFile(String type, String file);
	

	/**
	 * 添加插件信息
	 * 
	 * @param obj
	 * @return
	 */
	public int addPlugin(Plugin obj);

	/**
	 * 查询类型
	 * 
	 * @param obj
	 * @return
	 */
	public String typelist();

	/**
	 * 查询标签
	 * 
	 * @param obj
	 * @return
	 */
	public String labellist();
	
	/**
	 * 修改插件状态
	 * 
	 * @param obj
	 * @return
	 */
	public int applyPluginStatus(Plugin obj);
	
	/**
	 * 修改查询类型
	 * 
	 * @param obj
	 * @return
	 */
	public String updatetypelist(int id);

	/**
	 * 修改查询标签
	 * 
	 * @param obj
	 * @return
	 */
	public String updatelabellist(int id);
	
	
	/**
	 * 查询某个插件的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public List<Plugin> getPluginReview(Plugin obj);
	
	/**
	 * 审核
	 * @param obj
	 * @return
	 */
	public int pluginreview(Plugin obj);
	
	/**
	 * 咨询tab页--Huge
	 */
	/**
	 * 根据插件ID查询资讯tab列表
	 */
	public List<InformationTab> selectInformationTabList(int pluginId);
	
	/**
	 * 添加资讯tab信息
	 */
	public int addInformationTab(InformationTab informationTab);
	
	/**
	 * 修改tab信息
	 */
	public int updateInformationTab(InformationTab informationTab);
	
	/**
	 * 删除tab信息
	 */
	public int deleteInformationTab(int id);
	
	/**
	 * 根据ID查询资讯tab
	 */
	public InformationTab findInformationTab(int id);
	
	/**
	 * 院校tab页--Huge
	 */
	
	/**
	 * 根据插件ID查询院校tab页列表
	 */
	public List<CollegeTab> selectCollegeTabList(int pluginId);
	
	/**
	 * 添加院校tab页信息
	 */
	public int addCollegeTab(CollegeTab collegeTab);
	
	/**
	 * 根据主键查找院校tab页信息
	 */
	public CollegeTab selectCollegeTabById(int tabid);
	
	/**
	 * 修改院校tab页信息
	 */
	public int updateCollegeTab(CollegeTab collegeTab);
	
	/**
	 * 删除院校tab页信息
	 */
	public int deleteCollegeTab(int tabid);
	
	/**
	 * 根据院校tabid查询搜索区域
	 */
	public List<SearchWidgetGroup> selectSearchWidgetGroupList(int tabId);
	
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
	 * 删除搜索区域
	 */
	public int deleteSearchWidgetGroup(int swgid);
	
	/**
	 * 查询所有院校tab页参数列表
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
	 * 根据控件进行搜索区域管理
	 */
	public SearchWidgetGroup manageSearchWidgetGroup(SearchWidgetGroup swg);
	
	/**
	 * 根据区域id查询出该区域中已有的控件ID集合
	 */
	public List<Integer> selectSearchWidgetIdListByGroupId(int groupId);
	
	/**
	 * 资讯tab页排序
	 */
	public int doSortInformationTab(String[] tabIds);
	
	/**
	 * 院校tab页排序
	 */
	public int doSortCollegeTab(String[] tabIds);
	
	/**
	 * 搜索区域排序
	 */
	public int doSortSearchWidgetGroup(String[] swgIds);
}
