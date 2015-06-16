package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.CustomPush;
import com.dm.orm.mapper.entity.Information;
import com.dm.orm.mapper.entity.InformationBack;
import com.dm.orm.mapper.entity.InformationTab;


/**
 * 客户端自定义推送数据库交互类
* @ClassName: CustomPushMapper 
* @Description: TODO(客户端自定义推送数据库交互类) 
* @author wanglei weejion.com 
* @date 2015年4月22日 下午3:39:07 
*
 */
public interface CustomPushMapper extends ISqlMapper 
{
	
	/**
	 * 根据考试类型查询资讯标签
	 * @param informationId
	 * @return
	 */
	public List<InformationTab> findinfoTypeByExam(Integer examType);
	/**
	 * 查询资讯标签
	 * //add by wanglei for 咨询推送时候暂停推送功能的用户也会收到推送 2015年4月1日14:46:08
	 * @param informationId
	 * @return
	 */
	public List<InformationTab> findInformationTabByCid(Integer informationIds);
	
	/**
	 * 根据条件统计所有的待审核内容的资讯
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public int countInfomationContentAudit(InformationBack informationBack) throws SQLException;
	
	/**
	 * 修改推送标题
	 * @param customPush
	 * @return
	 */
	public int updatePushTitleAsId(CustomPush customPush);
	
	/**
	 * 根据Id查询推送信息
	 * @param id
	 * @return
	 */
	public CustomPush findCustomPushById(Long id);
	
	/**
	 * 根据主键查询编辑后的资讯信息
	 * @param id
	 * @return
	 */
	public InformationBack findInformationBackById(int id);
	
	/**
	 * 更新推送信息的置顶信息
	 * @param informationBack
	 * @return
	 */
	public int updateCustomPush(CustomPush customPush);
	/**
	 * 更新推送信息 
	 * @param informationBack
	 * @return
	 */
	public int updateAllCustomPush(CustomPush customPush);
	
	/**
	 * 资讯推送标题审核
	 * @param pushAudit （0：不通过  1：通过）
	 * @return
	 */
	public int customPushTitleAudit(CustomPush customPush);
	
	/**
	 * 推送信息内容审核
	 * @param contentAudit （0：不通过  1：通过）
	 * @return
	 */
	public int pushContentAudit(CustomPush customPush);
	
	/**
	 * 添加资讯信息
	 * @param informationBack
	 * @return
	 */
	public int addCustomPush(CustomPush customPush);

	
	/**
	 * 
	* @Title: getCustomPushAuditListCount 
	* @Description:  查询推送审核的总数 
	* @param @param customPush
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int getCustomPushAuditListCount(CustomPush customPush);
	
	/**
	 * 
	* @Title: getCustomPushAuditList 
	* @Description: 查询推送审核的列表 
	* @param @param customPush
	* @param @return    设定文件 
	* @return List<CustomPush>    返回类型 
	* @throws
	 */
	public List<CustomPush> getCustomPushAuditList(CustomPush customPush);
	
	
	/**
	 * 查询推送信息总数
	* @param customPush
	* @return 
	 */
	public int countCustomPushs(CustomPush customPush) throws SQLException;
	/**
	 * 分页查询推送信息
	* @param customPush
	* @return 
	 */
	public List<CustomPush> findCustomPushsByPage(CustomPush customPush)throws SQLException;
}
