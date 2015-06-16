package com.dm.rest.resource;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dm.rest.model.Question;

/**
 * 实现常见问题的添加、修改、删除、查看，已经完成
 * 
 * @author Anthony
 * 
 */

@Controller
@RequestMapping("/comquestion")
public class ComQuestionRS extends BasicRS {

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public @ResponseBody
	String count(@RequestParam(value = "teacherId", required = false)
	String teacherId, @RequestParam(value = "collegeId", required = false)
	String collegeId, @RequestParam(value = "title", required = false)
	String title, @RequestParam(value = "t", required = false)
	String t, @RequestParam(value = "status", required = false)
	String status) {
		String uri = RSCache.getURI()
				+ "/qaService/teacher/classicQuestions/count?teacherId="
				+ teacherId + "&collegeId=" + collegeId + "&title="
				+ encodeStr(title) + "&t=" + t + "&status=" + status;
		// System.out.println(uri);
		return restTemplate.getForObject(uri, String.class);
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	String list(@RequestParam(value = "teacherId", required = false)
	String teacherId, @RequestParam(value = "collegeId", required = false)
	String collegeId, @RequestParam(value = "title", required = false)
	String title, @RequestParam(value = "t", required = false)
	String t, @RequestParam(value = "status", required = false)
	String status, @RequestParam(value = "curPage", required = false)
	int curPage, @RequestParam(value = "pageSize", required = false)
	int pageSize) {
		String uri = RSCache.getURI()
				+ "/qaService/teacher/classicQuestions/list?teacherId="
				+ teacherId + "&collegeId=" + collegeId + "&title="
				+ encodeStr(title) + "&t=" + t + "&status=" + status
				+ "&curPage=" + (curPage - 1) + "&pageSize=" + pageSize;
		// System.out.println(uri);
		return restTemplate.getForObject(uri, String.class);
	}

	@RequestMapping(value = "/{questionId}", method = RequestMethod.GET)
	public @ResponseBody
	String getQuestionInfo(@PathVariable("questionId")
	String questionId) {
		String uri = RSCache.getURI()
				+ "/qaService/teacher/questions/{questionId}";
		// System.out.println(uri);
		return restTemplate.getForObject(uri, String.class, questionId);
	}

	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	String addQuestion(@RequestBody
	Question question) {
		HttpEntity<Question> request = new HttpEntity<Question>(question,
				newHeaders());
		return restTemplate.postForObject(RSCache.getURI()
				+ "/qaService/teacher/classicQuestion/new", request,
				String.class);
	}

	@RequestMapping(value = "/{questionId}", method = RequestMethod.POST)
	public @ResponseBody
	String updateQuestion(@PathVariable("questionId")
	String questionId, @RequestBody
	Question question) {
		HttpEntity<Question> request = new HttpEntity<Question>(question,
				newHeaders());
		return restTemplate.postForObject(RSCache.getURI()
				+ "/qaService/teacher/classicQuestion/{questionId}", request,
				String.class, questionId);
	}

	@RequestMapping(value = "/{questionId}/delete", method = RequestMethod.GET)
	public @ResponseBody
	String deleteQuestion(@PathVariable("questionId")
	String questionId) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/qaService/teacher/classicQuestion/{questionId}/delete",
				String.class, questionId);
	}
}
