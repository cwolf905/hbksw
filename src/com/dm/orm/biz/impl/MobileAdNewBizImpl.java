package com.dm.orm.biz.impl;

import java.io.File;
import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.core.SysConfig;
import com.dm.orm.biz.IMobileAdNewBiz;
import com.dm.orm.mapper.MobileAdNewMapper;
import com.dm.orm.mapper.PluginMapper;
import com.dm.orm.mapper.entity.MobileAdNew;
import com.dm.orm.mapper.entity.Plugin;

public class MobileAdNewBizImpl implements IMobileAdNewBiz {

	private Logger log = Logger.getLogger(MobileAdNewBizImpl.class);

	private MobileAdNewMapper mapper;
	
	private PluginMapper pluginMapper;

	public void setMapper(MobileAdNewMapper mapper) {
		this.mapper = mapper;
	}
	
	public void setPluginMapper(PluginMapper pluginMapper) {
		this.pluginMapper = pluginMapper;
	}




	/**
	 * 设置该广告为大类广告
	 * @param id
	 * @return
	 */
	public int setBroadAdvertise(int id)
	{
		
		log.debug("setBroadAdvertise starting...");
		
		int count = 0;
		try 
		{
			MobileAdNew mobileAdNew = mapper.getMobileAdNew(id);
			if(null != mobileAdNew)
			{
				//大类广告
				mobileAdNew.setPluginid(0);
				count = mapper.addMobileAdNew(mobileAdNew);
			}
//			count = mapper.setBroadAdvertise(id);
		} 
		catch (SQLException e) 
		{
			e.printStackTrace();
		}
		
		log.debug("setBroadAdvertise end...");
		return count;
	}

	@Override
	public List<MobileAdNew> findAllMobileAdNews(MobileAdNew cond) {
		log.debug("findAllMobileAdNews starting...");
		List<MobileAdNew> list = null;
		try {
			list = mapper.findAllMobileAdNews(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findAllMobileAdNews end");
		return list;
	}

	@Override
	public MobileAdNew getMobileAdNew(int id) {
		log.debug("getMobileAdNew starting...");
		MobileAdNew obj = null;
		try {
			obj = mapper.getMobileAdNew(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getMobileAdNew end");
		return obj;
	}

	@Override
	public int addMobileAdNew(MobileAdNew obj) {
		log.debug("addMobileAdNew starting...");
		int retval = 0;
		try {
			//新增之前 将原有同类型广告的orderid++
			mapper.updateMobileAdNewOrder(obj.getPluginid());
			Plugin plugin = pluginMapper.getPlugin(obj.getPluginid());
			if(null != plugin)
			{
				obj.setExamtype(plugin.getExamtype());
			}
			retval = mapper.addMobileAdNew(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addMobileAdNew end");
		return retval;
	}

	@Override
	public int updateMobileAdNew(MobileAdNew obj) {
		log.debug("updateMobileAdNew starting...");
		int retval = 0;
		try {
			retval = mapper.updateMobileAdNew(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateMobileAdNew end");
		return retval;
	}

	@Override
	public int applyMobileAdNewOrder(int[] ids) {
		log.debug("applyMobileAdNewOrder starting...");
		int retval = 1;
		try {
			for (int i = 0; i < ids.length; i++) {
				MobileAdNew ad = new MobileAdNew();
				ad.setId(ids[i]);
				ad.setAdorder(i + 1);
				retval = retval & mapper.orderMobileAdNew(ad);
			}
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("applyMobileAdNewOrder end");
		return retval;
	}

	@Override
	public int deleteMobileAdNew(int id) {
		log.debug("deleteMobileAdNew starting...");
		int retval = 0;
		try {
			retval = mapper.deleteMobileAdNew(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteMobileAdNew end");
		return retval;
	}

	@Override
	public int deleteMobileAdNewFile(String type, String file) {
		log.debug("deleteMobileAdNewFile starting...");
		String uri = SysConfig.concat(SysConfig.getWebAddr(), "uploadify",
				type, file);
		File f = new File(uri);
		if (f.exists())
			f.delete();
		log.debug("deleteMobileAdNewFile end");
		return 1;
	}
}
