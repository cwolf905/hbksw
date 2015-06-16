package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.PluginPicture;

public interface IPluginPictureBiz {

	/**
	 * 查询插件下的图片总数
	 * 
	 * @param cond
	 * @return
	 */
	public int countPluginPictures(PluginPicture cond);

	/**
	 * 分页查询
	 * 
	 * @param cond
	 * @return
	 */
	public List<PluginPicture> findPluginPicturesByPage(PluginPicture cond);

	/**
	 * 查询
	 * 
	 * @param cond
	 * @return
	 */
	public List<PluginPicture> findAllPluginPictures(PluginPicture cond);

	/**
	 * 查询某个插件下的图片的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public PluginPicture getPluginPicture(int id);

	/**
	 * 发布插件下的图片
	 * 
	 * @param obj
	 * @return
	 */
	public int addPluginPicture(PluginPicture obj);

	/**
	 * 修改插件下的图片信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updatePluginPicture(PluginPicture obj);

	/**
	 * 删除插件下的图片
	 * 
	 * @param id
	 * @return
	 */
	public int deletePluginPicture(int id);

	/**
	 * 删除上传的插件图片
	 * 
	 * @param type
	 * @param file
	 * @return
	 */
	public int deletePluginPictureFile(String type, String file);
}
