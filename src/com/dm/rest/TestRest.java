package com.dm.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.web.client.RestTemplate;

import com.dm.orm.biz.impl.PopularCollegeBizImpl;
import com.dm.rest.model.Information;
import com.dm.rest.model.QRCode;
import com.dm.rest.model.Question;
import com.dm.rest.model.Teacher;
import com.dm.rest.model.UserPassword;
import com.dm.rest.resource.BasicRSInterceptor;
import com.dm.rest.resource.CollegeRS;
import com.dm.rest.resource.ComQuestionRS;
import com.dm.rest.resource.EnQuestionRS;
import com.dm.rest.resource.InformationRS;
import com.dm.rest.resource.MobileUserRS;
import com.dm.rest.resource.NewsRS;
import com.dm.rest.resource.QRCodeRS;
import com.dm.rest.resource.QuestionRS;
import com.dm.rest.resource.TeacherRS;
import com.dm.rest.resource.WebUserRS;
import com.dm.task.TeacherTask;

public class TestRest {

	private static ApplicationContext ctxSpring;

	private static void testWebUserList() {
		WebUserRS rs = new WebUserRS();
		rs.setRestTemplate(ctxSpring
				.getBean("restTemplate", RestTemplate.class));
		// System.out.println(rs.count("", ""));
		System.out.println(rs.list("", "", 2, 10));
	}

	private static void testMobileUserList() {
		MobileUserRS rs = new MobileUserRS();
		System.out.println(rs.count("13"));
		System.out.println(rs.list("13", 1, 10));
	}

	private static void testTeacherList() {
		TeacherRS rs = new TeacherRS();
		rs.setRestTemplate(ctxSpring
				.getBean("restTemplate", RestTemplate.class));
		// System.out.println(rs.count("", ""));
		// System.out.println(rs.list("", "", 1, 10));
		System.out.println(rs.getTeacherInfo("69"));
	}

	private static void testTeacher() {
		TeacherRS rs = new TeacherRS();
		rs.setRestTemplate(ctxSpring
				.getBean("restTemplate", RestTemplate.class));

		UserPassword user = new UserPassword();
		// user.setUserName("t1");
		// user.setPassword("123456");
		// user.setNewPassword("123456");
		// System.out.println(rs.updatePassword(user));

		Teacher teacher = new Teacher();
		teacher.setUserName("t1");
		teacher.setPassword("123456");
		// System.out.println(rs.login(teacher));

		teacher.setCid(6);
		teacher.setRole(0);
		// System.out.println(rs.addTeacher(teacher));

		// teacher.setTeacherId(24);
		// System.out.println(rs.updateTeacher("24", teacher));
		// System.out.println(rs.deleteTeacher("6"));

		user.setNewPassword("123456");
		System.out.println(rs.resetTeacherPasswd("6", user));
	}

	private static void testComQuestionList() {
		ComQuestionRS rs = new ComQuestionRS();
		rs.setRestTemplate(ctxSpring
				.getBean("restTemplate", RestTemplate.class));
		// System.out.println(rs.count("", "0", ""));
		// System.out.println(rs.list("", "0", "", 1, 10));

		System.out.println(rs.getQuestionInfo("69"));

		Question question = new Question();
		question.setMobileNo("111");
		question.setTitle("aaa");
		question.setAnswererId(6);
		question.setAnswer("good");
		question.setReviewerId(9);
		question.setReview("ok");
		// System.out.println(rs.addQuestion(question));

		// question.setQuestionId(69);
		// System.out.println(rs.updateQuestion("69", question));
		// System.out.println(rs.deleteQuestion("69"));
	}

	private static void testQuestionList() {
		QuestionRS rs = new QuestionRS();
		rs.setRestTemplate(ctxSpring
				.getBean("restTemplate", RestTemplate.class));
		// System.out.println(rs.count("6", "1", "", "", ""));
		// System.out.println(rs.list(1, 10, "6", "1", "", "", ""));
		// System.out.println(rs.size("2", "2", "0", "", ""));
		System.out.println(rs.todo(1, 10, "2", "2", "0", "", ""));
		// System.out.println(rs.getQuestionInfo("1"));
	}

	private static void testEnQuestionList() {
		EnQuestionRS rs = new EnQuestionRS();
		rs.setRestTemplate(ctxSpring
				.getBean("restTemplate", RestTemplate.class));
		// System.out.println(rs.count("6", "1", "", "", ""));
		// System.out.println(rs.list(1, 10, "6", "1", "", "", ""));
		// System.out.println(rs.size("2", "2", "0", "", ""));
		System.out.println(rs.todo(1, 10, "0", "2", "0", "", ""));
		// System.out.println(rs.getQuestionInfo("1"));
	}

