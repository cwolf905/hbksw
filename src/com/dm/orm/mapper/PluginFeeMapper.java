package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.PluginFee;

public interface PluginFeeMapper extends ISqlMapper {

	public List<PluginFee> findAllPluginFees(PluginFee cond)
			throws SQLException;

	public PluginFee getPluginFee(int id) throws SQLException;

	public int addPluginFee(PluginFee obj) throws SQLException;

	public int updatePluginFee(PluginFee obj) throws SQLException;

	public int deletePluginFee(int id) throws SQLException;

}
