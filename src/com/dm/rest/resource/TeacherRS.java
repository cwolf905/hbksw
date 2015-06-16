package com.dm.rest.resource;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dm.rest.model.Teacher;
import com.dm.rest.model.UserPassword;

/**
 * 实现教师的登陆和修改密码、列表和统计、信息查看、增加、删除、修改，已经完成
 * 
 * @author Anthony
 * 
 */

@Controller
@RequestMapping("/teacher")
public class TeacherRS extends BasicRS {

	@RequestMapping(value = "/updatePasswd", method = RequestMethod.POST)
	public @ResponseBody
	String updatePassword(@RequestBody
	UserPassword user) {
		HttpEntity<UserPassword> request = new HttpEntity<UserPassword>(user,
				newHeaders());
		return restTemplate.postForObject(RSCache.getURI()
				+ "/userService/teacher/updatePasswd", request, String.class);
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public @ResponseBody
	String login(@RequestBody
			com.dm.orm.mapper.entity.Teacher teacher) {
		HttpEntity<com.dm.orm.mapper.entity.Teacher> request = new HttpEntity<com.dm.orm.mapper.entity.Teacher>(teacher,
				newHeaders());
		return restTemplate.postForObject(RSCache.getURI()
				+ "/userService/teacher/login", request, String.class);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public @ResponseBody
	String count(@RequestParam(value = "userName", required = false)
	String userName, @RequestParam(value = "cid", required = false)
	String cid) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/userService/teacher/count?userName=" + encodeStr(userName)
				+ "&cid=" + cid, String.class);
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	String list(@RequestParam(value = "userName", required = false)
	String userName, @RequestParam(value = "cid", required = false)
	String cid, @RequestParam(value = "curPage", required = false)
	int curPage, @RequestParam(value = "pageSize", required = false)
	int pageSize) {
		String uri = RSCache.getURI() + "/userService/teacher/list?userName="
				+ encodeStr(userName) + "&cid=" + cid + "&curPage="
				+ (curPage - 1) + "&pageSize=" + pageSize;
		// System.out.println(uri);
		return restTemplate.getForObject(uri, String.class);
	}

	@RequestMapping(value = "/{teacherId}", method = RequestMethod.GET)
	public @ResponseBody
	String getTeacherInfo(@PathVariable("teacherId")
	String teacherId) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/userService/teacher/{teacherId}", String.class, teacherId);
	}

	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	String addTeacher(@RequestBody
	Teacher teacher) {
		HttpEntity<Teacher> request = new HttpEntity<Teacher>(teacher,
				newHeaders());
		return restTemplate.postForObject(RSCache.getURI()
				+ "/userService/teacher/new", request, String.class);
	}

	@RequestMapping(value = "/{teacherId}", method = RequestMethod.POST)
	public @ResponseBody
	String updateTeacher(@PathVariable("teacherId")
	String teacherId, @RequestBody
	Teacher teacher) {
		HttpEntity<Teacher> request = new HttpEntity<Teacher>(teacher,
				newHeaders());
		return restTemplate.postForObject(RSCache.getURI()
				+ "/userService/teacher/{teacherId}", request, String.class,
				teacherId);
	}

	@RequestMapping(value = "/{teacherId}/delete", method = RequestMethod.GET)
	public @ResponseBody
	String deleteTeacher(@PathVariable("teacherId")
	String teacherId) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/userService/teacher/{teacherId}/delete", String.class,
				teacherId);
	}

	@RequestMapping(value = "/{teacherId}/resetPasswd", method = RequestMethod.POST)
	public @ResponseBody
	String resetTeacherPasswd(@PathVariable("teacherId")
	String teacherId, @RequestBody
	UserPassword user) {
		HttpEntity<UserPassword> request = new HttpEntity<UserPassword>(user,
				newHeaders());
		return restTemplate.postForObject(RSCache.getURI()
				+ "/userService/teacher/{teacherId}/resetPasswd", request,
				String.class, teacherId);
	}
}
