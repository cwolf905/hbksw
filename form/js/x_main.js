
var $tabs;
var tabTemplate = "<li><a href='#{href}'>#{label}</a><span class='ui-icon ui-icon-close'>Remove Tab</span></li>";

function initGather() {
	$tabs = $("#tabs").tabs();
	$tabs.delegate("span.ui-icon-close", "click", function() {
		var id = $(this).closest("li").remove().attr("aria-controls");
		$("#" + id).remove();
		$tabs.tabs("refresh");
	});
	initGatherPassword();
}

/**
 * 注意二级路径
 * 
 * @param {Object} id
 * @param {Object} label
 * @param {Object} subfix
 */
function addTab(id, label, subfix) {
	var idx = $tabs.tabs("exists", "#" + id);
	if (idx != -1) {
		$tabs.tabs("option", "active", idx);
		return idx;
	}
	var li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label));
	$tabs.find(".ui-tabs-nav").append(li);
	var url = id + ".html";
	if (url.indexOf("mobileuser") > -1 || url.indexOf("webuser") > -1 || url.indexOf("feedback") > -1|| url.indexOf("mytest") > -1) {
		url = "user/" + url;
	} else if (url.indexOf("teacher") > -1) {
		url = "teacher/" + url;
	} else if (url.indexOf("question") > -1) {
		url = "question/" + url;
	} else if (url.indexOf("college") > -1 || url.indexOf("qrcode") > -1) {
		url = "college/" + url;
	}else if (url.indexOf("pluginTemplate") > -1) {
		url = "pluginTemplate/" + url;
	}else if (url.indexOf("pluginPackage") > -1) {
		url = "pluginPackage/" + url;
	}else if (url.indexOf("pluginIndex") > -1) {
		url = "pluginIndex/" + url;
	}else if (url.indexOf("pluginTag") > -1) {
		url = "pluginTag/" + url;
	}else if (url.indexOf("pluginCategory") > -1) {
		url = "pluginCategory/" + url;
	} else if (url.indexOf("plugin") > -1 || url.indexOf("mobileadnew") > -1 || url.indexOf("reviewcard") > -1) {
		url = "plugin/" + url;
	} else if (url.indexOf("information") > -1 || url.indexOf("subject") > -1 || url.indexOf("push") > -1) {
		url = "information/" + url;
	} else if (url.indexOf("calendar") > -1) {
		url = "calendar/" + url;
	} else if (url.indexOf("signflow") > -1) {
		url = "signflow/" + url;
	} else if (url.indexOf("release") > -1) {
		url = "release/" + url;
	} else if (url.indexOf("thirdProvide") > -1) {
		url = "thirdProvide/" + url;
	}else if (url.indexOf("adminUser") > -1) {
		url = "adminUser/" + url;
	}else if (url.indexOf("role") > -1) {
		url = "role/" + url;
	} else if (url.indexOf("academy") > -1) {
		url = "academynews/" + url;
	}
	
	if (subfix) 
		url += subfix;
		var height = $(document).height();
		height -= 110;
		height += "px";
	
	$tabs.append("<iframe id='" + id + "' name='" + id + "' src='" + url + "'" +
	"frameborder='0' style='width:100%; height:"+height+"; marginwidth:0; marginheight:0;scrolling:auto' ></iframe>");
	$tabs.tabs("refresh");
	idx = $tabs.tabs("exists", "#" + id);
	$tabs.tabs("option", "active", idx);
	return -1; // 重要!
}

function removeTab(id) {
	var idx = $tabs.tabs("exists", "#" + id);
	if (idx == -1) 
		return;
	callRefresh(id);
	$tabs.find(".ui-tabs-nav").find("li").eq(idx).remove();
	var ifrm = $("#" + id);
	if (ifrm.length > 0) {
		var el = ifrm.get(0);
		el.contentWindow.document.write('');//清空iframe的内容
		el.contentWindow.close();//避免iframe内存泄漏
		ifrm.attr('src', "about:blank");
		ifrm.remove();
	}
	$tabs.tabs("refresh");
}

/**
 * 增加修改之后的列表刷新
 * 
 * @param {Object} id
 */
