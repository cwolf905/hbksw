package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.SignFlowStepPolicy;

public interface SignFlowStepPolicyMapper extends ISqlMapper {

	public List<SignFlowStepPolicy> findAllSignFlowStepPolicys(
			SignFlowStepPolicy cond) throws SQLException;

	public SignFlowStepPolicy getSignFlowStepPolicy(int id) throws SQLException;

	public int addSignFlowStepPolicy(SignFlowStepPolicy obj)
			throws SQLException;

	public int updateSignFlowStepPolicy(SignFlowStepPolicy obj)
			throws SQLException;

	public int deleteSignFlowStepPolicy(int id) throws SQLException;
}
