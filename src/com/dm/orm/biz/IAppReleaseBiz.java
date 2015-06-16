package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.AppRelease;

public interface IAppReleaseBiz {

	/**
	 * 查询版本总数
	 * 
	 * @param cond
	 * @return
	 */
	public int countAppReleases(AppRelease cond);

	/**
	 * 分页查询
	 * 
	 * @param cond
	 * @return
	 */
	public List<AppRelease> findAppReleasesByPage(AppRelease cond);

	/**
	 * 查询某个版本的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public AppRelease getAppRelease(int id);

	/**
	 * 发布版本
	 * 
	 * @param obj
	 * @return
	 */
	public int addAppRelease(AppRelease obj);

	/**
	 * 修改版本信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updateAppRelease(AppRelease obj);

	/**
	 * 删除版本
	 * 
	 * @param id
	 * @return
	 */
	public int deleteAppRelease(int id);

	/**
	 * 删除上传的版本文件
	 * 
	 * @param type
	 * @param file
	 * @return
	 */
	public int deleteAppReleaseFile(String type, String file);
}
