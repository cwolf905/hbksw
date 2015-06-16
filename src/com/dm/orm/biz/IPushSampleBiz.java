package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.PushSample;

public interface IPushSampleBiz {

	/**
	 * 查询推送模板总数
	 * 
	 * @param cond
	 * @return
	 */
	public int countPushSamples(PushSample cond);

	/**
	 * 查询所有推送模板
	 * 
	 * @param cond
	 * @return
	 */
	public List<PushSample> findPushSamplesByPage(PushSample cond);

	/**
	 * 查询某个推送模板的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public PushSample getPushSample(int id);

	/**
	 * 发布推送模板
	 * 
	 * @param obj
	 * @return
	 */
	public int addPushSample(PushSample obj);

	/**
	 * 修改推送模板信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updatePushSample(PushSample obj);

	/**
	 * 删除推送模板
	 * 
	 * @param id
	 * @return
	 */
	public int deletePushSample(int id);
}
