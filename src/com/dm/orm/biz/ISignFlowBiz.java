package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.SignFlow;

public interface ISignFlowBiz {

	/**
	 * 查询报考流程总数
	 * 
	 * @param cond
	 * @return
	 */
	public int countSignFlows(SignFlow cond);

	/**
	 * 分页查询
	 * 
	 * @param cond
	 * @return
	 */
	public List<SignFlow> findSignFlowsByPage(SignFlow cond);

	/**
	 * 查询某个报考流程的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public SignFlow getSignFlow(int id);

	/**
	 * 发布报考流程
	 * 
	 * @param obj
	 * @return
	 */
	public int addSignFlow(SignFlow obj);

	/**
	 * 修改报考流程信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updateSignFlow(SignFlow obj);

	/**
	 * 删除报考流程
	 * 
	 * @param id
	 * @return
	 */
	public int deleteSignFlow(int id);
}
