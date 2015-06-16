package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.News;
import com.dm.orm.mapper.entity.NewsBack;
import com.dm.rest.model.College;


/**
 * 院校数据库交互
 * @author M.simple
 *
 */
public interface AcademynewsMapper extends ISqlMapper 
{
	
	public List<College> findCollegeId(Integer id);

	/**
	 * 查询院校资讯标签
	 * @param newsId
	 * @return
	 */
//	public List<College> findCollegeByInformationId(Integer newsId);
	
	public NewsBack findNewsBackByNewsId(int newsId);
	
	/**
	 * 根据nid查询newsback
	 * @param nid
	 * @return
	 */
	public NewsBack findnewsBackBynId(int nid);
	
	/**
	 * 根据院校Id查询编辑后的院校信息
	 * @param id
	 * @return
	 */
	public NewsBack findNewsBackByAcademynews(int nid);
	
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
	 * 添加院校信息
	 * @param newsBack
	 * @return
	 */
	public int addNewsBack(NewsBack newsBack);
	
	
	/**
	 * 添加院校咨询 in table news_back
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
	public int addAcademynewsBacktop(NewsBack newsBack);
	public int updateAcademynewsBacktop(NewsBack newsBack);
	
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
	public int academynewsPushTitleAudit(NewsBack NewsBack);
	
	/**
	 * 修改院校咨询 in table news_back
	 * @param newsBack
	 * @author gaoxiang
	 * @return
	 */
	public int updateAcademynewsBack(NewsBack newsBack);

	/**
	 * 根据Id查询院校信息
	 * @param id
	 * @return
	 */
	public News findAcademynewsById(int id);

	/**
	 * 分页总数
	 * @param news
	 * @author gaoxiang
	 * @return
	 */
	public int countacademynews(News news);
	
	public List<News> findacademynewsByPage(News news) throws SQLException;
	
	/**
	 * 审核分页总数
	 * @param newsBack
	 * @author gaoxiang
	 * @return
	 */
	public int countacademynewsaudit();
	public List<NewsBack> findacademynewsauditByPage(NewsBack newsBack) throws SQLException;
}
