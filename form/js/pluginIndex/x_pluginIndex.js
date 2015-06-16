var pluginIndexForm = new autoForm("#frmPluginIndex");

/*****************查询列表***********************/
/**
 * 初始化游客访问列表页面
 * @return
 */
function initPluginIndexList(){
	
	$("#divTip").dialog( {
		autoOpen : false,
		height : 200,
		width : 550,
		modal : true,
		buttons : {}
	});
	
	$("#searchconds button").click(function() {
		doPluginIndexList(1);
	});
	doPluginIndexList(1);
}

/**
 * 查询所有的游客访问
 * @return
 */
function doPluginIndexAll(){
	$("#txtName").val("");
	doPluginIndexList(1);
}

/**
 * 根据页码查询游客访问列表
 * @param page
 * @return
 */
function doPluginIndexList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	//alert("doPluginIndexList");

	var name = $("#txtName").val();
	var pluginIndex = {};
	pluginIndex.name = name;
	pluginIndex.pagestart = (page - 1) * sysPageSize;
	pluginIndex.pagesize = sysPageSize;
	PluginIndexDS.countPluginIndexs(pluginIndex, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		PluginIndexDS.findAllPluginIndexs(pluginIndex, function(data) {
			if (!data)
				return;
			for ( var i = 0; i < data.length; i++) {
				var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "")
						+ ">";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].name + "&nbsp;</td>";
				atr += "<td align=\"center\">" + omit(data[i].description, "")
						+ "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + getActionTd(data[i].id)
						+ "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doPluginIndexList(?)", count, page);
			buildPagesStyle();
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
	rok = haveRight("pluginIndex.update");
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

/****************查询结束*****************************/

/****************添加********************************/
/**
 * 跳到游客访问新增界面
 * @return
 */
function hrefAdd(){
	if (!haveRight("pluginIndex.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("pluginIndexAdd", "新增游客访问");
	if (idx == -1)
		return;
	parent.frames["pluginIndexAdd"].doPluginIndexBeforeAdd();
}

var pluginIndexForm = new autoForm("#frmPluginIndex");

/**
 * 游客访问添加界面初始化
 * @return
 */
function initPluginIndexAdd(){
	
	$("#btnSubmit").click(function() {
		doPluginIndexAdd();
	});
	doPluginIndexBeforeAdd();
}

function doPluginIndexBeforeAdd(){
	
	var plugin = {};
	PluginDS.findAllPlugins(plugin, function(data){
		if (!data) 
			return;
		for (var i=0; i<data.length; i++) {
			var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
			atr += "<td align=\"center\">";
			atr += "<input type='checkbox' value="+data[i].id+" name='select'/>"
			atr += "&nbsp;</td>";
			atr += "<td align=\"center\">" + data[i].name + "&nbsp;</td>";
			atr += "</tr>";
			$("#showlists").append(atr);
		}
	});
	
}

/**
 * 执行添加逻辑
 * @return
 */
function doPluginIndexAdd(){
	
	if (!pluginIndexForm.valid()) {
		return false;
	}
	var pluginIndex = pluginIndexForm.toBean();
	
	//var pluginIndex = {};
	var name = $("#txtName").val();
	pluginIndex.name = name;
	var des = $("#txtDescription").val();
	if(des.length>125){
		alert("描述最多125个字符!");return;
	}
	pluginIndex.description = $("#txtDescription").val();
	
	var  pluginIds = "";
	$("input[name='select']:checked").each(function(){
		var select = this.value;
		pluginIds += select + ",";
	});
	pluginIds = pluginIds.substring(0, pluginIds.length-1);
	pluginIndex.ids = pluginIds;
	
	PluginIndexDS.addPluginIndex(pluginIndex, function(data){
		if(data == 0)
		{
			alert("此游客访问已经存在,请重新输入！");
		}
		else if(data == 1)
		{
			alert("游客访问添加成功！！");
			parent.removeTab("pluginIndexAdd");
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
 * 初始化游客访问更新页面
 * @return
 */
function initPluginIndexUpdate(){
	
	$("#btnSubmit").click(function() {
		doPluginIndexUpdate();
	});
	// thirdProvideForm.readonly("#txtImg");
	var id = getArgFromHref("id");
	doPluginIndexBeforeUpdate(id);
}

function doPluginIndexBeforeUpdate(id){
	
	var plugin = {};
	PluginDS.findAllPlugins(plugin, function(data){
		if (!data) 
			return;
		for (var i=0; i<data.length; i++) {
			var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
			atr += "<td align=\"center\">";
			atr += "<input type='checkbox' id="+data[i].id+" value="+data[i].id+" name='select'/>"
			atr += "&nbsp;</td>";
			atr += "<td align=\"center\">" + data[i].name + "&nbsp;</td>";
			atr += "</tr>";
			$("#showlists").append(atr);
		}
	});
	
	setTimeout("select("+id+")", 1000);
	
}

function selectPlugin(ids){
	alert("d"+ids);
	$("input[name='select']").each(function(){
		var id = this.value;
		var pluginArr = new Array();
		pluginArr = ids.split(",");
		for(var i=0;i<pluginArr.length;i++){
			if(pluginArr[i] == id){
				$("#"+id).attr("checked", true);
			}
		}
	});
}

function select(id){
	
	PluginIndexDS.findPluginIndex(id, function(dataSelect) {
		
		var ids = null;
		if (dataSelect) {
			$("#txtId").val(dataSelect.id);
			$("#txtName").val(dataSelect.name);
			$("#txtDescription").val(dataSelect.description);
			ids = dataSelect.ids;
			$("input[name='select']").each(function(){
				var id = this.value;
				var pluginArr = new Array();
				pluginArr = dataSelect.ids.split(",");
				for(var i=0;i<pluginArr.length;i++){
					if(pluginArr[i] == id){
						$("#"+id).attr("checked", true);
					}
				}
			});
		}
	});
}

function doPluginIndexUpdate(){
	
	if (!pluginIndexForm.valid()) {
		return;
	}
	var des = $("#txtDescription").val();
	if(des.length>125){
		alert("描述最多125个字符!");return;
	}
	var pluginIndex = {};
	pluginIndex.name = $("#txtName").val();
	pluginIndex.description = $("#txtDescription").val();
	pluginIndex.id = $("#txtId").val();
	
	var  pluginIds = "";
	$("input[name='select']:checked").each(function(){
		var select = this.value;
		pluginIds += select + ",";
	});
	pluginIds = pluginIds.substring(0, pluginIds.length-1);
	pluginIndex.ids = pluginIds;

	PluginIndexDS.updatePluginIndex(pluginIndex, function(data) {
		if (data) {
			alert("修改插件信息成功!");
			parent.removeTab('pluginIndexUpdate');
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
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("pluginIndexUpdate", "修改游客访问信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pluginIndexUpdate"], "?id=" + id);
}

/**
 * 预加载数据 更新界面
 * @return
 */
function doPluginCateBeforeUpdate(id){
	
	var pluginIndex = {};
	pluginIndex.id = id;
	PluginIndexDS.findAllPluginIndexs(pluginIndex, function(data){
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
	var id = $.trim($(tr).find("td").eq(0).text());
	var pluginIndex = {};
	pluginIndex.id = id;
	if (confirm("是否确认删除该游客访问?")){
		PluginIndexDS.deletePluginIndex(pluginIndex, function(data){
			if(data){
				alert("删除成功！");
				doPluginIndexList(1);
			}
		});
	}
}

/*************************删除end************************************/

