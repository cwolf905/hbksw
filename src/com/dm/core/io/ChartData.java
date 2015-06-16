package com.dm.core.io;

/**
 * 统计报表数据类
 * @author M、simple
 *
 */
public class ChartData 
{
	
	/**
	 * 横向维度 (为Integer数字)
	 */
	private Integer horizontal;
	
	/**
	 * 横向维度 (为String字符串)
	 */
	private String horizontalStr;
	
	/**
	 * 纵向维度
	 */
	private Double vertical;
	
	public String getHorizontalStr() {
		return horizontalStr;
	}

	public void setHorizontalStr(String horizontalStr) {
		this.horizontalStr = horizontalStr;
	}

	public Integer getHorizontal() {
		return horizontal;
	}

	public void setHorizontal(Integer horizontal) {
		this.horizontal = horizontal;
	}

	public Double getVertical() {
		return vertical;
	}

	public void setVertical(Double vertical) {
		this.vertical = vertical;
	}
	
}
