
//1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时9院校资讯10插件到期提醒11院校介绍
var dictPushtype = {"1":"资讯", "9":"院校资讯","11":"院校介绍"};
// 内容审核状态字典编辑后的内容审核（0：待审核 1：通过 2：不通过）
var dictcontentAudit = {"0":"待审核", "1":"通过","2":"不通过"};

//======================================新增页面的js方法们 begin==========================================================
/**
 * 新增页面初始化操作
 */
function initCustomPushAdd() {
	doPushBeforeAdd();
}

/**
 * 初始化操作
 */
function doPushBeforeAdd() {
	//初始化下下拉菜单
	createSelObj($("#selPushtype"), "1");
	createSelObj($("#selExamtype"), "101");
	initSelectArea(101);
	//初始化富文本编辑框
	var editor;
	KindEditor.ready(function(K) {
		editor = K.create('textarea[name="content"]', {
			allowFileManager : true
		});
	});
	
	$("button[name=btnSubmit]").click(function(){
		doPushAdd(editor);
	});
	//给推送类型赋事件
	$("#selPushtype").change(function(){
		var selPushtype = $(this).val();
		if(selPushtype == 1)
		{
			$("#examTd").show();
			$("#collegeTd").hide();
			$("#pushTagTd2").hide();
			$("#pushTagTd").show();
			$("#contentTd").show();
			//$("#contentTd2").hide();
		}else if(selPushtype == 9) {
			$("#examTd").show();
			$("#collegeTd").show();
			$("#pushTagTd").hide();
			$("#pushTagTd2").show();
			$("#contentTd").show();
			$("#pushTag2").val("");
			$("#collegeId").val("");
			//$("#contentTd2").hide();
		}else{
			$("#examTd").show();
			$("#collegeTd").show();
			$("#pushTagTd").hide();
			$("#pushTagTd2").show();
			$("#contentTd").hide();
			$("#collegeId").val("");
			$("#pushTag2").val("");
			
			//$("#contentTd2").show();
			
		}
	});
	//给考试类型赋事件
	$("#selExamtype").change(function(){
		var selPushtype = $(this).val();
		initSelectArea(selPushtype);
	});
	//modified by yanfulei 修正从院校介绍跳转其他资讯类型，推送类型不可选的缺陷
	$("#selPushtype").change(function(){
		var selPushtype = $("#selExamtype").val();
		initSelectArea(selPushtype);
	});
}

/**
 * 初始化资讯类别下拉框
 * @return
 */
function initSelectArea(examType){
	$("#infotype").empty();
	$("#infotype").append("<input style='width:55px;color:blue;border-left:0;border-right:0; border-top:0; border-bottom: 0;float:left' value=\"未选类别：\" />");
	$("#saveinfotype").empty();
	$("#saveinfotype").append("<input style='width:55px;color:blue;border-left:0;border-right:0; border-top:0; border-bottom: 0;float:left' value=\"已选类别：\" />");
	CustomPushDS.findinfoTypeByExam(examType,function(data){
		var supplierStr =" ";
		for ( var i = 0; i < data.length; i++) {
			var id = data[i].id;
			var name = data[i].tabname
			var atr = "<a id='c_"+id+"' title='"+name+"' href='javascript:void(0);' onclick=\"selecttype('"+id+"','"+name+"')\"><span>"+name+"</span><em></em></a>";
			$("#infotype").append(atr);
		}
	});
	 
}
/**
 * 选择类别
 * @param pid
 * @param name
 */
function selecttype(pid,name) {
	var atr = "<a id='c_n_"+pid+"' title='"+name+"' href='javascript:void(0);' onclick=\"notselecttype('"+pid+"','"+name+"')\" name=\"savetype\" categoryId=\""+pid+"\"><span>"+name+"</span><em></em></a>";
	$("#c_"+pid).remove();
	$("#saveinfotype").append(atr);
}
/**
 * 删除类别
 * @param pid
 * @param name
 */
function notselecttype(pid,name) {
	var atr = "<a id='c_"+pid+"' title='"+name+"' href='javascript:void(0);' onclick=\"selecttype('"+pid+"','"+name+"')\"><span>"+name+"</span><em></em></a>";
	$("#c_n_"+pid).remove();
	$("#infotype").append(atr);
}