function callRefresh(id) {
	if (id == "teacheradd" || id == "teacherupdate") {
		refreshTab("teacherlist");
	} else if (id == "comquestionadd" || id == "comquestionupdate") {
		refreshTab("comquestionlist");
	} else if (id == "enquestionupdate") {
		refreshTab("enquestiontodo");
		refreshTab("enquestionlist");
	} else if (id == "questionupdate") {
		refreshTab("questiontodo");
		refreshTab("questionlist");
	} else if (id == "qrcodeadd") {
		refreshTab("qrcodelist");
	} else if (id == "pluginnewadd") {
		refreshTab("pluginlist");
	} else if (id == "pluginupdate") {
		refreshTab("pluginlist");
	} else if (id == "pluginreview") {
//		refreshTab("pluginlist");
		refreshTab("pluginStatuslist");
	} else if (id == "pluginStatuslist") {
		refreshTab("pluginStatuslist");
	} else if (id == "pluginStatuslist1") {
		refreshTab("pluginStatuslist1");
	} else if (id == "pluginPackageAdd" || id == "pluginPackageUpdate") {
		refreshTab("pluginPackageList");
	} else if (id == "mobileadnewadd" || id == "mobileadnewupdate") {
		refreshTab("mobileadnewlist");
	} else if (id == "infosubjectadd" || id == "infosubjectupdate") {
		refreshTab("infosubjectlist");
	} else if (id == "pushsampleadd" || id == "pushsampleupdate") {
		refreshTab("pushsamplelist");
	} else if (id == "pushadd" || id == "pushupdate") {
		refreshTab("pushlist");
	} else if (id == "calendartimeradd" || id == "calendartimerupdate") {
		refreshTab("calendartimerlist");
	} else if (id == "calendareventadd" || id == "calendareventupdate") {
		refreshTab("calendareventlist");
	} else if (id == "calendarscheduleadd" || id == "calendarscheduleupdate") {
		refreshTab("calendarschedulelist");
	} else if (id == "signflowadd" || id == "signflowupdate") {
		refreshTab("signflowlist");
	} else if (id == "reviewpluginadd" || id == "reviewpluginupdate" || id == "reviewpluginmanage") {
		refreshTab("reviewpluginlist");
	} else if (id == "releaseadd" || id == "releaseupdate") {
		refreshTab("releaselist");
	}else if (id == "thirdProvideUpdate" || id == "thirdProvideAdd") {
		refreshTab("thirdProvideList");
	}else if (id == "pluginCategoryUpdate" || id == "pluginCategoryAdd") {
		refreshTab("pluginCategoryList");
	}else if (id == "pluginTagUpdate" || id == "pluginTagAdd") {
		refreshTab("pluginTagList");
	}else if (id == "pluginIndexUpdate" || id == "pluginIndexAdd") {
		refreshTab("pluginIndexList");
	}else if (id == "adminUserUpdate" || id == "adminUserAdd") {
		refreshTab("adminUserList");
	}else if (id == "roleUpdate" || id == "roleAdd") {
		refreshTab("roleList");
	} else if (id == "academynewsUpdate") {
		refreshTab("academynewsList");
	} else if (id == "informationUpdate") {
		refreshTab("informationlist");
	}else if (id == "custompushUpdate") {
		refreshTab("custompushlist");
	}else if (id == "custompushAdd") {
		refreshTab("custompushlist");
	}
}

function refreshTab(id) {
	var idx = $tabs.tabs("exists", "#" + id);
	if (idx == -1) // 如果标签页不存在，那么不用刷新
		return;
	refreshFrame(id);
}

/**
 * tab页重新激活的刷新，对应到menu菜单
 * 
 * @param {Object} id
 */
