package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.FlowStepIcon;
import com.dm.orm.mapper.entity.SignFlowStep;

public interface SignFlowStepMapper extends ISqlMapper {

	public List<SignFlowStep> findAllSignFlowSteps(SignFlowStep cond)
			throws SQLException;

	public SignFlowStep getSignFlowStep(int id) throws SQLException;

	public int addSignFlowStep(SignFlowStep obj) throws SQLException;

	public int updateSignFlowStep(SignFlowStep obj) throws SQLException;

	public int deleteSignFlowStep(int id) throws SQLException;
	
	public List<FlowStepIcon> findAllFlowStepsIcon();
}
