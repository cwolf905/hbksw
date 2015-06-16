
var dictCharge = {"0":"否", "1":"是"};
var dictIsdefault = {"0":"否", "1":"是"};
var dictRecommend = {"0":"否", "1":"是"};
var dictPluginStatus = {"0":"未发布 ","1":"发布审核中", "2":"已提交", "3":"已撤销", "5":"下架审核中", "6":"已发布"};//未提交 0; 发布审核中 1; 已提交 2; 已撤销 3; 全部 4; 下架审核中 5; 审核通过 6;
var dictPluginType = {"0":"阅读式", "1":"关卡式", "2":"其它", "-1":"其它"};

function initPluginList() {
//	$("#divPlugin").dialog({
//		autoOpen: false,
//		height: 270,
//		width: 350,
//		modal: true,
//		buttons: {}
//	});
//	$("#divPlugin #txtBegintime,#txtExpirydate").datepicker({
//		dateFormat : "yy-mm-dd",
//		changeMonth : true,
//		changeYear : true,
//		showButtonPanel : true,
//		showOn : "both",
//		buttonImage : "../../jquery/calendar3.gif",
//		buttonImageOnly : true,
//		beforeShow : function (i, e) {
//			var z = jQuery(i).closest(".ui-dialog").css("z-index") + 1;
//			e.dpDiv.css("z-index", z);
//		}
//	}).css("ime-mode", "disabled");
//	$("#divPlugin #btnSubmit").click(function() {
//		doPluginDefault();
//	});
//	$("#divPlugin #txtId").attr("readonly", true);
//	$("#divPlugin #txtBegintime").attr("readonly", true);
//	$("#divPlugin #txtExpirydate").attr("readonly", true);
	
	$("#divTip").dialog({
		autoOpen: false,
		height: 550,
		width: 550,
		modal: true,
		buttons: {}
	});
	$("#searchconds button").click(function() {
		doPluginList(1);
	});
	doPluginList(1);
}

function doPluginAll() {
	$("#txtName").val("");
	$("#pstatus").val(9);
	doPluginList(1);
}

