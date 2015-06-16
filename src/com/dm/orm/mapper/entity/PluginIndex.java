package com.dm.orm.mapper.entity;

/**
 * 游客访问分类
 * @author M.simple
 *
 */
public class PluginIndex 
{
	
	private Integer id;
	private String name;
	private String description;
	private String ids;
	
	private int pagestart;
	private int pagesize;
	
	public String getIds() {
		return ids;
	}
	public void setIds(String ids) {
		this.ids = ids;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getId() {
		return id;
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
