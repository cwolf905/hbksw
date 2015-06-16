package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.ReviewPlugin;

public interface IReviewPluginBiz {

	/**
	 * 查询复习备考插件总数
	 * 
	 * @param cond
	 * @return
	 */
	public int countReviewPlugins(ReviewPlugin cond);

	/**
	 * 分页查询
	 * 
	 * @param cond
	 * @return
	 */
	public List<ReviewPlugin> findReviewPluginsByPage(ReviewPlugin cond);

	/**
	 * 查询某个复习备考插件的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public ReviewPlugin getReviewPlugin(int id);

	/**
	 * 发布复习备考插件
	 * 
	 * @param obj
	 * @return
	 */
	public int addReviewPlugin(ReviewPlugin obj);

	/**
	 * 修改复习备考插件信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updateReviewPlugin(ReviewPlugin obj);

	/**
	 * 删除复习备考插件
	 * 
	 * @param id
	 * @return
	 */
	public int deleteReviewPlugin(int id);
	
	/**
	 * 删除上传的系统事件图片
	 * 
	 * @param type
	 * @param file
	 * @return
	 */
	public int deleteReviewPluginFile(String type, String file);
}
