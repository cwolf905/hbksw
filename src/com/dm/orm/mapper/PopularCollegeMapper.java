package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.PopularCollege;

public interface PopularCollegeMapper extends ISqlMapper {

	public List<PopularCollege> findAll(int t) throws SQLException;

	public int addPopularCollege(PopularCollege obj) throws SQLException;

	public void deleteAll(int t) throws SQLException;
}
