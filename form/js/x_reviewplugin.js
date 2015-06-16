
var dictType = {"1":"阅读式 ", "2":"关卡式"}; // sel

function initReviewPluginList() {
	sysSelectAll = true;
	createSelObj($("#selType"), "0");
	sysSelectAll = false;
	$("#searchconds button").click(function() {
		doReviewPluginList(1);
	});
	doReviewPluginList(1);
}

function doReviewPluginAll() {
	$("#txtName").val("");
	$("#selType").val("0");
	doReviewPluginList(1);
}

function doReviewPluginList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	var name = $("#txtName").val();
	var type = $("#selType").val();
	var reviewplugin = {};
	reviewplugin.name = name;
	reviewplugin.type = type;
	reviewplugin.pagestart = (page - 1) * sysPageSize;
	reviewplugin.pagesize = sysPageSize;
	ReviewPluginDS.countReviewPlugins(reviewplugin, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		ReviewPluginDS.findReviewPluginsByPage(reviewplugin, function(data) {
			if (!data) 
				return;
			for (var i=0; i<data.length; i++) {
				var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-name\">" + data[i].name + "&nbsp;</td>";
				atr += "<td align=\"center\"><img src=\"" 
					+ data[i].img + "\" width=\"32\" height=\"32\"/>&nbsp;</td>";
				atr += "<td align=\"center\">" + dictType[data[i].type] + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].cards + "&nbsp;</td>";
				atr += "<td align=\"center\">" + getTime("dt8f", data[i].begintime) + "&nbsp;</td>";
				atr += "<td align=\"center\">" + getTime("dt8f", data[i].endtime) + "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + getActionTd() + "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doReviewPluginList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function getActionTd(status) {
	var rok = false;
	var atd = "";
	rok = haveRight("reviewplugin.update");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("reviewplugin.delete");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefDelete(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/del" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "删除" : "不可删除") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("reviewplugin.manage");
	atd += "<a href=\"###\"" + (rok ? " onclick=\"hrefManage(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/code" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "知识点管理" : "不可管理知识点") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	return atd;
}

function hrefUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("reviewpluginupdate", "修改复习备考插件信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["reviewpluginupdate"], "?id=" + id);
}

function hrefDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var name = $.trim($(tr).find("td.w-name").text());
	if (confirm("是否确认删除该复习备考插件(" + name + ")?")) {
		ReviewPluginDS.deleteReviewPlugin(id, function(data){
			if (data) {
				alert("删除复习备考插件(" + name + ")成功!");
				doReviewPluginList(1);
			}
		});
	}
}

function hrefManage(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("reviewpluginmanage", "知识点管理", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["reviewpluginmanage"], "?id=" + id);
}

function hrefAdd() {
	if (!haveRight("reviewplugin.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("reviewpluginadd", "新增复习备考插件");
	if (idx == -1)
		return;
	parent.frames["reviewpluginadd"].doReviewPluginBeforeAdd();
}

var reviewPluginForm = new autoForm("#frmReviewPlugin");

function initReviewPluginAdd() {
	$("#txtJpg").uploadify({
		"uploader" : "../../uploadify?type=reviewplugin",
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
			var newimg = getWebAddr("/html/") + "/uploadify/reviewplugin/" + decodeURI(data);
			if (img && newimg != img) {
				img = img.substr(img.lastIndexOf("/") + 1);
				ReviewPluginDS.deleteReviewPluginFile("reviewplugin", img, function(code) {
					// do nothing;
				});
			}
			$("#txtImg").val(newimg);
		},
		"onUploadError": function(file, errorCode, errorMsg){
			alert("文件" + file.name + "上传失败!");
		}
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
	
	$("#btnSubmit").click(function(){
		doReviewPluginAdd();
	});
	reviewPluginForm.readonly("#txtImg");
	doReviewPluginBeforeAdd();
}

function doReviewPluginBeforeAdd() {
	var reviewplugin = {};
	reviewplugin.name = "";
	reviewplugin.type = "1";
	reviewplugin.begintime = "";
	reviewplugin.endtime = "";
	reviewPluginForm.init(reviewplugin);
}

function doReviewPluginAdd() {
	if (!reviewPluginForm.valid()) {
		return false;
	}
	var reviewplugin = reviewPluginForm.toBean();
	var dt = reviewplugin.begintime;
	reviewplugin.begintime = new Date(dt);
	dt = reviewplugin.endtime;
	reviewplugin.endtime = new Date(dt);
	ReviewPluginDS.addReviewPlugin(reviewplugin, function(data) {
		if (data) {
			alert("新增复习备考插件成功!");
			parent.removeTab("reviewpluginadd");
		}
	});
}

function initReviewPluginUpdate() {
	$("#txtJpg").uploadify({
		"uploader" : "../../uploadify?type=reviewplugin",
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
			var newimg = getWebAddr("/html/") + "/uploadify/reviewplugin/" + decodeURI(data);
			if (img && newimg != img) {
				img = img.substr(img.lastIndexOf("/") + 1);
				ReviewPluginDS.deleteReviewPluginFile("reviewplugin", img, function(code) {
					// do nothing;
				});
			}
			$("#txtImg").val(newimg);
		},
		"onUploadError": function(file, errorCode, errorMsg){
			alert("文件" + file.name + "上传失败!");
		}
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
	
	$("#btnSubmit").click(function(){
		doReviewPluginUpdate();
	});
	reviewPluginForm.readonly("#txtImg");
	var id = getArgFromHref("id");
	doReviewPluginBeforeUpdate(id);
}

function doReviewPluginBeforeUpdate(id) {
	ReviewPluginDS.getReviewPlugin(id, function(data){
		if (data) {
			data.begintime = getTime("dt8f", data.begintime);
			data.endtime = getTime("dt8f", data.endtime);
			reviewPluginForm.init(data);
		}
	});
}

function doReviewPluginUpdate() {
	if (!reviewPluginForm.valid()) {
		return;
	}
	var reviewplugin = reviewPluginForm.toBean();
	var dt = reviewplugin.begintime;
	reviewplugin.begintime = new Date(dt);
	dt = reviewplugin.endtime;
	reviewplugin.endtime = new Date(dt);
	ReviewPluginDS.updateReviewPlugin(reviewplugin, function(data) {
		if (data) {
			alert("修改复习备考插件信息成功!");
			parent.removeTab("reviewpluginupdate");
		}
	});
}

function initReviewPluginManage() {
	$("#divTip").dialog({
		autoOpen: false,
		height: 300,
		width: 550,
		modal: true,
		buttons: {}
	});
	
	$("button[name=btnSubmit]").click(function(){
		hrefReviewCardAdd();
	});
	$("button[name=btnOrder]").click(function(){
		hrefReviewCardOrder();
	});
	reviewPluginForm.readonly();
	
	var id = getArgFromHref("id");
	doReviewPluginBeforeManage(id);
}

function doReviewPluginBeforeManage(id) {
	ReviewPluginDS.getReviewPlugin(id, function(data){
		if (data) {
			$("#txtPluginid").val(data.id);
			$("#txtType").val(data.type);
			$("#txtName").val(data.name);
			$("#txtTypeintro").val(dictType[data.type]);
			$("#txtBegintime").val(getTime("dt8f", data.begintime));
			$("#txtEndtime").val(getTime("dt8f", data.endtime));
			
			//if (data.type == "2")
				$("button[name=btnOrder]").show();
			buildReviewCardTh();
			doReviewCardListBeforeManage(data.id);
		}
	});
}

function buildReviewCardTh() {
	$("#tblReviewCard").empty();
	var atr = "<tr bgcolor=\"#cccccc\">";
	//if ($("#txtType").val() == "2") {
		atr += "<td align=\"center\" class=\"w-sort\">排序</td>";
		atr += "<td align=\"center\" class=\"w-sn\">序号</td>";
	//}
	atr += "<td align=\"center\">标题</td>";
	atr += "<td align=\"center\">内容</td>";
	atr += "<td align=\"center\">操作</td>";
    atr += "</tr>";
	$("#tblReviewCard").append(atr);
}

function doReviewCardListBeforeManage(pluginid) {
	var reviewcard = {};
	reviewcard.pluginid = pluginid;
	ReviewCardDS.findAllReviewCards(reviewcard, function(data) {
		if (data) {
			$("#tblReviewCard").find("tr").eq(0).nextAll().remove();
			for (var i=0; i<data.length; i++) {
				buildReviewCardTr(data[i]);
			}
		}
	});
}

function buildReviewCardTr(data) {
	var atr = "<tr>";
	//if ($("#txtType").val() == "2") {
		atr += "<td align=\"center\">" +
			"<a href=\"###\" onclick=\"hrefReviewCardUp(this);return false;\">" +
			"<img src=\"../../css/former/images/arrowUp.gif\" title=\"上移\" width=\"16\" height=\"16\"/></a>&nbsp;" +
			"<a href=\"###\" onclick=\"hrefReviewCardDown(this);return false;\">" +
			"<img src=\"../../css/former/images/arrowDown.gif\" title=\"下移\" width=\"16\" height=\"16\"/></a>&nbsp;";
		atr += "<td align=\"center\" class=\"w-sn\">" + data.sn + "&nbsp;</td>";
	//}
	atr += "<td align=\"center\" class=\"w-title\">" + data.title + "&nbsp;</td>";
	atr += "<td align=\"center\" class=\"w-content\">" + omit(data.content, "") + "&nbsp;</td>";
	atr += "<td align=\"center\" nowrap>"
		+ "<a href=\"###\" onclick=\"hrefReviewCardUpdate(this);return false;\">" 
		+ "<img src=\"../../css/former/images/edit.gif\" title=\"修改\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;" 
		+ "<a href=\"###\" onclick=\"hrefReviewCardDelete(this);return false;\">" 
		+ "<img src=\"../../css/former/images/del.gif\" title=\"删除\" width=\"16\" height=\"16\"/></a>" 
		+ "<label style=\"display:none;\">" + data.id + "<label>&nbsp;</td>";
	$("#tblReviewCard").append(atr);
}

function hrefReviewCardOrder() {
	var ids = [];
	$("#tblReviewCard").find("tr:gt(0)").each(function() {
		ids.push($.trim($(this).find("td:last").find("label:first").text()));
	});
	ReviewCardDS.applyReviewCardOrder(ids, function(data) {
		if (data) {
			alert("保存知识点排序成功!");
			doReviewCardListBeforeManage($("#txtPluginid").val());
		}
	});
}

function hrefReviewCardUp(obj) {
	var tr = obj.parentNode.parentNode;
	if ($(tr).prev().prev().is("tr")) {
		$(tr).prev().before($(tr).remove());
	}
}

function hrefReviewCardDown(obj) {
	var tr = obj.parentNode.parentNode;
	if ($(tr).next().is("tr"))	 {
		$(tr).next().after($(tr).remove());
	}
}

/**
 * 废弃，在都排序的情况由sql自主处理
 */
function getReviewCardMaxSn() {
	// 阅读式不排序
	//if ($("#txtType").val() == "1") 
	//	return -1;
		
	var maxsn = 0;
	$("#tblReviewCard").find("td.w-sn").each(function() {
		var sn = parseInt($.trim($(this).text()));
		if (sn > maxsn)
			maxsn = sn;
	});
	return maxsn;
}

function hrefReviewCardUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td:last").find("label:first").text());
	var idx = parent.addTab("reviewcardupdate", "修改知识点信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["reviewcardupdate"], "?id=" + id);
}

function hrefReviewCardDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td:last").find("label:first").text());
	var title = $.trim($(tr).find("td.w-title").text());
	if (confirm("是否确认删除该知识点(" + title + ")?")) {
		ReviewCardDS.deleteReviewCard(id, function(data){
			if (data) {
				$(tr).remove();
			}
		});
	}
}

function hrefReviewCardAdd() {
	var pluginid = $("#txtPluginid").val();
	var idx = parent.addTab("reviewcardadd", "添加知识点", "?pluginid=" + pluginid);
	if (idx == -1)
		return;
	parent.frames["reviewcardadd"].doReviewCardBeforeAdd(pluginid);
}

var reviewCardForm = new autoForm("#frmReviewCard");

function initReviewCardAdd() {
	$("#btnSubmit").click(function(){
		doReviewCardAdd();
	});
	$("#taContent").ckeditor();
	
	var pluginid = getArgFromHref("pluginid");
	doReviewCardBeforeAdd(pluginid);
}

function doReviewCardBeforeAdd(pluginid) {
	var reviewcard = {};
	reviewcard.pluginid = pluginid;
	reviewcard.title = "";
	reviewcard.content = "";
	reviewCardForm.init(reviewcard);
}

function doReviewCardAdd() {
	if (!reviewCardForm.valid()) {
		return false;
	}
	var reviewcard = reviewCardForm.toBean();
	ReviewCardDS.addReviewCard(reviewcard, function(data) {
		if (data) {
			alert("添加知识点成功!");
			parent.frames["reviewpluginmanage"].doReviewCardListBeforeManage(reviewcard.pluginid);
			parent.removeTab("reviewcardadd");
		}
	});
}

function initReviewCardUpdate() {
	$("#btnSubmit").click(function(){
		doReviewCardUpdate();
	});
	$("#taContent").ckeditor();
	
	var id = getArgFromHref("id");
	doReviewCardBeforeUpdate(id);
}

function doReviewCardBeforeUpdate(id) {
	ReviewCardDS.getReviewCard(id, function(data){
		if (data) {
			reviewCardForm.init(data);
		}
	});
}

function doReviewCardUpdate() {
	if (!reviewCardForm.valid()) {
		return false;
	}
	var reviewcard = reviewCardForm.toBean();
	ReviewCardDS.updateReviewCard(reviewcard, function(data) {
		if (data) {
			alert("修改知识点信息成功!");
			parent.frames["reviewpluginmanage"].doReviewCardListBeforeManage(reviewcard.pluginid);
			parent.removeTab("reviewcardupdate");
		}
	});
}