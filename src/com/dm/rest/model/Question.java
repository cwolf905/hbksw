package com.dm.rest.model;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Question {

	private long questionId;
	private long userId;
	private String userName;
	private String mobileNo;
	private String title;
	private int type; // 1 '计划信息' 2 '政策规定' 3 '投档线' 4 '投档规则' 5 '录取规则' 6 '录取状态'
	// 7 '投诉举报' 8 '征集志愿' 9 '录取进程' 10 '其他问题'
	private int collegeId;
	private int t; // 提问的考试类型： 101 高考， 102 自考， 103 成考， 104 考研， 105 综合考试
	private String content;
	private Date addTime;
	private int status; // 0未答复 1待审核 2已通过 3未通过
	private int classic;
	private int answererId;
	private String answer;
	private Date answerTime;
	private int reviewerId;
	private String review;
	private Date reviewTime;

	public Question() {
		super();
	}

	public Question(long questionId, long userId, String userName,
			String mobileNo, String title, int type, int collegeId, int t,
			String content, Date addTime, int status, int classic,
			int answererId, String answer, Date answerTime, int reviewerId,
			String review, Date reviewTime) {
		super();
		this.questionId = questionId;
		this.userId = userId;
		this.userName = userName;
		this.mobileNo = mobileNo;
		this.title = title;
		this.type = type;
		this.collegeId = collegeId;
		this.t = t;
		this.content = content;
		this.addTime = addTime;
		this.status = status;
		this.classic = classic;
		this.answererId = answererId;
		this.answer = answer;
		this.answerTime = answerTime;
		this.reviewerId = reviewerId;
		this.review = review;
		this.reviewTime = reviewTime;
	}

	public long getQuestionId() {
		return questionId;
	}

	public void setQuestionId(long questionId) {
		this.questionId = questionId;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getCollegeId() {
		return collegeId;
	}

	public void setCollegeId(int collegeId) {
		this.collegeId = collegeId;
	}

	public int getT() {
		return t;
	}

	public void setT(int t) {
		this.t = t;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getAddTime() {
		return addTime;
	}

	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getClassic() {
		return classic;
	}

	public void setClassic(int classic) {
		this.classic = classic;
	}

	public int getAnswererId() {
		return answererId;
	}

	public void setAnswererId(int answererId) {
		this.answererId = answererId;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public Date getAnswerTime() {
		return answerTime;
	}

	public void setAnswerTime(Date answerTime) {
		this.answerTime = answerTime;
	}

	public int getReviewerId() {
		return reviewerId;
	}

	public void setReviewerId(int reviewerId) {
		this.reviewerId = reviewerId;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public Date getReviewTime() {
		return reviewTime;
	}

	public void setReviewTime(Date reviewTime) {
		this.reviewTime = reviewTime;
	}
}
