var frmInformationTab = new autoForm("#frmInformationTab");
var frmCollegeTab = new autoForm("#frmCollegeTab");

/**
 * 初始化插件模版
 * @return
 */
function initPluginTemplateList()
{
	
	//插件Id
	var id = getArgFromHref("id");
	$("#pluginId").val(id);
	initDivDialog();
	
	doPluginTabAdd(id);
	
	
	$(function() {
		$("#showLists").sortable
		({
			items: "tr",
			delay: 2, //为防止与点击事件冲突，延时2秒
			axis: "y",
			opacity: 0.5 //已透明度0.35随意拖动
		});
		$("#showLists").disableSelection();
	})
	
	doPluginTemplateListBefore();
	
}

function sortInformationSubmit()
{
	var ids = [];
	$("#showLists").find("tr").each(function() {
		ids.push($.trim($(this).find("td").eq(0).text()));
	});
	PluginDS.doSortInformationTab(ids, function(data) {
		if (data) {
			alert("保存资讯Tab页排序成功!");
			doPluginTemplateListBefore();
		}
	});
}

function sortCollegeSubmit()
{
	var ids = [];
	$("#showLists").find("tr").each(function() {
		ids.push($.trim($(this).find("td").eq(0).text()));
	});
	PluginDS.doSortCollegeTab(ids, function(data) {
		if (data) {
			alert("保存院校Tab页排序成功!");
			doPluginTemplateListBefore();
		}
	});
}


function informationTabAddSubmit()
{
	var id = getArgFromHref("id");
	var informationTab = {};
	if (!frmInformationTab.valid()) {
		return false;
	}
	informationTab = frmInformationTab.toBean();
	var txtInfoTabName = $("#txtInfoTabName").val();
	var txtInfoIds = $("#txtInfoIds").val();
	informationTab.tabname = txtInfoTabName;
	informationTab.iids = txtInfoIds;
	informationTab.pluginId = id
	informationTab.type = $("#examType").val();
	
	PluginDS.addInformationTab(informationTab, function(data){
		if(data)
		{
			$("#informationTabAdd").dialog("close");
			alert("新增资讯Tab页成功");
			doPluginTemplateListBefore();
		}
	});
}

function collegeTabAddSubmit()
{
	
		
	var CollegeTab = {};
	var id = getArgFromHref("id");
//		var tabname = $("#txtCollegeName").val();
//	if (!frmCollegeTab.valid()) {
//		return false;
//	}
	CollegeTab = frmCollegeTab.toBean();
	var tabDefindId = $("#collegeTabSelect").val();
//		CollegeTab.tabname = tabname;
	CollegeTab.definedId = tabDefindId;
	CollegeTab.pluginId = id
	CollegeTab.collegetype = $("#examType").val();
	
	PluginDS.addCollegeTab(CollegeTab, function(data){
		if(data)
		{
			alert("新增院校Tab页成功");
			doPluginTemplateListBefore();
			$("#collegeTabAdd").dialog("close");
		}
	});
}

function informationClose()
{
	$("#collegeTabAdd").dialog("close");
}

function doPluginTabAdd(id)
{
	//新增资讯Tab
	$("#hrefInformationAdd").click(function(){
		$("#txtInfoTabName").val('');
		$("#txtInfoIds").val('');
		$("#btnInformationSubmit").show();
		$("#btnInformationUpdate").hide();
		$("#ui-id-1").text("新增资讯Tab页");		
		$("#informationTabAdd").dialog("open");
		
	});
	
	//新增院校Tab
	$("#hrefCollegeAdd").click(function(){
		
		$("#btnCollegeSubmit").show();
		$("#btnCollegeUpdate").hide();
		initCollegeSelect();
		$("#ui-id-2").text("新增院校Tab页");		
		$("#collegeTabAdd").dialog("open");
		
	});
}