function refreshFrame(id) {
	if (id == "mobileuserlist") {
		window.frames[id].doMobileUserList(1);
	} else if (id == "webuserlist") {
		window.frames[id].doWebUserList(1);
	} else if (id == "teacherlist") {
		window.frames[id].doTeacherList(1);
	} else if (id == "teacheradd") {
		window.frames[id].doTeacherBeforeAdd();
	} else if (id == "comquestionlist") {
		window.frames[id].doQuestionList(1);
	} else if (id == "comquestionadd") {
		window.frames[id].doQuestionBeforeAdd();
	} else if (id == "enquestiontodo") {
		window.frames[id].doQuestionTodo(1);
	} else if (id == "enquestionlist") {
		window.frames[id].doQuestionList(1);
	} else if (id == "questiontodo") {
		window.frames[id].doQuestionTodo(1);
	} else if (id == "questionlist") {
		window.frames[id].doQuestionList(1);
	} else if (id == "collegelist") {
		window.frames[id].doCollegeList(1);
	} else if (id == "collegeorder") {
		window.frames[id].doCollegeOrderList();
	} else if (id == "qrcodelist") {
		window.frames[id].doQRCodeList(1);
	} else if (id == "pluginlist") {
		window.frames[id].doPluginAll();
	} else if (id == "pluginStatuslist") {
		window.frames[id].doPluginStatusAll();
	} else if (id == "pluginStatuslist1") {
		window.frames[id].doPluginStatusAll();
	} else if (id == "pluginPackageAdd") {
		window.frames[id].doPluginPackageBeforeAdd();
	} else if (id == "pluginPackageList") {
		window.frames[id].doPluginPackageAll();
	} else if (id == "mobileadnewlist") {
		window.frames[id].doMobileAdNewList(1);
	} else if (id == "mobileadnewadd") {
		window.frames[id].doMobileAdNewBeforeAdd();
	} else if (id == "informationlist") {
		window.frames[id].doInformationList(1);
	} else if (id == "informationPushAuditlist") {
		window.frames[id].doInformationPushAuditList(1);
	} else if (id == "informationContentAuditlist") {
		window.frames[id].doInformationContentAuditList(1);
	} else if (id == "infosubjectlist") {
		window.frames[id].doInfoSubjectList(1);
	} else if (id == "infosubjectadd") {
		window.frames[id].doInfoSubjectBeforeAdd();
	} else if (id == "pushsamplelist") {
		window.frames[id].doPushSampleList(1);
	} else if (id == "pushlist") {
		window.frames[id].doPushList(1);
	} else if (id == "pusherrorlist") {
		window.frames[id].doPushErrorList(1);
	} else if (id == "calendartimerlist") {
		window.frames[id].doCalendarTimerList(1);
	} else if (id == "calendartimeradd") {
		window.frames[id].doCalendarTimerBeforeAdd();
	} else if (id == "calendareventlist") {
		window.frames[id].doCalendarEventList(1);
	} else if (id == "calendareventadd") {
		window.frames[id].doCalendarEventBeforeAdd();
	} else if (id == "calendarschedulelist") {
		window.frames[id].doCalendarScheduleList(1);
	} else if (id == "calendarscheduleadd") {
		window.frames[id].doCalendarScheduleBeforeAdd();
	} else if (id == "signflowlist") {
		window.frames[id].doSignFlowList(1);
	} else if (id == "signflowadd") {
		window.frames[id].doSignFlowBeforeAdd();
	} else if (id == "reviewpluginlist") {
		window.frames[id].doReviewPluginList(1);
	} else if (id == "reviewpluginadd") {
		window.frames[id].doReviewPluginBeforeAdd();
	} else if (id == "releaselist") {
		window.frames[id].doReleaseList(1);
	} else if (id == "releaseadd") {
		window.frames[id].doReleaseBeforeAdd();
	}else if (id == "thirdProvideList") {
		window.frames[id].doThirdProvideAll();
	}else if (id == "thirdProvideAdd") {
		window.frames[id].doThirdProvideBeforeAdd();
	}else if (id == "pluginCategoryList") {
		window.frames[id].doPluginCategoryAll();
	}else if (id == "pluginCategoryAdd") {
		window.frames[id].doPluginCategoryBeforeAdd();
	}else if (id == "pluginIndexList") {
		window.frames[id].doPluginIndexAll();
	}else if (id == "pluginIndexAdd") {
		window.frames[id].doPluginIndexBeforeAdd();
	}else if (id == "pluginTagList") {
		window.frames[id].doPluginTagAll();
	}else if (id == "pluginTagAdd") {
		window.frames[id].doPluginTagBeforeAdd();
	}else if (id == "pluginOrderInfo") {
		window.frames[id].doPluginOrderInfoAll();
	}else if (id == "adminUserList") {
		window.frames['adminUserList'].doAdminUserAll();
	}else if (id == "adminUserAdd") {
		window.frames[id].doAdminUserBeforeAdd();
	}else if (id == "roleList") {
		window.frames[id].doRoleAll();
	}else if (id == "roleAdd") {
		window.frames[id].doRoleBeforeAdd();
	}else if (id == "pluginOrderStatistic") {
		window.frames[id].doPluginOrderStaticAll();
	}else if (id == "pluginOrderPackage") {
		window.frames[id].doPluginPackageAll();
	}else if (id == "pluginSaleStatistics") {
		window.frames[id].doPluginSaleStatisticsList(1);
	}else if (id == "academynewsList") {
		window.frames[id].doacademynewsList(1);
	}else if (id == "academynewsPushAuditList") {
		window.frames[id].doAcademynewsPushAuditList(1);
	}else if (id == "academynewsContentAuditList") {
		window.frames[id].doAcademyNewsContentAuditList(1);
	}else if (id == "custompushlist") {
		window.frames[id].doCustomList(1);
	}
}

