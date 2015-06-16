package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.AppRelease;

public interface AppReleaseMapper extends ISqlMapper {

	public int countAppReleases(AppRelease cond) throws SQLException;

	public List<AppRelease> findAppReleasesByPage(AppRelease cond)
			throws SQLException;

	public AppRelease getAppRelease(int id) throws SQLException;

	public int addAppRelease(AppRelease obj) throws SQLException;

	public int updateAppRelease(AppRelease obj) throws SQLException;

	public int deleteAppRelease(int id) throws SQLException;
}
