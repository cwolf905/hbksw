package com.dm.orm.biz;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.CustomPush;
import com.dm.orm.mapper.entity.InformationBack;
import com.dm.orm.mapper.entity.InformationTab;

/**
 * 自定义客户端推送业务处理类
* @ClassName: ICustomPushBiz 
* @Description: TODO(自定义客户端推送业务处理类) 
* @author wanglei weejion.com 
* @date 2015年4月22日 下午3:33:32 
*
 */
public interface ICustomPushBiz 
{
	
	/**
	 * 查询资讯标签
	 * @param informationId
	 * @return
	 */
	public List<InformationTab> findinfoTypeByExam(Integer examType);
	
	/**
	 * 根据条件统计所有的待审核内容的资讯
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public int countInfomationContentAudit(InformationBack informationBack) throws SQLException;
	
	/**
	 * 取消置顶
	 * @param customPush
	 * @return
	 */
	public int cenelCustomPushAsId(CustomPush customPush);
	
	/**
	 * 设置置顶
	 * @param customPush
	 * @return
	 */
	public int topCustomPushBackAsId(CustomPush customPush);
	
	/**
	 * 修改推送标题
	 * @param informationBack
	 * @return
	 */
	public int updatePushTitleAsId(CustomPush customPush);
	
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
	public int updateCustomPush(CustomPush informationBack);
	/**
	 * 更新编辑后的资讯信息
	 * @param informationBack
	 * @return
	 */
	public int updateAllCustomPush(CustomPush informationBack);
	
	/**
	 * 资讯推送标题审核
	 * @param pushAudit （0：不通过  1：通过）
	 * @return
	 */
	public int customPushTitleAudit(CustomPush informationBack);
	
	/**
	 * 推送信息内容审核
	 * @param customPush （0：不通过  1：通过）
	 * @return
	 */
	public int pushContentAudit(CustomPush customPush);
	
	/**
	 * 根据Id查询资讯信息
	 * @param id
	 * @return
	 */
	public CustomPush findCustomPushById(Long id);
	
	/**
	 * 添加资讯信息
	 * @param customPush
	 * @return
	 */
	public int addCustomPush(CustomPush customPush);
	
	/**
	 * 查询推送总数
	 * @param customPush
	 * @return
	 */
	public int countCustomPushs(CustomPush customPush);
	
	/**
	 * 分页查询推送信息
	 * @param customPush
	 * @return
	 */
	public List<CustomPush> findCustomPushsByPage(CustomPush customPush);

	/**
	 * 
	* @Title: getCustomPushAuditListCount 
	* @Description: TODO(获取推送未审核总量) 
	* @param @param customPush
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int getCustomPushAuditListCount(CustomPush customPush);
	/**
	 * 
	 * @Title: getCustomPushAuditList 
	 * @Description: TODO(获取推送未审核列表) 
	 * @param @param customPush
	 * @param @return    设定文件 
	 * @return int    返回类型 
	 * @throws
	 */
	public List<CustomPush> getCustomPushAuditList(CustomPush customPush);

}
