package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.SignFlowStepPolicy;

public interface ISignFlowStepPolicyBiz {

	/**
	 * 查询所有政策
	 * 
	 * @param cond
	 * @return
	 */
	public List<SignFlowStepPolicy> findAllSignFlowStepPolicys(SignFlowStepPolicy cond);

	/**
	 * 查询某个政策的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public SignFlowStepPolicy getSignFlowStepPolicy(int id);

	/**
	 * 发布政策
	 * 
	 * @param obj
	 * @return
	 */
	public int addSignFlowStepPolicy(SignFlowStepPolicy obj);

	/**
	 * 修改政策信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updateSignFlowStepPolicy(SignFlowStepPolicy obj);

	/**
	 * 删除政策
	 * 
	 * @param id
	 * @return
	 */
	public int deleteSignFlowStepPolicy(int id);
	
	/**
	 * 删除上传的政策图片
	 * 
	 * @param type
	 * @param file
	 * @return
	 */
	public int deleteSignFlowStepPolicyFile(String type, String file);
}
