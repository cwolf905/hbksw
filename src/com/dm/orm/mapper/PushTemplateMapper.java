package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.PushTemplate;

public interface PushTemplateMapper extends ISqlMapper {

	public int countPushTemplates(PushTemplate cond) throws SQLException;

	public List<PushTemplate> findPushTemplatesByPage(PushTemplate cond)
			throws SQLException;

	public PushTemplate getPushTemplate(int id) throws SQLException;

	public PushTemplate getPushTemplateByClock(PushTemplate cond)
			throws SQLException;

	public int addPushTemplate(PushTemplate obj) throws SQLException;

	public int updatePushTemplate(PushTemplate obj) throws SQLException;

	public int deletePushTemplate(int id) throws SQLException;
}
