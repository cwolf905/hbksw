package com.dm.orm.mapper.entity;

/**
 * 阅读式知识点内容实体类
 * @author YouHu
 *
 */
public class ReadKnowledge 
{
	//主键ID
	private Integer readId;
	
	//知识点ID
	private Integer knowledgeId;
	
	//阅读标题
	private String readTitle;
	
	//阅读内容
	private String readContent;

	public Integer getReadId() {
		return readId;
	}

	public void setReadId(Integer readId) {
		this.readId = readId;
	}

	public Integer getKnowledgeId() {
		return knowledgeId;
	}

	public void setKnowledgeId(Integer knowledgeId) {
		this.knowledgeId = knowledgeId;
	}

	public String getReadTitle() {
		return readTitle;
	}

	public void setReadTitle(String readTitle) {
		this.readTitle = readTitle;
	}

	public String getReadContent() {
		return readContent;
	}

	public void setReadContent(String readContent) {
		this.readContent = readContent;
	}
	
	
	
}
