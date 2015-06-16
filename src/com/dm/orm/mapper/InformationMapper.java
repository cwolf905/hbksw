package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.Information;
import com.dm.orm.mapper.entity.InformationBack;
import com.dm.orm.mapper.entity.InformationTab;


/**
 * 资讯数据库交互
 * @author M.simple
 *
 */
public interface InformationMapper extends ISqlMapper 
{
	
	/**
	 * 查询资讯标签
	 * @param informationId
	 * @return
	 */
	public List<InformationTab> findInformationTabByInformationId(List<Integer> informationIds);
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
	 * 根据条件查询所有的待审核资讯
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public List<Information> findInfomationContentAuditByPage(InformationBack informationBack) throws SQLException;
	
	/**
	 * 根据资讯Id查询编辑后的资讯信息
	 * @param id
	 * @return
	 */
	public InformationBack findInformationBackByInfomationId(int informationId);
	
	/**
	 * 根据主键查询编辑后的资讯信息
	 * @param id
	 * @return
	 */
	public InformationBack findInformationBackById(int id);
	
	/**
	 * 更新编辑后的资讯信息
	 * @param informationBack
	 * @return
	 */
	public int updateInformationBack(InformationBack informationBack);
	
	/**
	 * 资讯推送标题审核
	 * @param pushAudit （0：不通过  1：通过）
	 * @return
	 */
	public int informationPushTitleAudit(InformationBack informationBack);
	
	/**
	 * 资讯信息内容审核
	 * @param contentAudit （0：不通过  1：通过）
	 * @return
	 */
	public int informationContentAudit(InformationBack informationBack);
	
	/**
	 * 添加资讯信息
	 * @param informationBack
	 * @return
	 */
	public int addInformationBack(InformationBack informationBack);

	/**
	 * 根据Id查询资讯信息
	 * @param id
	 * @return
	 */
	public Information findInformationById(int id);
}
