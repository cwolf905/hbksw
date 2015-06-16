package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.PushError;

public interface PushErrorMapper extends ISqlMapper {

	public int countPushErrors(PushError cond) throws SQLException;

	public List<PushError> findPushErrorsByPage(PushError cond)
			throws SQLException;

	public List<PushError> findAllPushErrors(PushError cond)
			throws SQLException;

	public PushError getPushError(int id) throws SQLException;

	public int addPushError(PushError obj) throws SQLException;

	public int deletePushError(int id) throws SQLException;

}
