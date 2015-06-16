
/**
 * 扩展自x_form.js
 * @param {Object} obj
 * @param {Object} defval
 */
function createSelPluginid(obj, defval) {
	obj.empty();
	obj.append("<option value='-1'>启动页广告</option>");
	obj.append("<option value='0'>大类广告</option>");
	var plugin = {};
	PluginDS.findAllPlugins(plugin, function(data) {
		if (data) {
			for(var i=0; i<data.length; i++) {
				obj.append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
			}
			if (defval) selHandle(obj, defval);
			if (!obj.attr("rele"))
				return;
		
			obj.unbind("change").bind("change", function() { // 如果有关联元素操作
				if("-1"==$(obj).val()){
					$("#selAdtype").html("<option value='6'>外部链接</option>");
				}else{
					createSelObj($("#selAdtype"));
				}
				var rele = $(this).attr("rele");
				var k = rele.indexOf("#");
				var e = (k != -1) ? rele.substr(k+1) : rele;
				var relv = $(this).attr("relv");
				if (e.startWith("tr")) { // 如果关联的是tr，那么控制其显示隐藏
					if ($(this).val() == relv) {
						$("#" + rele).show();
					} else {
						$("#" + rele).hide();
					}
				}
			});
		}
	});
}

function initMobileAdNewList() {
	
	$("#divTip").dialog({
		autoOpen: false,
		height: 200,
		width: 550,
		modal: true,
		buttons: {}
	});
	
	createSelPluginid($("#selPluginid"));
	$("#searchconds button").click(function() {
		doMobileAdNewList(1);
	});
	doMobileAdNewList(1);
}

function doMobileAdNewList(page) {
	//alert("@");
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	var pluginid = $("#selPluginid").val();
	var mobileadnew = {};
	mobileadnew.pluginid = pluginid;
	if("-1"==pluginid){
		mobileadnew.adtype=6;
	}
	MobileAdNewDS.findAllMobileAdNews(mobileadnew, function(data) {
		if (!data) 
			return;
		if (data.length == 0) {
			buildListsBlankHTML();
			return;
		}
		for (var i=0; i<data.length; i++) {
			var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
			atr += "<td align=\"center\" nowrap>" + getOrderTd() + "&nbsp;</td>";
			atr += "<td align=\"center\">" + data[i].adorder + "&nbsp;</td>";
			atr += "<td align=\"center\"><img src=\"" + data[i].img + "\" width=\"32\" height=\"32\"/>&nbsp;</td>";
			atr += "<td align=\"center\">" + nvl(dictExamtype[data[i].examtype], "") + "&nbsp;</td>";
			atr += "<td align=\"center\">" + dictAdtype[data[i].adtype] + "&nbsp;</td>";
			atr += "<td align=\"center\">" + omit(data[i].value, "")+ "&nbsp;</td>";
			atr += "<td align=\"center\" nowrap>" + getActionTd(data[i]) 
				+ "<label style=\"display:none\">" + data[i].id + "</label>"
				+ "&nbsp;</td>";
			atr += "</tr>";
			$("#showlists").append(atr);
		}
		buildListsStyle();
	});
}

function getOrderTd() {
	var rok = false;
	var atd = "";
	rok = haveRight("mobileadnew.update");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefUp(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/arrowUp" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "上移" : "不可上移") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefDown(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/arrowDown" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "下移" : "不可下移") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	return atd;
}

