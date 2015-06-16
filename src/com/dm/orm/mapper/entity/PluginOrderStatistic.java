package com.dm.orm.mapper.entity;

import java.math.BigDecimal;

public class PluginOrderStatistic {
	
	//编号id
	private Integer orderId;
	//数量
	private Integer counts;
	//价格
	private BigDecimal prices;
	//前台输入的开始时间
	private String startTime;
	//前台输入的结束时间
	private String endTime;
	//前台提供方 id
	private Integer thirdProvideId;
	//编号id
	public String pluginName;
	//前台插件名的Id
	public Integer pluginNameId;
	
	public Integer getPluginNameId() {
		return pluginNameId;
	}
	public void setPluginNameId(Integer pluginNameId) {
		this.pluginNameId = pluginNameId;
	}
	public Integer productId;
	/**
	 * 插件类型：0 ：阅读式   1：关卡式    注：插件包没有
	 */
	public String pluginType;
	
	/**
	 * 插件包名称
	 */
	public String pluginPackageName;
	public Integer getPluginPackageNameId() {
		return pluginPackageNameId;
	}
	public void setPluginPackageNameId(Integer pluginPackageNameId) {
		this.pluginPackageNameId = pluginPackageNameId;
	}
	/**
	 * 插件包ID
	 */
	private Integer pluginPackageNameId;
	
	/**
	 * 订购时间
	 */
	public String orderTime;
	private int pagestart;
	private int pagesize;
	
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
	/**
	 * 订购编号
	 */
	public String orderNo;
	
	public String getPluginName() {
		return pluginName;
	}
	public void setPluginName(String pluginName) {
		this.pluginName = pluginName;
	}
	public Integer getProductId() {
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	public String getPluginType() {
		return pluginType;
	}
	public void setPluginType(String pluginType) {
		this.pluginType = pluginType;
	}
	public String getPluginPackageName() {
		return pluginPackageName;
	}
	public void setPluginPackageName(String pluginPackageName) {
		this.pluginPackageName = pluginPackageName;
	}
	public String getOrderTime() {
		return orderTime;
	}
	public void setOrderTime(String orderTime) {
		this.orderTime = orderTime;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public String getPayTime() {
		return payTime;
	}
	public void setPayTime(String payTime) {
		this.payTime = payTime;
	}
	public String getProductType() {
		return productType;
	}
	public void setProductType(String productType) {
		this.productType = productType;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	/**
	 * 购买用户
	 */
	public String mobileNo;
	
	
	//购买日期
	public String payTime;
	
	//是否是按包购买 0插件包   1插件
	public String productType;
	
	//购买用户     
	public String userId;
	//购买价格
	
	
	public Integer getThirdProvideId() {
		return thirdProvideId;
	}
	public void setThirdProvideId(Integer thirdProvideId) {
		this.thirdProvideId = thirdProvideId;
	}
	public Integer getOrderId() {
		return orderId;
	}
	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}
	public Integer getCounts() {
		return counts;
	}
	public void setCounts(Integer counts) {
		this.counts = counts;
	}
	public BigDecimal getPrices() {
		return prices;
	}
	public void setPrices(BigDecimal prices) {
		this.prices = prices;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	
	
	
	

}