function doPluginList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	var name = $("#txtName").val();
	var pstatus = $("#pstatus").val();
	var plugin = {};
	plugin.name = name;
	plugin.pluginStatus = pstatus;
	plugin.pagestart = (page - 1) * sysPageSize;
	plugin.pagesize = sysPageSize;
	PluginDS.countPlugins(plugin, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		PluginDS.findPluginsByPage(plugin, function(data) {
			if (!data) 
				return;
			for (var i=0; i<data.length; i++) {
				var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].name + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].provider + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-pluginStatus\">" 
					+ getPluginStatus(data[i].pluginStatus) + "&nbsp;</td>";
				atr += "<td align=\"left\">" + omit(data[i].description, "") + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-pluginType\">" 
					+ getPluginType(data[i].pluginType) + "&nbsp;</td>";
				atr += "<td align=\"center\">" + dictCharge[data[i].isfee] + "&nbsp;</td>";
				atr += "<td align=\"center\"><img src=\"" 
					+ data[i].img + "\" width=\"32\" height=\"32\"/>&nbsp;</td>";
//				atr += "<td align=\"center\">" + data[i].fee + "&nbsp;</td>";
//				atr += "<td align=\"center\">" + omit(data[i].chargeremark, "") + "&nbsp;</td>";
//				atr += "<td align=\"center\">" + data[i].favor + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-isdefault\">" 
					+ getIsDefaultTd(data[i].isdefault) + "&nbsp;</td>";
//				atr += "<td align=\"center\" class=\"w-begintime\">" 
//					+ getTime("dt8f", data[i].begintime, true) + "&nbsp;</td>";
				/*atr += "<td align=\"center\" class=\"w-expirydate\">" 
					+ getTime("dt8f", data[i].expirydate, true) + "&nbsp;</td>";*/
				atr += "<td align=\"center\" class=\"w-recommend\">" 
					+ getRecommendTd(data[i].recommend) + "&nbsp;</td>";
				atr += "<td align=\"left\" style=\"padding-left:50px;\" nowrap>" + getActionTd(data[i].isdefault, data[i].recommend, data[i].isfee, data[i].pluginStatus,data[i].name,data[i].pluginType,data[i].templateId) + "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doPluginList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function getPluginType(pluginType) {
	var atd = "";
	atd += (pluginType == 0 ? "" : "<span style=\"color:red;\">")
		+ dictPluginType[pluginType] 
		+ (pluginType == 0 ? "" : "</span>");
	atd += "<label style=\"display:none\">" + pluginType + "</label>";
	return atd;
}

function getPluginStatus(pluginStatus) {
	var atd = "";
	atd += (pluginStatus == 0 ? "" : "<span style=\"color:red;\">")
		+ dictPluginStatus[pluginStatus] 
		+ (pluginStatus == 0 ? "" : "</span>");
	atd += "<label style=\"display:none\">" + pluginStatus + "</label>";
	return atd;
}

function getIsDefaultTd(isdefault) {
	var atd = "";
	atd += (isdefault == 0 ? "" : "<span style=\"color:red;\">")
		+ dictIsdefault[isdefault] 
		+ (isdefault == 0 ? "" : "</span>");
	atd += "<label style=\"display:none\">" + isdefault + "</label>";
	return atd;
}

function getRecommendTd(recommend) {
	var atd = "";
	atd += (recommend == 0 ? "" : "<span style=\"color:red;\">")
		+ dictRecommend[recommend] 
		+ (recommend == 0 ? "" : "</span>");
	atd += "<label style=\"display:none\">" + recommend + "</label>";
	return atd;
}

function getActionTd(isdefault, recommend, isfee, pluginStatus,name,pluginType,templateId) {
	var rok = false;
	var atd = "";
	rok = haveRight("plugin.update");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	rok = haveRight("plugin.check");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefRecommend(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/" 
		+ (recommend == 0 ? "recommend" : "cancleRecommend") 
		+ (rok ? "" : "2") + ".png\" title=\"" + (rok ? "" : "不可") 
		+ (recommend == 0 ? "推荐" : "取消推荐")
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	if(pluginStatus==1){
		rok = haveRight("plugin.update") && (pluginStatus == "1");
		atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefReview(this,'"+pluginType+"','"+name+"');return false;\">" : ">")
			+ "<img src=\"../../css/former/images/" 
			+ (pluginStatus == 1 ? "review" : "down")
			+ (rok ? "" : "2") + ".png\" title=\"" + (rok ? "" : "不可") 
			+ (pluginStatus == 1 ? "审核" : "取消审核")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	}
	rok = haveRight("plugin.check") && (pluginStatus != "3");
	atd += "<a href=\"#\"" + " onclick=\"hrefStatus1(this);return false;\">"
		+ "<img src=\"../../css/former/images/" 
		+ (pluginStatus != 3 ? "revoke" : "cancleRevoke") 
		+ ".png\" title=\""
		+ (pluginStatus != 3 ? "撤销" : "取消撤销")
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	/*
	rok = haveRight("plugin.check");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefpluginStatus(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/" 
		+ (pluginStatus == 0 ? "up" : "down") 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "" : "不可") 
		+ (pluginStatus == 0 ? "待发布" : "待下架")
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	rok = haveRight("plugin.check");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefDefault(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/" 
		+ (isdefault == 0 ? "check" : "del") 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "" : "不可") 
		+ (isdefault == 0 ? "设置默认插件" : "取消默认插件")
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";*/
	rok = haveRight("plugin.manage");
	atd += "<a href=\"###\"" + (rok ? " onclick=\"hrefManage(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/picture" 
		+ (rok ? "" : "2") + ".png\" title=\"" + (rok ? "插件图片管理" : "不可管理插件图片") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("plugin.manage2") && (isfee == "1");
	atd += "<a href=\"###\"" + (rok ? " onclick=\"hrefManage2(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/priceControl" 
		+ (rok ? "" : "2") + ".png\" title=\"" + (rok ? "插件价格管理" : "不可管理插件价格") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("plugin.manage");
	if(templateId == "College" || templateId == "Information")
	{
		atd += "<a href=\"###\"" + (true ? " onclick=\"hrefTemplate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/blocking" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (true ? "插件模块化定义" : "不可插件模块化定义") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	}
//	if(pluginType == -1)
//	{
//		atd += "<a href=\"#\"" + " onclick=\"hrefDelete(this);return false;\">"
//		+ "<img src=\"../../css/former/images/del.gif\" title='删除' width=\"16\" height=\"16\"/></a>&nbsp;";
//	}
	return atd;
}

function hrefDelete(obj)
{
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	
	if(confirm("确定删除此插件？"))
	{
		PluginDS.deletePluginById(id, function(data){
			if(data)
			{
				alert("插件删除成功");
				doPluginList(1);
				parent.parent.frames["menu"].location.reload();
			}
		});
	}
}

function hrefTemplate(obj)
{
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("pluginTemplateTab", "定义插件模块化信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pluginTemplateTab"], "?id=" + id);
}

function hrefUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("pluginupdate", "修改插件信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pluginupdate"], "?id=" + id);
}


function hrefpluginStatus(obj) {
	var tr = obj.parentNode.parentNode;
	var id = parseInt($.trim($(tr).find("td").eq(0).text()));
	var pluginstatus = 1- parseInt($.trim($(tr).find("td.w-pluginStatus").find("label").text()));
	var plugin = {};
	plugin.id = id;
	plugin.pluginStatus = pluginstatus;
	PluginDS.applyPluginStatus(plugin, function(data) {
		if (data) {
			alert((pluginstatus == 0 ? "待下架" : "待发布") + "成功!");
			$(tr).find("td.w-pluginStatus").html(getPluginStatus(pluginstatus));
			$(tr).find("td:last").find("img").eq(1)
				.attr("src", "../../css/former/images/"
					+ (pluginstatus == 0 ? "up.gif" : "down.gif"))
				.attr("title", (pluginstatus == 0 ? "待下架" : "待发布"));
		}
	});
}

function hrefDefault(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var isdefault = 1 - parseInt($.trim($(tr).find("td.w-isdefault").find("label").text()));
//	if (isdefault == 0) {
//		$("#frmPlugin #txtId").val(id);
//		$("#divPlugin").dialog("open");
//		return false;
//	}
	var plugin = {};
	plugin.id = id;
	plugin.isdefault = isdefault;
	PluginDS.applyPluginDefault(plugin, function(data) {
		if (data) {
			alert((isdefault == 0 ? "取消" : "设置") + "系统插件成功!");
			$(tr).find("td.w-isdefault").html(getIsDefaultTd(isdefault));
//			$(tr).find("td.w-begintime").html("&nbsp;");
//			$(tr).find("td.w-expirydate").html("&nbsp;");
			$(tr).find("td:last").find("img").eq(1)
				.attr("src", "../../css/former/images/" 
					+ (isdefault == 0 ? "check.gif" : "del.gif"))
				.attr("title", (isdefault == 0 ? "设置" : "取消") + "系统插件");
		}
	});
}

function hrefRecommend(obj) {
	var tr = obj.parentNode.parentNode;
	var id = parseInt($.trim($(tr).find("td").eq(0).text()));
	var recommend = 1- parseInt($.trim($(tr).find("td.w-recommend").find("label").text()));
	var plugin = {};
	plugin.id = id;
	plugin.recommend = recommend;
	PluginDS.applyPluginRecommend(plugin, function(data) {
		if (data) {
			alert((recommend == 0 ? "取消推荐" : "推荐") + "成功!");
			$(tr).find("td.w-recommend").html(getRecommendTd(recommend));
			$(tr).find("td:last").find("img").eq(1)
				.attr("src", "../../css/former/images/" 
					+ (recommend == 0 ? "recommend.png" : "cancleRecommend.png"))
				.attr("title", (recommend == 0 ? "推荐" : "取消推荐"));
		}
	});
}

function hrefStatus(obj,name) {
	var tr = obj.parentNode.parentNode;
	var id = parseInt($.trim($(tr).find("td").eq(0).text()));
	var plugin = {};
	plugin.id = id;
	plugin.pluginStatus = 6;
	alert("确定审核'"+name+"'吗？");
	PluginDS.applyPluginStatus(plugin, function(data) {
		if (data) {
			alert("审核成功！");
			parent.callRefresh("pluginnewadd");
		}
	});
}

function hrefStatus1(obj) {
		var tr = obj.parentNode.parentNode;
		var id = parseInt($.trim($(tr).find("td").eq(0).text()));
		var pluginstatus = parseInt($.trim($(tr).find("td.w-pluginStatus").find("label").text()));
		var plugin = {};
		plugin.id = id;
		if(pluginstatus !=3){
			plugin.pluginStatus = 3;
		}
		if(pluginstatus ==3){
			plugin.pluginStatus = 1;
		}
	if (confirm("是否确认" + (pluginstatus == 3 ? "取消撤销" : "撤销") + "该插件?")) {
		PluginDS.applyPluginStatus(plugin, function(data) {
			if (data) {
				alert((pluginstatus == 3 ? "取消撤销" : "撤销") + "成功!");
				parent.callRefresh("pluginnewadd");
			}
		});
	}
}

function hrefManage(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("pluginmanage", "插件图片管理", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pluginmanage"], "?id=" + id);
}

function hrefManage2(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("pluginfee", "插件价格管理", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pluginfee"], "?id=" + id);
}

var pluginForm = new autoForm("#frmPlugin");
var addpluginForm = new autoForm("#addfrmPlugin");

//function doPluginDefault() {
//	if (!pluginForm.valid()) {
//		return false;
//	}
//	var plugin = pluginForm.toBean();
//	var dt1 = plugin.begintime;
//	plugin.begintime = new Date(dt1);
//	var dt2 = plugin.expirydate;
//	plugin.expirydate = new Date(dt2);
//	plugin.isdefault = 1;
//	PluginDS.applyPluginDefault(plugin, function(data) {
//		if (data) {
//			$("#showlists").find("tr").each(function() {
//				var id =$.trim($(this).find("td").eq(0).text());
//				if (id == plugin.id) {
//					$(this).find("td.w-isdefault").html(getIsDefaultTd(1));
//					$(this).find("td.w-begintime").html(dt1 + "&nbsp;");
//					$(this).find("td.w-expirydate").html(dt2 + "&nbsp;");
//					$(this).find("td:last").find("img").eq(1)
//						.attr("src", "../../css/former/images/del.gif")
//						.attr("title", "取消默认插件");
//				}
//			});
//			$("#divPlugin").dialog("close");
//		}
//	});
//}

function initPluginUpdate() {
	$("#txtJpg").uploadify({
		"uploader" : "../../uploadify?type=plugin",
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
			var newimg = getWebAddr("/html/") + "/uploadify/plugin/" + decodeURI(data);
			if (img && newimg != img) {
				img = img.substr(img.lastIndexOf("/") + 1);
				PluginDS.deletePluginFile("plugin", img, function(code) {
					// do nothing;
				});
			}
			$("#txtImg").val(newimg);
		},
		"onUploadError": function(file, errorCode, errorMsg){
			alert("文件" + file.name + "上传失败!");
		}
	});
	
//	$("#txtBegintime,#txtExpirydate").datepicker({
	$("#txtBegintime,#txtExpirydate").datepicker({
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
	
	$("#btnSubmit").click(function(){
		doPluginUpdate();
	});
	pluginForm.readonly("#txtImg");
	var id = getArgFromHref("id");
	doPluginBeforeUpdate(id);
}

function doPluginBeforeUpdate(id) {
	initSelectArea();
	PluginDS.getPlugin(id, function(data){
		if (data) {
			$("#txtName").val(data.name);
			$("#txtImg").val(data.img);
			$("#dictExamTypeSelect").val(data.examtype);
			$("#pluginTemplateSelect").val(data.templateId);
			if(data.isdefault==1){
				$("#default_yes").attr("checked",true);
			}else if(data.isdefault==0){
				$("#default_no").attr("checked",true);
			}
			if(data.isfee==1){
				$("#isfee_yes").attr("checked",true);
			}else if(data.isfee==0){
				$("#isfee_no").attr("checked",true);
			}
			if(data.begintime==null){
				$("#txtBegintime").val();
			}else{
				$("#txtBegintime").val(getTime("dt8f", data.begintime));
			}
			if(data.recommend==1){
				$("#recommend_yes").attr("checked",true);
			}else if(data.recommend==0){
				$("#recommend_no").attr("checked",true);
			}
			$("#taDescription").val(data.description);
			
			//pluginForm.readonly("#txtName");
		}
	});
}

function doPluginUpdate() {
	if (!pluginForm.valid()) {
		return;
	}
	/*var plugin = pluginForm.toBean();
//	if (plugin.charge == "0") {
//		plugin.fee = 0;
//		plugin.chargeremark = undefined;
//	}
	if (plugin.isdefault == "0") {
		plugin.begintime = undefined;
		plugin.expirydate = undefined;
	} else {
		var dt1 = plugin.begintime;
		plugin.begintime = new Date(dt1);
		var dt2 = plugin.expirydate;
		plugin.expirydate = new Date(dt2);
	}*/
		var plugin={};
		
		var description = $("#taDescription").val();
		if(description.length > 255)
		{
			alert("插件简介长度超长，请输入少于255个字符");return;
		}
		var pluginCategoryId = "";
		$("a[name='savetype']").each(function(){
			var select = $(this).attr("categoryId");
			pluginCategoryId += select + ",";
		});
		var pluginTagId = "";
		$("a[name='savelabel']").each(function(){
			var select = $(this).attr("tagId");
			pluginTagId += select + ",";
		});
		
		plugin.id = getArgFromHref("id");;
		plugin.name = $("#txtName").val();
		plugin.img = $("#txtImg").val();
		plugin.isdefault = $("input[name='radIsdefault']:checked").val();
		plugin.isfee =  $("input[name='radIsfee']:checked").val();
		var dt = $("#txtBegintime").val();
		plugin.begintime = dt?new Date(dt):null;
		plugin.recommend = $("input[name='radRecommend']:checked").val();
		plugin.description = description;
		plugin.pluginTagId = pluginTagId;
		plugin.pluginCategoryId = pluginCategoryId;
//		plugin.examtype = $("#dictExamTypeSelect").val();
//		plugin.templateId = $("#pluginTemplateSelect").val();
	
	PluginDS.updatePlugin(plugin, function(data) {
		if (data) {
			alert("修改插件信息成功!");
			parent.removeTab("pluginupdate");
		}
	});
}

/*************插件图片管理****************/

function initPluginManage() {	
	$("button[name=btnSubmit]").click(function(){
		hrefPluginPictureAdd();
	});
	
	var id = getArgFromHref("id");
	doPluginBeforeManage(id);
}

function doPluginBeforeManage(id) {
	PluginDS.getPlugin(id, function(data){
		if (data) {
			$("#txtPluginid").val(data.id);
			$("#txtName").val(data.name);
			$("#txtBegintime").val(getTime("dt8f", data.begintime));
			$("#txtExpirydate").val(getTime("dt8f", data.expirydate));
			pluginForm.readonly();
			
			buildPluginPictureTh();
			doPluginPictureListBeforeManage(data.id);
		}
	});
}

function buildPluginPictureTh() {
	$("#tblPluginPicture").empty();
	var atr = "<tr bgcolor=\"#cccccc\">";
	atr += "<td align=\"center\" width=\"15%\">序号</td>";
	atr += "<td align=\"center\">图片</td>";
	atr += "<td align=\"center\" width=\"15%\">操作</td>";
    atr += "</tr>";
	$("#tblPluginPicture").append(atr);
}

function doPluginPictureListBeforeManage(pluginid) {
	var pluginpicture = {};
	pluginpicture.pluginid = pluginid;
	PluginPictureDS.findAllPluginPictures(pluginpicture, function(data) {
		if (data) {
			$("#tblPluginPicture").find("tr").eq(0).nextAll().remove();
			for (var i=0; i<data.length; i++) {
				buildPluginPictureTr(data[i]);
			}
		}
	});
}

function buildPluginPictureTr(data) {
	var atr = "<tr>";
	atr += "<td align=\"center\" class=\"w-id\">" + data.id + "&nbsp;</td>";
	atr += "<td align=\"center\" class=\"w-picture\"><img style='width:100px; heigth:30px;' src=\"" + data.picture + "\"/>&nbsp;</td>";
	atr += "<td align=\"center\" nowrap>"
		+ "<a href=\"###\" onclick=\"hrefPluginPictureUpdate(this);return false;\">" 
		+ "<img src=\"../../css/former/images/edit.gif\" title=\"修改\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;" 
		+ "<a href=\"###\" onclick=\"hrefPluginPictureDelete(this);return false;\">" 
		+ "<img src=\"../../css/former/images/del.gif\" title=\"删除\" width=\"16\" height=\"16\"/></a>&nbsp;</td>";
	$("#tblPluginPicture").append(atr);
}

function hrefPluginPictureUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td.w-id").text());
	var idx = parent.addTab("pluginpictureupdate", "修改图片", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pluginpictureupdate"], "?id=" + id);
}

function hrefPluginPictureDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td.w-id").text());
	var img = $.trim($(tr).find("td.w-picture").find("img").attr("src"));
	if (confirm("是否确认删除该图片(" + id + ")?")) {
		PluginPictureDS.deletePluginPicture(id, function(data){
			if (data) {
				$(tr).remove();
				img = img.substr(img.lastIndexOf("/") + 1);
				PluginPictureDS.deletePluginPictureFile("pluginpicture", img, function(code) {
					// do nothing;
				});
			}
		});
	}
}

function hrefPluginPictureAdd() {
	var pluginid = $("#txtPluginid").val();
	var idx = parent.addTab("pluginpictureadd", "添加插件图片", "?pluginid=" + pluginid);
	if (idx == -1)
		return;
	parent.frames["pluginpictureadd"].doPluginPictureBeforeAdd(pluginid);
}

var pluginPictureForm = new autoForm("#frmPluginPicture");

function initPluginPictureAdd() {
	$("#txtJpg").uploadify({
		"uploader" : "../../uploadify?type=pluginpicture",
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
			var newimg = getWebAddr("/html/") + "/uploadify/pluginpicture/" + decodeURI(data);
			if (img && newimg != img) {
				img = img.substr(img.lastIndexOf("/") + 1);
				PluginPictureDS.deletePluginPictureFile("pluginpicture", img, function(code) {
					// do nothing;
				});
			}
			$("#txtPicture").val(newimg);
		},
		"onUploadError": function(file, errorCode, errorMsg){
			alert("文件" + file.name + "上传失败!");
		}
	});
	
	$("#btnSubmit").click(function(){
		doPluginPictureAdd();
	});
	pluginPictureForm.readonly("#txtPicture");
	var pluginid = getArgFromHref("pluginid");
	doPluginPictureBeforeAdd(pluginid);
}

function doPluginPictureBeforeAdd(pluginid) {
	var pluginpicture = {};
	pluginpicture.pluginid = pluginid;
	pluginpicture.picture = "";
	pluginPictureForm.init(pluginpicture);
}

function doPluginPictureAdd() {
	if (!pluginPictureForm.valid()) {
		return false;
	}
	var pluginpicture = pluginPictureForm.toBean();
	PluginPictureDS.addPluginPicture(pluginpicture, function(data) {
		if (data) {
			alert("添加图片成功!");
			parent.frames["pluginmanage"].doPluginPictureListBeforeManage(pluginpicture.pluginid);
			parent.removeTab("pluginpictureadd");
		}
	});
}

function initPluginPictureUpdate() {
	$("#txtJpg").uploadify({
		"uploader" : "../../uploadify?type=pluginpicture",
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
			var newimg = getWebAddr("/html/") + "/uploadify/pluginpicture/" + decodeURI(data);
			if (img && newimg != img) {
				img = img.substr(img.lastIndexOf("/") + 1);
				PluginPictureDS.deletePluginPictureFile("pluginpicture", img, function(code) {
					// do nothing;
				});
			}
			$("#txtPicture").val(newimg);
		},
		"onUploadError": function(file, errorCode, errorMsg){
			alert("文件" + file.name + "上传失败!");
		}
	});
	
	$("#btnSubmit").click(function(){
		doPluginPictureUpdate();
	});
	pluginPictureForm.readonly("#txtPicture");
	var id = getArgFromHref("id");
	doPluginPictureBeforeUpdate(id);
}

function doPluginPictureBeforeUpdate(id) {
	PluginPictureDS.getPluginPicture(id, function(data){
		if (data) {
			pluginPictureForm.init(data);
		}
	});
}

function doPluginPictureUpdate() {
	if (!pluginPictureForm.valid()) {
		return false;
	}
	var pluginpicture = pluginPictureForm.toBean();
	PluginPictureDS.updatePluginPicture(pluginpicture, function(data) {
		if (data) {
			alert("修改图片成功!");
			parent.frames["pluginmanage"].doPluginPictureListBeforeManage(pluginpicture.pluginid);
			parent.removeTab("pluginpictureupdate");
		}
	});
}

/*************插件价格管理****************/

function initPluginManage2() {
	$("#divTip").dialog({
		autoOpen: false,
		height: 200,
		width: 550,
		modal: true,
		buttons: {}
	});
	$("button[name=btnSubmit]").click(function(){
		hrefPluginFeeAdd();
	});
	
	var id = getArgFromHref("id");
	doPluginBeforeManage2(id);
}

function doPluginBeforeManage2(id) {
	PluginDS.getPlugin(id, function(data){
		if (data) {
			$("#txtPluginid").val(data.id);
			$("#txtName").val(data.name);
			$("#txtBegintime").val(getTime("dt8f", data.begintime));
			$("#txtExpirydate").val(getTime("dt8f", data.expirydate));
			pluginForm.readonly();
			
			buildPluginFeeTh();
			doPluginFeeListBeforeManage2(data.id);
		}
	});
}

function buildPluginFeeTh() {
	$("#tblPluginFee").empty();
	var atr = "<tr bgcolor=\"#cccccc\">";
	atr += "<td align=\"center\" width=\"10%\">序号</td>";
	atr += "<td align=\"center\">Android价格</td>";
	atr += "<td align=\"center\">ios价格</td>";
	atr += "<td align=\"center\" width=\"20%\">收费说明</td>";
	atr += "<td align=\"center\">生效日期</td>";
	atr += "<td align=\"center\">失效日期</td>";
	atr += "<td align=\"center\" width=\"10%\">操作</td>";
    atr += "</tr>";
	$("#tblPluginFee").append(atr);
}

function doPluginFeeListBeforeManage2(pluginid) {
	var pluginfee = {};
	pluginfee.pluginid = pluginid;
	PluginFeeDS.findAllPluginFees(pluginfee, function(data) {
		if (data) {
			$("#tblPluginFee").find("tr").eq(0).nextAll().remove();
			for (var i=0; i<data.length; i++) {
				buildPluginFeeTr(data[i]);
			}
		}
	});
}

function buildPluginFeeTr(data) {
	var atr = "<tr>";
	atr += "<td align=\"center\" class=\"w-id\">" + data.id + "&nbsp;</td>";
	atr += "<td align=\"center\">" + data.androidfee + "元&nbsp;</td>";
	atr += "<td align=\"center\">" + data.iosfee + "元&nbsp;</td>";
	atr += "<td align=\"center\">" + omit(data.chargeremark, "") + "&nbsp;</td>";
	atr += "<td align=\"center\">" + getTime("dt8f", data.begintime) + "&nbsp;</td>";
	atr += "<td align=\"center\">" + getTime("dt8f", data.expirydate) + "&nbsp;</td>";
	atr += "<td align=\"center\" nowrap>"
		+ "<a href=\"###\" onclick=\"hrefPluginFeeUpdate(this);return false;\">" 
		+ "<img src=\"../../css/former/images/edit.gif\" title=\"修改\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;" 
		+ "<a href=\"###\" onclick=\"hrefPluginFeeDelete(this);return false;\">" 
		+ "<img src=\"../../css/former/images/del.gif\" title=\"删除\" width=\"16\" height=\"16\"/></a>&nbsp;</td>";
	$("#tblPluginFee").append(atr);
}

function hrefPluginFeeUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td.w-id").text());
	var idx = parent.addTab("pluginfeeupdate", "修改插件价格", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pluginfeeupdate"], "?id=" + id);
}

function hrefPluginFeeDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td.w-id").text());
	if (confirm("是否确认删除该价格(" + id + ")?")) {
		PluginFeeDS.deletePluginFee(id, function(data){
			if (data) {
				$(tr).remove();
			}
		});
	}
}

