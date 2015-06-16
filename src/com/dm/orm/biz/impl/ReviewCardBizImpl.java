package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.orm.biz.IReviewCardBiz;
import com.dm.orm.mapper.ReviewCardMapper;
import com.dm.orm.mapper.entity.ReviewCard;

public class ReviewCardBizImpl implements IReviewCardBiz {

	private Logger log = Logger.getLogger(ReviewCardBizImpl.class);

	private ReviewCardMapper mapper;

	public void setMapper(ReviewCardMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public int countReviewCards(ReviewCard cond) {
		log.debug("countReviewCards starting...");
		int count = 0;
		try {
			count = mapper.countReviewCards(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countReviewCards end");
		return count;
	}

	@Override
	public List<ReviewCard> findAllReviewCards(ReviewCard cond) {
		log.debug("findReviewCardsByPage starting...");
		List<ReviewCard> list = null;
		try {
			list = mapper.findAllReviewCards(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findReviewCardsByPage end");
		return list;
	}

	@Override
	public ReviewCard getReviewCard(int id) {
		log.debug("getReviewCard starting...");
		ReviewCard obj = null;
		try {
			obj = mapper.getReviewCard(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getReviewCard end");
		return obj;
	}

	@Override
	public int addReviewCard(ReviewCard obj) {
		log.debug("addReviewCard starting...");
		int retval = 0;
		try {
			obj.setCreatetime(new Timestamp(System.currentTimeMillis()));
			retval = mapper.addReviewCard(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addReviewCard end");
		return retval;
	}

	@Override
	public int updateReviewCard(ReviewCard obj) {
		log.debug("updateReviewCard starting...");
		int retval = 0;
		try {
			retval = mapper.updateReviewCard(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateReviewCard end");
		return retval;
	}

	@Override
	public int applyReviewCardOrder(int[] ids) {
		log.debug("applyReviewCardOrder starting...");
		int retval = 1;
		try {
			for (int i = 0; i < ids.length; i++) {
				ReviewCard rc = new ReviewCard();
				rc.setId(ids[i]);
				rc.setSn(i + 1);
				retval = retval & mapper.orderReviewCard(rc);
			}
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("applyReviewCardOrder end");
		return retval;
	}

	@Override
	public int deleteReviewCard(int id) {
		log.debug("deleteReviewCard starting...");
		int retval = 0;
		try {
			retval = mapper.deleteReviewCard(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteReviewCard end");
		return retval;
	}
}
