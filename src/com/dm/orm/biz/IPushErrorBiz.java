package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.PushError;

public interface IPushErrorBiz {
	/**
	 * 查询推送失败总数
	 * 
	 * @param cond
	 * @return
	 */
	public int countPushErrors(PushError cond);

	/**
	 * 分页查询
	 * 
	 * @param cond
	 * @return
	 */
	public List<PushError> findPushErrorsByPage(PushError cond);

	/**
	 * 查询某个推送失败的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public PushError getPushError(int id);

	/**
	 * 新增推送失败日志
	 * 
	 * @param obj
	 * @return
	 */
	public int addPushError(PushError obj);

	/**
	 * 删除推送失败日志
	 * 
	 * @param id
	 * @return
	 */
	public int deletePushError(int id);

	/**
	 * 批量删除推送失败日志
	 * 
	 * @param pushtype
	 * @return
	 */
	public int deletePushErrorBatch(int pushtype);
}
