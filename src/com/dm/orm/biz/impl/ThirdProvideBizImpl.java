package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.orm.biz.IThirdProvideBiz;
import com.dm.orm.mapper.ThirdProvideMapper;
import com.dm.orm.mapper.ThirdProvideMemberMapper;
import com.dm.orm.mapper.entity.Plugin;
import com.dm.orm.mapper.entity.ThirdProvide;
import com.dm.orm.mapper.entity.ThirdProvideMember;

public class ThirdProvideBizImpl implements IThirdProvideBiz {

	private Logger log = Logger.getLogger(ThirdProvideBizImpl.class);

	private ThirdProvideMapper mapper;
	
	private ThirdProvideMemberMapper memberMapper;

	public void setMapper(ThirdProvideMapper mapper) 
	{
		this.mapper = mapper;
	}
	
	public void setMemberMapper(ThirdProvideMemberMapper memberMapper) 
	{
		this.memberMapper = memberMapper;
	}

	/**
	 * 重置第三方默认用户密码
	 * @return
	 */
	public int ResetThirdAdminPass(Integer id)
	{
		
		log.debug("deleteThirdProvide starting...");
		int retval = 0;
		retval = memberMapper.ResetThirdAdminPass(id);
		if (retval == 0) {
			throw new BizException(BizErr.EX_UPDATE_FAIL);
		}
		log.debug("deleteThirdProvide end");
		
		return retval;
	}
	
	/**
	 * 注销第三方提供商
	 * @param thirdProvide
	 * @return
	 */
	public boolean logoutThirdProvide(ThirdProvide thirdProvide)
	{
		
		log.debug("deleteThirdProvide starting...");
		boolean retval = true;
		
		List<Plugin> pluginList = mapper.selectPluginByThirdProvideId(thirdProvide.getId());
		if(pluginList != null)
		{
			for(Plugin plugin : pluginList)
			{
				if(plugin.getPluginStatus() != 3)
				{
					retval = false;
				}
			}
		}
		
		if(retval)
		{
			//将第三方启用状态置为“已注销”
			thirdProvide.setStatus(1);
			mapper.updateThirdProvideStatus(thirdProvide);
		}

		log.debug("deleteThirdProvide end");
		return retval;
	}

	/**
	 * 启用第三方提供商
	 */
	public int restartThirdProvide(ThirdProvide thirdProvide)
	{
		log.debug("restartThirdProvide starting...");
		int retval = 0;
		
		//将第三方启用状态置为“已启用”
		thirdProvide.setStatus(0);
		retval = mapper.updateThirdProvideStatus(thirdProvide);

		log.debug("restartThirdProvide end");
		return retval;
	}
	
	/**
	 * 增加第三方数据
	 * @param thirdProvide
	 */
	public int addThirdProvide(ThirdProvide thirdProvide)
	{
		
		log.debug("addThirdProvide starting...");
		int retval = 0;
		retval = mapper.addThirdProvide(thirdProvide);
		if (retval == 0) {
			throw new BizException(BizErr.EX_UPDATE_FAIL);
		}
		retval = thirdProvide.getId();
		
		ThirdProvideMember member = new ThirdProvideMember();
		member.setUserName("admin");
		member.setMemberName("admin");
		member.setMemberPassword("123456");
		member.setThirdProvideId(retval);
		member.setMemberPhone(thirdProvide.getTelephone());
		memberMapper.addThirdProvideMember(member);
		log.debug("addThirdProvide end");
		
		return retval;
	}
	
	/**
	 * 更新第三方数据
	 * @param thirdProvide
	 */
	public int updateThirdProvide(ThirdProvide thirdProvide)
	{
		
		log.debug("updateThirdProvide starting...");
		int retval = 0;
		retval = mapper.updateThirdProvide(thirdProvide);
		if (retval == 0) {
			throw new BizException(BizErr.EX_UPDATE_FAIL);
		}
		log.debug("updateThirdProvide end");
		return retval;
	}
	
	/**
	 * 根据Id查询第三方数据
	 * 
	 * @param thirdProvide
	 * @return
	 */
	public ThirdProvide findThirdProvide(int id) throws SQLException
	{
		
		log.debug("findThirdProvide starting...");
		ThirdProvide obj = null;
		try {
			obj = mapper.findThirdProvide(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findThirdProvide end");
		return obj;
	}
	
	/**
	 * 统计所有的数据量
	 * @param cond
	 * @return
	 * @throws SQLException
	 */
	public int countThirdProvides(ThirdProvide thirdProvide) throws SQLException
	{
		
		log.debug("countThirdProvides starting...");
		int count = 0;
		try {
			count = mapper.countThirdProvides(thirdProvide);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countThirdProvides end");
		return count;
	}
	
	/**
	 * 查询所有第三方
	 * 
	 * @param thirdProvide
	 * @return
	 */
	public List<ThirdProvide> findAllThirdProvide(ThirdProvide thirdProvide)
	{
		
		log.debug("findAllThirdprovide starting...");
		List<ThirdProvide> list = null;
		try {
			list = mapper.findAllThirdProvide(thirdProvide);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findAllThirdprovide end");
		return list;
	}
	
	/**
	 * 根据名称查询所有第三方
	 * 
	 * @param thirdProvide
	 * @return
	 */
	public ThirdProvide findThirdProvideByName(ThirdProvide thirdProvide)
	{
		
		log.debug("findThirdprovide by name starting...");
		ThirdProvide third = null;
		try {
			third = mapper.findThirdProvideByName(thirdProvide.getName());
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findThirdprovide by name end");
		return third;
	}
	
}
