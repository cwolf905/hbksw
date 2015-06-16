package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.ReviewPlugin;

public interface ReviewPluginMapper extends ISqlMapper {

	public int countReviewPlugins(ReviewPlugin cond) throws SQLException;

	public List<ReviewPlugin> findReviewPluginsByPage(ReviewPlugin cond)
			throws SQLException;

	public ReviewPlugin getReviewPlugin(int id) throws SQLException;

	public int addReviewPlugin(ReviewPlugin obj) throws SQLException;

	public int updateReviewPlugin(ReviewPlugin obj) throws SQLException;

	public int deleteReviewPlugin(int id) throws SQLException;

}
