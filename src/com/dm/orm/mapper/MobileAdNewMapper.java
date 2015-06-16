package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.MobileAdNew;

public interface MobileAdNewMapper extends ISqlMapper {

	public List<MobileAdNew> findAllMobileAdNews(MobileAdNew cond)
			throws SQLException;

	public MobileAdNew getMobileAdNew(int id) throws SQLException;

	public int addMobileAdNew(MobileAdNew obj) throws SQLException;

	public int updateMobileAdNew(MobileAdNew obj) throws SQLException;

	public int orderMobileAdNew(MobileAdNew obj) throws SQLException;

	public int deleteMobileAdNew(int id) throws SQLException;
	
	/**
	 * 设置该广告为大类广告
	 * @param id
	 * @return
	 */
	public int setBroadAdvertise(int id) throws SQLException;

	/**
	 * 将根据插件ID将该插件下的广告的orderid都+1
	* @Title: updateMobileAdNewOrder 
	* @Description: TODO(这里用一句话描述这个方法的作用) 
	* @param @param pluginid    设定文件 
	* @return void    返回类型 
	* @throws
	 */
	public void updateMobileAdNewOrder(int pluginid);

}