/**
 * 用户自定义推送
 */
function addCustomPush(){
	var examType = $.cookie("examType");
	//打开自定义推送页面
	if (!haveRight("custompush.list")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("custompushadd", "新增客户端推送");
	if (idx == -1)
		return;
	parent.frames["custompushadd"].doPushBeforeAdd();
}

/**
 * 键盘监听事件
 */
function mykeydown(){
	var collegeIdStr = $("#collegeId").val();
	var collegeIds = collegeIdStr.split(",");
	var pushTag = "";
	for(var i = 0;i<collegeIds.length;i++){
		if(collegeIds[i]==""){
		}else{
			pushTag +="collegeId_"+collegeIds[i]+",";
		}
	}
	pushTag = pushTag.substring(0, pushTag.length-1);
	$("#pushTag2").val(pushTag);
}
/**
 * 键盘监听事件
 */
function mykeyup(){
	mykeydown();
}
/**
 * 键盘监听事件
 */
function mykeypress(){
	mykeydown();
}

/**
 * 新增操作
 */
function doPushAdd(editor,id){
	
	editor.sync();
	var title = $("#title").val();
	var source = $("#source").val();
	//标题做校验
	if(!title|| title == ""){
		alert("推送标题必须填写，长度不超过50个字符。");
		return;
	}
	if(title.length>50){
		alert("推送标题长度不超过50个字符!");
		return;
	}
	// 推送来源验证
	if(!source|| source == ""){
		alert("推送来源必须填写，长度不超过30个字符。");
		return;
	}
	if(source.length>30){
		alert("推送来源长度不超过30个字符!");
		return;
	}
	var pushType = $("#selPushtype").val();
	var examType = $("#selExamtype").val();
	//推送标签
	var pushTag = "";
	$("a[name='savetype']").each(function(){
		var select = $(this).attr("categoryId");
		pushTag += "infotabId_"+select + ",";
	}); 
	pushTag = pushTag.substring(0, pushTag.length-1);
	var pushTag2 = $("#pushTag2").val();
	var collegeId = 0;
	var content = $("#content").val();
	//如果推送类型不是资讯类，则设置考试类型为0,Tag为院校ID
	if(pushType != 1){
		pushTag = pushTag2;
	}
	if(pushType == 11 || pushType == 9){
		collegeId = $("#collegeId").val();
		pushTag = pushTag2;
		content = collegeId;
		if(!collegeId|| collegeId == ""){
			alert("院校ID需要填写，长度不超过50个字符，多个院校ID以英文逗号分隔。");
			return;
		}
		if(collegeId.length > 50){
			alert("院校ID长度不超过50个字符。");
			return;
		}
	}
	if(!pushTag|| pushTag == ""){
		alert("推送标签必须选择！");
		return;
	}
	// modified by yanfulei 推送类型为11--院校介绍的时候，不需要验证推送内容
	if((!content|| content == "")&&"11"!=pushType){
		alert("推送内容不能为空。");
		return;
	}
	
	//设置对象
	var customPush = {};
	customPush.title = title;
	customPush.content = content;
	customPush.pushTitle = title;
	customPush.pushType = pushType;
	customPush.examType = examType;
	customPush.pushTag = pushTag;
	customPush.contentAudit = 0;
	customPush.pushTitleAudit = -1;
	customPush.topStatus = 0;
	customPush.source = source;
	// modified by yanfulei 添加推送时同时添加院校ID及推送标签
	customPush.collegeId=collegeId; // 院校ID
	// 处理推送标签，截取末尾数字
	var infoType = "";
	for(var k=0;k< pushTag.split(",").length;k++){
		infoType+=pushTag.split(",")[k].split("_")[1]+",";
	}
	infoType=""==infoType?"":	infoType.substring(0, infoType.length-1);
	customPush.infoType=infoType; // 推送标签
	if(id){
		customPush.id = id;
		//更新
		CustomPushDS.updateAllCustomPush(customPush,function(data){
			if(data == 1){
				alert("修改成功！");
				parent.callRefresh("custompushUpdate");
				parent.removeTab('custompushupdate');
			}else{
				alert("修改失败！");
			}
		});
	}else{
		//新增
		CustomPushDS.addCustomPush(customPush,function(data){
			if(data == 1){
				alert("操作成功！");
				parent.callRefresh("custompushAdd");
				parent.removeTab('custompushadd');
				doCustomList(1);
			}else{
				alert("操作失败！");
			}
		});
		
	}
}
/**
 * 列表页面初始化
 */
	function initCustomList(){
		$("#divTip").dialog({
			autoOpen: false,
			height: 300,
			width: 550,
			modal: true,
			buttons: {}
		});
		
		$("#divPush").dialog({
			autoOpen: false,
			height: 200,
			width: 470,
			modal: true,
			//position:[300,5],
			buttons: {}
		});
		$("#searchconds button").click(function() {
			doCustomList(1);
		});
		doCustomList(1);
	}
	
	/**
	 * 分页查询推送信息
	 */
	function doCustomList(page) {
		$("#showlists").empty();
		// modified by yanfulei 修复分页会显示多个分页栏问题
		$("#showpages").html("");
		var _title = $("#txtTitle").val();
		if(!page){
			page = 1;
		}
		var push = {};
		push.pagestart = (page - 1) * sysPageSize;
		push.pagesize = sysPageSize;
		push.title = encodeURIComponent(_title);
		CustomPushDS.countCustomPushs(push, function(count) {
			if (count == 0) {
				buildListsBlankHTML();
				return;
			}
			CustomPushDS.findCustomPushsByPage(push, function(data) {
				if (!data) 
					return;
				for (var i=0; i<data.length; i++) {
					var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
					atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
					atr += "<td align=\"center\" class=\"w-name\">" + getSidName(data[i].pushType,"pushType") + "&nbsp;</td>";
					atr += "<td align=\"center\">" + getSidName(data[i].examType,"examType") + "&nbsp;</td>";
					atr += "<td align=\"center\" class=\"w-title\">" + data[i].title + "&nbsp;</td>";
					atr += "<td align=\"center\">" + getTime("dt14f", data[i].createTime) + "&nbsp;</td>";
					atr += "<td align=\"center\" class=\"w-contentAudit\">" + getSidName(data[i].contentAudit,"contentAudit") + "&nbsp;</td>";
					atr += "<td align=\"center\" nowrap>" + getActionTd(data[i].id, data[i]) + "&nbsp;</td>";
					atr += "</tr>";
					$("#showlists").append(atr);
				}
				buildListsStyle();
				buildPagesHTML("$doCustomList(?)", count, page);
				buildPagesStyle();
			});
		});
	}
	
	/**
	 * 生成操作图标
	 */
	function getActionTd(infoId, data) {
		var rok = false;
		var atd = "";
		atd += "<a href=\"#\" onclick=\"hrefUpdate(this);return false;\">" 
			+ "<img src=\"../../css/former/images/edit.gif\" title=\"编辑\" width=\"16\" height=\"16\"/></a>&nbsp;";
		
		rok = haveRight("information.check");
		atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefPush(this);return false;\">" : ">") 
			+ "<img src=\"../../css/former/images/push" 
			+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "推送" : "不可推送")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
		rok = haveRight("information.up");
		if(1==data.topStatus){
			atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefCancleTop(this);return false;\">" : ">") 
			+ "<img src=\"../../css/former/images/down.gif\" title=\"" + (rok ? "" : "不可") 
			+ "取消置顶"
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
		}else{
			atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefSetTop(this);return false;\">" : ">") 
			+ "<img src=\"../../css/former/images/up.gif\" title=\"" + (rok ? "" : "不可") 
			+ "置顶"
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
		}
		return atd;
	}
	
	/**
	 * 翻译字典项
	 */
	function getSidName(sid,dictType) {
		if("pushType"==dictType){ 
			for(var key in dictPushtype) {
				if(key == sid) return dictPushtype[key];
			}
		}else if("examType"==dictType){
			for(var key in dictExamtype) {
				if(key == sid) return dictExamtype[key];
			}
		}else if("contentAudit"==dictType){
			for(var key in dictcontentAudit) {
				if(key == sid) return dictcontentAudit[key];
			}
		}
		return "";
	}
	
	/**
	 * 查看全部
	 */
	function doCustomAll() {
		$("#txtTitle").val("");
		$("#selT").val("0");
		doCustomList(1);
	}
	
	/**
	 * 置顶
	 */
	function hrefSetTop(obj){
		var tr = obj.parentNode.parentNode;
		var id = $.trim($(tr).find("td").eq(0).text());
		var title = $.trim($(tr).find("td.w-title").text());
		var push = {};
		push.id = id;
		push.title = title;
		push.topStatus = 1;
		push.topTime = new Date();
		CustomPushDS.topCustomPushBackAsId(push, function(data){
			if(data){
				alert("设置置顶成功！");
				doCustomList(1);
			}
		});
	}
	
	/**
	 * 取消置顶
	 */
	function hrefCancleTop(obj){
		var tr = obj.parentNode.parentNode;
		var id = $.trim($(tr).find("td").eq(0).text());
		var push = {};
		push.id = id;
		push.topStatus = 0;
		push.topTime = new Date();
		CustomPushDS.cenelCustomPushAsId(push, function(data){
			if(data){
				alert("取消置顶成功！");
				doCustomList(1);
			}
		});
	}
	
	/**
	 * 推送
	 */
	function hrefPush(obj) {
		var tr = obj.parentNode.parentNode;
		var id = $.trim($(tr).find("td").eq(0).text());
		var title = $.trim($(tr).find("td.w-title").text());
		var contentAudit = $.trim($(tr).find("td.w-contentAudit").text());
		var cid = $.trim($(tr).find("td:last").find("label").text());
		// 判断审核状态
		if(contentAudit!="通过"){
			alert("内容审核为"+contentAudit+"，不能推送本条消息");
			return;
		}
		var push = {};
		push.pushTitleAudit = 0; 
		push.id = id;
		$("#divPush").dialog("open");
		$("#ui-id-2").text("推送");
		$("#btnOK").unbind("click").bind("click", function() {
			
			var push = {};
			push.id = id;
			//获取修改的推送标题
			push.pushTitle = $("#pushTitle").val();
			//默认修改后的推送标题审核为待审核
			push.pushTitleAudit = 0;
			CustomPushDS.updatePushTitleAsId(push, function(data){
				if(data){
					alert("此推送已提交审核！");
					$("#divPush").dialog("close");
				}
				doCustomList(1);
			});
		});
		$("#btnCancle").unbind("click").bind("click", function() {
			$("#divPush").dialog("close");
		});
		$("#pushTitle").val(title)
	}
