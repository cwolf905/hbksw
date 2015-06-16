package com.dm.orm.biz.impl;

import java.io.File;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.core.SysConfig;
import com.dm.orm.biz.IReviewPluginBiz;
import com.dm.orm.mapper.ReviewCardMapper;
import com.dm.orm.mapper.ReviewPluginMapper;
import com.dm.orm.mapper.entity.ReviewCard;
import com.dm.orm.mapper.entity.ReviewPlugin;

public class ReviewPluginBizImpl implements IReviewPluginBiz {

	private Logger log = Logger.getLogger(ReviewPluginBizImpl.class);

	private ReviewPluginMapper mapper;
	private ReviewCardMapper cardMapper;

	public void setMapper(ReviewPluginMapper mapper) {
		this.mapper = mapper;
	}

	public void setCardMapper(ReviewCardMapper cardMapper) {
		this.cardMapper = cardMapper;
	}

	@Override
	public int countReviewPlugins(ReviewPlugin cond) {
		log.debug("countReviewPlugins starting...");
		int count = 0;
		try {
			count = mapper.countReviewPlugins(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countReviewPlugins end");
		return count;
	}

	@Override
	public List<ReviewPlugin> findReviewPluginsByPage(ReviewPlugin cond) {
		log.debug("findReviewPluginsByPage starting...");
		List<ReviewPlugin> list = null;
		try {
			list = mapper.findReviewPluginsByPage(cond);
			for (ReviewPlugin plugin : list) {
				ReviewCard card = new ReviewCard();
				card.setPluginid(plugin.getId());
				plugin.setCards(cardMapper.countReviewCards(card));
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findReviewPluginsByPage end");
		return list;
	}

	@Override
	public ReviewPlugin getReviewPlugin(int id) {
		log.debug("getReviewPlugin starting...");
		ReviewPlugin obj = null;
		try {
			obj = mapper.getReviewPlugin(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getReviewPlugin end");
		return obj;
	}

	@Override
	public int addReviewPlugin(ReviewPlugin obj) {
		log.debug("addReviewPlugin starting...");
		int retval = 0;
		try {
			obj.setCreatetime(new Timestamp(System.currentTimeMillis()));
			retval = mapper.addReviewPlugin(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addReviewPlugin end");
		return retval;
	}

	@Override
	public int updateReviewPlugin(ReviewPlugin obj) {
		log.debug("updateReviewPlugin starting...");
		int retval = 0;
		try {
			retval = mapper.updateReviewPlugin(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateReviewPlugin end");
		return retval;
	}

	@Override
	public int deleteReviewPlugin(int id) {
		log.debug("deleteReviewPlugin starting...");
		int retval = 0;
		try {
			retval = mapper.deleteReviewPlugin(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteReviewPlugin end");
		return retval;
	}
	
	@Override
	public int deleteReviewPluginFile(String type, String file) {
		log.debug("deleteReviewPluginFile starting...");
		String uri = SysConfig.concat(SysConfig.getWebAddr(), "uploadify",
				type, file);
		File f = new File(uri);
		if (f.exists())
			f.delete();
		log.debug("deleteReviewPluginFile end");
		return 1;
	}
}
