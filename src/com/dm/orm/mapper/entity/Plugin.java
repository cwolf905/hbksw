package com.dm.orm.mapper.entity;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * 插件
 * 
 * @author Anthony
 * 
 */
public class Plugin implements Serializable {

	private static final long serialVersionUID = 1837606087795582608L;

	private int id;
	private String name;
	private String description;
	private String img;
	private int charge; // 1为收费，0为免费
	private double fee; // 金额
	private String chargeremark; // 收费说明
	private long favor; // 点赞数
	private int isdefault; // 是否默认插件
	private Timestamp begintime;
	private Timestamp expirydate; // 默认插件的有效期
	private String provider; // 提供商
	private int recommend; // 是否为推荐插件
	private int examtype;
	private String templateId;

	private int pagestart;
	private int pagesize;
	
	private int pluginStatus;
	
	private int isfee;//是否收费
	
	private int pluginType;

	private String cancleMsg;//下架信息
	
	/**
	 * 审核信息
	 */
	private String reviewmess;
	
	/**
	 * 插件类别表主键
	 */
	private String pluginCategoryId;
	
	/**
	 * 插件标签表主键
	 */
	private String pluginTagId;


	/**
	 * 插件类别表名称
	 */
	private String pluginCategoryName;
	

	/**
	 * 插件类别表名称
	 */
	private String pluginTagName;

	

	
	//阅读标题
	private String readTitle;
	
	//阅读内容
	private String readContent;
	
	//题目描述
	private String title;
	
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
	
	public String getTemplateId() {
		return templateId;
	}

	public void setTemplateId(String templateId) {
		this.templateId = templateId;
	}

	public String getCancleMsg() {
		return cancleMsg;
	}

	public void setCancleMsg(String cancleMsg) {
		this.cancleMsg = cancleMsg;
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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

	public String getReviewmess() {
		return reviewmess;
	}

	public void setReviewmess(String reviewmess) {
		this.reviewmess = reviewmess;
	}

	public int getPluginType() {
		return pluginType;
	}

	public void setPluginType(int pluginType) {
		this.pluginType = pluginType;
	}

	public int getIsfee() {
		return isfee;
	}

	public void setIsfee(int isfee) {
		this.isfee = isfee;
	}

	public String getPluginCategoryId() {
		return pluginCategoryId;
	}

	public void setPluginCategoryId(String pluginCategoryId) {
		this.pluginCategoryId = pluginCategoryId;
	}

	public String getPluginTagId() {
		return pluginTagId;
	}

	public void setPluginTagId(String pluginTagId) {
		this.pluginTagId = pluginTagId;
	}

	public String getPluginCategoryName() {
		return pluginCategoryName;
	}

	public void setPluginCategoryName(String pluginCategoryName) {
		this.pluginCategoryName = pluginCategoryName;
	}

	public String getPluginTagName() {
		return pluginTagName;
	}

	public void setPluginTagName(String pluginTagName) {
		this.pluginTagName = pluginTagName;
	}

	public int getPluginStatus() {
		return pluginStatus;
	}

	public void setPluginStatus(int pluginStatus) {
		this.pluginStatus = pluginStatus;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
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

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public int getCharge() {
		return charge;
	}

	public void setCharge(int charge) {
		this.charge = charge;
	}

	public double getFee() {
		return fee;
	}

	public void setFee(double fee) {
		this.fee = fee;
	}

	public String getChargeremark() {
		return chargeremark;
	}

	public void setChargeremark(String chargeremark) {
		this.chargeremark = chargeremark;
	}

	public long getFavor() {
		return favor;
	}

	public void setFavor(long favor) {
		this.favor = favor;
	}

	public int getIsdefault() {
		return isdefault;
	}

	public void setIsdefault(int isdefault) {
		this.isdefault = isdefault;
	}

	public Timestamp getBegintime() {
		return begintime;
	}

	public void setBegintime(Timestamp begintime) {
		this.begintime = begintime;
	}

	public Timestamp getExpirydate() {
		return expirydate;
	}

	public void setExpirydate(Timestamp expirydate) {
		this.expirydate = expirydate;
	}

	public String getProvider() {
		return provider;
	}

	public void setProvider(String provider) {
		this.provider = provider;
	}

	public int getRecommend() {
		return recommend;
	}

	public void setRecommend(int recommend) {
		this.recommend = recommend;
	}

	public int getExamtype() {
		return examtype;
	}

	public void setExamtype(int examtype) {
		this.examtype = examtype;
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
	
	 /*
	  *  1.重写equals方法修饰符必须是public,因为是重写的Object的方法.
	  *  2.参数类型必须是Object.
	  */ 
	 public boolean equals(Object other)
	 { 
	  
		  if(this == other)                    
		   return true;
		  if(other == null)         
		   return false;
		  if( !(other instanceof Plugin))
		   return false;
		  
		  final Plugin o = (Plugin)other;
		  
		  if( !(getId() == o.getId()))
		   return false;
		  if( !getName().equals(o.getName()))
		   return false;
		  if( !getDescription().equals(o.getDescription()))
			   return false;
		  
		  return true;
	 }
	 
	 public int hashCode()
	 {
		
		  //hashCode主要是用来提高hash系统的查询效率。当hashCode中不进行任何操作时，可以直接让其返回 一常数，或者不进行重写。
		  int result = getName().hashCode();
		  result = 29 * result +getName().hashCode();
		  return result;
		  //return 0;
	 }
}
