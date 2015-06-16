
var dictTeacherType = {"0":"院校老师", "1":"招生老师"}; // td
var dictRole = {"0":"答疑", "1":"审核"}; // sel

function initTeacherList() {	
	$("#searchconds button").click(function() {
		doTeacherList(1);
	});
	doTeacherList(1);
}

function doTeacherAll() {
	$("#txtUserName").val("");
	doTeacherList(1);
}

function doTeacherList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	var userName = $.trim($("#txtUserName").val());
	$.ajax({
		type: "get",
		url: "../../service/teacher/count?userName=" + encodeURIComponent(userName) + "&cid=",
		dataType: "text",
		success: function(data, textStatus){
			if (!data || data == "0") {
				buildListsBlankHTML();
				return;
			}
			//alert(data);
			var count = parseInt(data);
			$.ajax({
				type: "get",
				url: "../../service/teacher/list?userName=" + encodeURIComponent(userName) + "&cid="
					+ "&curPage=" + page + "&pageSize=" + sysPageSize,
				dataType: "json",
				success: function(data, textStatus){
					if (!data) {
						errHandle(-1); return;
					}
					//alert(JSON.stringify(data));
					for (var i = 0; i < data.length; i++) {
						var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "") + ">";
						atr += "<td align=\"center\"><a href=\"###\" onclick=\"hrefInfo('" 
							+ data[i].teacherId + "');return false;\">" 
							+ data[i].teacherId + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].userName + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].mobileNo + "&nbsp;</td>";
						atr += "<td align=\"center\" class=\"w-cid\">" + data[i].cid + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(dictT[data[i].t], "") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + dictRole[data[i].role] + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].registerDate + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].lastLogin, "") + "&nbsp;</td>";
						atr += "<td align=\"center\" nowrap>" + getActionTd() + "&nbsp;</td>";
						atr += "</tr>";
						$("#showlists").append(atr);
					}
					buildTranslate();
					buildListsStyle();
					buildPagesHTML("$doTeacherList(?)", count, page);
					buildPagesStyle();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
					errHandle(0, XMLHttpRequest.status);
				}
			});
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
}

function buildTranslate() {
	var cids = [];
	$("#showlists").find("tr").each(function() {
		cids.push($.trim($(this).find("td.w-cid").text()));
	});
	$.ajax({
		type: "get",
		url: "../../service/college/mapper",
		data : {cids : cids.join(",")},
		dataType: "text",
		success: function(data, textStatus){
			if (data) {
				var cnames = eval(data);
				var k = 0;
				$("#showlists").find("tr").each(function() {
					$(this).find("td.w-cid").html(nvl(cnames[k++], 
						"<span style=\"color:red\">招生答疑</span>") + "&nbsp;");
				});
			} else 
				errHandle(-1);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
}

function getActionTd() {
	var rok = false;
	var atd = "";
	rok = haveRight("teacher.update");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	rok = haveRight("teacher.delete");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefDelete(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/del" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "删除" : "不可删除") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	rok = haveRight("teacher.check");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefReset(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/reset" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "重置密码" : "不可重置密码") 
		+ "\" width=\"16\" height=\"16\"/></a>";
	return atd;
}

function hrefInfo(teacherId) {
	var idx = parent.addTab("teacherinfo", "查看教师信息", "?teacherId=" + teacherId);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["teacherinfo"], "?teacherId=" + teacherId);
}

function hrefUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var teacherId = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("teacherupdate", "修改教师信息", "?teacherId=" + teacherId);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["teacherupdate"], "?teacherId=" + teacherId);
}

function hrefDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var teacherId = $.trim($(tr).find("td").eq(0).text());
	if (confirm("是否确认删除该教师(" + teacherId + ")?")) {
		$.ajax({
			type: "get",
			url: "../../service/teacher/" + teacherId + "/delete",
			dataType: "json",
			success: function(data, textStatus){
				if (data) {
					if (data.result == 0) {
						alert("删除教师(" + teacherId + ")成功!");
						doTeacherList(1);
					} else 
						errHandle(data.result, data.content);
				} else 
					errHandle(-1);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				errHandle(0, XMLHttpRequest.status);
			}
		});
	}
}

