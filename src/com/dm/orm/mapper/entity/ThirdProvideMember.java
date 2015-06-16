package com.dm.orm.mapper.entity;

/**
 * 第三方用户实体
 * @author M.simple
 *
 */
public class ThirdProvideMember 
{
	private Integer memberId;
	
	private String memberName;
	
	private String memberPassword;
	
	private String memberPhone;
	
	private String memberLastLoginTime;
	
	private String memberCompany;
	
	private Integer memberRoleId;
	
	private String memberRoleName;
	
	private String memberRoleFlag;

	private String memberEmail;
	
	private String userName;
	
	/**
	 * 隶属第三方提供商标示
	 */
	private Integer thirdProvideId;

	public Integer getThirdProvideId() {
		return thirdProvideId;
	}

	public void setThirdProvideId(Integer thirdProvideId) {
		this.thirdProvideId = thirdProvideId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Integer getMemberId() {
		return memberId;
	}

	public void setMemberId(Integer memberId) {
		this.memberId = memberId;
	}

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public String getMemberPassword() {
		return memberPassword;
	}

	public void setMemberPassword(String memberPassword) {
		this.memberPassword = memberPassword;
	}

	public String getMemberPhone() {
		return memberPhone;
	}

	public void setMemberPhone(String memberPhone) {
		this.memberPhone = memberPhone;
	}

	public String getMemberLastLoginTime() {
		return memberLastLoginTime;
	}

	public void setMemberLastLoginTime(String memberLastLoginTime) {
		this.memberLastLoginTime = memberLastLoginTime;
	}

	public String getMemberCompany() {
		return memberCompany;
	}

	public void setMemberCompany(String memberCompany) {
		this.memberCompany = memberCompany;
	}

	public Integer getMemberRoleId() {
		return memberRoleId;
	}

	public void setMemberRoleId(Integer memberRoleId) {
		this.memberRoleId = memberRoleId;
	}

	public String getMemberRoleName() 
	{
		return memberRoleName;
	}

	public void setMemberRoleName(String memberRoleName) 
	{
		this.memberRoleName = memberRoleName;
	}
	
	public String getMemberRoleFlag() 
	{
		return memberRoleFlag;
	}

	public void setMemberRoleFlag(String memberRoleFlag) 
	{
		this.memberRoleFlag = memberRoleFlag;
	}

	public String getMemberEmail() {
		return memberEmail;
	}

	public void setMemberEmail(String memberEmail) {
		this.memberEmail = memberEmail;
	}
	
}
