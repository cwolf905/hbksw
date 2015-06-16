package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.PluginFee;

public interface IPluginFeeBiz {

	/**
	 * 查询所有插件价格
	 * 
	 * @param cond
	 * @return
	 */
	public List<PluginFee> findAllPluginFees(PluginFee cond);

	/**
	 * 查询某个插件价格的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public PluginFee getPluginFee(int id);

	/**
	 * 发布插件价格
	 * 
	 * @param obj
	 * @return
	 */
	public int addPluginFee(PluginFee obj);

	/**
	 * 修改插件价格信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updatePluginFee(PluginFee obj);

	/**
	 * 删除插件价格
	 * 
	 * @param id
	 * @return
	 */
	public int deletePluginFee(int id);
}
