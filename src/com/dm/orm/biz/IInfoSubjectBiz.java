package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.InfoSubject;
import com.dm.orm.mapper.entity.InfoSubjectContent;

public interface IInfoSubjectBiz {

	/**
	 * 查询所有的专题
	 * @return
	 */
	public List<InfoSubject> findAllInfoSubject();
	
	/**
	 * 查询专题总数
	 * 
	 * @param cond
	 * @return
	 */
	public int countInfoSubjects(InfoSubject cond);

	/**
	 * 分页查询
	 * 
	 * @param cond
	 * @return
	 */
	public List<InfoSubject> findInfoSubjectsByPage(InfoSubject cond);

	/**
	 * 查询某个专题的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public InfoSubject getInfoSubject(int id);

	/**
	 * 发布专题
	 * 
	 * @param obj
	 * @return
	 */
	public int addInfoSubject(InfoSubject obj);

	/**
	 * 修改专题信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updateInfoSubject(InfoSubject obj);

	/**
	 * 专题配置
	 * 
	 * @param obj
	 * @return
	 */
	public int applyInfoSubjectManage(InfoSubject obj);

	/**
	 * 推荐专题
	 * 
	 * @param obj
	 * @return
	 */
	public int applyInfoSubjectRecommend(InfoSubject obj);

	/**
	 * 删除专题
	 * 
	 * @param id
	 * @return
	 */
	public int deleteInfoSubject(int id);
	
	/**
	 * 增加专题编辑内容
	 * @param infoSubjectContent
	 * @return
	 */
	public int doAddContent(InfoSubjectContent infoSubjectContent);
	
	public List<InfoSubjectContent>	selectContentListByInfosubid(int infosubid);
	public InfoSubjectContent toTitleContentUpdateById(int id);
	public int titleContentDelete(int id);
	public List<InfoSubjectContent> doSelectTypeConentByTitle(InfoSubjectContent infoSubjectContent);
	public int doTitleContentUpdateById(InfoSubjectContent infoSubjectContent);
}
