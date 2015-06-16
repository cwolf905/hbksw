package com.dm.orm.biz.impl;

import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.dm.core.SysConfig;
import com.dm.orm.biz.AcademynewsBiz;
import com.dm.orm.mapper.AcademynewsMapper;
import com.dm.orm.mapper.entity.News;
import com.dm.orm.mapper.entity.NewsBack;
import com.dm.rest.model.College;
import com.dm.utils.DateUtil;


public class AcademynewsBizImpl implements AcademynewsBiz
{
	
	private AcademynewsMapper mapper;
	
	public void setMapper(AcademynewsMapper mapper) {
		this.mapper = mapper;
	}
	
	/**
	 * 查询院校资讯标签
	 * @param newsId
	 * @return
	 */
	public List<College> findCollegeByNewId(Integer newsId)
	{
		
		
		List<College> findCollegeId = new ArrayList<College>();
		try
		{
//			NewsBack newBack = mapper.findNewsBackById(newsId);
			News news = mapper.findAcademynewsById(newsId);
			if(null != news)
			{
				Integer cid = news.getCid();
				findCollegeId = mapper.findCollegeId(cid);
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		return findCollegeId;
	}
	
	/**
	 * 设置置顶
	 * @param newsBack
	 * @return
	 */
	public int topNewsBackAsNewsId(NewsBack newsBack)
	{
		
		//查询记录是否存在
		NewsBack info = mapper.findNewsBackByNewsId(newsBack.getNewsId());
		
		int count = 0;
		if(null == info)
		{
			//不存在新增一条
			count = mapper.addNewsBack(newsBack);
		}else
		{
			info.setTopStatus(newsBack.getTopStatus());
			info.setTopTime(DateUtil.formatDate(new Date()));
			//存在进行修改逻辑
			count = mapper.updateNewsBack(info);
		}
		
		return count;
	}
	
	/**
	 * 修改推送标题
	 * @param newsBack
	 * @return
	 */
	public int updatePushTitleAsNewsId(NewsBack newsBack)
	{
		
		//查询记录是否存在
		NewsBack info = mapper.findnewsBackBynId(newsBack.getNewsId());
		
		int count = 0;
		if(null == info)
		{
			//不存在新增一条
			count = mapper.addAcademynewsBack(newsBack);
		}else
		{
			info.setPushTitle(newsBack.getPushTitle());
			info.setPushTitleAudit(newsBack.getPushTitleAudit());
			//存在进行修改逻辑
			count = mapper.updateNewsBack(info);
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
	 * 根据院校Id查询编辑后的院校信息
	 * @param id
	 * @return
	 */
	public NewsBack findNewsBackByNewsId(int informationId)
	{
		
		NewsBack newsBack = mapper.findNewsBackByNewsId(informationId);
		
		return newsBack;
	}
	
	/**
	 * 根据主键查询编辑后的院校信息
	 * @param id
	 * @return
	 */
	public NewsBack findNewsBackById(int id)
	{
		
		NewsBack newsBack = mapper.findNewsBackById(id);
		
		return newsBack;
	}
	
	/**
	 * 更新编辑后的院校信息
	 * @param newsBack
	 * @return
	 */
	public int updateNewsBack(NewsBack newsBack)
	{
		int count = mapper.updateNewsBack(newsBack);
		
		return count;
	}
	
	/**
	 * 院校推送标题审核
	 * @param pushAudit （0：不通过  1：通过）
	 * @return
	 */
	public int informationPushTitleAudit(NewsBack newsBack)
	{
		
		int count = mapper.informationPushTitleAudit(newsBack);
		
		return count;
	}
	
	/**
	 * 院校信息内容审核
	 * @param contentAudit （0：不通过  1：通过）
	 * @return
	 */
	public int informationContentAudit(NewsBack newsBack)
	{
		
		int count = mapper.informationContentAudit(newsBack);
		
		return count;
	}
	
	/**
	 * 添加院校信息
	 * @param newsBack
	 * @return
	 */
	public int addNewsBack(NewsBack newsBack)
	{
		
		int count = 0;
		
		//根据informationId查询是否已有数据存在
		NewsBack infoBack = mapper.findNewsBackByNewsId(newsBack.getNewsId());
		//如果不存在则添加
		if(null == infoBack)
		{
			count = mapper.addNewsBack(newsBack);
		}else
		{
			//如果存在执行更新操作
			count = mapper.updateNewsBack(newsBack);
		}
		
		return count;
	}
	
	/**
	 * 保存编辑的咨询
	 * @param newsBack
	 * @author gaoxiang
	 */
	public int addAcademynewsBack(NewsBack newsBack)
	{
		
		int count = 0;
		try
		{
			//根据informationId查询是否已有数据存在
			NewsBack nBack = mapper.findnewsBackBynId(newsBack.getNewsId());
			//如果不存在则添加
			if(null == nBack)
			{
				count = mapper.addNewsBack(newsBack);
			}else
			{
				//如果存在执行更新操作
				nBack.setContent(newsBack.getContent());
				nBack.setContentAudit(newsBack.getContentAudit());
				count = mapper.updateNewsBack(newsBack);
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		return count;
	}
	
	/**
	 * 设置置顶
	 * @param newsBack
	 * @author gaoxiang
	 * @return
	 */
	public int topAcademynewsBackAsnId(NewsBack newsBack)
	{
		
		//查询记录是否存在
		NewsBack nBack = mapper.findnewsBackBynId(newsBack.getNewsId());
		newsBack.setTopTime(DateUtil.formatDate(new Date()));
		
		int count = 0;
		if(null == nBack)
		{
			//不存在新增一条
			count = mapper.addNewsBack(newsBack);
		}else
		{
			//如果已经置顶则是取消置顶
//			if(nBack.getTopStatus() == 1)
//			{
//				nBack.setTopStatus(0);
//			}
			newsBack.setTitle(nBack.getTitle());
			newsBack.setContent(nBack.getContent());
			//存在进行修改逻辑
			count = mapper.updateAcademynewsBacktop(newsBack);
		}
		
		return count;
	}
	
	/**
	 * 院校信息内容审核
	 * @param contentAudit （0：不通过  1：通过）
	 * @author gaoxiang
	 * @return
	 */
	public int academynewsContentAudit(NewsBack newsBack)
	{
		
		int count = mapper.academynewsContentAudit(newsBack);
		
		return count;
	}
	
	/**
	 * 院校推送标题审核
	 * @param pushAudit （0：不通过  1：通过）
	 * @author gaoxiang
	 * @return
	 */
	public int academynewsPushTitleAudit(NewsBack newsBack)
	{
		
		int count = mapper.academynewsPushTitleAudit(newsBack);
		
		return count;
	}

	/**
	 * 根据Id查询院校信息
	 * @param id
	 * @return
	 */
	public News findAcademynewsById(int id)
	{
		
		NewsBack newsBack = mapper.findNewsBackByAcademynews(id);
		News news = new News();
		if(null == newsBack || null ==  newsBack.getContent())
		{
			news = mapper.findAcademynewsById(id);
		}else
		{
			news.setContent(newsBack.getContent());
			news.setTitle(newsBack.getTitle());
			news.setNid(newsBack.getNewsId());
		}
		
		return news;
	}
	
	/**
	 * 分页总数
	 * @param adminUser
	 * @return
	 */
	public int countacademynews(News news) {
		int count = 0;
		count = mapper.countacademynews(news);
		return count;
	}
	
	/**
	 * 分页查询
	 */
	public List<News> findacademynewsByPage(News news) {
		List<News> newslist = null;
		try {
			newslist = mapper.findacademynewsByPage(news);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		return newslist;
	}
	
	/**
	 * 审核分页总数
	 * @param adminUser
	 * @return
	 */
	public int countacademynewsaudit(NewsBack newsBack) {
		int count = 0;
		count = mapper.countacademynewsaudit();
		return count;
	}
	
	/**
	 * 审核分页查询
	 */
	public List<NewsBack> findacademynewsauditByPage(NewsBack newsBack) {
		List<NewsBack> newslist = null;
		try {
			newslist = mapper.findacademynewsauditByPage(newsBack);
		} catch (SQLException ex) {
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		return newslist;
	}

	@Override
	public int topNewsBackAsInformationId(NewsBack newsBack) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updatePushTitleAsInformationId(NewsBack newsBack) 
	{
		
		//查询记录是否存在
		NewsBack info = mapper.findnewsBackBynId(newsBack.getNewsId());
		
		int count = 0;
		if(null == info)
		{
			//不存在新增一条
			count = mapper.addNewsBack(newsBack);
		}else
		{
			info.setPushTitle(newsBack.getPushTitle());
			info.setPushTitleAudit(newsBack.getPushTitleAudit());
			//存在进行修改逻辑
			count = mapper.updateAcademynewsBack(info);
		}
		
		return count;
	}
	
}
