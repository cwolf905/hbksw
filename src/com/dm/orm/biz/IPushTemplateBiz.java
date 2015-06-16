package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.PushTemplate;

public interface IPushTemplateBiz {

	/**
	 * 查询推送时间点总数
	 * 
	 * @param cond
	 * @return
	 */
	public int countPushTemplates(PushTemplate cond);

	/**
	 * 查询所有推送时间点
	 * 
	 * @param cond
	 * @return
	 */
	public List<PushTemplate> findPushTemplatesByPage(PushTemplate cond);

	/**
	 * 查询某个推送时间点的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public PushTemplate getPushTemplate(int id);

	/**
	 * 根据时间点查询推送模板
	 * 
	 * @param cond
	 * @return
	 */
	public PushTemplate getPushTemplateByClock(PushTemplate cond);

	/**
	 * 发布推送时间点
	 * 
	 * @param obj
	 * @return
	 */
	public int addPushTemplate(PushTemplate obj);

	/**
	 * 修改推送时间点信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updatePushTemplate(PushTemplate obj);

	/**
	 * 删除推送时间点
	 * 
	 * @param id
	 * @return
	 */
	public int deletePushTemplate(int id);

	/**
	 * 实时推送
	 * 
	 * @param pushType
	 * @param examType
	 * @param message
	 * @return
	 */
	public int applyPushTemplateNow(int pushType, int examType, String message);
}
