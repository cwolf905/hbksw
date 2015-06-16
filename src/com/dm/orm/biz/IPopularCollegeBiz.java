package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.PopularCollege;

public interface IPopularCollegeBiz {

	/**
	 * 查询所有的推荐院校
	 * 
	 * @param t
	 * @return
	 */
	public List<PopularCollege> findAll(int t);

	/**
	 * 保存设置的推荐院校
	 * 
	 * @param t
	 * @param cids
	 * @return
	 */
	public int applyCollegeImport(int t, int[] cids);
}