function initCollegeSelect()
{
	
	PluginDS.selectAllCollegeTabDefine(function(data){
		
		if(data)
		{
			$("#collegeTabSelect").empty();
			var options = '';
			for(var i = 0; i < data.length; i++)
			{
				options += '<option value=' + data[i].id + '>' + data[i].tabName + '</option>';
			}
			$("#collegeTabSelect").append(options);
		}
	});
}

function initDivDialog()
{
	
	//初始化资讯Tab添加对话框
	$("#informationTabAdd").dialog( {
		autoOpen : false,
		height : 400,
		width : 550,
		modal : true,
		buttons : {}
	});
	
	//初始化院校Tab添加对话框
	$("#collegeTabAdd").dialog( {
		autoOpen : false,
		height : 400,
		width : 550,
		modal : true,
		buttons : {}
	});
}

function doPluginTemplateListBefore()
{
	
	//插件Id
	var id = getArgFromHref("id");
	
	PluginDS.getPlugin(id, function(data){
		if(data)
		{	
			$("#examType").val(data.examtype);
			var template = data.templateId;
			if(template == "Information")
			{
				
				$("#hrefCollegeAdd").hide();
				$("#sortCollegeSubmit").hide();
				
				var head = '';
				head += '<tr bgcolor="#cccccc">';
				head += '<td align="center">编号</td>';
				head += '<td align="center">名称</td>';
				head += '<td align="center">类型</td>';
				head += '<td align="center">操作</td>';
				head += '</tr>';
				$("#showHead").html(head);
				
				PluginDS.selectInformationTabList(id, function(data){
					if (!data)
						return;
					var body = '';
					for ( var i = 0; i < data.length; i++) {
						body += "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "")
								+ ">";
						body += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
						body += "<td align=\"center\">" + data[i].tabname + "&nbsp;</td>";
						body += "<td align=\"center\">" + data[i].name
								+ "&nbsp;</td>";
						body += "<td align=\"center\" nowrap>" + getInformationActionTd(data[i])
								+ "&nbsp;</td>";
						body += "</tr>";
					}
					$("#showLists").html(body);
				});
				
			}else if(template == "College")
			{
				$("#hrefInformationAdd").hide();
				$("#sortInformationSubmit").hide();
				
				var head = '';
				head += '<tr bgcolor="#cccccc">';
				head += '<td align="center">编号</td>';
				head += '<td align="center">名称</td>';
				head += '<td align="center">类型</td>';
				head += '<td align="center">操作</td>';
				head += '</tr>';
				$("#showHead").html(head);
				
				PluginDS.selectCollegeTabList(id, function(data){
					if (!data)
						return;
					var body = '';
					for ( var i = 0; i < data.length; i++) {
						body += "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "")
								+ ">";
						body += "<td align=\"center\">" + data[i].tabid + "&nbsp;</td>";
						body += "<td align=\"center\">" + data[i].tabname + "&nbsp;</td>";
						body += "<td align=\"center\">" + data[i].name
								+ "&nbsp;</td>";
						body += "<td align=\"center\" nowrap>" + getCollegeActionTd(data[i])
								+ "&nbsp;</td>";
						body += "</tr>";
					}
					$("#showLists").html(body);
				});
			}
		}
	});
}


