package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.SignFlow;

public interface SignFlowMapper extends ISqlMapper {

	public int countSignFlows(SignFlow cond) throws SQLException;

	public List<SignFlow> findSignFlowsByPage(SignFlow cond)
			throws SQLException;

	public SignFlow getSignFlow(int id) throws SQLException;

	public int addSignFlow(SignFlow obj) throws SQLException;

	public int updateSignFlow(SignFlow obj) throws SQLException;

	public int deleteSignFlow(int id) throws SQLException;

}
