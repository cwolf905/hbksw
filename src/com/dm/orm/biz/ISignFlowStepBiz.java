package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.FlowStepIcon;
import com.dm.orm.mapper.entity.SignFlowStep;

public interface ISignFlowStepBiz {

	/**
	 * 查询所有的图标
	 * @return
	 */
	public List<FlowStepIcon> initAllFlowStepIcon();
	
	/**
	 * 查询所有报考流程步骤
	 * 
	 * @param cond
	 * @return
	 */
	public List<SignFlowStep> findAllSignFlowSteps(SignFlowStep cond);

	/**
	 * 查询某个报考流程步骤的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public SignFlowStep getSignFlowStep(int id);

	/**
	 * 发布报考流程步骤
	 * 
	 * @param obj
	 * @return
	 */
	public int addSignFlowStep(SignFlowStep obj);

	/**
	 * 修改报考流程步骤信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updateSignFlowStep(SignFlowStep obj);

	/**
	 * 删除报考流程步骤
	 * 
	 * @param id
	 * @return
	 */
	public int deleteSignFlowStep(int id);
}