function getActionTd(data) {
	var rok = false;
	var atd = "";
	rok = haveRight("mobileadnew.update");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	rok = haveRight("mobileadnew.delete");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefDelete(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/del" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "删除" : "不可删除") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	rok = haveRight("mobileadnew.update");
	if(data.pluginid != 0)
	{
		atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefSetBroadAd(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/recommend" 
		+ (rok ? "" : "2") + ".png\" title=\"" + (rok ? "置为大类广告" : "不可设置为大类广告") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	}
	return atd;
}

function hrefSetBroadAd(obj)
{
	var td = obj.parentNode;
	var id = $.trim($(td).find("label:first").text());
	if (confirm("是否确认置为大类广告(" + id + ")?")) {
		MobileAdNewDS.setBroadAdvertise(id, function(data){
			if (data) {
				alert("设置大类广告(" + id + ")成功!");
				doMobileAdNewList(1);
			}
		});
	}
}

function hrefUp(obj) {
	var tr = obj.parentNode.parentNode;
	if ($(tr).prev().is("tr")) {
		$(tr).prev().before($(tr).remove());
	}
}

function hrefDown(obj) {
	var tr = obj.parentNode.parentNode;
	if ($(tr).next().is("tr"))	 {
		$(tr).next().after($(tr).remove());
	}
}

function hrefOrder() {
	var ids = [];
	$("#showlists").find("tr").each(function() {
		ids.push($.trim($(this).find("td:last").find("label:first").text()));
	});
	MobileAdNewDS.applyMobileAdNewOrder(ids, function(data) {
		if (data) {
			alert("保存广告排序成功!");
			doMobileAdNewList(1);
		}
	});
}

function hrefUpdate(obj) {
	var td = obj.parentNode;
	var id = $.trim($(td).find("label:first").text());
	var idx = parent.addTab("mobileadnewupdate", "修改广告信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["mobileadnewupdate"], "?id=" + id);
}

function hrefDelete(obj) {
	var td = obj.parentNode;
	var id = $.trim($(td).find("label:first").text());
	if (confirm("是否确认删除该广告(" + id + ")?")) {
		MobileAdNewDS.deleteMobileAdNew(id, function(data){
			if (data) {
				alert("删除广告(" + id + ")成功!");
				doMobileAdNewList(1);
			}
		});
	}
}

function hrefAdd() {
	if (!haveRight("mobileadnew.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("mobileadnewadd", "新增广告");
	if (idx == -1)
		return;
	parent.frames["mobileadnewadd"].doMobileAdNewBeforeAdd();
}

var mobileAdNewForm = new autoForm("#frmMobileAdNew");

function initMobileAdNewAdd() {	
	
	$("#divInfoSubjectPictureTip").dialog({
		autoOpen: false,
		height: 350,
		width: 450,
		modal: true,
		buttons: {}
	});	
	
	$("#txtJpg").uploadify({
		
		"uploader" : "../../uploadify?type=mobileadnew",
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
			var newimg = getWebAddr("/html/") + "/uploadify/mobileadnew/" + decodeURI(data);
			if (img && newimg != img) {
				img = img.substr(img.lastIndexOf("/") + 1);
				MobileAdNewDS.deleteMobileAdNewFile("mobileadnew", img, function(code) {
					// do nothing;
				});
			}
			$("#txtImg").val(newimg);
		},
		"onUploadError": function(file, errorCode, errorMsg){
			alert("文件" + file.name + "上传失败!");
		}
	});
	
	$("#btnSubmit").click(function(){
		doMobileAdNewAdd();
	});
	
	$("#selAdtype").change(function(){
		var selAdtype = $(this).val();
		if(selAdtype == 2)
		{
			$("select[name='txtValue']").show();
			$("input[name='txtValue']").hide();
			$("#trJpg").hide();
			InfoSubjectDS.findAllInfoSubject(function(data){
				var supplierStr =" ";
				for ( var i = 0; i < data.length; i++) {
					// modified by yanfulei 解决添加专题广告APP展示详情失败的缺陷
					supplierStr += "<option infoId='" +data[i].id+ "' value='" +data[i].id + "'>"+ data[i].title + "</option>";
				}
				$("select[name='txtValue']").append(supplierStr);
			});
		}else
		{
			$("#trJpg").show();
			$("input[name='txtValue']").show();
			$("select[name='txtValue']").hide();
		}
	});
	
	$("#btnAddInfoSubjectPic").click(function(){
		
		var picId = $("input[name='infoSubjectPic']").val();
		var picUrl = $("#" + picId).attr("src");
		$("#txtImg").val(picUrl);
		$("#divInfoSubjectPictureTip").dialog("close");
	});
	
	$("select[name='txtValue']").change(function(){
		
		$("#divInfoSubjectPictureTip").find(".tb-head").html("添加图标");
		var infoSubjectId = $("select[name='txtValue'] option:selected").attr("infoId");
		var infoSubjectpicture = {};
		infoSubjectpicture.infoSubjectId = infoSubjectId;
		$("#showlists").empty();
		$("#showpages").find("tr").eq(0).nextAll().remove();
		InfoSubjectPictureDS.findAllInfoSubjectPictures(infoSubjectpicture, function(data) {
			if (data) {
				//$("#taInfoSubjectPicture").find("tr").eq(0).nextAll().remove();
				for (var i=0; i<data.length; i++) {
					var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
					atr += "<td align=\"center\">";
					atr += '<input type="radio" value='+data[i].id+' name="infoSubjectPic"/>';
					atr += "</td>";
					atr += "<td align=\"center\">";
					atr += '<img style="width: 40px; height: 40px" id='+data[i].id+' src='+data[i].picture+' />';
					atr += "</td>";
					atr += "</tr>";
					$("#showlists").append(atr);
				}
			}
		});
		$("#divInfoSubjectPictureTip").dialog("open");
	});
	
	doMobileAdNewBeforeAdd();
}

function doMobileAdNewBeforeAdd() {
	var mobileadnew = {};
	mobileadnew.pluginid = "0";
	mobileadnew.examtype = "101";
	mobileadnew.adtype = 1;
	mobileadnew.img = "";
	mobileadnew.value = "";
	mobileAdNewForm.init(mobileadnew);
	mobileAdNewForm.readonly("#txtImg");
	$("select[name='txtValue']").hide();
}

function doMobileAdNewAdd() {
	if (!mobileAdNewForm.valid()) {
		return false;
	}
	var mobileadnew = mobileAdNewForm.toBean();
	if (mobileadnew.pluginid != 0) {
		mobileadnew.examtype = 0;
	}
//	alert(mobileadnew.value);return;
	//图片内容为input时，将值手动塞入
	if("" == mobileadnew.value || null == mobileadnew.value)
	{
		var xxx = $("#txtValue").val();
		mobileadnew.value = xxx;
	}
	MobileAdNewDS.addMobileAdNew(mobileadnew, function(data) {
		if (data) {
			alert("新增广告成功!");
			parent.removeTab("mobileadnewadd");
		}
	});
}

function initMobileAdNewUpdate() {	
	
	$("#divInfoSubjectPictureTip").dialog({
		autoOpen: false,
		height: 350,
		width: 450,
		modal: true,
		buttons: {}
	});	
	
	var selAdtype = $("#selAdtype").val();
	if(selAdtype == 2)
	{
		$("select[name='txtValue']").show();
		$("input[name='txtValue']").hide();
		$("#trJpg").hide();
	}else
	{
		$("#trJpg").show();
		$("input[name='txtValue']").show();
		$("select[name='txtValue']").hide();
	}
	
	$("#txtJpg").uploadify({
		"uploader" : "../../uploadify?type=mobileadnew",
	    "swf" : "../../jquery/uploadify/uploadify.swf",
		"queueID" : "divJpg",
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
			var newimg = getWebAddr("/html/") + "/uploadify/mobileadnew/" + decodeURI(data);
			if (img && newimg != img) {
				img = img.substr(img.lastIndexOf("/") + 1);
				MobileAdNewDS.deleteMobileAdNewFile("mobileadnew", img, function(code) {
					// do nothing;
				});
			}
			$("#txtImg").val(newimg);
		},
		"onUploadError": function(file, errorCode, errorMsg){
			alert("文件" + file.name + "上传失败!");
		}
	});
	
	$("#btnSubmit").click(function(){
		doMobileAdNewUpdate();
	});
	$("#selAdtype").change(function(){
		var selAdtype = $(this).val();
		if(selAdtype == 2)
		{
			$("select[name='txtValue']").show();
			$("input[name='txtValue']").hide();
			$("#trJpg").hide();
				InfoSubjectDS.findAllInfoSubject(function(data){
					var supplierStr =" ";
					for ( var i = 0; i < data.length; i++) {
						// modified by yanfulei 解决添加专题广告APP展示详情失败的缺陷
						supplierStr += "<option value='" +data[i].id + "'>"+ data[i].title + "</option>";
					}
					$("select[name='txtValue']").append(supplierStr);
				});
		}else
		{
			$("#trJpg").show();
			$("input[name='txtValue']").show();
			$("select[name='txtValue']").hide();
		}
	});
	
	$("#btnAddInfoSubjectPic").click(function(){
		
		var picId = $("input[name='infoSubjectPic']").val();
		var picUrl = $("#" + picId).attr("src");
		$("#txtImg").val(picUrl);
		$("#divInfoSubjectPictureTip").dialog("close");
	});
	
	$("select[name='txtValue']").change(function(){
		
		$("#divInfoSubjectPictureTip").find(".tb-head").html("添加图标");
		var infoSubjectId = $(this).val();
		var infoSubjectpicture = {};
		infoSubjectpicture.infoSubjectId = infoSubjectId;
		$("#showlists").empty();
		$("#showpages").find("tr").eq(0).nextAll().remove();
		InfoSubjectPictureDS.findAllInfoSubjectPictures(infoSubjectpicture, function(data) {
			if (data) {
				//$("#taInfoSubjectPicture").find("tr").eq(0).nextAll().remove();
				for (var i=0; i<data.length; i++) {
					var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
					atr += "<td align=\"center\">";
					atr += '<input type="radio" value='+data[i].id+' name="infoSubjectPic"/>';
					atr += "</td>";
					atr += "<td align=\"center\">";
					atr += '<img style="width: 40px; height: 40px" id='+data[i].id+' src='+data[i].picture+' />';
					atr += "</td>";
					atr += "</tr>";
					$("#showlists").append(atr);
				}
			}
		});
		$("#divInfoSubjectPictureTip").dialog("open");
	});
	
	var id = getArgFromHref("id");
	doMobileAdNewBeforeUpdate(id);
}

function doMobileAdNewBeforeUpdate(id) {
	MobileAdNewDS.getMobileAdNew(id, function(data){
		if (data) {
			// 如果类型为启动页广告，默认加载一项“外部链接”否则加载字典
			if("-1"==data.pluginid){
				$("#selAdtype").html("<option value='6'>外部链接</option>");
			}else{
				createSelPluginid($("#selPluginid"),data.pluginid);
				$("#selAdtype").attr("ref","createSelObj");
			}
			mobileAdNewForm.init(data);
			if (data.pluginid != 0) {
				$("#trExamtype").hide();
			}
			mobileAdNewForm.readonly("#txtImg");
		}
	});
}

function doMobileAdNewUpdate() {
	if (!mobileAdNewForm.valid()) {
		return;
	}
	var mobileadnew = mobileAdNewForm.toBean();
	if (mobileadnew.pluginid != 0) {
		mobileadnew.examtype = 0;
	}
	//alert(mobileadnew.value);return;
	//图片内容为input时，将值手动塞入
	if("" == mobileadnew.value || null == mobileadnew.value)
	{
		var txtValue = $("#txtValue").val();
		mobileadnew.value = txtValue;
	}
	MobileAdNewDS.updateMobileAdNew(mobileadnew, function(data) {
		if (data) {
			alert("修改广告信息成功!");
			parent.removeTab("mobileadnewupdate");
		}
	});
}