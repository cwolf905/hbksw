package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.PluginPicture;

public interface PluginPictureMapper extends ISqlMapper {

	public int countPluginPictures(PluginPicture cond) throws SQLException;

	public List<PluginPicture> findPluginPicturesByPage(PluginPicture cond)
			throws SQLException;

	public List<PluginPicture> findAllPluginPictures(PluginPicture cond)
			throws SQLException;

	public PluginPicture getPluginPicture(int id) throws SQLException;

	public int addPluginPicture(PluginPicture obj) throws SQLException;

	public int updatePluginPicture(PluginPicture obj) throws SQLException;

	public int deletePluginPicture(int id) throws SQLException;
}
