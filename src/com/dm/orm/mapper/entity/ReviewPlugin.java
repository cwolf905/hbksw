package com.dm.orm.mapper.entity;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * 复习备考插件表
 * 
 * @author Anthony
 * 
 */
public class ReviewPlugin implements Serializable {

	private static final long serialVersionUID = -5833173738396269041L;

	private int id;
	private String name; /* 名称 */
	private String img;
	private int type; /* 类型（1阅读式 2关卡式） */
	private Timestamp begintime; /* 开始时间 */
	private Timestamp endtime; /* 结束时间 */
	private Timestamp createtime; /* 创建时间 */

	private int cards; /* 知识点总数 */

	private int pagestart;
	private int pagesize;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public Timestamp getBegintime() {
		return begintime;
	}

	public void setBegintime(Timestamp begintime) {
		this.begintime = begintime;
	}

	public Timestamp getEndtime() {
		return endtime;
	}

	public void setEndtime(Timestamp endtime) {
		this.endtime = endtime;
	}

	public Timestamp getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Timestamp createtime) {
		this.createtime = createtime;
	}

	public int getCards() {
		return cards;
	}

	public void setCards(int cards) {
		this.cards = cards;
	}

	public int getPagestart() {
		return pagestart;
	}

	public void setPagestart(int pagestart) {
		this.pagestart = pagestart;
	}

	public int getPagesize() {
		return pagesize;
	}

	public void setPagesize(int pagesize) {
		this.pagesize = pagesize;
	}
}
