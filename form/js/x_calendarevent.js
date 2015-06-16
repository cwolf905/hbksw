
function initCalendarEventList() {
//	sysSelectAll = true;
//	createSelObj($("#selExamtype"), "0");
//	sysSelectAll = false;
	$("#selExamtype").val($.cookie("examType"));
	$("#pluginId").val($.cookie("pluginId"));
	$("#searchconds button").click(function() {
		doCalendarEventList(1);
	});
	doCalendarEventList(1);
}

function doCalendarEventAll() {
	$("#txtTitle").val("");
	$("#selExamtype").val("0");
	doCalendarEventList(1);
}

function doCalendarEventList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	var title = $("#txtTitle").val();
//	var examtype = $("#selExamtype").val();
	var examtype = $.cookie("examType");
	var calendarevent = {};
	calendarevent.title = title;
	calendarevent.examtype = examtype;
	calendarevent.pagestart = (page - 1) * sysPageSize;
	calendarevent.pagesize = sysPageSize;
	CalendarEventDS.countCalendarEvents(calendarevent, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		CalendarEventDS.findCalendarEventsByPage(calendarevent, function(data) {
			if (!data) 
				return;
			for (var i=0; i<data.length; i++) {
				var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\">" + dictExamtype[data[i].examtype] + "&nbsp;</td>";
				atr += "<td align=\"center\">" + nvl(data[i].title, "") + "&nbsp;</td>";
				atr += "<td align=\"center\">" + nvl(data[i].description, "") + "&nbsp;</td>";
				atr += "<td align=\"center\"><img src=\"" + data[i].img + "\" width=\"32\" height=\"32\"/>&nbsp;</td>";
				atr += "<td align=\"center\">" + getTime("dt8f", data[i].timing) + "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + getActionTd() + "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doCalendarEventList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function getActionTd(status) {
	var rok = false;
	var atd = "";
	rok = haveRight("calendarevent.update");
	atd += "<a href=\"###\"" + (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("calendarevent.delete");
	atd += "<a href=\"###\"" + (rok ? " onclick=\"hrefDelete(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/del" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "删除" : "不可删除") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("calendarevent.manage");
	atd += "<a href=\"###\"" + (rok ? " onclick=\"hrefManage(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/content" 
		+ (rok ? "" : "2") + ".png\" title=\"" + (rok ? "资源管理" : "不可管理资源") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	return atd;
}

function hrefUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("calendareventupdate", "修改系统事件信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["calendareventupdate"], "?id=" + id);
}

function hrefDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	if (confirm("是否确认删除该系统事件(" + id + ")?")) {
		CalendarEventDS.deleteCalendarEvent(id, function(data){
			if (data) {
				alert("删除系统事件(" + id + ")成功!");
				doCalendarEventList(1);
			}
		});
	}
}

function hrefManage(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("calendareventmanage", "系统事件资源管理", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["calendareventmanage"], "?id=" + id);
}

function hrefAdd() {
	if (!haveRight("calendarevent.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var examType = $("#selExamtype").val();
	var pluginId = $("#pluginId").val();
	var idx = parent.addTab("calendareventadd", "新增系统事件", "?examType="+examType+"&pluginId="+pluginId);
	if (idx == -1)
		return;
	parent.frames["calendareventadd"].doCalendarEventBeforeAdd();
}

var calendarEventForm = new autoForm("#frmCalendarEvent");

function initCalendarEventAdd() {	
	$("#txtJpg").uploadify({
		"uploader" : "../../uploadify?type=calendarevent",
	    "swf" : "../../jquery/uploadify/uploadify.swf",
		"queueID" : "divJpg",
		"multi": false,
		"fileSizeLimit" : "1MB",
		"buttonText" : "添加文件",
		"width":"60",
		"height":"20",
        "fileTypeDesc" : "所有文件",
        "fileTypeExts" : "*.*",
		"onSelectError" : function(file, errorCode, errorMsg) {
			if (errorCode == -110)
				alert("文件大小超过限制(1MB)!");
			else if (errorCode == -120)
				alert("文件内容为空，请重新选择!");
		},
		"onUploadSuccess" : function(file, data, response) {
			var img = $("#txtImg").val();
			var newimg = getWebAddr("/html/") + "/uploadify/calendarevent/" + decodeURI(data);
			if (img && newimg != img) {
				img = img.substr(img.lastIndexOf("/") + 1);
				CalendarEventDS.deleteCalendarEventFile("calendarevent", img, function(code) {
					// do nothing;
				});
			}
			$("#txtImg").val(newimg);
		},
		"onUploadError": function(file, errorCode, errorMsg){
			alert("文件" + file.name + "上传失败!");
		}
	});
	
	$("#txtTiming").datepicker({
		dateFormat : "yy-mm-dd",
		changeMonth : true,
		changeYear : true,
		showButtonPanel : true,
		showOn : "both",
		buttonImage : "../../jquery/calendar3.gif",
		buttonImageOnly : true,
		beforeShow : function (i, e) {
			var z = jQuery(i).closest(".ui-dialog").css("z-index") + 1;
			e.dpDiv.css("z-index", z);
		}
	}).css("ime-mode", "disabled");
	$("#txtTiming").attr("readonly", true);
	
	$("#btnSubmit").click(function(){
		doCalendarEventAdd();
	});
	calendarEventForm.readonly("#txtImg");
	doCalendarEventBeforeAdd();
}

function doCalendarEventBeforeAdd() {
	var calendarevent = {};
	calendarevent.examtype = "101";
	calendarevent.title = "";
	calendarevent.description = "";
	calendarevent.img = "";
	calendarevent.timing = "";
	calendarEventForm.init(calendarevent);
}

function doCalendarEventAdd() {
	if (!calendarEventForm.valid()) {
		return false;
	}
	var calendarevent = calendarEventForm.toBean();
	var dt = calendarevent.timing;
	calendarevent.timing = new Date(dt);
	var examType = getArgFromHref("examType");
	if('undefined' == typeof(examType))
	{
		examType = $.cookie("examType");
	}
	calendarevent.examtype = examType;
	var pluginId = getArgFromHref("pluginId");
	if('undefined' == typeof(pluginId))
	{
		pluginId = $.cookie("pluginId");
	}
	calendarevent.pluginId = pluginId;
	CalendarEventDS.addCalendarEvent(calendarevent, function(data) {
		if (data) {
			alert("新增系统事件成功!");
			parent.removeTab("calendareventadd");
		}
	});
}

function initCalendarEventUpdate() {	
	$("#txtJpg").uploadify({
		"uploader" : "../../uploadify?type=calendarevent",
	    "swf" : "../../jquery/uploadify/uploadify.swf",
		"queueID" : "divJpg",
		"multi": false,
		"fileSizeLimit" : "1MB",
		"buttonText" : "添加文件",
		"width":"60",
		"height":"20",
        "fileTypeDesc" : "所有文件",
        "fileTypeExts" : "*.*",
		"onSelectError" : function(file, errorCode, errorMsg) {
			if (errorCode == -110)
				alert("文件大小超过限制(1MB)!");
			else if (errorCode == -120)
				alert("文件内容为空，请重新选择!");
		},
		"onUploadSuccess" : function(file, data, response) {
			var img = $("#txtImg").val();
			var newimg = getWebAddr("/html/") + "/uploadify/calendarevent/" + decodeURI(data);
			if (img && newimg != img) {
				img = img.substr(img.lastIndexOf("/") + 1);
				CalendarEventDS.deleteCalendarEventFile("calendarevent", img, function(code) {
					// do nothing;
				});
			}
			$("#txtImg").val(newimg);
		},
		"onUploadError": function(file, errorCode, errorMsg){
			alert("文件" + file.name + "上传失败!");
		}
	});
	
	$("#txtTiming").datepicker({
		dateFormat : "yy-mm-dd",
		changeMonth : true,
		changeYear : true,
		showButtonPanel : true,
		showOn : "both",
		buttonImage : "../../jquery/calendar3.gif",
		buttonImageOnly : true,
		beforeShow : function (i, e) {
			var z = jQuery(i).closest(".ui-dialog").css("z-index") + 1;
			e.dpDiv.css("z-index", z);
		}
	}).css("ime-mode", "disabled");
	$("#txtTiming").attr("readonly", true);
	
	$("#btnSubmit").click(function(){
		doCalendarEventUpdate();
	});
	calendarEventForm.readonly("#txtImg");
	var id = getArgFromHref("id");
	doCalendarEventBeforeUpdate(id);
}

function doCalendarEventBeforeUpdate(id) {
	CalendarEventDS.getCalendarEvent(id, function(data){
		if (data) {
			data.timing = getTime("dt8f", data.timing);
			calendarEventForm.init(data);
		}
	});
}

function doCalendarEventUpdate() {
	if (!calendarEventForm.valid()) {
		return;
	}
	var calendarevent = calendarEventForm.toBean();
	var dt = calendarevent.timing;
	calendarevent.timing = new Date(dt);
	CalendarEventDS.updateCalendarEvent(calendarevent, function(data) {
		if (data) {
			alert("修改系统事件信息成功!");
			parent.removeTab("calendareventupdate");
		}
	});
}

function initCalendarEventManage() {
	$("#divCalendarEventrs").dialog({
		autoOpen: false,
		height: 270,
		width: 400,
		modal: true,
		buttons: {}
	});
	
	$("button[name=btnSubmit]").click(function(){
		hrefCalendarEventrsAdd();
	});
	calendarEventForm.readonly();
	
	createSelObj($("#selRstype"), "1");
	var id = getArgFromHref("id");
	doCalendarEventBeforeManage(id);
}

function doCalendarEventBeforeManage(id) {
	CalendarEventDS.getCalendarEvent(id, function(data){
		if (data) {
			$("#txtEventid").val(data.id);
			$("#txtExamtype").val(dictExamtype[data.examtype]);
			$("#txtEventTitle").val(data.title);
			$("#txtDescription").val(data.description);
			$("#txtImg").attr("src", data.img);
			
			doCalendarEventrsListBeforeManage(data.id);
		}
	});
}

function doCalendarEventrsListBeforeManage(eventid) {
	var calendareventrs = {};
	calendareventrs.eventid = eventid;
	CalendarEventrsDS.findAllCalendarEventrss(calendareventrs, function(data) {
		if (data) {
			$("#tblCalendarEventrs").find("tr").eq(0).nextAll().remove();
			for (var i=0; i<data.length; i++) {
				buildCalendarEventrsTr(data[i]);
			}
		}
	});
}

function buildCalendarEventrsTr(data) {
	var atr = "<tr>";
	atr += "<td align=\"center\" class=\"w-title\">" 
		+ data.title + "&nbsp;</td>";
	atr += "<td align=\"center\" class=\"w-rstype\">" 
		+ dictRstype[data.rstype] + "<label style=\"display:none;\">" 
		+ data.rstype + "<label>&nbsp;</td>";
	atr += "<td align=\"center\" class=\"w-rsvalue\">" 
		+ data.rsvalue + "&nbsp;</td>";
	atr += "<td align=\"center\" nowrap>"
		+ "<a href=\"###\" onclick=\"hrefCalendarEventrsUpdate(this);return false;\">" 
		+ "<img src=\"../../css/former/images/edit.gif\" title=\"修改\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;" 
		+ "<a href=\"###\" onclick=\"hrefCalendarEventrsDelete(this);return false;\">" 
		+ "<img src=\"../../css/former/images/del.gif\" title=\"删除\" width=\"16\" height=\"16\"/></a>" 
		+ "<label style=\"display:none;\">" + data.id + "<label>&nbsp;</td>";
	$("#tblCalendarEventrs").append(atr);
}

function hrefCalendarEventrsAdd() {
	$("#divCalendarEventrs").find(".tb-head").html("添加资源");
	$("#btnOK").unbind("click").bind("click", function() {
		doCalendarEventrsAdd();
	});
	$("#txtId").val("");
	$("#txtTitle").val("");
	$("#selRstype").val("1");
	$("#txtRsvalue").val("");
	$("#divCalendarEventrs").dialog("open");
}

function hrefCalendarEventrsUpdate(obj) {
	$("#divCalendarEventrs").find(".tb-head").html("修改资源信息");
	$("#btnOK").unbind("click").bind("click", function() {
		doCalendarEventrsUpdate(obj);
	});
	
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td:last").find("label:first").text());
	var title = $.trim($(tr).find("td.w-title").text());
	var rstype = $.trim($(tr).find("td.w-rstype").find("label:first").text());
	var rsvalue = $.trim($(tr).find("td.w-rsvalue").text());
	$("#txtId").val(id);
	$("#txtTitle").val(title);
	$("#selRstype").val(rstype);
	$("#txtRsvalue").val(rsvalue);
	$("#divCalendarEventrs").dialog("open");
}

function hrefCalendarEventrsDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td:last").find("label:first").text());
	var title = $.trim($(tr).find("td.w-title").text());
	if (confirm("是否确认删除该资源(" + title + ")?")) {
		CalendarEventrsDS.deleteCalendarEventrs(id, function(data){
			if (data) {
				$(tr).remove();
			}
		});
	}
}

var calendarEventrsForm = new autoForm("#frmCalendarEventrs");

function doCalendarEventrsAdd() {
	if (!calendarEventrsForm.valid()) {
		return false;
	}
	var calendareventrs = calendarEventrsForm.toBean();
	calendareventrs.eventid = $("#txtEventid").val();
	CalendarEventrsDS.addCalendarEventrs(calendareventrs, function(data) {
		if (data) {
			calendareventrs.id = data;
			buildCalendarEventrsTr(calendareventrs);
		}
	});
	$("#divCalendarEventrs").dialog("close");
}

function doCalendarEventrsUpdate(obj) {
	if (!calendarEventrsForm.valid()) {
		return false;
	}
	var calendareventrs = calendarEventrsForm.toBean();
	calendareventrs.eventid = $("#txtEventid").val();
	CalendarEventrsDS.updateCalendarEventrs(calendareventrs, function(data) {
		if (data) {
			var tr = obj.parentNode.parentNode;
			$(tr).find("td.w-title").html(calendareventrs.title + "&nbsp;");
			$(tr).find("td.w-rstype").html(dictRstype[calendareventrs.rstype] 
				+ "<label style=\"display:none;\">" 
				+ calendareventrs.rstype + "<label>&nbsp;");
			$(tr).find("td.w-rsvalue").html(calendareventrs.rsvalue + "&nbsp;");
		}
	});
	$("#divCalendarEventrs").dialog("close");
}
