package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.InfoSubject;

public interface InfoSubjectMapper extends ISqlMapper {

	public int countInfoSubjects(InfoSubject cond) throws SQLException;

	public List<InfoSubject> findInfoSubjectsByPage(InfoSubject cond)
			throws SQLException;

	public InfoSubject getInfoSubject(int id) throws SQLException;

	public int addInfoSubject(InfoSubject obj) throws SQLException;

	public int updateInfoSubject(InfoSubject obj) throws SQLException;

	public int manageInfoSubject(InfoSubject obj) throws SQLException;

	public int recommendInfoSubject(InfoSubject obj) throws SQLException;

	public int deleteInfoSubject(int id) throws SQLException;
	
	/**
	 * 查询所有的专题
	 * @return
	 */
	public List<InfoSubject> findAllInfoSubject();
}
