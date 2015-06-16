package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.MobileAdNew;

public interface IMobileAdNewBiz {

	
	/**
	 * 设置该广告为大类广告
	 * @param id
	 * @return
	 */
	public int setBroadAdvertise(int id);
	
	/**
	 * 查询插件的所有广告
	 * 
	 * @param cond
	 * @return
	 */
	public List<MobileAdNew> findAllMobileAdNews(MobileAdNew cond);

	/**
	 * 查询某个广告的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public MobileAdNew getMobileAdNew(int id);

	/**
	 * 发布广告
	 * 
	 * @param obj
	 * @return
	 */
	public int addMobileAdNew(MobileAdNew obj);

	/**
	 * 修改广告信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updateMobileAdNew(MobileAdNew obj);

	/**
	 * 为插件的广告排序
	 * 
	 * @param ids
	 * @return
	 */
	public int applyMobileAdNewOrder(int[] ids);

	/**
	 * 删除广告
	 * 
	 * @param id
	 * @return
	 */
	public int deleteMobileAdNew(int id);

	/**
	 * 删除上传的广告图片
	 * 
	 * @param type
	 * @param file
	 * @return
	 */
	public int deleteMobileAdNewFile(String type, String file);
}
