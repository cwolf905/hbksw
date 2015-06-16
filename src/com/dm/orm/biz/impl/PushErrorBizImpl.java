package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.util.List;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import com.dm.orm.biz.IPushErrorBiz;
import com.dm.orm.mapper.PushErrorMapper;
import com.dm.orm.mapper.entity.PushError;
import com.dm.rest.resource.RSCache;
import com.dm.utils.TimeUtils;

public class PushErrorBizImpl implements IPushErrorBiz {

	private Logger log = Logger.getLogger(PushErrorBizImpl.class);

	private PushErrorMapper mapper;

	public void setMapper(PushErrorMapper mapper) {
		this.mapper = mapper;
	}

	private String getNow() {
		return TimeUtils.formatDate(TimeUtils.DB_TIME_PATTERN_F2);
	}

	@Override
	public int countPushErrors(PushError cond) {
		log.debug("countPushErrors starting...");
		int count = 0;
		try {
			count = mapper.countPushErrors(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countPushErrors end");
		return count;
	}

	@Override
	public List<PushError> findPushErrorsByPage(PushError cond) {
		log.debug("findPushErrorsByPage starting...");
		List<PushError> list = null;
		try {
			list = mapper.findPushErrorsByPage(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findPushErrorsByPage end");
		return list;
	}

	@Override
	public PushError getPushError(int id) {
		log.debug("getPushError starting...");
		PushError obj = null;
		try {
			obj = mapper.getPushError(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getPushError end");
		return obj;
	}

	@Override
	public int addPushError(PushError obj) {
		log.debug("addPushError starting...");
		int retval = 0;
		try {
			obj.setAddtime(getNow());
			retval = mapper.addPushError(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addPushError end");
		return retval;
	}

	@Override
	public int deletePushError(int id) {
		log.debug("deletePushError starting...");
		int retval = 0;
		try {
			retval = mapper.deletePushError(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deletePushError end");
		return retval;
	}

	/**
	 * 1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时
	 */
	@Override
	public int deletePushErrorBatch(int pushtype) {
		log.debug("deletePushError starting...");
		int retval = 0;
		try {
			RestTemplate rs = RSCache.getRestTemplate();

			PushError cond = new PushError();
			cond.setPushtype(pushtype);
			List<PushError> list = mapper.findAllPushErrors(cond);
			for (PushError err : list) {
				try {
					HttpHeaders headers = new HttpHeaders();
					headers.setContentType(MediaType.APPLICATION_JSON);
					HttpEntity<JSONObject> request = new HttpEntity<JSONObject>(
							JSONObject.fromObject(err.getContext()), headers);
					log
							.info("重发 ： "
									+ JSONObject.fromObject(request.getBody()));
					String ret = rs
							.postForObject(
									RSCache.getURI()
											+ "/pushService/"
											+ (err.getPushtype() == 3
													|| err.getPushtype() == 4 ? "notification"
													: "broadcastpush"),
									request, String.class);
					log.info(ret);
				} catch (Exception ex) {
					// 无论重发成功失败，都删除数据库记录
				} finally {
					retval += mapper.deletePushError(err.getId());
				}
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deletePushError end");
		return retval;
	}
}