/**
 * 左侧菜单调用
 * @param {Object} obj
 */
function hrefTab(obj) {
	var id = $(obj).attr("id");
	//alert(id);
	var label = $(obj).text();
	var idSplit = new Array();
	idSplit = id.split('_');
//	alert(idSplit[1]);
//	if(idSplit[0].indexOf("") > -1)
//	{
//		
//	}
	$.cookie("examType", idSplit[1]);
	$.cookie("pluginId", idSplit[2]);
	var idx = addTab(idSplit[0], label);
	if (idx == -1) // 如果标签页不存在，那么初始化页面，不用刷新
		return;
	refreshFrame(idSplit[0]);
}


/**
 * 密码修改，顶部菜单调用
 */
function initGatherPassword() {
	$("#divPassword").dialog({
		autoOpen: false,
		height: 260,
		width: 340,
		modal: true,
		buttons: {}
	});
	$("input[type='password']").keydown(function() {
		if (event.keyCode == 13){
			if ($(this).attr("name") == "txtNewPass2") {
				doUpdateUserPassword();
			} else {
				event.keyCode = 9;
			}
		}
		return true;
	});
	$("#btnSubmit").click(function() {
		doUpdateUserPassword();
	});
}

function hrefUpdateUserPassword() {
	$("#divPassword").dialog("open");
}

function doUpdateUserPassword() {
	var objOldPass = $("#txtOldPass");
	var oldpass = objOldPass.val();
	if (getLength(oldpass) < 1) {
		alert("请输入原始密码！");
		objOldPass.focus();
		return;
	}
	var objNewPass = $("#txtNewPass");
	var newpass = objNewPass.val();
	if (getLength(newpass) < 6) {
		alert("请输入新的密码，并且至少满六位！");
		objNewPass.focus();
		return;
	}
	var objNewPass2 = $("#txtNewPass2");
	var newpass2 = objNewPass2.val();
	if (getLength(newpass2) < 1) {
		alert("请再输入一次新密码！");
		objNewPass2.focus();
		return;
	} else if (newpass2 != newpass){
		alert("请保证两次输入的新密码相同！");
		objNewPass2.focus();
		return;
	}
	
	var powertype = getCookie("powertype");
	switch (parseInt(powertype)) {
		case sysAdminUser :
			var adminid = getCookie("teacherId");
			AdminUserDS.updateUserPassword(adminid, oldpass, newpass, function(code) {
				if (code) {
					alert("修改密码成功!");
					$("#divPassword").dialog("close");
				} else 
					alert("修改密码失败!");
			});
			break;
		case sysTeacher :
			var userName = getCookie("userName");
			var jsonstr = '{"userName":"' + userName + '", "password":"' + oldpass + '", "newPassword":"' + newpass + '"}';
			$.ajax({
				type: "post",
				url: "../service/teacher/updatePasswd",
				data: jsonstr,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data, textStatus){
					if (!data) {
						errHandle(-1); return;
					}
					//alert(JSON.stringify(data));
					if (data.result == 0) {
						alert("修改密码成功");
						$("#divPassword").dialog("close");
					} else 
						errHandle(data.result, data.content);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
					errHandle(0, XMLHttpRequest.status);
				}
			});
			break;
		default :
	}
}
