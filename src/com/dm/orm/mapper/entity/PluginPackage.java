package com.dm.orm.mapper.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 插件组合包
 * 
 * @author M.simple
 * 
 */
public class PluginPackage implements Serializable {

	private static final long serialVersionUID = 4781737245598964532L;

	private int id;
	private String name; // 插件包名称
	private String description; // 插件包描述
	private String pluginids; // 包含的插件id列表
	/**
	 * 考试类型
	 */
	private int examtype;
	
	/**
	 * 插件包图片
	 */
	private String img;
	
	/**
	 * 是否免费 0：免费      1：收费
	 */
	private int isfee;
	
	/**
	 * 是否会员 0：非会员    1：会员
	 */
	private int isVip;
	
	/**
	 * 会员标志图片
	 */
	private String vipimg;
	
	/**
	 * 是否推荐 0:非推荐     1:推荐
	 */
	private int recommend;
	
	/**
	 * 开始时间
	 */
	private Date begintime;
	
	/**
	 * 结束时间
	 */
	private Date expirydate;
	
	/** 
	 * 是否系统默认插件  是：1
	 */
	private int isdefault;
	
	/**
	 * 提供商
	 */
	private int provider;
	
	/**
	 * 点赞数
	 */
	private String favor;
	
	/**
	 * 收费说明
	 */
	private String chargeremark;
	
	private int status;

	private int pagestart;
	private int pagesize;
	
	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPluginids() {
		return pluginids;
	}

	public void setPluginids(String pluginids) {
		this.pluginids = pluginids;
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

	public int getExamtype() {
		return examtype;
	}

	public void setExamtype(int examtype) {
		this.examtype = examtype;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public int getIsfee() {
		return isfee;
	}

	public void setIsfee(int isfee) {
		this.isfee = isfee;
	}

	public int getIsVip() {
		return isVip;
	}

	public void setIsVip(int isVip) {
		this.isVip = isVip;
	}

	public String getVipimg() {
		return vipimg;
	}

	public void setVipimg(String vipimg) {
		this.vipimg = vipimg;
	}

	public int getRecommend() {
		return recommend;
	}

	public void setRecommend(int recommend) {
		this.recommend = recommend;
	}

	public Date getBegintime() {
		return begintime;
	}

	public void setBegintime(Date begintime) {
		this.begintime = begintime;
	}

	public Date getExpirydate() {
		return expirydate;
	}

	public void setExpirydate(Date expirydate) {
		this.expirydate = expirydate;
	}

	public int getIsdefault() {
		return isdefault;
	}

	public void setIsdefault(int isdefault) {
		this.isdefault = isdefault;
	}

	public int getProvider() {
		return provider;
	}

	public void setProvider(int provider) {
		this.provider = provider;
	}

	public String getFavor() {
		return favor;
	}

	public void setFavor(String favor) {
		this.favor = favor;
	}

	public String getChargeremark() {
		return chargeremark;
	}

	public void setChargeremark(String chargeremark) {
		this.chargeremark = chargeremark;
	}
}