function hrefReset(obj) {
	var tr = obj.parentNode.parentNode;
	var teacherId = $.trim($(tr).find("td").eq(0).text());
	var user = {};
	user.newPassword = sysPassword;
	var jsonstr = JSON.stringify(user);
	//alert(jsonstr);
	if (confirm("是否确认重置该教师(" + teacherId + ")的密码?")) {
		$.ajax({
			type: "post",
			url: "../../service/teacher/" + teacherId + "/resetPasswd",
			data: jsonstr,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data, textStatus){
				if (data) {
					if (data.result == 0) {
						alert("重置密码成功!教师(" + teacherId + ")的初始密码为" + sysPassword);
					} else 
						errHandle(data.result, data.content);
				} else 
					errHandle(-1);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				errHandle(0, XMLHttpRequest.status);
			}
		});
	}
}

function hrefAdd() {
	if (!haveRight("teacher.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("teacheradd", "新增教师");
	if (idx == -1)
		return;
	parent.frames["teacheradd"].doTeacherBeforeAdd();
}

var teacherForm = new autoForm("#frmTeacher");

function initTeacherInfo() {
	var teacherId = getArgFromHref("teacherId");
	doTeacherInfo(teacherId);
}

function doTeacherInfo(teacherId) {
	$.ajax({
		type: "get",
		url: "../../service/teacher/" + teacherId,
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				teacherForm.init(data);
				if (data.cid != 0) 
					doTranslate(data.cid);
				else 
					$("#txtCname").val("招生答疑");
				teacherForm.readonly();
			} else 
				errHandle(-1);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
}

function initTeacherAdd() {
	$("#divCollege").dialog({
		autoOpen: false,
		height: 400,
		width: 750,
		modal: true,
		buttons: {}
	});
	$("#searchconds button").click(function() {
		doCollegeList(1);
	});
	sysSelectAll = true;
	createSelObj($("#selT"), "0");
	PluginDS.findAllDictExamType(function(data){
		var supplierStr =" ";
		supplierStr += "<option value='0'>全部</option>";
		for ( var i = 0; i < data.length; i++) {
			supplierStr += "<option value='" +data[i].code + "'>"+ data[i].name + "</option>";
		}
		$("#examT").append(supplierStr);
	});
	sysSelectAll = false;
	
	$("#btnBrowse").click(function(){
		$("#divCollege").dialog("open");
		doCollegeList(1);
	});
	$("#btnSubmit").click(function(){
		doTeacherAdd();
	});
	doTeacherBeforeAdd();
}

function doTeacherBeforeAdd() {
	var teacher = {};
	//teacher.type1 = "财经类";
	//teacher.type2 = "211工程院校";
	teacher.userName = "";
	teacher.mobileNo = "";
	teacher.teacherType = 0; // 提交的时候要清除
	teacher.cname = ""; // 提交的时候需要清除
	teacher.cid = ""; // 隐藏字段
	teacher.role = 0;
	teacherForm.init(teacher);
	
	$("#tdTeacherType").find(":radio").click(function() {
		var teachertype = $("#tdTeacherType").find(":radio:checked").val();
		if (teachertype == 1) {
			$("#trExamtype").show(); $("#trCollege").hide();
		}
		else {
			$("#trExamtype").hide(); $("#trCollege").show();
			teacherForm.readonly("#txtCname");
		}
	});
	$("#tdTeacherType").find(":radio").addClass("ReadOnlyYes");
	$("#tdTeacherType").find(":radio:checked").click();
}

/**
 * 处理弹出窗口的返回
 * @param {Object} cid
 * @param {Object} cname
 */
function hrefChoose(cid, cname) {
	$("#txtCid").val(cid);
	$("#txtCname").val(cname);
	$("#divCollege").dialog("close");
}

function doTeacherAdd() {
	if (!teacherForm.valid()) {
		return false;
	}
	var teacher = teacherForm.toBeanSimple();
//	var teacher = {};
//	alert(teacher);
	if (teacher.teacherType == 1)
		teacher.cid = 0;
	if($("#isSms").prop("checked") == true)
	{
		teacher.isSms = 1;
	}else
	{
		teacher.isSms = 0;
	}
	teacher.teacherType = undefined; // 移除teacherType
	teacher.cname = undefined; // 移除cname
	teacher.password = sysPassword;
	var jsonstr = JSON.stringify(teacher);
//	alert(jsonstr);
	$.ajax({
		type: "POST",
		url: "../../service/teacher/new",
		data: jsonstr,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data, textStatus){
//			alert(data);return;
			if (data) {
				if (data.result == 0) {
					alert("新增教师成功!初始密码为：" + sysPassword);
					parent.removeTab('teacheradd');
				} else 
					errHandle(data.result, data.content);
			} else 
				errHandle(-1); 
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
}

function initTeacherUpdate() {
	$("#divCollege").dialog({
		autoOpen: false,
		height: 400,
		width: 750,
		modal: true,
		buttons: {}
	});
	$("#searchconds button").click(function() {
		doCollegeList(1);
	});
	sysSelectAll = true;
	createSelObj($("#selT"), "0");
	PluginDS.findAllDictExamType(function(data){

		var supplierStr =" ";
		supplierStr += "<option value='0'>全部</option>";
		for ( var i = 0; i < data.length; i++) {
			supplierStr += "<option value='" +data[i].code + "'>"+ data[i].name + "</option>";
		}
		$("#examT").append(supplierStr);
	});
	
	sysSelectAll = false;
	
	$("#btnBrowse").click(function(){
		$("#divCollege").dialog("open");
		doCollegeList(1);
	});
	$("#btnSubmit").click(function(){
		doTeacherUpdate();
	});
	var teacherId = getArgFromHref("teacherId");
	doTeacherBeforeUpdate(teacherId);
}

function doTeacherBeforeUpdate(teacherId) {
	//alert(teacherId);
	$.ajax({
		type: "get",
		url: "../../service/teacher/" + teacherId,
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				//alert(JSON.stringify(data));
				data.teacherType = (data.cid == 0) ? 1 : 0; // 设置teacherType
				teacherForm.init(data);
				if (data.cid != 0)
					doTranslate(data.cid); // 设置cname
				
				if(data.isSms == 1)
				{
					$("#isSms").attr("checked", "checked");
				}
				$("#tdTeacherType").find(":radio").click(function() {
					var teachertype = $("#tdTeacherType").find(":radio:checked").val();
					if (teachertype == 1) {
						$("#trExamtype").show(); $("#trCollege").hide();
					}
					else {
						$("#trExamtype").hide(); $("#trCollege").show();
						teacherForm.readonly("#txtCname");
					}
				});
				$("#tdTeacherType").find(":radio").addClass("ReadOnlyYes");
				$("#tdTeacherType").find(":radio:checked").click();
			} else 
				errHandle(-1);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
}

function doTranslate(cid) {
	//alert(cid);
	$.ajax({
		type: "get",
		url: "../../service/college/mapper",
		data : {cids : cid},
		dataType: "text",
		success: function(data, textStatus){
			if (data) {
				//alert(JSON.stringify(data));
				var cnames = eval(data);
				$("#txtCname").val(cnames[0]);
			} else 
				errHandle(-1);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
}

function doTeacherUpdate() {
	if (!teacherForm.valid()) {
		return;
	}
	var teacher = teacherForm.toBean();
	if (teacher.teacherType == 1)
		teacher.cid = 0;
	
	if($("#isSms").prop("checked") == true)
	{
		teacher.isSms = 1;
	}
	teacher.teacherType = undefined; // 移除teacherType
	teacher.cname = undefined; // 移除cname
	var teacherId = teacher.teacherId;
	var jsonstr = JSON.stringify(teacher);
	//alert(jsonstr);
	$.ajax({
		type: "post",
		url: "../../service/teacher/" + teacherId,
		data: jsonstr,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				//alert(JSON.stringify(data));
				if (data.result == 0) {
					alert("修改教师信息成功!");
					parent.removeTab('teacherupdate');
				} else 
					errHandle(data.result, data.content);
			} else 
				errHandle(-1);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
}