	private static void testQuestion() {
		QuestionRS rs = new QuestionRS();
		Question question = new Question();
		question.setQuestionId(4);
		question.setAnswererId(6);
		question.setAnswer("good");
		System.out.println(rs.updateQuestion("4", question));
	}

	private static void testCollegeList() {
		CollegeRS rs = new CollegeRS();
		rs.setRestTemplate(ctxSpring
				.getBean("restTemplate", RestTemplate.class));
		try {
			// System.out.println(rs.getSchoolNameById(new String[] { "2" }));
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(rs.count("0", ""));
		System.out.println(rs.list("0", "", 1, 10));
		// System.out.println(rs.getCollegeInfo("12"));
		// System.out.println(rs.generateQRCode("12"));
		// System.out.println(rs.list("财经类", "211工程院校"));
		// System.out.println(rs.batch("1", "5"));
	}

	private static void testQRCode() {
		QRCodeRS rs = new QRCodeRS();
		rs.setRestTemplate(ctxSpring
				.getBean("restTemplate", RestTemplate.class));
		QRCode code = new QRCode();
		code.setSchoolName("湖北工程学院新技术学院（原孝感学院新技术学院）");
		code.setSchoolUrl("http://aa.com");
		System.out.println(rs.addQRCode(code));
		// System.out.println(rs.count());
		// System.out.println(rs.list(1, 10));
		// System.out.println(rs.getQRCodeInfo("2"));
		// System.out.println(rs.deleteQRCode("2"));
	}

	private static void testPopularCollege() {
		PopularCollegeBizImpl biz = ctxSpring.getBean("popularCollegeBiz",
				PopularCollegeBizImpl.class);
		int[] cids = new int[] { 1, 2, 3 };
		biz.applyCollegeImport(101, cids);
	}

	private static void testInformation() {
		InformationRS rs = new InformationRS();
		rs.setRestTemplate(ctxSpring
				.getBean("restTemplate", RestTemplate.class));
		//System.out.println(rs.count("", "", "", ""));
		//System.out.println(rs.list("", "", "", "", 1, 10));
		// System.out.println(rs.commend("1", "0"));

		// Information information = new Information();
		// information.setCid("1");
		// information.setMessage("1");
		// information.setMsgtype("1");
		// information.setValue("1");
		// System.out.println(rs.push(information));
	}

	private static void testNews() {
		NewsRS rs = new NewsRS();
		rs.setRestTemplate(ctxSpring
				.getBean("restTemplate", RestTemplate.class));
		System.out.println(rs.count("102", "", ""));
		System.out.println(rs.list("102", "", "", 1, 10));
	}

	private static void testPush() {
		InformationRS rs = new InformationRS();
		rs.setRestTemplate(ctxSpring
				.getBean("restTemplate", RestTemplate.class));

		Information info = new Information();
		info.setTagName("1");
		info.setTitle("123");
		info.setAlert("123");
		info.setKaoshi_type("101");
		info.setMsg_type("1");
		info.setMsg_id("1");
		System.out.println(rs.tagpush(info));
	}

	private static void testTask() {
		RestTemplate rs = ctxSpring.getBean("restTemplate", RestTemplate.class);
		ClientHttpRequestInterceptor interceptor = new BasicRSInterceptor();
		List<ClientHttpRequestInterceptor> list = new ArrayList<ClientHttpRequestInterceptor>();
		list.add(interceptor);
		rs.setInterceptors(list);

		// ScoreTask score = new ScoreTask();
		// score.pushRun(101,
		// "{XM},{ZKZH},语文{KM1},数学{KM2},外语{KM3},综合{KM4},总分{TOT}");

		// LuquTask luqu = new LuquTask();
		// luqu.pushRun(101, "{XM},{KSH},{KSZTMC},{KLMC}");

		TeacherTask teacher = new TeacherTask();
		teacher.push();
	}

	public static void excute() {
		ctxSpring = new ClassPathXmlApplicationContext(
				"classpath:properties/applicationContext-*.xml");
		// testWebUserList();
		// testMobileUserList();
		// testTeacherLogin();
		testTeacherList();
		// testTeacher();
		// testComQuestionList();
		// testQuestionList();
		// testEnQuestionList();
		// testQuestion();
		// testCollegeList();
		// testQRCode();
		// testPopularCollege();
		// testInformation();
		// testNews();
		// testPush();
		// testTask();
	}
}
