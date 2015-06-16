
function initSignFlowList() {
//	sysSelectAll = true;
//	createSelObj($("#selExamtype"), "0");
//	sysSelectAll = false;
	$("#selExamtype").val($.cookie("examType"));
	$("#searchconds button").click(function() {
		doSignFlowList(1);
	});
	doSignFlowList(1);
}

function doSignFlowAll() {
	$("#txtName").val("");
	$("#selExamtype").val("0");
	doSignFlowList(1);
}

function doSignFlowList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	var name = $("#txtName").val();
	var examtype = $.cookie("examType");
	var signflow = {};
	signflow.name = name;
	signflow.examtype = examtype;
	signflow.pagestart = (page - 1) * sysPageSize;
	signflow.pagesize = sysPageSize;
	SignFlowDS.countSignFlows(signflow, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		SignFlowDS.findSignFlowsByPage(signflow, function(data) {
			if (!data) 
				return;
			for (var i=0; i<data.length; i++) {
				var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-name\">" + data[i].name + "&nbsp;</td>";
				atr += "<td align=\"center\">" + dictExamtype[data[i].examtype] + "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + getActionTd() + "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doSignFlowList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function getActionTd(status) {
	var rok = false;
	var atd = "";
	rok = haveRight("signflow.update");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("signflow.delete");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefDelete(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/del" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "删除" : "不可删除") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("signflow.manage");
	atd += "<a href=\"###\"" + (rok ? " onclick=\"hrefManage(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/content" 
		+ (rok ? "" : "2") + ".png\" title=\"" + (rok ? "报考流程步骤管理" : "不可管理报考流程步骤") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	return atd;
}

function hrefUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("signflowupdate", "修改报考流程类别信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["signflowupdate"], "?id=" + id);
}

function hrefDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var name = $.trim($(tr).find("td.w-name").text());
	if (confirm("是否确认删除该报考流程类别(" + name + ")?")) {
		SignFlowDS.deleteSignFlow(id, function(data){
			if (data) {
				alert("删除报考流程类别(" + name + ")成功!");
				doSignFlowList(1);
			}
		});
	}
}

function hrefManage(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("signflowmanage", "报考流程步骤管理", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["signflowmanage"], "?id=" + id);
}

function hrefAdd() {
	if (!haveRight("signflow.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var examType = $("#selExamtype").val();
	var idx = parent.addTab("signflowadd", "新增报考流程类别", "?examType="+examType);
	if (idx == -1)
		return;
	parent.frames["signflowadd"].doSignFlowBeforeAdd();
}

var signFlowForm = new autoForm("#frmSignFlow");

function initSignFlowAdd() {	
	$("#btnSubmit").click(function(){
		doSignFlowAdd();
	});
	doSignFlowBeforeAdd();
}

function doSignFlowBeforeAdd() {
	var signflow = {};
	signflow.examtype = "101";
	signflow.name = "";
	signFlowForm.init(signflow);
}

function doSignFlowAdd() {
	if (!signFlowForm.valid()) {
		return false;
	}
	var signflow = signFlowForm.toBean();
	var examType = getArgFromHref("examType");
	if('undefined' == typeof(examType))
	{
		examType = $.cookie("examType");
	}
	signflow.examtype = examType;
	SignFlowDS.addSignFlow(signflow, function(data) {
		if (data) {
			alert("新增报考流程类别成功!");
			parent.removeTab("signflowadd");
		}
	});
}

function initSignFlowUpdate() {	
	$("#btnSubmit").click(function(){
		doSignFlowUpdate();
	});
	var id = getArgFromHref("id");
	doSignFlowBeforeUpdate(id);
}

function doSignFlowBeforeUpdate(id) {
	SignFlowDS.getSignFlow(id, function(data){
		if (data) {
			signFlowForm.init(data);
		}
	});
}

function doSignFlowUpdate() {
	if (!signFlowForm.valid()) {
		return;
	}
	var signflow = signFlowForm.toBean();
	SignFlowDS.updateSignFlow(signflow, function(data) {
		if (data) {
			alert("修改报考流程类别信息成功!");
			parent.removeTab("signflowupdate");
		}
	});
}

/**
 * 报考流程步骤管理
 */
function initSignFlowManage() {
	$("#divSignFlowStep").dialog({
		autoOpen: false,
		height: 380,
		width: 470,
		modal: true,
		position:[300,5],
		buttons: {}
	});
	
	$("#divAddPicIcon").dialog({
		autoOpen: false,
		height: 380,
		width: 470,
		modal: true,
		position:[600,5],
		buttons: {}
	});
	
	$("#txtBegintime").datepicker({
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
	$("#txtBegintime").attr("readonly", true);
	
	$("#txtEndtime").datepicker({
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
	$("#txtEndtime").attr("readonly", true);
	
	$("button[name=btnSubmit]").click(function(){
		hrefSignFlowStepAdd();
	});
	//signFlowForm.readonly();
	
	var id = getArgFromHref("id");
	doSignFlowBeforeManage(id);
}

function doSignFlowBeforeManage(id) {
	SignFlowDS.getSignFlow(id, function(data){
		if (data) {
			$("#txtFlowid").val(data.id);
			$("#txtExamtype").val(dictExamtype[data.examtype]);
			$("#txtFlowname").val(data.name);
			signFlowForm.readonly();
			
			doSignFlowStepListBeforeManage(data.id);
		}
	});
}

function doSignFlowStepListBeforeManage(flowid) {
	var signflowstep = {};
	signflowstep.flowid = flowid;
	SignFlowStepDS.findAllSignFlowSteps(signflowstep, function(data) {
		if (data) {
			$("#tblSignFlowStep").find("tr").eq(0).nextAll().remove();
			for (var i=0; i<data.length; i++) {
				buildSignFlowStepTr(data[i]);
			}
		}
	});
}

function buildSignFlowStepTr(data) {
	var atr = "<tr>";
	atr += "<td align=\"center\" class=\"w-name\">" + data.name + "&nbsp;</td>";
	atr += "<td align=\"center\" class=\"w-description\">" + data.description + "&nbsp;</td>";
	atr += "<td align=\"center\" >" +'<img style="width: 40px; height: 40px" class=\"w-icon\" iconId='+data.iconId+' src='+data.iconUrl+'>' + "&nbsp;</td>";
	atr += "<td align=\"center\" class=\"w-begintime\">" + getTime("dt8f", data.begintime) + "&nbsp;</td>";
	atr += "<td align=\"center\" class=\"w-endtime\">" + getTime("dt8f", data.endtime) + "&nbsp;</td>";
	atr += "<td align=\"center\" nowrap>"
		+ "<a href=\"###\" onclick=\"hrefSignFlowStepUpdate(this);return false;\">" 
		+ "<img src=\"../../css/former/images/edit.gif\" title=\"修改\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;" 
		+ "<a href=\"###\" onclick=\"hrefSignFlowStepDelete(this);return false;\">" 
		+ "<img src=\"../../css/former/images/del.gif\" title=\"删除\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;" 
		+ "<a href=\"###\" onclick=\"hrefSignFlowStepManage(this);return false;\">"
		+ "<img src=\"../../css/former/images/code.gif\" title=\"关联政策管理\" width=\"16\" height=\"16\"/></a>"
		+ "<label style=\"display:none;\">" + data.id + "<label>&nbsp;</td>";
	$("#tblSignFlowStep").append(atr);
}

function hrefSignFlowStepAdd() {
	$("#divSignFlowStep").find(".tb-head").html("添加步骤");
	$("#btnOK").unbind("click").bind("click", function() {
		doSignFlowStepAdd();
	});
	$("#txtId").val("");
	$("#txtName").val("");
	$("#taDescription").val("");
	$("#showPic").empty();
	$("#txtBegintime").val("");
	$("#txtEndtime").val("");
	$("#divSignFlowStep").dialog("open");
}

function hrefToAddPicIcon()
{
	$("#divAddPicIcon").find(".tb-head").html("添加图标");
	$("#btnAddPicIcon").unbind("click").bind("click", function() {
		var iconId = $('input:radio[name="flowStepIcon"]:checked').val();
		//alert(iconId);
		if(iconId)
		{
			var iconUrl = $("#"+iconId).attr("src");
			var img = '<img style="width: 40px; height: 40px" id="flowStepIcon" iconId='+iconId+' src='+iconUrl+' alt="" />'
			$("#showPic").html(img);
		}
		$("#divAddPicIcon").dialog("close");
	});
	
	//$("#showPic").empty();
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	SignFlowStepDS.initAllFlowStepIcon(function(data)
	{
		if(data)
//			return;
		for (var i=0; i<data.length; i++) {
			var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
			atr += "<td align=\"center\">";
			atr += '<input type="radio" value='+data[i].id+' name="flowStepIcon"/>';
			atr += "</td>";
			atr += "<td align=\"center\">";
			atr += '<img style="width: 40px; height: 40px" id='+data[i].id+' src='+data[i].iconUrl+' />';
			atr += "</td>";
			atr += "</tr>";
			$("#showlists").append(atr);
		}
	});
	$("#divAddPicIcon").dialog("open");
}
function hrefSignFlowStepUpdate(obj) {
	$("#divSignFlowStep").find(".tb-head").html("修改步骤信息");
	$("#btnOK").unbind("click").bind("click", function() {
		doSignFlowStepUpdate(obj);
	});
	
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td:last").find("label:first").text());
	var name = $.trim($(tr).find("td.w-name").text());
	var description = $.trim($(tr).find("td.w-description").text());
	var iconUrl = $.trim($(tr).find("img.w-icon").attr("src"));
	var iconId = $.trim($(tr).find("img.w-icon").attr("iconId"));
	var begintime = $.trim($(tr).find("td.w-begintime").text());
	var endtime = $.trim($(tr).find("td.w-endtime").text());
	$("#txtId").val(id);
	$("#txtName").val(name);
	$("#taDescription").val(description);
	var img = '<img style="width: 40px; height: 40px" id="flowStepIcon" iconId='+iconId+' src='+iconUrl+' alt="" />'
	$("#showPic").html(img);
	$("#txtBegintime").val(begintime);
	$("#txtEndtime").val(endtime);
	$("#divSignFlowStep").dialog("open");
}

function hrefSignFlowStepDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td:last").find("label:first").text());
	var name = $.trim($(tr).find("td.w-name").text());
	if (confirm("是否确认删除该步骤(" + name + ")?")) {
		SignFlowStepDS.deleteSignFlowStep(id, function(data){
			if (data) {
				$(tr).remove();
			}
		});
	}
}

function hrefSignFlowStepManage(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td:last").find("label:first").text());
	var idx = parent.addTab("signflowstepmanage", "关联政策管理", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["signflowstepmanage"], "?id=" + id);
}

var signFlowStepForm = new autoForm("#frmSignFlowStep");

function doSignFlowStepAdd() {
	if (!signFlowStepForm.valid()) {
		return false;
	}
	var signflowstep = signFlowStepForm.toBean();
	var iconId = $("#flowStepIcon").attr("iconId");
	var iconUrl = $("#flowStepIcon").attr("src");
	if('undefined' != typeof(iconId))
	{
		signflowstep.iconId = $("#flowStepIcon").attr("iconId");
	}
	if('undefined' != typeof(iconUrl))
	{
		signflowstep.iconUrl= $("#flowStepIcon").attr("src");
	}
	signflowstep.flowid = $("#txtFlowid").val();
	var begintime = signflowstep.begintime;
	var endtime = signflowstep.endtime;
	if("" != begintime && "" != endtime)
	{
		if(begintime>endtime){
			alert("开始时间不能大于结束时间");
			return ;
		}
	}
	signflowstep.begintime = new Date(begintime);
	signflowstep.endtime = new Date(endtime);
	SignFlowStepDS.addSignFlowStep(signflowstep, function(data) {
		if (data) {
			signflowstep.id = data;
			buildSignFlowStepTr(signflowstep);
		}
	});
	$("#divSignFlowStep").dialog("close");
}

function doSignFlowStepUpdate(obj) {
	if (!signFlowStepForm.valid()) {
		return false;
	}
	var signflowstep = signFlowStepForm.toBean();
	signflowstep.iconId = $("#flowStepIcon").attr("iconId");
	signflowstep.iconUrl = $("#flowStepIcon").attr("src");
	signflowstep.flowid = $("#txtFlowid").val();
	var dt = signflowstep.begintime;
	signflowstep.begintime = new Date(dt);
	dt = signflowstep.endtime;
	signflowstep.endtime = new Date(dt);
	SignFlowStepDS.updateSignFlowStep(signflowstep, function(data) {
		if (data) {
			var tr = obj.parentNode.parentNode;
			$(tr).find("td.w-name").html(signflowstep.name + "&nbsp;");
			$(tr).find("td.w-description").html(signflowstep.description + "&nbsp;");
			$(tr).find("img.w-icon").attr("src", signflowstep.iconUrl);
			$(tr).find("img.w-icon").attr("iconId", signflowstep.iconId);
			$(tr).find("td.w-begintime").html(getTime("dt8f", signflowstep.begintime) + "&nbsp;");
			$(tr).find("td.w-endtime").html(getTime("dt8f", signflowstep.endtime) + "&nbsp;");
		}
	});
	$("#divSignFlowStep").dialog("close");
}

/**
 * 关联政策管理
 */
function initSignFlowStepManage() {
	$("#divTip").dialog({
		autoOpen: false,
		height: 300,
		width: 550,
		modal: true,
		buttons: {}
	});
	
	$("button[name=btnSubmit]").click(function(){
		hrefSignFlowStepPolicyAdd();
	});
	//signFlowStepForm.readonly();
	
	var id = getArgFromHref("id");
	doSignFlowStepBeforeManage(id);
}

function doSignFlowStepBeforeManage(id) {
	SignFlowStepDS.getSignFlowStep(id, function(data){
		if (data) {
			$("#txtStepid").val(data.id);
			$("#txtName").val(data.name);
			$("#txtBegintime").val(getTime("dt8f", data.begintime));
			$("#txtEndtime").val(getTime("dt8f", data.endtime));
			signFlowStepForm.readonly();
			
			doSignFlowStepPolicyListBeforeManage(data.id);
		}
	});
}

function doSignFlowStepPolicyListBeforeManage(stepid) {
	var signflowsteppolicy = {};
	signflowsteppolicy.stepid = stepid;
	SignFlowStepPolicyDS.findAllSignFlowStepPolicys(signflowsteppolicy, function(data) {
		if (data) {
			$("#tblSignFlowStepPolicy").find("tr").eq(0).nextAll().remove();
			for (var i=0; i<data.length; i++) {
				buildSignFlowStepPolicyTr(data[i]);
			}
		}
	});
}

function buildSignFlowStepPolicyTr(data) {
	var atr = "<tr>";
	atr += "<td align=\"center\" class=\"w-title\">" + data.title + "&nbsp;</td>";
	atr += "<td align=\"center\" class=\"w-content\">" + omit(data.content, "") + "&nbsp;</td>";
	//modify by wanglei for 高考流程政策图片不需要展示 
	//atr += "<td align=\"center\"><img src=\"" + data.picture + "\" width=\"32\" height=\"32\"/>&nbsp;</td>";
	atr += "<td align=\"center\" nowrap>"
		+ "<a href=\"###\" onclick=\"hrefSignFlowStepPolicyUpdate(this);return false;\">" 
		+ "<img src=\"../../css/former/images/edit.gif\" title=\"修改\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;" 
		+ "<a href=\"###\" onclick=\"hrefSignFlowStepPolicyDelete(this);return false;\">" 
		+ "<img src=\"../../css/former/images/del.gif\" title=\"删除\" width=\"16\" height=\"16\"/></a>" 
		+ "<label style=\"display:none;\">" + data.id + "<label>&nbsp;</td>";
	$("#tblSignFlowStepPolicy").append(atr);
}

function hrefSignFlowStepPolicyUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td:last").find("label:first").text());
	var idx = parent.addTab("signflowsteppolicyupdate", "修改政策信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["signflowsteppolicyupdate"], "?id=" + id);
}

function hrefSignFlowStepPolicyDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td:last").find("label:first").text());
	var title = $.trim($(tr).find("td.w-title").text());
	if (confirm("是否确认删除该政策(" + title + ")?")) {
		SignFlowStepPolicyDS.deleteSignFlowStepPolicy(id, function(data){
			if (data) {
				$(tr).remove();
			}
		});
	}
}

function hrefSignFlowStepPolicyAdd() {
	var stepid = $("#txtStepid").val();
	var idx = parent.addTab("signflowsteppolicyadd", "添加政策", "?stepid=" + stepid);
	if (idx == -1)
		return;
	parent.frames["signflowsteppolicyadd"].doSignFlowStepPolicyBeforeAdd(stepid);
}

var signFlowStepPolicyForm = new autoForm("#frmSignFlowStepPolicy");

function initSignFlowStepPolicyAdd() {
	/*$("#txtJpg").uploadify({
		"uploader" : "../../uploadify?type=signflowsteppolicy",
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
			var img = $("#txtPicture").val();
			var newimg = getWebAddr("/html/") + "/uploadify/signflowsteppolicy/" + decodeURI(data);
			if (img && newimg != img) {
				img = img.substr(img.lastIndexOf("/") + 1);
				SignFlowStepPolicyDS.deleteSignFlowStepPolicyFile("signflowsteppolicy", img, function(code) {
					// do nothing;
				});
			}
			$("#txtPicture").val(newimg);
		},
		"onUploadError": function(file, errorCode, errorMsg){
			alert("文件" + file.name + "上传失败!");
		}
	});*/
	
	$("#btnSubmit").click(function(){
		doSignFlowStepPolicyAdd();
	});
	$("#taContent").ckeditor();
	
	var stepid = getArgFromHref("stepid");
	doSignFlowStepPolicyBeforeAdd(stepid);
}

function doSignFlowStepPolicyBeforeAdd(stepid) {
	var signflowsteppolicy = {};
	signflowsteppolicy.stepid = stepid;
	signflowsteppolicy.title = "";
	signflowsteppolicy.content = "";
	signflowsteppolicy.picture = "";
	signFlowStepPolicyForm.init(signflowsteppolicy);
	signFlowStepPolicyForm.readonly("#txtPicture");
}

function doSignFlowStepPolicyAdd() {
	if (!signFlowStepPolicyForm.valid()) {
		return false;
	}
	var signflowsteppolicy = signFlowStepPolicyForm.toBean();
	SignFlowStepPolicyDS.addSignFlowStepPolicy(signflowsteppolicy, function(data) {
		if (data) {
			alert("添加政策成功!");
			parent.frames["signflowstepmanage"].doSignFlowStepPolicyListBeforeManage(signflowsteppolicy.stepid);
			parent.removeTab("signflowsteppolicyadd");
		}
	});
}

function initSignFlowStepPolicyUpdate() {
	/*$("#txtJpg").uploadify({
		"uploader" : "../../uploadify?type=signflowsteppolicy",
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
			var img = $("#txtPicture").val();
			var newimg = getWebAddr("/html/") + "/uploadify/signflowsteppolicy/" + decodeURI(data);
			if (img && newimg != img) {
				img = img.substr(img.lastIndexOf("/") + 1);
				SignFlowStepPolicyDS.deleteSignFlowStepPolicyFile("signflowsteppolicy", img, function(code) {
					// do nothing;
				});
			}
			$("#txtPicture").val(newimg);
		},
		"onUploadError": function(file, errorCode, errorMsg){
			alert("文件" + file.name + "上传失败!");
		}
	});*/
	
	$("#btnSubmit").click(function(){
		doSignFlowStepPolicyUpdate();
	});
	$("#taContent").ckeditor();
	
	var id = getArgFromHref("id");
	doSignFlowStepPolicyBeforeUpdate(id);
}

function doSignFlowStepPolicyBeforeUpdate(id) {
	SignFlowStepPolicyDS.getSignFlowStepPolicy(id, function(data){
		if (data) {
			signFlowStepPolicyForm.init(data);
			signFlowStepPolicyForm.readonly("#txtPicture");
		}
	});
}

function doSignFlowStepPolicyUpdate() {
	if (!signFlowStepPolicyForm.valid()) {
		return false;
	}
	var signflowsteppolicy = signFlowStepPolicyForm.toBean();
	SignFlowStepPolicyDS.updateSignFlowStepPolicy(signflowsteppolicy, function(data) {
		if (data) {
			alert("修改政策信息成功!");
			parent.frames["signflowstepmanage"].doSignFlowStepPolicyListBeforeManage(signflowsteppolicy.stepid);
			parent.removeTab("signflowsteppolicyupdate");
		}
	});
}
