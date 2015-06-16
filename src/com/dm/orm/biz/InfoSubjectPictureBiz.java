package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.InfoSubjectPicture;

public interface InfoSubjectPictureBiz {

	/**
	 * 查询插件下的图片总数
	 * 
	 * @param cond
	 * @return
	 */
	public int countInfoSubjectPictures(InfoSubjectPicture cond);

	/**
	 * 分页查询
	 * 
	 * @param cond
	 * @return
	 */
	public List<InfoSubjectPicture> findInfoSubjectPicturesByPage(InfoSubjectPicture cond);

	/**
	 * 查询
	 * 
	 * @param cond
	 * @return
	 */
	public List<InfoSubjectPicture> findAllInfoSubjectPictures(InfoSubjectPicture cond);

	/**
	 * 查询某个插件下的图片的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public InfoSubjectPicture getInfoSubjectPicture(int id);

	/**
	 * 发布插件下的图片
	 * 
	 * @param obj
	 * @return
	 */
	public int addInfoSubjectPicture(InfoSubjectPicture obj);

	/**
	 * 修改插件下的图片信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updateInfoSubjectPicture(InfoSubjectPicture obj);

	/**
	 * 删除插件下的图片
	 * 
	 * @param id
	 * @return
	 */
	public int deleteInfoSubjectPicture(int id);

	/**
	 * 删除上传的插件图片
	 * 
	 * @param type
	 * @param file
	 * @return
	 */
	public int deleteInfoSubjectPictureFile(String type, String file);
}
