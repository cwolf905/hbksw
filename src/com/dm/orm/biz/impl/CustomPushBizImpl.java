package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.orm.biz.ICustomPushBiz;
import com.dm.orm.mapper.CustomPushMapper;
import com.dm.orm.mapper.entity.CustomPush;
import com.dm.orm.mapper.entity.InformationBack;
import com.dm.orm.mapper.entity.InformationTab;
import com.dm.utils.DateUtil;
/**
 * 自定义客户端推送业务处理实现类
* @ClassName: CustomPushBizImpl 
* @Description:  (自定义客户端推送业务处理实现类) 
* @author wanglei weejion.com 
* @date 2015年4月22日 下午3:43:57 
*
 */
public class CustomPushBizImpl implements ICustomPushBiz {
	
	private Logger log = Logger.getLogger(CustomPushBizImpl.class);
	
	/**
	 * 数据库交互的mapper
	 */
	private CustomPushMapper mapper;

	public void setMapper(CustomPushMapper mapper) {
		this.mapper = mapper;
	}
	
	@Override
	public List<InformationTab> findinfoTypeByExam(Integer examType) {
		return mapper.findinfoTypeByExam(examType);
	}

	@Override
	public int countInfomationContentAudit(InformationBack informationBack)
			throws SQLException {
		// TODO Auto-generated method stub
		return 0;
	}

	/**
	 * 置顶
	 */
	@Override
	public int topCustomPushBackAsId(CustomPush customPush) {
		//查询记录是否存在
		CustomPush customPushInfo = mapper.findCustomPushById(customPush.getId());
		int count = 0;
		if(null == customPushInfo){
			return 0;
		}else{
			customPushInfo.setTopStatus(customPush.getTopStatus());
			customPushInfo.setTopTime(DateUtil.formatDate(new Date()));
			//存在进行修改逻辑
			count = mapper.updateCustomPush(customPushInfo);
		}
		return count;
	}
	
	/**
	 * 取消置顶
	 */
	@Override
	public int cenelCustomPushAsId(CustomPush customPush) {
		//查询记录是否存在
		CustomPush customPushInfo = mapper.findCustomPushById(customPush.getId());
		int count = 0;
		if(null == customPushInfo){
			return 0;
		}else{
			customPushInfo.setTopStatus(customPush.getTopStatus());
			customPushInfo.setTopTime(DateUtil.formatDate(new Date()));
			//存在进行修改逻辑
			count = mapper.updateCustomPush(customPushInfo);
		}
		return count;
	}

	/**
	 * 修改推送标题
	 */
	@Override
	public int updatePushTitleAsId(CustomPush customPush) {
		//查询记录是否存在
		CustomPush customPushInfo = mapper.findCustomPushById(customPush.getId());
		int count = 0;
		if(null == customPushInfo){
			return 0;
		}else{
			customPushInfo.setTitle(customPush.getPushTitle());
			customPushInfo.setPushTitle(customPush.getPushTitle());
			customPushInfo.setPushTitleAudit(customPush.getPushTitleAudit());
			//存在进行修改逻辑
			count = mapper.updatePushTitleAsId(customPushInfo);
		}
		return count;
	}

	@Override
	public int deleteInformationFile(String type, String file) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public InformationBack findInformationBackByInfomationId(int informationId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public InformationBack findInformationBackById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateCustomPush(CustomPush customPush) {
		return mapper.updateCustomPush(customPush);
	}
	@Override
	public int updateAllCustomPush(CustomPush customPush) {
		return mapper.updateAllCustomPush(customPush);
	}

	@Override
	public int customPushTitleAudit(CustomPush customPush) {
		return mapper.customPushTitleAudit(customPush);
	}

	@Override
	public CustomPush findCustomPushById(Long id) {
		return mapper.findCustomPushById(id);
	}

	@Override
	public int addCustomPush(CustomPush customPush) {
		return mapper.addCustomPush(customPush);
	}
	/**
	 * 查询数据库中总记录数
	 */
	@Override
	public int countCustomPushs(CustomPush customPush) {
		log.debug("countCustomPushs starting...");
		int count = 0;
		try {
			// 解码标题内容
			if (""!=customPush.getTitle()&&null != customPush.getTitle()) 
				customPush.setTitle(java.net.URLDecoder.decode(customPush.getTitle(),"UTF-8"));
			count = mapper.countCustomPushs(customPush);
		} catch (Exception ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countCustomPushs end");
		return count;
	}
	/**
	 * 分页查询推送记录信息
	 */
	@Override
	public List<CustomPush> findCustomPushsByPage(CustomPush customPush) {
		log.debug("findCustomPushsByPage starting...");
		List<CustomPush> list = null;
		try {
			// 解码标题内容
			if (""!=customPush.getTitle()&&null != customPush.getTitle()) 
				customPush.setTitle(java.net.URLDecoder.decode(customPush.getTitle(),"UTF-8"));
			list = mapper.findCustomPushsByPage(customPush);
		} catch (Exception ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findCustomPushsByPage end");
		return list;
	}

	@Override
	public int getCustomPushAuditListCount(CustomPush customPush) {
		return mapper.getCustomPushAuditListCount(customPush);
	}

	@Override
	public List<CustomPush> getCustomPushAuditList(CustomPush customPush) {
		//设置页码
		return mapper.getCustomPushAuditList(customPush);
	}

	/**
	 * 推送内容审核
	 */
	@Override
	public int pushContentAudit(CustomPush customPush) {
		int count = customPush.getContentAudit();
			mapper.pushContentAudit(customPush);
		return count;
	}

}
