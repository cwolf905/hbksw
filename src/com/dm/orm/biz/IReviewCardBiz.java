package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.ReviewCard;

public interface IReviewCardBiz {

	/**
	 * 查询知识点总数
	 * 
	 * @param cond
	 * @return
	 */
	public int countReviewCards(ReviewCard cond);

	/**
	 * 查询所有知识点
	 * 
	 * @param cond
	 * @return
	 */
	public List<ReviewCard> findAllReviewCards(ReviewCard cond);

	/**
	 * 查询某个知识点的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public ReviewCard getReviewCard(int id);

	/**
	 * 发布知识点
	 * 
	 * @param obj
	 * @return
	 */
	public int addReviewCard(ReviewCard obj);

	/**
	 * 修改知识点信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updateReviewCard(ReviewCard obj);

	/**
	 * 为知识点排序
	 * 
	 * @param ids
	 * @return
	 */
	public int applyReviewCardOrder(int[] ids);

	/**
	 * 删除知识点
	 * 
	 * @param id
	 * @return
	 */
	public int deleteReviewCard(int id);
}