//======================================新增页面的js方法们 end==========================================================

//======================================修改页面的js方法们 begin==========================================================
	/**
	 * 修改記錄
	 */
	function hrefUpdate(obj)
	{
		var tr = obj.parentNode.parentNode;
		var id = $.trim($(tr).find("td").eq(0).text());
		var idx = parent.addTab("custompushupdate", "修改客戶端推送信息", "?id=" + id);
		if (idx == -1)
			return;
		hrefHandle(parent.frames["custompushupdate"], "?id=" + id);
	}
	/**
	 * 修改页面初始化操作
	 */
	function initCustomPushUpdate() {
		var editor;
		var id = getArgFromHref("id");
		KindEditor.ready(function(K) {
			editor = K.create('textarea[name="content"]', {
				allowFileManager : true
			});
			doCustomPushBeforeUpdate(id, editor);
		});
		
		$("button[name=btnSubmit]").click(function(){
			doCustomPushUpdate(editor,id);
		});
	}
	/**
	 * 根据id查询推送详细信息
	 * @param id
	 * @param editor
	 */
	function doCustomPushBeforeUpdate(id, editor){
		var ids = parseInt(id,0);
		CustomPushDS.findCustomPushById(ids, function(data){
			if(!data){
				return;
			}
			$("#title").val(data.title);
			$("#source").val(data.source);
			$("#content").val(data.content);
			//初始化下下拉菜单
			createSelObj($("#selPushtype"), data.pushType);
			if(data.pushType == 1){
				createSelObj($("#selExamtype"), data.examType);
				initTag(data.examType,data.pushTag);
				$("#examTd").show();
				$("#collegeTd").hide();
				$("#pushTagTd2").hide();
				$("#pushTagTd").show();
				$("#contentTd").show();
			}else if(data.pushType == 9){
				createSelObj($("#selExamtype"), 101);
				//设置Tag和院校ID
				initColleAndTag(data.pushTag);
				$("#examTd").show();
				$("#collegeTd").show();
				$("#pushTagTd").hide();
				$("#pushTagTd2").show();
				$("#contentTd").show();
				
			}else if(data.pushType == 11){
				createSelObj($("#selExamtype"), 101);
				//设置Tag和院校ID
				initColleAndTag(data.pushTag);
				$("#examTd").show();
				$("#collegeTd").show();
				$("#pushTagTd").hide();
				$("#pushTagTd2").show();
				$("#contentTd").hide();
				
			}
			//给推送类型赋事件
			$("#selPushtype").change(function(){
				var selPushtype = $(this).val();
				if(selPushtype == 1)
				{
					$("#examTd").show();
					$("#collegeTd").hide();
					$("#pushTagTd2").hide();
					$("#pushTagTd").show();
					$("#contentTd").show();
					//$("#contentTd2").hide();
				}else if(selPushtype == 9) {
					$("#examTd").show();
					$("#collegeTd").show();
					$("#pushTagTd").hide();
					$("#pushTagTd2").show();
					$("#contentTd").show();
					$("#pushTag2").val("");
					$("#collegeId").val("");
					//$("#contentTd2").hide();
				}else{
					$("#examTd").show();
					$("#collegeTd").show();
					$("#pushTagTd").hide();
					$("#pushTagTd2").show();
					$("#contentTd").hide();
					$("#collegeId").val("");
					$("#pushTag2").val("");
					
					//$("#contentTd2").show();
					
				}
			});
			//给考试类型赋事件
			$("#selExamtype").change(function(){
				var selPushtype = $(this).val();
				initSelectArea(selPushtype);
			});
			editor.html(data.content);
		});
	}
	
	/**
	 * 跟新操作
	 * @param editor
	 */
	function doCustomPushUpdate(editor,id){
		doPushAdd(editor,id);
	}

	
	/**
	 * 根据Tag值来设置选择项目
	 * @param tags
	 */
	function initTag(examType,tags){
		$("#infotype").empty();
		$("#infotype").append("<input style='width:55px;color:blue;border-left:0;border-right:0; border-top:0; border-bottom: 0;float:left' value=\"未选类别：\" />");
		$("#saveinfotype").empty();
		$("#saveinfotype").append("<input style='width:55px;color:blue;border-left:0;border-right:0; border-top:0; border-bottom: 0;float:left' value=\"已选类别：\" />");
		var taglist = tags.split(",");
		CustomPushDS.findinfoTypeByExam(examType,function(data){
			var supplierStr =" ";
			for ( var i = 0; i < data.length; i++) {
				var id = data[i].id;
				var name = data[i].tabname;
				var index = 0;
				for(var j =0;j<taglist.length;j++){
					if(id == taglist[j].split("_")[1]){
						var atr = "<a id='c_n_"+id+"' title='"+name+"' href='javascript:void(0);' onclick=\"notselecttype('"+id+"','"+name+"')\" name=\"savetype\" categoryId=\""+id+"\"><span>"+name+"</span><em></em></a>";
						$("#saveinfotype").append(atr);
						index ++;
					}else{
					}
				}
				if(index == 0){
					var atr = "<a id='c_"+id+"' title='"+name+"' href='javascript:void(0);' onclick=\"selecttype('"+id+"','"+name+"')\"><span>"+name+"</span><em></em></a>";
					$("#infotype").append(atr);
				}
			}
		});
	}
	/**
	 * 根据Tag值来设置院校ID
	 * @param tags
	 */
	function initColleAndTag(tags){
		var taglist = tags.split(",");
		var collegeId = "";
		for(var i=0;i<taglist.length;i++){
			collegeId += taglist[i].split("_")[1]+",";
		}
		collegeId = collegeId.substring(0, collegeId.length-1);
		$("#collegeId").val(collegeId);
		$("#pushTag2").val(tags);
	}
	
	
	
//============================================修改页面的js方法们 end============================================

