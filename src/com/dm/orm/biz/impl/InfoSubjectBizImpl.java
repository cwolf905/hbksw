package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.orm.biz.IInfoSubjectBiz;
import com.dm.orm.mapper.InfoSubjectContentMapper;
import com.dm.orm.mapper.InfoSubjectMapper;
import com.dm.orm.mapper.entity.InfoSubject;
import com.dm.orm.mapper.entity.InfoSubjectContent;

public class InfoSubjectBizImpl implements IInfoSubjectBiz {

	private Logger log = Logger.getLogger(InfoSubjectBizImpl.class);

	private InfoSubjectMapper mapper;
	private InfoSubjectContentMapper  infoSubjectContentMapper;

	public void setMapper(InfoSubjectMapper mapper) {
		this.mapper = mapper;
	}

	public void setInfoSubjectContentMapper(InfoSubjectContentMapper infoSubjectContentMapper) 
	{
		this.infoSubjectContentMapper = infoSubjectContentMapper;
	}


	/**
	 * 查询所有的专题
	 * @return
	 */
	public List<InfoSubject> findAllInfoSubject()
	{
		
		List<InfoSubject> all = mapper.findAllInfoSubject();
		
		return all;
	}
	
	@Override
	public int countInfoSubjects(InfoSubject cond) {
		log.debug("countInfoSubjects starting...");
		int count = 0;
		try {
			count = mapper.countInfoSubjects(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countInfoSubjects end");
		return count;
	}

	@Override
	public List<InfoSubject> findInfoSubjectsByPage(InfoSubject cond) {
		log.debug("findInfoSubjectsByPage starting...");
		List<InfoSubject> list = null;
		try {
			list = mapper.findInfoSubjectsByPage(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findInfoSubjectsByPage end");
		return list;
	}

	@Override
	public InfoSubject getInfoSubject(int id) {
		log.debug("getInfoSubject starting...");
		InfoSubject obj = null;
		try {
			obj = mapper.getInfoSubject(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getInfoSubject end");
		return obj;
	}

	@Override
	public int addInfoSubject(InfoSubject obj) {
		log.debug("addInfoSubject starting...");
		int retval = 0;
		try {
			obj.setCreatetime(new Timestamp(System.currentTimeMillis()));
			retval = mapper.addInfoSubject(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addInfoSubject end");
		return retval;
	}

	@Override
	public int updateInfoSubject(InfoSubject obj) {
		log.debug("updateInfoSubject starting...");
		int retval = 0;
		try {
			retval = mapper.updateInfoSubject(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateInfoSubject end");
		return retval;
	}

	@Override
	public int applyInfoSubjectManage(InfoSubject obj) {
		log.debug("applyInfoSubjectManage starting...");
		int retval = 0;
		try {
			retval = mapper.manageInfoSubject(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("applyInfoSubjectManage end");
		return retval;
	}

	@Override
	public int applyInfoSubjectRecommend(InfoSubject obj) {
		log.debug("applyInfoSubjectRecommend starting...");
		int retval = 0;
		try {
			retval = mapper.recommendInfoSubject(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("applyInfoSubjectRecommend end");
		return retval;
	}

	@Override
	public int deleteInfoSubject(int id) {
		log.debug("deleteInfoSubject starting...");
		int retval = 0;
		try {
			retval = mapper.deleteInfoSubject(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteInfoSubject end");
		return retval;
	}
	/**
	 * 新增专题内容
	 */
	public int doAddContent(InfoSubjectContent infoSubjectContent){
		log.debug("doAddContent starting...");
		
		int count =0;
		try
		{
			
			count=infoSubjectContentMapper.doAddContent(infoSubjectContent);
			
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
		
		log.debug("doAddContent end...");
		return count;
		
	}
	/**
	 * 进入页面初始化查询以及全部查询
	 */
	@SuppressWarnings("unchecked")
	public List<InfoSubjectContent>	selectContentListByInfosubid(int infosubid){
		log.debug("selectContentListByInfosubid starting...");
		List<InfoSubjectContent> list=null;
		try
		{
			list=infoSubjectContentMapper.selectContentListByInfosubid(infosubid);
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
		log.debug("selectContentListByInfosubid end...");
		return list;
	}
	public InfoSubjectContent toTitleContentUpdateById(int id){
		log.debug("titleContentUpdateById starting...");
		InfoSubjectContent infoSubjectContent=null;
		try
		{
			 infoSubjectContent=infoSubjectContentMapper.toTitleContentUpdateById(id);
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		log.debug("titleContentUpdateById end...");
		
		return infoSubjectContent;
	}
	/**
	 * 删除
	 */
	public int titleContentDelete(int id){
		
		log.debug("titleContentDelete starting...");
		int count =0;
		try
		{
			count =infoSubjectContentMapper.titleContentDelete(id);
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		log.debug("titleContentDelete end...");
		return count;
	}
	
	/**
	 * 根据标题进行查询
	 */
	public List<InfoSubjectContent> doSelectTypeConentByTitle(InfoSubjectContent infoSubjectContent){
	
		log.debug("doSelectTypeConentByTitle starting...");
		
		List<InfoSubjectContent> list=null;
		try
		{
			list=infoSubjectContentMapper.doSelectTypeConentByTitle(infoSubjectContent);
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
		log.debug("doSelectTypeConentByTitle end...");
		
		return list;
		
	}
	/**
	 * 修改
	 */
	public int doTitleContentUpdateById(InfoSubjectContent infoSubjectContent){
		int count =0;
		log.debug("doTitleContentUpdateById starting........");
		
		try
		{
			count =infoSubjectContentMapper.doTitleContentUpdateById(infoSubjectContent);
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
		log.debug("doTitleContentUpdateById end........");
		return count;
	}
	
}
