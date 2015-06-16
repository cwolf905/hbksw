package com.dm.orm.biz.impl;

import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.dm.core.SysConfig;
import com.dm.orm.biz.InformationBiz;
import com.dm.orm.mapper.InformationMapper;
import com.dm.orm.mapper.entity.Information;
import com.dm.orm.mapper.entity.InformationBack;
import com.dm.orm.mapper.entity.InformationTab;
import com.dm.utils.DateUtil;


public class InformationBizImpl implements InformationBiz
{
	
	private InformationMapper mapper;
	
	public void setMapper(InformationMapper mapper) {
		this.mapper = mapper;
	}
	
	/**
	 * 查询资讯标签
	 * @param informationId
	 * @return
	 */
	public List<InformationTab> findInformationTabByInformationId(Integer informationId)
	{
		
		List<InformationTab> informationTabs = new ArrayList<InformationTab>();
		try
		{
//			InformationBack info = mapper.findInformationBackById(informationId);
			Information information = mapper.findInformationById(informationId);
			if(null != information && null != information.getCid())
			{
				//modified by wanglei for 咨询推送时候暂停推送功能的用户也会收到推送 2015年4月1日14:46:08
				/*List<Integer> informationIds = new ArrayList<Integer>();
				informationIds.add(information.getCid());*/
				Integer cid = information.getCid();
				informationTabs = mapper.findInformationTabByCid(cid);
			}
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
		
		return informationTabs;
	}
	/**
	 * 查询专题标签
	 * @param informationId
	 * @return
	 */
	public List<InformationTab> findInformationTabBySubjectCid(Integer cid)
	{
		
		List<InformationTab> informationTabs = new ArrayList<InformationTab>();
		try
		{
				informationTabs = mapper.findInformationTabByCid(cid);
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
		
		return informationTabs;
	}
	
	/**
	 * 根据条件统计所有的待审核内容的资讯
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public int countInfomationContentAudit(InformationBack informationBack) throws SQLException
	{
		
		int count = 0;
		count = mapper.countInfomationContentAudit(informationBack);
		
		return count;
	}
	
	/**
	 * 根据条件查询所有的待审核资讯
	 * 
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public List<Information> findInfomationContentAuditByPage(InformationBack informationBack) throws SQLException
	{
		
		List<Information> list = mapper.findInfomationContentAuditByPage(informationBack);
		
		return list;
	}
	
	/**
	 * 设置置顶
	 * @param informationBack
	 * @return
	 */
	public int topInformationBackAsInformationId(InformationBack informationBack)
	{
		
		//查询记录是否存在
		InformationBack info = mapper.findInformationBackByInfomationId(informationBack.getInformationId());
		
		int count = 0;
		if(null == info)
		{
			//不存在新增一条
			informationBack.setTopTime(DateUtil.formatDate(new Date()));
			count = mapper.addInformationBack(informationBack);
		}else
		{
			info.setTopStatus(informationBack.getTopStatus());
			info.setTopTime(DateUtil.formatDate(new Date()));
			//存在进行修改逻辑
			count = mapper.updateInformationBack(info);
		}
		
		return count;
	}
	
	/**
	 * 修改推送标题
	 * @param informationBack
	 * @return
	 */
	public int updatePushTitleAsInformationId(InformationBack informationBack)
	{
		
		//查询记录是否存在
		InformationBack info = mapper.findInformationBackByInfomationId(informationBack.getInformationId());
		
		int count = 0;
		if(null == info)
		{
			//不存在新增一条
			count = mapper.addInformationBack(informationBack);
		}else
		{
			info.setPushTitle(informationBack.getPushTitle());
			info.setPushTitleAudit(informationBack.getPushTitleAudit());
			//存在进行修改逻辑
			count = mapper.updateInformationBack(info);
		}
		
		return count;
	}
	
	@Override
	public int deleteInformationFile(String type, String file) 
	{
		
		String uri = SysConfig.concat(SysConfig.getWebAddr(), "uploadify",
				type, file);
		File f = new File(uri);
		if (f.exists())
			f.delete();
		
		return 1;
	}
	
	/**
	 * 根据资讯Id查询编辑后的资讯信息
	 * @param id
	 * @return
	 */
	public InformationBack findInformationBackByInfomationId(int id)
	{
		
		InformationBack informationBack = mapper.findInformationBackByInfomationId(id);
		
		return informationBack;
	}
	
	/**
	 * 根据主键查询编辑后的资讯信息
	 * @param id
	 * @return
	 */
	public InformationBack findInformationBackById(int id)
	{
		
		InformationBack informationBack = mapper.findInformationBackById(id);
		
		return informationBack;
	}
	
	/**
	 * 更新编辑后的资讯信息
	 * @param informationBack
	 * @return
	 */
	public int updateInformationBack(InformationBack informationBack)
	{
		int count = mapper.updateInformationBack(informationBack);
		
		return count;
	}
	
	/**
	 * 资讯推送标题审核
	 * @param pushAudit （0：不通过  1：通过）
	 * @return
	 */
	public int informationPushTitleAudit(InformationBack informationBack)
	{
		
		int count = mapper.informationPushTitleAudit(informationBack);
		
		return count;
	}
	
	/**
	 * 资讯信息内容审核
	 * @param contentAudit （0：不通过  1：通过）
	 * @return
	 */
	public int informationContentAudit(InformationBack informationBack)
	{
		
		int count = informationBack.getContentAudit();
			mapper.informationContentAudit(informationBack);
		return count;
	}
	
	/**
	 * 添加资讯信息
	 * @param informationBack
	 * @return
	 */
	public int addInformationBack(InformationBack informationBack)
	{
		
		int count = 0;
		
		//根据informationId查询是否已有数据存在
		InformationBack infoBack = mapper.findInformationBackByInfomationId(informationBack.getInformationId().intValue());
		//如果不存在则添加
		if(null == infoBack)
		{
			count = mapper.addInformationBack(informationBack);
		}else
		{
			//如果存在执行更新操作
			infoBack.setContent(informationBack.getContent());
			infoBack.setContentAudit(informationBack.getContentAudit());
			count = mapper.updateInformationBack(infoBack);
		}
		
		return count;
	}

	/**
	 * 根据Id查询资讯信息
	 * @param id
	 * @return
	 */
	public Information findInformationById(int id)
	{
		
		InformationBack imformationBack = mapper.findInformationBackByInfomationId(id);
		Information information = new Information();
		if(null == imformationBack || null == imformationBack.getContent())
		{
			information = mapper.findInformationById(id);
		}else
		{
			information.setContent(imformationBack.getContent());
			information.setTitle(imformationBack.getTitle());
			information.setIid(imformationBack.getInformationId());
		}
		
		return information;
	}
	
}