function hrefPluginFeeAdd() {
	var pluginid = $("#txtPluginid").val();
	var idx = parent.addTab("pluginfeeadd", "添加插件价格", "?pluginid=" + pluginid);
	if (idx == -1)
		return;
	parent.frames["pluginfeeadd"].doPluginFeeBeforeAdd(pluginid);
}

var pluginFeeForm = new autoForm("#frmPluginFee");

function initPluginFeeAdd() {
	$("#txtBegintime,#txtExpirydate").datepicker({
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
	
	$("#btnSubmit").click(function(){
		doPluginFeeAdd();
	});
	var pluginid = getArgFromHref("pluginid");
	doPluginFeeBeforeAdd(pluginid);
}

function doPluginFeeBeforeAdd(pluginid) {
	var pluginfee = {};
	pluginfee.pluginid = pluginid;
	pluginfee.androidfee = "";
	pluginfee.iosfee = "";
	pluginfee.chargeremark = "";
	pluginfee.begintime = "";
	pluginfee.expirydate = "";
	pluginFeeForm.init(pluginfee);
}

function doPluginFeeAdd() {
	if (!pluginFeeForm.valid()) {
		return false;
	}
	var pluginfee = pluginFeeForm.toBean();
	var dt1 = pluginfee.begintime;
	pluginfee.begintime = new Date(dt1);
	var dt2 = pluginfee.expirydate;
	pluginfee.expirydate = new Date(dt2);
	PluginFeeDS.addPluginFee(pluginfee, function(data) {
		if (data) {
			alert("添加插件价格成功!");
			parent.frames["pluginmanage2"].doPluginFeeListBeforeManage2(pluginfee.pluginid);
			parent.removeTab("pluginfeeadd");
		}
	});
}

function initPluginFeeUpdate() {
	$("#txtBegintime,#txtExpirydate").datepicker({
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
	
	$("#btnSubmit").click(function(){
		doPluginFeeUpdate();
	});
	var id = getArgFromHref("id");
	doPluginFeeBeforeUpdate(id);
}

function doPluginFeeBeforeUpdate(id) {
	PluginFeeDS.getPluginFee(id, function(data){
		if (data) {
			data.begintime = getTime("dt8f", data.begintime);
			data.expirydate = getTime("dt8f", data.expirydate);
			pluginFeeForm.init(data);
		}
	});
}

function doPluginFeeUpdate() {
	if (!pluginFeeForm.valid()) {
		return false;
	}
	var pluginfee = pluginFeeForm.toBean();
	var dt1 = pluginfee.begintime;
	pluginfee.begintime = new Date(dt1);
	var dt2 = pluginfee.expirydate;
	pluginfee.expirydate = new Date(dt2);
	PluginFeeDS.updatePluginFee(pluginfee, function(data) {
		if (data) {
			alert("修改插件价格成功!");
			parent.frames["pluginmanage2"].doPluginFeeListBeforeManage2(pluginfee.pluginid);
			parent.removeTab("pluginfeeupdate");
		}
	});
}

/**
 * add gaoxiang 插件列表
 */
function hrefType(status) {
	if(status==0){
		var idx = parent.addTab("pluginStatuslist", "待发布插件列表");
		if (idx == -1)
			return;
		parent.frames["pluginStatuslist"].initPluginStatusList();
	}
	if(status==1){
		var idx = parent.addTab("pluginStatuslist1", "待下架插件列表");
		if (idx == -1)
			return;
		parent.frames["pluginStatuslist1"].initPluginStatusList();
	}
}

/**
 * add gaoxiang 新增插件
 */
function hrefAdd() {
	/*if (!haveRight("mobileadnew.add")) {
		alert("相关操作的权限不足!");
		return;
	}*/
	
	var idx = parent.addTab("pluginnewadd", "新增插件");
	if (idx == -1)
		return;
	parent.frames["pluginnewadd"].doMobileAdNewBeforeAdd();
}

function doMobileAdNewBeforeAdd() {
	var pluginnew = {};
	addpluginForm.init();
	addpluginForm.readonly("#txtImg");
}


//add gaoxiang
function initPluginAdd() {
	$("#txtJpg").uploadify({
		"uploader" : "../../uploadify?type=plugin",
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
			var newimg = getWebAddr("/html/") + "/uploadify/plugin/" + decodeURI(data);
			if (img && newimg != img) {
				img = img.substr(img.lastIndexOf("/") + 1);
				PluginDS.deletePluginFile("plugin", img, function(code) {
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
	
	$("#btnSubmit").click(function(){
		if (!addpluginForm.valid()) {
			return false;
		}
		var plugin={};
		
		var pluginCategoryId = "";
		$("a[name='savetype']").each(function(){
			var select = $(this).attr("categoryId");
			pluginCategoryId += select + ",";
		});
		var pluginTagId = "";
		$("a[name='savelabel']").each(function(){
			var select = $(this).attr("tagId");
			pluginTagId += select + ",";
		});
		
		var description = $("#taDescription").val();
		if(description.length > 255)
		{
			alert("插件简介长度超长，请输入少于255个字符");return;
		}
		plugin.name = $("#txtName").val();
		plugin.img = $("#txtImg").val();
		plugin.isdefault = $("input[name='radIsdefault']:checked").val();
		plugin.isfee =  $("input[name='radIsfee']:checked").val();
		var dt = $("#txtBegintime").val();
		plugin.begintime = dt?new Date(dt):null;
		plugin.recommend = $("input[name='radRecommend']:checked").val();
		plugin.description = description;
		plugin.pluginTagId = pluginTagId;
		plugin.pluginCategoryId = pluginCategoryId;
		plugin.pluginStatus = 6;
		plugin.examtype = $("#dictExamTypeSelect").val();
		plugin.templateId = $("#pluginTemplateSelect").val();
		PluginDS.addPlugin(plugin, function(data) {
			if (data) {
				alert("新增插件成功!");
				parent.removeTab("pluginnewadd");
			}
		});
		//doPluginUpdate();
	});
	
	initPluginAddBeforeAdd();
	addpluginForm.readonly("#txtImg");
}

function initPluginAddBeforeAdd()
{
	
	initSelectArea();
}

/**
 * 初始化下拉框
 * @return
 */
function initSelectArea()
{

	PluginDS.findAllDictExamType(function(data){

		var supplierStr =" ";
//		supplierStr += "<option value='-1'>其他</option>";
		for ( var i = 0; i < data.length; i++) {
			supplierStr += "<option value='" +data[i].code + "'>"+ data[i].name + "</option>";
		}
		$("#dictExamTypeSelect").append(supplierStr);
	});
	
	PluginDS.findAllPluginTemplate(function(data){
		
		var supplierStr =" ";
		for ( var i = 0; i < data.length; i++) {
			supplierStr += "<option value='" +data[i].id + "'>"+ data[i].name + "</option>";
		}
		$("#pluginTemplateSelect").append(supplierStr);
	});
}

function addPluginTemplate()
{
	
	var templateId = $("#pluginTemplateSelect").val();
//	alert(templateId);
	var idx = parent.addTab("pluginTemplatexxx", "添加模版内容", "?templateId=" + templateId);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pluginTemplatexxx"], "?templateId=" + templateId);
}

function doPluginTemplateBeforeAdd()
{
	
}
	
function selecttype(pid,name) {
	var atr = "<a id='c_n_"+pid+"' title='"+name+"' href='javascript:void(0);' onclick=\"notselecttype('"+pid+"','"+name+"')\" name=\"savetype\" categoryId=\""+pid+"\"><span>"+name+"</span><em></em></a>";
	//var atr = "<input style='width:"+name.length*15+"px;' name=\"savetype\" class=\"n_ptype\" categoryId=\""+pid+"\" onclick=\"notselecttype('"+pid+"','"+name+"')\" id=c_n_"+pid+" value="+name+"></input>";
	$("#c_"+pid).remove();
	$("#saveplugintype").append(atr);
}

function selectlabel(pid,name) {
	var atr = "<a id='t_n_"+pid+"' title='"+name+"' href='javascript:void(0);' onclick=\"notselectlabel('"+pid+"','"+name+"')\" name=\"savelabel\" tagId=\""+pid+"\"><span>"+name+"</span><em></em></a>";
	//var atr = "<input style='width:"+name.length*15+"px;' name=\"savelabel\" class=\"n_plabel\" tagId=\""+pid+"\" onclick=\"notselectlabel('"+pid+"','"+name+"')\" id=t_n_"+pid+" value="+name+"></input>";
	$("#t_"+pid).remove();
	$("#savepluginlabel").append(atr);
}

function notselecttype(pid,name) {
	var atr = "<a id='c_"+pid+"' title='"+name+"' href='javascript:void(0);' onclick=\"selecttype('"+pid+"','"+name+"')\"><span>"+name+"</span><em></em></a>";
	//var atr = "<input style='width:"+name.length*15+"px;' class=\"ptype\" onclick=\"selecttype('"+pid+"','"+name+"')\" id=c_"+pid+" value="+name+"></input>";
	$("#c_n_"+pid).remove();
	$("#plugintype").append(atr);
}

function notselectlabel(pid,name) {
	var atr = "<a id='t_"+pid+"' title='"+name+"' href='javascript:void(0);' onclick=\"selectlabel('"+pid+"','"+name+"')\"><span>"+name+"</span><em></em></a>";
	//var atr = "<input style='width:"+name.length*15+"px;' class=\"plabel\" onclick=\"selectlabel('"+pid+"','"+name+"')\" id=t_"+pid+" value="+name+"></input>";
	$("#t_n_"+pid).remove();
	$("#pluginlabel").append(atr); 
}

var j =0;
function addBuyWayAsMonth(){
	j++
	var atr = "<div>";
	//atr += "<input type='text' size='2' name='buyWayMonth'/>个月<input type='text' size='5' name='buyWayMonthPrice' />元";
	atr += "<input type='text' size='2' name='buyWayMonth'/>个月";
	atr +="<select id='dd"+j+"'><option value='-1' selected=''>--请选择价格--</option></select>"
	atr += "<span style='color: red' onclick='deleteBuyWayAsMonth(this)'>—</span>";
	atr += "</div>";
	$("#buyWayByMonth").append(atr);
	//何鹏 s
	PluginPackageDS.findPrices( function(data){
		var str ="";
		for(var i=0;i<data.length;i++){
			str += "<option value='"+data[i].price+"'>"+data[i].price+"元"+" </option>";
		}
		$("#dd"+j+"").append(str);
	});
	//何鹏 e
	
}

function deleteBuyWayAsMonth(obj){
	var parentNode = obj.parentNode;
	var childs = parentNode.childNodes;    
	for(var i = childs.length-1;i >= 0;i--)
	{    
		parentNode.removeChild(childs.item(i));    
	}
}

/**
 * 初始化插件价格数据
 * @return
 */
function doPluginFeeDefiBefore(){
	
	//何鹏 s
	PluginPackageDS.findPrices( function(data){
		//alert(data);
		var str ="";
		for(var i=0;i<data.length;i++){
			str += "<option value='"+data[i].price+"'>"+data[i].price+"元"+" </option>";
		}
		$("#buyAsForverPrice").append(str);
		$("#buyAsTimesPrice").append(str);
		
	});
	//何鹏 e
	var id = getArgFromHref("id");
	
	PluginPackageDS.getProductBuywayByPluginId(id, function(data){
		
		var count = 0;
		for(var i = 0; i < data.length; i++)
		{
			if(data[i].buyMonth == 0)
			{
				$("#buyAsTimesPrice").val(data[i].price);
				$("#buyAsTimes").attr("checked", true);
			}else if(data[i].buyMonth == -1)
			{
				$("#buyAsForverPrice").val(data[i].price);
				$("#buyAsForver").attr("checked", true);
			}else if(data[i].buyMonth > 0)
			{
				/*count ++;
				$("#buyAsMonth").attr("checked", true);
				var atr = "<div>";
				atr += "<input type='text' size='2' value="+data[i].buyMonth+" name='buyWayMonth'/>个月<input type='text' size='5' value="+data[i].price+" name='buyWayMonthPrice' />元";
				atr += "<span style='color: red' onclick='deleteBuyWayAsMonth(this)'>—</span>";
				atr += "</div>";
				$("#buyWayByMonth").append(atr);*/
				count ++;
				$("#buyAsMonth").attr("checked", true);
				var atr = "<div>";
			
				//atr += "<input type='text' size='2' value="+data[i].buyMonth+" name='buyWayMonth'/>个月<input type='text' size='5' value="+data[i].price+" name='buyWayMonthPrice' />元";
				atr += "<input type='text' size='2' value="+data[i].buyMonth+" name='buyWayMonth'/>个月";
				atr += "<select id="+data[i].id+" name='buyAsMonths'>"+
							"<option value='-1' selected=''>--请选择价格--</option>"+
					  "</select>";
				atr += "<span style='color: red' onclick='deleteBuyWayAsMonth(this)'>—</span>";
				atr += "</div>";
				$("#buyWayByMonth").append(atr);
				
					var selectId = data[i].id;
					//alert("");
					
				DWREngine.setAsync(false);
				//下拉框值start
				var supplierStr =" ";
				PluginPackageDS.findPrices( function(datas){
					for ( var i = 0; i < datas.length; i++) {
						supplierStr += "<option value="+datas[i].price+">"+ datas[i].price+"元"+"</option>";
					}
					
					
					$("#"+selectId).append(supplierStr);
					
				});
				//下拉框的值end
				$("#"+selectId).val(data[i].price);
				count ++;
				DWREngine.setAsync(true);
				
			}
		}
		
		if(count == 0)
		{
			var atr = "<div>";
			//atr += "<input type='text' size='2' name='buyWayMonth'/>个月<input type='text' size='5' name='buyWayMonthPrice' />元";
			atr += "<input type='text' size='2' name='buyWayMonth'/>个月";
			atr += "<select id='buyWayMonthPrice' name='buyWayMonthPrice'>"+
					"<option value='-1' selected=''>--请选择价格--</option>"+
					"</select>";
			atr += "<span style='color: red' onclick='deleteBuyWayAsMonth(this)'>—</span>";
			atr += "</div>";
			$("#buyWayByMonth").append(atr);
			//何鹏 s
			PluginPackageDS.findPrices( function(data){
				var strs ="";
				for(var i=0;i<data.length;i++){
					strs += "<option value='"+data[i].price+"'>"+data[i].price+"元"+" </option>";
				}
				$("#buyWayMonthPrice").append(strs);
			});
			//何鹏 e
		}
		
	})
}

function initPluginFeeDefi(){
	
	$("button[name=btnSubmit]").click(function(){
		doPluginFee();
	});
	doPluginFeeDefiBefore();
}

function doPluginFee(){
	
	//验证价格
	var match = /^\d{0,8}\.{0,1}(\d{1,2})?$/;//--/\d{1,10}(\.\d{1,2})?$/;//--/^(-?\d+)(\.\d+)?$/--/^(\d*\.)?\d+$/;/^(?:[1-9][0-9]*\.[0-9]+|0\.(?!0+$)[0-9]+)$/
	//正整数
	var timeMatch = /^[1-9]\d*$/;
	//插件包Id
	var id = getArgFromHref("id");
	var productBuyWayList = [];
	//先清空数据
	/*PluginPackageDS.delectBuyWayASPlugin(id, function(data){
		
	});*/
	
	//判断是否需要永久性购买
	if($("#buyAsForver").prop("checked") == true){
		var buyAsForverPrice = $("#buyAsForverPrice").val();
		if(buyAsForverPrice.length<=0){
			alert("请填写金额！");
			return;
		}
		if(buyAsForverPrice != null){
			if(!match.test(buyAsForverPrice)){
				alert("请输入正确价格-'永久性购买'！");
				return;
			}
			var productBuyWay = {};
			productBuyWay.productId = id;
			productBuyWay.buyWay = "永久性购买";
			productBuyWay.price = buyAsForverPrice;
			productBuyWay.productType = 1;//0 表示插件包价格信息 1 表示插件价格信息
			productBuyWay.buyMonth = -1;
			productBuyWayList.push(productBuyWay);
		}
	}
	
	//判断是否需要按月购买
	if($("#buyAsMonth").prop("checked") == true){
		
		$("input[name='buyWayMonth']").each(function(){
			var price = this.nextSibling.nextSibling.value;
			var month = this.value;
			if(month.length <= 0){
				alert("请填写时间月份！");
				return;
			}
			if(null != month)
			{
				if(!timeMatch.test(month)){
					alert("请输入正确的时间月份！");
					return;
				}
			}
			if(price.length<=0){
				alert("请填写金额！");
				return;
			}
			if(price != null){
				if(!match.test(price)){
					alert("请输入正确价格-'按月购买'！");
					return;
				}
				var productBuyWay = {};
				productBuyWay.productId = id;
				productBuyWay.buyWay = this.value + "个月";
				productBuyWay.buyMonth = this.value;
				productBuyWay.price = price;
				productBuyWay.productType = 1;//0 表示插件包价格信息 1 表示插件价格信息
				productBuyWayList.push(productBuyWay);
			}
		});
	}
	
	//判断是否需要一次性购买
	if($("#buyAsTimes").prop("checked") == true){
		var buyAsTimesPrice = $("#buyAsTimesPrice").val();
		if(buyAsTimesPrice.length<=0){
			alert("请填写金额！");
			return;
		}
		if(buyAsTimesPrice != null){
			if(!match.test(buyAsTimesPrice)){
				alert("请输入正确价格-'一次性购买'！");
				return;
			}
			var productBuyWay = {};
			productBuyWay.productId = id;
			productBuyWay.buyWay = "一次性购买";
			productBuyWay.price = buyAsTimesPrice;
			productBuyWay.productType = 1;//0 表示插件包价格信息 1 表示插件价格信息
			productBuyWay.buyMonth = 0;
			productBuyWayList.push(productBuyWay);
		}else{
				alert("请填写金额！");
				return;
			}
	}
		if(productBuyWayList==""){
				alert("请填写收费定义信息！");
				return;
		}
			PluginPackageDS.definePluginFee(productBuyWayList, function(data){
				if(data){
					alert("插件收费定义成功！");
					parent.removeTab("pluginfee");
				}
	});
}


var pluginReviewForm = new autoForm("#frmPluginreview");

function hrefReview(obj,pluginType,name) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("pluginreview", "插件信息审核", "?id=" + id+"&pluginType="+pluginType+"&name="+name);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pluginreview"], "?id=" + id+"&pluginType="+pluginType+"&name="+name);
}

function isreview(id) {
	var name = $("#txtName").val();
	var plugin = {};
	plugin.id = id;
	plugin.pluginStatus = 6;
	plugin.reviewmess = $("#reviewmess").val();
	//alert("确定审核'"+name+"'吗？");
	PluginDS.pluginreview(plugin, function(data) {
		if (data) {
			alert("审核成功！");
//			parent.callRefresh("pluginnewadd");
			parent.removeTab("pluginreview");
		}
	});
}

function isnotreview(id) {
	var name = $("#txtName").val();
	var plugin = {};
	plugin.id = id;
	plugin.pluginStatus = 0;
	plugin.reviewmess = $("#reviewmess").val();
	//alert("确定审核不通过'"+name+"'吗？");
	PluginDS.pluginreview(plugin, function(data) {
		if (data) {
			alert("操作成功！");
//			parent.callRefresh("pluginnewadd");
			parent.removeTab("pluginreview");
		}
	});
}

function initPluginReview() {
	var id = getArgFromHref("id");
	var pluginType = getArgFromHref("pluginType");
	var name = getArgFromHref("name");
	
	$("#btnSubmit").click(function(){
		isreview(id);
	});
	
	$("#nobtnSubmit").click(function(){
		isnotreview(id);
	});
	doPluginReviewBefore(id,pluginType,name);
}

function doPluginReviewBefore(id,pluginType,name) {
	var plugin = {};
	plugin.id = id;
	plugin.pluginType = pluginType;
	PluginDS.getPluginReview(plugin, function(data){
		var atr = "<tr>";
		atr += "<td align=\"right\" width=\"180\">插件名称：</td>";
		atr += "<td><input type=\"text\" id=\"txtName\" value=\"\" size=\"30\" readonly/>&nbsp;</td>";
		atr += "</tr>";
		if (data) {
			if(pluginType==0){
				for (var i=0; i<data.length; i++) {
					if(data[i]){
							atr += "<tr>";
							atr += "<td align=\"right\" width=\"180\">标题：</td>";
							atr += "<td><input type=\"text\" value=\""+data[i].readTitle+"\" readonly/>&nbsp;</td>";
							atr +="</tr>";
							
							atr += "<tr>";
							atr += "<td align=\"right\" width=\"180\">内容：</td>";
//							atr += "<td><textarea style=\"overflow-y:auto\" id=\"taDescription\" rows=\"10\" cols=\"100\" readonly>"+data[i].readContent+"</textarea></td>";
							atr += "<td>"+data[i].readContent+"</td>";
							atr +="</tr>";
					}
				}
			}
			
			if(pluginType==1){
				for (var i=0; i<data.length; i++) {
					if(data[i]){
							atr += "<tr>";
							atr +="<td align=\"right\" width=\"180\">标题：</td>";
							atr +="<td><span>"+data[i].title+"</span></td>";
							atr +="</tr>";
							
							atr += "<tr>";
							atr += "<td align=\"right\" width=\"180\">选项：</td>";
							atr +="<td align=\"right\">";
							atr +="<input type=\"text\" style=\"width:850px;\" value=\"A："+data[i].optionA+"\" readonly/>&nbsp;";
							atr +="<input type=\"text\" style=\"width:850px;\" value=\"B："+data[i].optionB+"\" readonly/>&nbsp;";
							if(data[i].optionC != null)
							{
								atr +="<input type=\"text\" style=\"width:850px;\" value=\"C："+data[i].optionC+"\" readonly/>&nbsp;";
							}
							if(data[i].optionD != null)
							{
								atr +="<input type=\"text\" style=\"width:850px;\" value=\"D："+data[i].optionD+"\" readonly/>&nbsp;";
							}
							if(data[i].optionE != null)
							{
								atr +="<input type=\"text\" style=\"width:850px;\" value=\"E："+data[i].optionE+"\" readonly/>&nbsp;";
							}
							if(data[i].optionF != null)
							{
								atr +="<input type=\"text\" style=\"width:850px;\" value=\"F："+data[i].optionF+"\" readonly/>&nbsp;";
							}
							atr +="</tr>";
							
							atr += "<tr>";
							atr += "<td align=\"right\" width=\"180\">答案：</td>";
							atr +="<td><input type=\"text\" value=\""+data[i].answer+"\" readonly/>&nbsp;</td>";
							atr +="</tr>";
					}
				}
			}
		}
		atr += "<tr>";
		atr += "<td align=\"right\" width=\"180\">审核评语：</td>";
		atr += "<td><textarea id=\"reviewmess\" rows=\"5\" cols=\"50\"></textarea>&nbsp;</td>";
		atr += "</tr>";
		$("#showkreview").append(atr);
		$("#txtName").val(name);
	});
}

