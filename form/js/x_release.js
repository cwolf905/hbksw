
var sysAppName = "hbksw";
var dictAppType = {"android":"安卓系统", "ios":"苹果系统"}; // td

function initReleaseList() {
	sysSelectAll = true;
	createSelObj($("#selAppType"), "0");
	sysSelectAll = false;
	$("#searchconds button").click(function() {
		doReleaseList(1);
	});
	doReleaseList(1);
}

function doReleaseAll() {
	$("#selAppType").val("0");
	doReleaseList(1);
}

function doReleaseList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	var appType = $("#selAppType").val();
	if (appType == 0) appType = "";
	var release = {};
	release.appType = appType;
	release.pagestart = (page - 1) * sysPageSize;
	release.pagesize = sysPageSize;
	AppReleaseDS.countAppReleases(release, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		AppReleaseDS.findAppReleasesByPage(release, function(data) {
			if (!data) 
				return;
			for (var i=0; i<data.length; i++) {
				var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-apptype\">" + data[i].appType + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-version\">" + data[i].version + "&nbsp;</td>";
				atr += "<td align=\"center\">" + getTime("dt14f", data[i].releaseDate) + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].releaseNote + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-url\"><a href=\"" + data[i].url + "\">" + data[i].url + "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + getActionTd() + "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doReleaseList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function getActionTd() {
	var rok = false;
	var atd = "";
	rok = haveRight("release.update");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("release.delete");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefDelete(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/del" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "删除" : "不可删除") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	return atd;
}

function hrefUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("releaseupdate", "修改版本信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["releaseupdate"], "?id=" + id);
}

function hrefDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var appType = $.trim($(tr).find("td.w-apptype").text());
	var version = $.trim($(tr).find("td.w-version").text());
	var url = $.trim($(tr).find("td.w-url").text());
	if (confirm("是否确认删除该版本(" + appType + version + ")?")) {
		AppReleaseDS.deleteAppRelease(id, function(data){
			if (data) {
				alert("删除版本(" + appType + version + ")成功!");
				doReleaseList(1);
				if (appType == "android")
					url = url.substr(url.lastIndexOf("/") + 1);
					AppReleaseDS.deleteAppReleaseFile("release", url, function(code) {
						// do nothing;
					});
			}
		});
	}
}

function hrefAdd() {
	if (!haveRight("release.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("releaseadd", "新增版本");
	if (idx == -1)
		return;
	parent.frames["releaseadd"].doReleaseBeforeAdd();
}

var releaseForm = new autoForm("#frmRelease");

function initReleaseAdd() {	
	$("#txtApk").uploadify({
		"uploader" : "../../uploadify?type=release",
	    "swf" : "../../jquery/uploadify/uploadify.swf",
		"queueID" : "divApk",
		"multi": false,
		"fileSizeLimit" : "10MB",
		"buttonText" : "添加文件",
		"width":"60",
		"height":"20",
        "fileTypeDesc" : "所有文件",
        "fileTypeExts" : "*.*",
		"onSelectError" : function(file, errorCode, errorMsg) {
			if (errorCode == -110)
				alert("文件大小超过限制(10MB)!");
			else if (errorCode == -120)
				alert("文件内容为空，请重新选择!");
		},
		"onUploadSuccess" : function(file, data, response) {
			var url = $("#txtUrl").val();
			var newurl = getWebAddr("/html/") + "/uploadify/release/" + decodeURI(data);
			if (url && newurl != url) {
				url = url.substr(url.lastIndexOf("/") + 1);
				AppReleaseDS.deleteAppReleaseFile("release", url, function(code) {
					// do nothing;
				});
			}
			$("#txtUrl").val(newurl);
		},
		"onUploadError": function(file, errorCode, errorMsg){
			alert("文件" + file.name + "上传失败!");
		}
	});
	
	$("#btnSubmit").click(function(){
		doReleaseAdd();
	});
	doReleaseBeforeAdd();
}

function doReleaseBeforeAdd() {
	var release = {};
	release.appType = "android";
	release.version = "";
	release.releaseNote = "";
	release.url = "";
	releaseForm.init(release);
	
	$("#tdAppType").find(":radio").click(function() {
		var appType = $("#tdAppType").find(":radio:checked").val();
		if (appType == "android") {
			$("#trApk").show();
			releaseForm.readonly("#txtUrl");
		} else {
			$("#trApk").hide();
			releaseForm.writable("#txtUrl");
		}
	});
	$("#tdAppType").find(":radio:checked").click();
}

function doReleaseAdd() {
	if (!releaseForm.valid()) {
		return false;
	}
	var release = releaseForm.toBean();
	AppReleaseDS.addAppRelease(release, function(data) {
		if (data) {
			alert("新增版本成功!");
			parent.removeTab("releaseadd");
		}
	});
}

function initReleaseUpdate() {	
	$("#txtApk").uploadify({
		"uploader" : "../../uploadify?type=release",
	    "swf" : "../../jquery/uploadify/uploadify.swf",
		"queueID" : "divApk",
		"multi": false,
		"fileSizeLimit" : "10MB",
		"buttonText" : "添加文件",
		"width":"60",
		"height":"20",
        "fileTypeDesc" : "所有文件",
        "fileTypeExts" : "*.*",
		"onSelectError" : function(file, errorCode, errorMsg) {
			if (errorCode == -110)
				alert("文件大小超过限制(10MB)!");
			else if (errorCode == -120)
				alert("文件内容为空，请重新选择!");
		},
		"onUploadSuccess" : function(file, data, response) {
			var url = $("#txtUrl").val();
			var newurl = getWebAddr("/html/") + "/uploadify/release/" + decodeURI(data);
			if (url && newurl != url) {
				url = url.substr(url.lastIndexOf("/") + 1);
				AppReleaseDS.deleteAppReleaseFile("release", url, function(code) {
					// do nothing;
				});
			}
			$("#txtUrl").val(newurl);
		},
		"onUploadError": function(file, errorCode, errorMsg){
			alert("文件" + file.name + "上传失败!");
		}
	});
	
	$("#btnSubmit").click(function(){
		doReleaseUpdate();
	});
	var id = getArgFromHref("id");
	doReleaseBeforeUpdate(id);
}

function doReleaseBeforeUpdate(id) {
	AppReleaseDS.getAppRelease(id, function(data){
		if (data) {
			releaseForm.init(data);
			$("#tdAppType").find(":radio").click(function() {
				var appType = $("#tdAppType").find(":radio:checked").val();
				if (appType == "android") {
					$("#trApk").show();
					releaseForm.readonly("#txtUrl");
				} else {
					$("#trApk").hide();
					releaseForm.writable("#txtUrl");
				}
			});
			$("#tdAppType").find(":radio:checked").click();
		}
	});
}

function doReleaseUpdate() {
	if (!releaseForm.valid()) {
		return;
	}
	var release = releaseForm.toBean();
	AppReleaseDS.updateAppRelease(release, function(data) {
		if (data) {
			alert("修改版本信息成功!");
			parent.removeTab("releaseupdate");
		}
	});
}