package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.InfoSubjectPicture;

public interface InfoSubjectPictureMapper extends ISqlMapper {

	public int countInfoSubjectPictures(InfoSubjectPicture cond) throws SQLException;

	public List<InfoSubjectPicture> findInfoSubjectPicturesByPage(InfoSubjectPicture cond)
			throws SQLException;

	public List<InfoSubjectPicture> findAllInfoSubjectPictures(InfoSubjectPicture cond)
			throws SQLException;

	public InfoSubjectPicture getInfoSubjectPicture(int id) throws SQLException;

	public int addInfoSubjectPicture(InfoSubjectPicture obj) throws SQLException;

	public int updateInfoSubjectPicture(InfoSubjectPicture obj) throws SQLException;

	public int deleteInfoSubjectPicture(int id) throws SQLException;
}
