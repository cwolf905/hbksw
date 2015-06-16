var pluginTagForm = new autoForm("#frmPluginTag");

/*****************查询列表***********************/
/**
 * 初始化插件标签列表页面
 * @return
 */
function initPluginTagList(){
	
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
		doPluginTagList(1);
	});
	doPluginTagList(1);
}

/**
 * 查询所有的插件标签
 * @return
 */
function doPluginTagAll(){
	$("#txtName").val("");
	doPluginTagList(1);
}

/**
 * 根据页码查询插件标签列表
 * @param page
 * @return
 */
function doPluginTagList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	//alert("doPluginTagList");

	var name = $("#txtName").val();
	var pluginTag = {};
	pluginTag.name = name;
	pluginTag.pagestart = (page - 1) * sysPageSize;
	pluginTag.pagesize = sysPageSize;
	PluginTagDS.countPluginTags(pluginTag, function(count) {
		if (count == 0) {
//			buildListsBlankHTML();
			return;
		}
		PluginTagDS.findAllPluginTags(pluginTag, function(data) {
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
//			buildPagesHTML("$doPluginTagList(?)", count, page);
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
	rok = haveRight("pluginTag.update");
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
	PluginTagDS.applyPluginTagOrder(ids, function(data) {
		if (data) {
			alert("保存插件标签排序成功!");
			doPluginTagList(1);
		}
	});
}
/****************查询结束*****************************/

/****************添加********************************/
/**
 * 跳到插件标签新增界面
 * @return
 */
function hrefAdd(){
	if (!haveRight("pluginTag.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("pluginTagAdd", "新增插件标签");
	if (idx == -1)
		return;
	parent.frames["pluginTagAdd"].doPluginTagBeforeAdd();
}

var pluginTagForm = new autoForm("#frmPluginTag");

/**
 * 插件标签添加界面初始化
 * @return
 */
function initPluginTagAdd(){
	
	$("#btnSubmit").click(function() {
		doPluginTagAdd();
	});
	doPluginTagBeforeAdd();
}

function doPluginTagBeforeAdd(){
	
}

/**
 * 执行添加逻辑
 * @return
 */
function doPluginTagAdd(){
	
	if (!pluginTagForm.valid()) {
		return false;
	}
	var pluginTag = pluginTagForm.toBean();
	
	//var pluginTag = {};
	var name = $("#txtName").val();
	pluginTag.name = name;
	
	var des = $("#txtDescription").val();
	if(des.length>125){
		alert("描述最多125个字符!");return;
	}
	pluginTag.description = $("#txtDescription").val();
	
//	PluginTagDS.selectPluginTagByName(name, function(data){
//		
//		if(data){
//			alert("输入的类别名称已存在，请重新输入！");
//		}
//	})
	
	PluginTagDS.addPluginTag(pluginTag, function(data){
		if(data == 0)
		{
			alert("此插件标签已经存在,请重新输入！");
		}
		else if(data == 1)
		{
			alert("插件标签添加成功！！");
			parent.removeTab("pluginTagAdd");
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
 * 初始化插件标签更新页面
 * @return
 */
function initPluginTagUpdate(){
	
	$("#btnSubmit").click(function() {
		doPluginTagUpdate();
	});
	// thirdProvideForm.readonly("#txtImg");
	var id = getArgFromHref("id");
	doPluginTagBeforeUpdate(id);
}

function doPluginTagBeforeUpdate(id){
	
	PluginTagDS.findPluginTag(id, function(data) {
		if (data) {
			$("#txtId").val(data.id);
			$("#txtName").val(data.name);
			$("#txtDescription").val(data.description);
		}
	});
}

function doPluginTagUpdate(){
	
	if (!pluginTagForm.valid()) {
		return;
	}
	var des = $("#txtDescription").val();
	if(des.length>125){
		alert("描述最多125个字符!");return;
	}
	var pluginTag = {};
	pluginTag.name = $("#txtName").val();
	pluginTag.description = $("#txtDescription").val();
	pluginTag.id = $("#txtId").val();

	PluginTagDS.updatePluginTag(pluginTag, function(data) {
		if (data) {
			alert("修改插件信息成功!");
			parent.removeTab('pluginTagUpdate');
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
	var idx = parent.addTab("pluginTagUpdate", "修改插件标签信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pluginTagUpdate"], "?id=" + id);
}

/**
 * 预加载数据 更新界面
 * @return
 */
function doPluginCateBeforeUpdate(id){
	
	var pluginTag = {};
	pluginTag.id = id;
	PluginTagDS.findAllPluginTags(pluginTag, function(data){
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
	var pluginTag = {};
	pluginTag.id = id;
	if (confirm("是否确认删除该插件标签?")){
		PluginTagDS.deletePluginTag(pluginTag, function(data){
			if(data){
				alert("删除成功！");
				doPluginTagList(1);
			}
		});
	}
}

/*************************删除end************************************/

