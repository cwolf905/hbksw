package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.PushSample;

public interface PushSampleMapper extends ISqlMapper {

	public int countPushSamples(PushSample cond) throws SQLException;

	public List<PushSample> findPushSamplesByPage(PushSample cond)
			throws SQLException;

	public PushSample getPushSample(int id) throws SQLException;

	public int addPushSample(PushSample obj) throws SQLException;

	public int updatePushSample(PushSample obj) throws SQLException;

	public int deletePushSample(int id) throws SQLException;
}
