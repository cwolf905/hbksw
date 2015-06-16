package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.News;
import com.dm.orm.mapper.entity.NewsBack;
import com.dm.rest.model.College;

/**
 * 院校服务接口
 * @author M.simple
 *
 */
public interface AcademynewsBiz 
{
	
	/**
	 * 查询院校资讯标签
	 * @param newsId
	 * @return
	 */
	public List<College> findCollegeByNewId(Integer newsId);
	
	/**
	 * 保存编辑的咨询
	 * @param newsBack
	 * @author gaoxiang
	 * @return
	 */
	public int addAcademynewsBack(NewsBack newsBack);
	
	/**
	 * 置顶
	 * @param newsBack
	 * @author gaoxiang
	 * @return
	 */
	public int topAcademynewsBackAsnId(NewsBack newsBack);
	
	/**
	 * 院校信息内容审核
	 * @param contentAudit （0：不通过  1：通过）
	 * @author gaoxiang
	 * @return
	 */
	public int academynewsContentAudit(NewsBack newsBack);
	
	/**
	 * 院校推送标题审核
	 * @param pushAudit （0：不通过  1：通过）
	 * @author gaoxiang
	 * @return
	 */
	public int academynewsPushTitleAudit(NewsBack newsBack);
	
	
	
	/**
	 * 设置置顶
	 * @param newsBack
	 * @return
	 */
	public int topNewsBackAsInformationId(NewsBack newsBack);
	
	/**
	 * 修改推送标题
	 * @param newsBack
	 * @return
	 */
	public int updatePushTitleAsInformationId(NewsBack newsBack);
	
	/**
	 * 删除文件服务器文件
	 * @param type
	 * @param file
	 * @return
	 */
	public int deleteInformationFile(String type, String file);
	
	/**
	 * 根据院校Id查询编辑后的院校信息
	 * @param id
	 * @return
	 */
	public NewsBack findNewsBackByNewsId(int informationId);
	
	/**
	 * 根据主键查询编辑后的院校信息
	 * @param id
	 * @return
	 */
	public NewsBack findNewsBackById(int id);
	
	/**
	 * 更新编辑后的院校信息
	 * @param newsBack
	 * @return
	 */
	public int updateNewsBack(NewsBack newsBack);
	
	/**
	 * 院校推送标题审核
	 * @param pushAudit （0：不通过  1：通过）
	 * @return
	 */
	public int informationPushTitleAudit(NewsBack newsBack);
	
	/**
	 * 院校信息内容审核
	 * @param contentAudit （0：不通过  1：通过）
	 * @return
	 */
	public int informationContentAudit(NewsBack newsBack);
	
	/**
	 * 根据Id查询院校信息
	 * @param id
	 * @return
	 */
	public News findAcademynewsById(int id);
	
	/**
	 * 添加院校信息
	 * @param newsBack
	 * @return
	 */
	public int addNewsBack(NewsBack newsBack);
	
	/**
	 * 咨询列表-总数
	 * @param news
	 * @return
	 */
	public int countacademynews(News news);
	
	/**
	 * 分页查询
	 * @param news
	 * @return
	 */
	public List<News> findacademynewsByPage(News news);
	
	/**
	 * 咨询审核列表-总数
	 * @param news
	 * @return
	 */
	public int countacademynewsaudit(NewsBack newsBack);
	
	/**
	 * 咨询审核分页查询
	 * @param news
	 * @return
	 */
	public List<NewsBack> findacademynewsauditByPage(NewsBack newsBack);
}
