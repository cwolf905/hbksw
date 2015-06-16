package com.dm.orm.mapper.entity;

/**
 * 考试类型实体类
 * @author M.simple
 *
 */
public class DictExamType 
{
	
	/**
	 * 类型编号
	 */
	private Integer code;
	
	/**
	 * 类型名称
	 */
	private String name;
	
	/**
	 * 类型描述
	 */
	private String description;

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
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
}
