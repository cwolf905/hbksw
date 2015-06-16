package com.dm.orm.mapper.entity;

import java.io.Serializable;

/**
 * 表mobileuser
 * @author Administrator
 *
 */
public class MobileUser implements Serializable{
	
	
	private static final long serialVersionUID = -4921293970817872935L;

	private Integer mobileId;
    private String mobileNo;
    private String password;
    private String passwordQuestion;
    private String passwordAnswer;
    private String phoneModel;
    private String imei;
    private String lastLogin;
    private Long userId; 
    private String headPortrait;
    private int notify;
	public Integer getMobileId() {
		return mobileId;
	}
	public void setMobileId(Integer mobileId) {
		this.mobileId = mobileId;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPasswordQuestion() {
		return passwordQuestion;
	}
	public void setPasswordQuestion(String passwordQuestion) {
		this.passwordQuestion = passwordQuestion;
	}
	public String getPasswordAnswer() {
		return passwordAnswer;
	}
	public void setPasswordAnswer(String passwordAnswer) {
		this.passwordAnswer = passwordAnswer;
	}
	public String getPhoneModel() {
		return phoneModel;
	}
	public void setPhoneModel(String phoneModel) {
		this.phoneModel = phoneModel;
	}
	public String getImei() {
		return imei;
	}
	public void setImei(String imei) {
		this.imei = imei;
	}
	public String getLastLogin() {
		return lastLogin;
	}
	public void setLastLogin(String lastLogin) {
		this.lastLogin = lastLogin;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getHeadPortrait() {
		return headPortrait;
	}
	public void setHeadPortrait(String headPortrait) {
		this.headPortrait = headPortrait;
	}
	public int getNotify() {
		return notify;
	}
	public void setNotify(int notify) {
		this.notify = notify;
	}
    
}
