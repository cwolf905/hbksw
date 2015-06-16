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
 * 实现问题的已处理列表和统计、未处理列表和统计、信息查看、答复、审核，已经完成
 * 
 * @author Anthony
 * 
 */

@Controller
@RequestMapping("/question")
public class QuestionRS extends BasicRS {

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public @ResponseBody
	String count(@RequestParam(value = "teacherId", required = false)
	String teacherId, @RequestParam(value = "role", required = false)
	String role, @RequestParam(value = "filter", required = false)
	String filter, @RequestParam(value = "qtype", required = false)
	String qtype, @RequestParam(value = "status", required = false)
	String status) {
		return restTemplate
				.getForObject(
						RSCache.getURI()
								+ "/qaService/teacher/handledQuestionCount/{teacherId}/{role}?filter="
								+ encodeStr(filter) + "&qtype=" + qtype
								+ "&status=" + status, String.class, teacherId,
						role);
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	String list(@RequestParam(value = "curPage", required = false)
	int curPage, @RequestParam(value = "pageSize", required = false)
	int pageSize, @RequestParam(value = "teacherId", required = false)
	String teacherId, @RequestParam(value = "role", required = false)
	String role, @RequestParam(value = "filter", required = false)
	String filter, @RequestParam(value = "qtype", required = false)
	String qtype, @RequestParam(value = "status", required = false)
	String status) {
		return restTemplate
				.getForObject(
						RSCache.getURI()
								+ "/qaService/teacher/handledQuestions/{teacherId}/{role}?filter="
								+ encodeStr(filter) + "&qtype=" + qtype
								+ "&status=" + status + "&curPage="
								+ (curPage - 1) + "&pageSize=" + pageSize,
						String.class, teacherId, role);
	}

	@RequestMapping(value = "/size", method = RequestMethod.GET)
	public @ResponseBody
	String size(@RequestParam(value = "cid", required = false)
	String cid, @RequestParam(value = "teacherId", required = false)
	String teacherId, @RequestParam(value = "role", required = false)
	String role, @RequestParam(value = "filter", required = false)
	String filter, @RequestParam(value = "qtype", required = false)
	String qtype) {
		return restTemplate
				.getForObject(
						RSCache.getURI()
								+ "/qaService/teacher/unhandledQuestionCount/{cid}/{teacherId}/{role}?filter="
								+ encodeStr(filter) + "&qtype=" + qtype,
						String.class, cid, teacherId, role);
	}

	@RequestMapping(value = "/todo", method = RequestMethod.GET)
	public @ResponseBody
	String todo(@RequestParam(value = "curPage", required = false)
	int curPage, @RequestParam(value = "pageSize", required = false)
	int pageSize, @RequestParam(value = "cid", required = false)
	String cid, @RequestParam(value = "teacherId", required = false)
	String teacherId, @RequestParam(value = "role", required = false)
	String role, @RequestParam(value = "filter", required = false)
	String filter, @RequestParam(value = "qtype", required = false)
	String qtype) {
		return restTemplate
				.getForObject(
						RSCache.getURI()
								+ "/qaService/teacher/unhandledQuestions/{cid}/{teacherId}/{role}?filter="
								+ encodeStr(filter) + "&qtype=" + qtype
								+ "&curPage=" + (curPage - 1) + "&pageSize="
								+ pageSize, String.class, cid, teacherId, role);
	}

	@RequestMapping(value = "/{questionId}", method = RequestMethod.GET)
	public @ResponseBody
	String getQuestionInfo(@PathVariable("questionId")
	String questionId) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/qaService/teacher/questions/{questionId}", String.class,
				questionId);
	}

	@RequestMapping(value = "/{questionId}", method = RequestMethod.POST)
	public @ResponseBody
	String updateQuestion(@PathVariable("questionId")
	String questionId, @RequestBody
	Question question) {
		HttpEntity<Question> request = new HttpEntity<Question>(question,
				newHeaders());
		return restTemplate.postForObject(RSCache.getURI()
				+ "/qaService/teacher/questions/{questionId}", request,
				String.class, questionId);
	}
}