function getInformationActionTd(data) {
	var rok = false;
	var atd = "";
	rok = haveRight("plugin.template");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefInfoTabUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("push.delete");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefInfoTabDelete(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/del" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "删除" : "不可删除") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	return atd;
}

function getCollegeActionTd(data) {
	var rok = false;
	var atd = "";
	rok = haveRight("plugin.template");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefCollegeUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("push.delete");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefCollegeDelete(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/del" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "删除" : "不可删除") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	if(data.parameter == "search")
	{
		atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefSearchManage(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/reset" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "搜索区域管理" : "不可管理搜索区域") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	}
	return atd;
	
}

function hrefInfoTabUpdate(obj)
{
	
	
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	$("#tabId").val(id);
	
	initInfoTabBeforeUpdate(id);
	$("#ui-id-1").text("修改资讯Tab页");	
	$("#btnInformationSubmit").hide();
	$("#btnInformationUpdate").show();
	$("#informationTabAdd").dialog("open");
}

function informationTabUpdateSubmit(obj)
{
	var informationTabId = $("#tabId").val();
	
	var informationTab = {};
	if (!frmInformationTab.valid()) {
		return false;
	}
	informationTab = frmInformationTab.toBean();
	var txtInfoTabName = $("#txtInfoTabName").val();
	var txtInfoIds = $("#txtInfoIds").val();
	informationTab.tabname = txtInfoTabName;
	informationTab.iids = txtInfoIds;
	informationTab.id = informationTabId;
	
	PluginDS.updateInformationTab(informationTab, function(data){
		if(data)
		{
			$("#informationTabAdd").dialog("close");
			alert("修改资讯Tab页成功");
			doPluginTemplateListBefore();
		}
	});
}
 
function initInfoTabBeforeUpdate(id)
{
	
	PluginDS.findInformationTab(id, function(data){
		$("#txtInfoTabName").val(data.tabname);
		$("#txtInfoIds").val(data.iids);
	});
}

function hrefInfoTabDelete(obj)
{
	
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	
	PluginDS.deleteInformationTab(id, function(data){
		if(data)
		{
			alert("删除资讯Tab页成功");
			doPluginTemplateListBefore();
		}
	});
}

function informationTabClose()
{
	$("#informationTabAdd").dialog("close");
}

function hrefCollegeUpdate(obj)
{
	
	
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	$("#tabId").val(id);
	
	$("#ui-id-2").text("修改院校Tab页");	$("#btnCollegeSubmit").hide();
	$("#btnCollegeUpdate").show();
	$("#collegeTabAdd").dialog("open");
	initCollegeTabBeforeUpdate(id);
}

function collegeTabUpdateSubmit(obj)
{
	var tabId = $("#tabId").val();
	
	var collegeTab = {};
	if (!frmCollegeTab.valid()) {
		return false;
	}
	CollegeTab = frmCollegeTab.toBean();
	collegeTab.definedId = $("#collegeTabSelect").val();
	collegeTab.tabid = tabId;
	
	PluginDS.updateCollegeTab(collegeTab, function(data){
		if(data)
		{
			$("#collegeTabAdd").dialog("close");
			alert("修改院校Tab页成功");
			doPluginTemplateListBefore();
		}
	});
}
 
function initCollegeTabBeforeUpdate(id)
{
	initCollegeSelect();
	
	PluginDS.selectCollegeTabById(id, function(data){
//		$("#collegeTabSelect").text(data.tabname);
		$("#collegeTabSelect option").each(function(){  
			if($(this).text() == data.tabname)
			{
				$(this).attr("selected",true);
			}  
		});

	});
}

function hrefCollegeDelete(obj)
{
	
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	
	PluginDS.deleteCollegeTab(id, function(data){
		if(data)
		{
			alert("删除院校Tab页成功");
			doPluginTemplateListBefore();
		}
	});
}

function collegeTabClose()
{
	$("#collegeTabAdd").dialog("close");
}

function hrefSearchManage(obj)
{
	
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("pluginTemplateSearchArea", "定义插件搜索区域", "?tabId=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pluginTemplateSearchArea"], "?tabId=" + id);
}

function initPluginTemplateSearchAreaList()
{
	
	$(function(){
		
		$("#showLists").sortable
		({
			items: "tr",
			delay: 2, //为防止与点击事件冲突，延时2秒
			axis: "y",
			opacity: 0.5 //已透明度0.35随意拖动
		});
		$("#showLists").disableSelection();
	});

	//初始化对话框
	$("#templateSearchAreaAdd").dialog( {
		autoOpen : false,
		height : 400,
		width : 550,
		modal : true,
		buttons : {}
	});
	
	$("#searchAreaManage").dialog( {
		autoOpen : false,
		height : 400,
		width : 550,
		modal : true,
		buttons : {}
	});
	
	//院校插件tabId  
	var tabId = getArgFromHref("tabId");
	$("#hrefCollegeSearchAreaAdd").click(function(){
		$("#ui-id-1").text("新增搜索区域");
		$("#btnSearchAreaUpdate").hide();
		$("#btnSearchAreaSubmit").show();
		$("#searchAreaTitle").val('');
		$("#tabId").val(tabId);
		$("#templateSearchAreaAdd").dialog("open");
	});
		
	doPluginTemplateSearchAreaBefore();
};

function searchAreaAddSubmit()
{
	var searchWidgetGroup = {};
	searchWidgetGroup.title = $("#searchAreaTitle").val();
	searchWidgetGroup.tabid = $("#tabId").val();
	PluginDS.addSearchWidgetGroup(searchWidgetGroup, function(data){
		if(data)
		{
			$("#templateSearchAreaAdd").dialog("close");
			doPluginTemplateSearchAreaBefore();
			alert("新增搜索区域成功");
		}
	});
}

function doPluginTemplateSearchAreaBefore()
{
	
	//院校插件tabId
	var tabId = getArgFromHref("tabId");
	
	var head = '';
	head += '<tr bgcolor="#cccccc">';
	head += '<td align="center">编号</td>';
	head += '<td align="center">标题</td>';
	head += '<td align="center">操作</td>';
	head += '</tr>';
	$("#showHead").html(head);
	
	PluginDS.selectSearchWidgetGroupList(tabId, function(data){
		if (!data)
			return;
		var body = '';
		for ( var i = 0; i < data.length; i++) {
			body += "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "")
					+ ">";
			body += "<td align=\"center\">" + data[i].swgid + "&nbsp;</td>";
			body += "<td align=\"center\">" + data[i].title + "&nbsp;</td>";
			body += "<td align=\"center\" nowrap>" + getSearchActionTd(data[i])
					+ "&nbsp;</td>";
			body += "</tr>";
		}
		$("#showLists").html(body);
	});
}

function getSearchActionTd(data) {
	var rok = false;
	var atd = "";
	rok = haveRight("plugin.template");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefSearchUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("push.delete");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefSearchDelete(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/del" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "删除" : "不可删除") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefSearchWidgetManage(this);return false;\">" : ">") 
	+ "<img src=\"../../css/former/images/reset" 
	+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "区域管理" : "不可管理") 
	+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	return atd;
}

function hrefSearchUpdate(obj)
{
	
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	
	PluginDS.selectSearchWidgetGroupById(id, function(data){
		$("#searchAreaTitle").val(data.title);
	});
	$("#btnSearchAreaSubmit").hide();
	$("#btnSearchAreaUpdate").show();
	$("#ui-id-1").text("修改搜索区域");	
	$("#searchAreaId").val(id);
	$("#templateSearchAreaAdd").dialog("open");
}

function searchAreaUpdateSubmit()
{
	var searchWidgetGroup = {};
	searchWidgetGroup.title = $("#searchAreaTitle").val();
	searchWidgetGroup.swgid = $("#searchAreaId").val();
	PluginDS.updateSearchWidgetGroup(searchWidgetGroup, function(data){
		if(data)
		{
			$("#templateSearchAreaAdd").dialog("close");
			doPluginTemplateSearchAreaBefore();
			alert("修改搜索区域成功");
		}
	});
}

function hrefSearchDelete(obj)
{
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	
	PluginDS.deleteSearchWidgetGroup(id, function(data){
		if(data)
		{
			alert("删除搜索区域成功");
			doPluginTemplateSearchAreaBefore();
		}
	});
}

function hrefSearchWidgetManage(obj)
{
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	
	$("#ui-id-2").text("区域管理");
	$("#searchAreaId").val(id);
	initSearchWidgetManageBefore(id);
	$("#searchAreaManage").dialog("open");
}

function sortSearchAreaSubmit()
{
	var ids = [];
	$("#showLists").find("tr").each(function() {
		ids.push($.trim($(this).find("td").eq(0).text()));
	});
	PluginDS.doSortSearchWidgetGroup(ids, function(data) {
		if (data) {
			alert("保存搜索区域排序成功!");
			doPluginTemplateSearchAreaBefore();
		}
	});
}


function searchAreaManageSubmit()
{
	var ids = '';
	$("input[name='searchWidget']:checked").each(function(){
		ids += $(this).val() + ",";
	});
	ids = ids.substring(0, ids.length-1);
	
	var searchWidgetGroup = {};
	searchWidgetGroup.swgid = $("#searchAreaId").val();
	searchWidgetGroup.swIds = ids;
	PluginDS.manageSearchWidgetGroup(searchWidgetGroup, function(data){
		if(data)
		{
			$("#searchAreaManage").dialog("close");
			alert("区域搜索项定义成功");
		}
	});
}

function initSearchWidgetManageBefore(id)
{
	DWREngine.setAsync(false);
	PluginDS.selectAllSearchWidget(function(data){
		if(data)
		{
			var combox1 = '';
			var combox2 = '';
			var combox3 = '';
			var minbox = '';
			var maxbox = '';
			var textfield = '';
			for(var i = 0; i < data.length; i++)
			{
				if(data[i].type == "combobox1")
				{
					combox1 += '<p><input type="checkbox" name="searchWidget" value='+data[i].swid+' />&nbsp;<select value="" name="" autocomplete="off"><option value="" selected="selected">'+data[i].txt+'</option></select></p>';
				}else if(data[i].type == "combobox2")
				{
					combox2 += '<p><input type="checkbox" name="searchWidget" value='+data[i].swid+' />&nbsp;<select value="" name="" autocomplete="on"><option value="" selected="selected">'+data[i].txt+'</option></select></p>';
				}else if(data[i].type == "combobox3")
				{
					combox3 += '<p><input type="checkbox" name="searchWidget" value='+data[i].swid+' />&nbsp;<select value="" name=""><option value="" selected="selected">'+data[i].txt+'</option></select></p>';
				}else if(data[i].type == "minbox")
				{
					minbox += '<p><input type="checkbox" name="searchWidget" value='+data[i].swid+' />&nbsp;<select value="" name=""><option value="" selected="selected">'+data[i].txt+'</option></select></p>';
				}else if(data[i].type == "maxbox")
				{
					maxbox += '<p><input type="checkbox" name="searchWidget" value='+data[i].swid+' />&nbsp;<select value="" name=""><option value="" selected="selected">'+data[i].txt+'</option></select></p>';
				}else if(data[i].type == "textfield")
				{
					textfield += '<p><input type="checkbox" name="searchWidget" value='+data[i].swid+' />&nbsp;<input type="text" value='+data[i].txt+' class="inputText"/></p>';
				}
			}
			var html = combox1 + combox2 + combox3 + minbox + maxbox + textfield;
			$("#widgetArea").html(html);
		}
	});
	
	PluginDS.selectSearchWidgetIdListByGroupId(id, function(data){
		var selectIds = [];
		for (var i = 0; i < data.length; i++) 
		{
			selectIds.push(data[i]);
		}
//		alert(selectIds);
		$("input[name='searchWidget']").each(function(){
			var id = parseInt($(this).val());
//			alert(this.checked);
			if ($.inArray(id, selectIds) != -1)
			{
				//alert(id);
//				$(this).attr("checked", true);
				this.checked = true;
			}
			else
			{
//				$(this).attr("checked", false);
				this.checked = false;
			}
		 })
	});
	DWREngine.setAsync(true);
}

function searchAreaClose()
{
	$("#templateSearchAreaAdd").dialog("close");
}

function searchAreaManageClose()
{
	$("#searchAreaManage").dialog("close");
}







