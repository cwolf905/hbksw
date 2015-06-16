package com.dm.orm.biz;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.Information;
import com.dm.orm.mapper.entity.InformationBack;
import com.dm.orm.mapper.entity.InformationTab;

/**
 * 资讯服务接口
 * @author M.simple
 *
 */
public interface InformationBiz 
{
	
	/**
	 * 查询资讯标签
	 * @param informationId
	 * @return
	 */
	public List<InformationTab> findInformationTabByInformationId(Integer informationId);
	/**
	 * 查询专题标签
	 * @param informationId
	 * @return
	 */
	public List<InformationTab> findInformationTabBySubjectCid(Integer cid);
	
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
	 * 设置置顶
	 * @param informationBack
	 * @return
	 */
	public int topInformationBackAsInformationId(InformationBack informationBack);
	
	/**
	 * 修改推送标题
	 * @param informationBack
	 * @return
	 */
	public int updatePushTitleAsInformationId(InformationBack informationBack);
	
	/**
	 * 删除文件服务器文件
	 * @param type
	 * @param file
	 * @return
	 */
	public int deleteInformationFile(String type, String file);
	
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
	 * 根据Id查询资讯信息
	 * @param id
	 * @return
	 */
	public Information findInformationById(int id);
	
	/**
	 * 添加资讯信息
	 * @param informationBack
	 * @return
	 */
	public int addInformationBack(InformationBack informationBack);
}
