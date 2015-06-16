package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.ReviewCard;

public interface ReviewCardMapper extends ISqlMapper {

	public int countReviewCards(ReviewCard cond) throws SQLException;

	public List<ReviewCard> findAllReviewCards(ReviewCard cond)
			throws SQLException;

	public ReviewCard getReviewCard(int id) throws SQLException;

	public int addReviewCard(ReviewCard obj) throws SQLException;

	public int updateReviewCard(ReviewCard obj) throws SQLException;

	public int orderReviewCard(ReviewCard obj) throws SQLException;

	public int deleteReviewCard(int id) throws SQLException;
}
