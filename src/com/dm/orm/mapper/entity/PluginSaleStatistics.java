package com.dm.orm.mapper.entity;

import java.math.BigDecimal;

public class PluginSaleStatistics {
	
	
	//编号id
	public Integer orderId;
	//数量
	public Integer counts;
	//价格
	public BigDecimal prices;
	//前台输入的开始时间
	public String startTime;
	//前台输入的结束时间
	public String endTime;
	//前台提供方 id
	public Integer thirdProvideId;
	//编号id
	public String pluginName;
	//提供方名称
	public String thirdName;
	private int pagestart;
	private int pagesize;
	
	//表示根据什么排序 0代表销售数量 1代表销售金额
	private String flag;
	
	public int getPagestart() {
		return pagestart;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
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
	public String getThirdName() {
		return thirdName;
	}
	public void setThirdName(String thirdName) {
		this.thirdName = thirdName;
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
	
	/**
	 * 订购时间
	 */
	public String orderTime;
	
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
