package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.orm.biz.IPopularCollegeBiz;
import com.dm.orm.mapper.PopularCollegeMapper;
import com.dm.orm.mapper.entity.PopularCollege;
import com.dm.rest.resource.RSCache;

public class PopularCollegeBizImpl implements IPopularCollegeBiz {

	private Logger log = Logger.getLogger(PopularCollegeBizImpl.class);

	private PopularCollegeMapper mapper;

	public void setMapper(PopularCollegeMapper mapper) {
		this.mapper = mapper;
	}

	public List<PopularCollege> findAll(int t) {
		log.debug("findAll starting...");
		List<PopularCollege> list = new ArrayList<PopularCollege>();
		try {
			list = mapper.findAll(t);
			// for (PopularCollege c : list) {
			// c.setSchoolName(RSCache.getSchoolNameByCid(c.getCid()));
			// }
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findAll end");
		return list;
	}

	public int applyCollegeImport(int t, int[] cids) {
		log.debug("applyCollegeImport starting...");
		int count = 0;
		try {
			mapper.deleteAll(t);
			for (int i = 0; i < cids.length; i++) {
				count += mapper.addPopularCollege(new PopularCollege(t,
						cids[i], RSCache.getSchoolNameByCid(cids[i]), i + 1));
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("applyCollegeImport end");
		return count;
	}
}
