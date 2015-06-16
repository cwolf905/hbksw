var pluginCategoryForm = new autoForm("#frmPluginCategory");

/*****************查询列表***********************/
/**
 * 初始化插件类别列表页面
 * @return
 */
function initPluginCategoryList(){
	
	$("#divTip").dialog( {
		autoOpen : false,
		height : 200,
		width : 550,
		modal : true,
		buttons : {}
	});
	
	$(function() {
		$("#showlists").sortable
		({
			items: "tr",
			delay: 2, //为防止与点击事件冲突，延时2秒
			axis: "y",
			opacity: 0.5 //已透明度0.35随意拖动
		});
		$("#showlists").disableSelection();
	});
	
	$("#searchconds button").click(function() {
		doPluginCategoryList(1);
	});
	doPluginCategoryList(1);
}

/**
 * 查询所有的插件类别
 * @return
 */
function doPluginCategoryAll(){
	$("#txtName").val("");
	doPluginCategoryList(1);
}

/**
 * 根据页码查询插件类别列表
 * @param page
 * @return
 */
function doPluginCategoryList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	//alert("doPluginCategoryList");

	var name = $("#txtName").val();
	var pluginCategory = {};
	pluginCategory.name = name;
//	pluginCategory.pagestart = (page - 1) * sysPageSize;
//	pluginCategory.pagesize = sysPageSize;
	PluginCategoryDS.countPluginCategorys(pluginCategory, function(count) {
		if (count == 0) {
//			buildListsBlankHTML();
			return;
		}
		PluginCategoryDS.findAllPluginCategorys(pluginCategory, function(data) {
			if (!data)
				return;
			for ( var i = 0; i < data.length; i++) {
				var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "")
						+ ">";
				atr += "<td align=\"center\" nowrap>" + getOrderTd() + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].name + "&nbsp;</td>";
				atr += "<td align=\"center\">" + omit(data[i].description, "")
						+ "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + getActionTd(data[i].id)
						+ "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
//			buildListsStyle();
//			buildPagesHTML("$doPluginCategoryList(?)", count, page);
//			buildPagesStyle();
		});
	});
}

/**
 * 初始化插件列表界面操作栏
 * @param id
 * @return
 */
function getActionTd(id) {
	var rok = false;
	var atd = "";
	rok = haveRight("pluginCategory.update");
	atd += "<a href=\"#\""
			+ (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">")
			+ "<img src=\"../../css/former/images/edit" + (rok ? "" : "2")
			+ ".gif\" title=\"" + (rok ? "修改" : "不可修改")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	atd += "<a href=\"#\""
		+ (rok ? " onclick=\"hrefDelete(this);return false;\">" : ">")
		+ "<img src=\"../../css/former/images/del2" + (rok ? "" : "2")
		+ ".gif\" title=\"" + (rok ? "删除" : "不可删除")
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	return atd;
}

function getOrderTd() {
	var rok = false;
	var atd = "";
	rok = haveRight("pluginTag.update");
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
		ids.push($.trim($(this).find("td").eq(1).text()));
	});
	PluginCategoryDS.applyPluginCategoryOrder(ids, function(data) {
		if (data) {
			alert("保存插件类别排序成功!");
			doPluginCategoryList(1);
		}
	});
}
/****************查询结束*****************************/
/****************添加********************************/
/**
 * 跳到插件类别新增界面
 * @return
 */
function hrefAdd(){
	if (!haveRight("pluginCategory.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("pluginCategoryAdd", "新增插件类别");
	if (idx == -1)
		return;
	parent.frames["pluginCategoryAdd"].doPluginCategoryBeforeAdd();
}

var pluginCateForm = new autoForm("#frmPluginCategory");

/**
 * 插件类别添加界面初始化
 * @return
 */
function initPluginCategoryAdd(){
	
	$("#btnSubmit").click(function() {
		doPluginCategoryAdd();
	});
	doPluginCategoryBeforeAdd();
}

function doPluginCategoryBeforeAdd(){
	$("#xxx").attr("checked") == "checked";
}

/**
 * 执行添加逻辑
 * @return
 */
function doPluginCategoryAdd(){

	if (!pluginCateForm.valid()) {
		return false;
	}
	var pluginCategory = pluginCateForm.toBean();
	
	//var pluginCategory = {};
	var name = $("#txtName").val();
	pluginCategory.name = name;
	var des = $("#txtDescription").val();
	if(des.length>125){
		alert("描述最多125个字符!");return;
	}
	pluginCategory.description = $("#txtDescription").val();
//	PluginCategoryDS.selectPluginCategoryByName(name, function(data){
//		
//		if(data){
//			alert("此插件类别已经存在,请重新输入！");
//			return;
//		}
//	});
	
	PluginCategoryDS.addPluginCategory(pluginCategory, function(data){
		if(data == 0)
		{
			alert("此插件类别已经存在,请重新输入！");
		}
		else if(data == 1)
		{
			alert("插件类别添加成功！");
			parent.removeTab("pluginCategoryAdd");
		}
	});
}

/**
 * 新增预加载动作
 * @return
 */
function doPluginCateBeforeAdd(){
	
}

/*******************增加end************************/
/*******************修改begin************************/
/**
 * 初始化插件类别更新页面
 * @return
 */
function initPluginCategoryUpdate(){
	
	$("#btnSubmit").click(function() {
		doPluginCategoryUpdate();
	});
	// thirdProvideForm.readonly("#txtImg");
	var id = getArgFromHref("id");
	doPluginCategoryBeforeUpdate(id);
}

function doPluginCategoryBeforeUpdate(id){
	
	PluginCategoryDS.findPluginCategory(id, function(data) {
		if (data) {
			$("#txtId").val(data.id);
			$("#txtName").val(data.name);
			$("#txtDescription").val(data.description);
		}
	});
}

function doPluginCategoryUpdate(){
	
	if (!pluginCategoryForm.valid()) {
		return;
	}
	
	var des = $("#txtDescription").val();
	if(des.length>125){
		alert("描述最多125个字符!");return;
	}
	var pluginCategory = {};
	pluginCategory.name = $("#txtName").val();
	pluginCategory.description = $("#txtDescription").val();
	pluginCategory.id = $("#txtId").val();

	PluginCategoryDS.updatePluginCategory(pluginCategory, function(data) {
		if (data) {
			alert("修改插件信息成功!");
			parent.removeTab('pluginCategoryUpdate');
		}
	});
}

/**
 * 触发更新操作
 * @param obj
 * @return
 */
function hrefUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(1).text());
	var idx = parent.addTab("pluginCategoryUpdate", "修改插件类别信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pluginCategoryUpdate"], "?id=" + id);
}

/**
 * 预加载数据 更新界面
 * @return
 */
function doPluginCateBeforeUpdate(id){
	
	var pluginCategory = {};
	pluginCategory.id = id;
	PluginCategoryDS.findAllPluginCategorys(pluginCategory, function(data){
		if (data) {
			$("#txtId").val(data.id);
			$("#txtName").val(data.name);
			$("#txtDescription").val(data.description);
		}
	});
}

/*************************删除begin************************************/
/**
 * 触发删除操作
 * @param obj
 * @return
 */
function hrefDelete(obj){
	
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(1).text());
	var pluginCategory = {};
	pluginCategory.id = id;
	if (confirm("是否确认删除该插件类别?")){
		PluginCategoryDS.deletePluginCategory(pluginCategory, function(data){
			if(data){
				alert("删除成功！");
				doPluginCategoryList(1);
			}
		});
	}
}

/*************************删除end************************************/

