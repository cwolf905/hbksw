package com.dm.orm.mapper.entity;
/**
 * 选择题实体类
 * @author YouHu
 *
 */
public class ChoiceExercise 
{
	
	//主键ID
	private Integer exerciseId;
	
	//题目描述
	private String description;
	
	//选项A
	private String optionA;
	
	//选项B
	private String optionB;
	
	//选项C
	private String optionC;
	
	//选项D
	private String optionD;
	
	//备用选项E
	private String optionE;
	
	//备用选项F
	private String optionF;
	
	//答案
	private String answer;
	
	//知识点ID
	private Integer knowledgeId;
	
	

	public Integer getKnowledgeId() {
		return knowledgeId;
	}

	public void setKnowledgeId(Integer knowledgeId) {
		this.knowledgeId = knowledgeId;
	}

	public Integer getExerciseId() {
		return exerciseId;
	}

	public void setExerciseId(Integer exerciseId) {
		this.exerciseId = exerciseId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getOptionA() {
		return optionA;
	}

	public void setOptionA(String optionA) {
		this.optionA = optionA;
	}

	public String getOptionB() {
		return optionB;
	}

	public void setOptionB(String optionB) {
		this.optionB = optionB;
	}

	public String getOptionC() {
		return optionC;
	}

	public void setOptionC(String optionC) {
		this.optionC = optionC;
	}

	public String getOptionD() {
		return optionD;
	}

	public void setOptionD(String optionD) {
		this.optionD = optionD;
	}

	public String getOptionE() {
		return optionE;
	}

	public void setOptionE(String optionE) {
		this.optionE = optionE;
	}

	public String getOptionF() {
		return optionF;
	}

	public void setOptionF(String optionF) {
		this.optionF = optionF;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}
	
	
	
}
