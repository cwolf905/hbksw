var roleForm = new autoForm("#frmRole");

/*****************查询列表***********************/
/**
 * 初始化角色列表页面
 * @return
 */
function initRoleList(){
	
	$("#divTip").dialog( {
		autoOpen : false,
		height : 200,
		width : 550,
		modal : true,
		buttons : {}
	});
	$("#searchconds button").click(function() {
		doRoleList(1);
	});
	doRoleList(1);
}

/**
 * 查询所有的角色
 * @return
 */
function doRoleAll(){
	$("#txtName").val("");
	doRoleList(1);
}

/**
 * 根据页码查询角色列表
 * @param page
 * @return
 */
function doRoleList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	//alert("doRoleList");

	var name = $("#txtName").val();
	var role = {};
	role.name = name;
	role.pagestart = (page - 1) * sysPageSize;
	role.pagesize = sysPageSize;
	AdminUserDS.countRoles(role, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		AdminUserDS.findRolesByPage(role, function(data) {
			if (!data)
				return;
			for ( var i = 0; i < data.length; i++) {
				var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "")
						+ ">";
				atr += "<td align=\"center\" width='50px'>" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].name + "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + getActionTd(data[i].id)
						+ "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doRoleList(?)", count, page);
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
	rok = haveRight("role.update");
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
	atd += "<a href=\"#\""
		+ (rok ? " onclick=\"hrefRightManage(this);return false;\">" : ">")
		+ "<img src=\"../../css/former/images/reset" + (rok ? "" : "2")
		+ ".gif\" title=\"" + "功能权限分配"
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	return atd;
}
/****************查询结束*****************************/

/************分配权限******************/
function hrefRightManage(obj){
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	if (!haveRight("role.manage")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("roleRightManage", "角色权限分配", "?roleId=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["roleRightManage"], "?roleId=" + id);
//	parent.frames["roleRightManage"].doRoleRightBeforeManage();
}

function hrefRightManage2(obj){
	if (!haveRight("role.manage")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("roleRightManage", "角色权限分配");
	if (idx == -1)
		return;
	parent.frames["roleRightManage"].doRoleRightBeforeManage();
}

/****************添加********************************/
/**
 * 跳到角色新增界面
 * @return
 */
function hrefAdd(){
	if (!haveRight("role.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("roleAdd", "新增角色");
	if (idx == -1)
		return;
	parent.frames["roleAdd"].doRoleBeforeAdd();
}

var roleForm = new autoForm("#frmRole");

/**
 * 角色添加界面初始化
 * @return
 */
function initRoleAdd(){
	
	//校验登录名是否已经存在
//	var flag = checkInputAdd();
	$("#btnSubmit").click(function() {
		var name = $("#txtRoleName").val();
		AdminUserDS.getRoleByName(name, function(data){
			if(data)
			{
				alert("该角色已存在，请重新输入");
				return;
			}
			doRoleAdd();
		});
	});
	doRoleBeforeAdd();
}

function doRoleBeforeAdd(){
	
	//初始化角色下拉框
	initRoleSelect()
}

/**
 * 初始化角色下拉框
 * @return
 */
function initRoleSelect()
{
	AdminUserDS.findAllRole(function(data)
	{
		var roleSelect = "";
		for ( var i = 0; i < data.length; i++) {
			
			roleSelect += "<option value='" +data[i].id + "'>"+ data[i].name +"</option>";
		}
		//alert(supplierStr);
		$("#roleSelect").append(roleSelect);
	});
}

function checkInputAdd(){
	var flag = true;
	//手机号码
	$("#txtRoleName").blur(function(){
		AdminUserDS.getRoleByName(this.value, function(data){
			if(null != data)
			{
				$("#roleNameCheckImg").remove();
				var img = "<img id='roleNameCheckImg' src='../images/wrong.png' />";
				$("#roleNameTR").append(img);
				flag = false;
			}else
			{
				$("#roleNameCheckImg").remove();
				var img = "<img id='roleNameCheckImg' src='../images/right.png' />";
				$("#roleNameTR").append(img);
				flag = true;
			}
		});
	});

	return flag;
}

function checkInputUpdate(){
	var flag = true;
	$("#txtRoleName").blur(function(){
		var value = this.value;
		AdminUserDS.getRoleByName(value, function(data)
		{
			if(null != data)
			{
				if(value == data.name)
				{
					$("#roleNameCheckImg").remove();
					var img = "<img id='roleNameCheckImg' src='../images/right.png' />";
					$("#roleNameTR").append(img);
					flag = true;
				}else
				{
					$("#roleNameCheckImg").remove();
					var img = "<img id='roleNameCheckImg' src='../images/wrong.png' />";
					$("#roleNameTR").append(img);
					flag = false;
				}
			}else
			{
				$("#roleNameCheckImg").remove();
				var img = "<img id='roleNameCheckImg' src='../images/right.png' />";
				$("#roleNameTR").append(img);
				flag = true;
			}
		});
	});

	return flag;
}

/**
 * 执行添加逻辑
 * @return
 */
function doRoleAdd(){
	
	if (!roleForm.valid()) {
		return false;
	}
	
	var role = roleForm.toBean();
	role.name = $("#txtRoleName").val();
	role.flag = 0;
	
	AdminUserDS.addRole(role, function(data){
		
		alert("添加角色成功！！");
		parent.removeTab("roleAdd");
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
 * 初始化角色更新页面
 * @return
 */
function initRoleUpdate(){
	
	var flag = checkInputUpdate();
	$("#btnSubmit").click(function() 
	{
		if(flag == true)
		{
			doRoleUpdate();
		}
	});
	// thirdProvideForm.readonly("#txtImg");
	var id = getArgFromHref("id");
	doRoleBeforeUpdate(id);
}

function doRoleBeforeUpdate(id){
	
	AdminUserDS.getRole(id, function(data) {
		if (data) {
			$("#txtId").val(data.id);
			$("#txtRoleName").val(data.name);
		}
	});
}

function doRoleUpdate(){
	
	if (!roleForm.valid()) {
		return;
	}

	var role = roleForm.toBean();
	role.id = getArgFromHref("id");
	role.name =$("#txtRoleName").val();

	AdminUserDS.updateRole(role, function(data) {
		if (data) {
			alert("修改角色信息成功!");
			parent.removeTab('roleUpdate');
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
	var idx = parent.addTab("roleUpdate", "修改角色信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["roleUpdate"], "?id=" + id);
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
	if (confirm("是否确认删除该角色?")){
		AdminUserDS.deleteRole(id, function(data){
			if(data){
				alert("删除成功！");
				doRoleList(1);
			}
		});
	}
}

/*************************删除end************************************/
/**
 * 初始化角色下拉框
 * @return
 */
function initRoleSelect()
{
	AdminUserDS.findAllRole(function(data)
	{
		var roleSelect = "";
		roleSelect += "<option value='-1'>--请选择--</option>";
		for ( var i = 0; i < data.length; i++) {
			
			roleSelect += "<option value='" +data[i].id + "'>"+ data[i].name +"</option>";
		}
		//alert(supplierStr);
		$("#roleSelect").html(roleSelect);
	});
}

function initRoleRightManage(){
	
	$("#btnSubmit").click(function() {
		doRoleRightManage();
	});
	DWREngine.setAsync(false);
	doRoleRightBeforeManage();
	var roleId = getArgFromHref("roleId");
	$("#roleSelect").val(roleId);
	changeSelect();
	DWREngine.setAsync(true);
	$("#roleSelect").change(function(){
		changeSelect(this);
//		DWREngine.setAsync(true);
	});
	
}

function changeSelect()
{
	var roleId = $("#roleSelect").val();
//	if(-1 == roleId)
//	{
//		return;
//	}
//	DWREngine.setAsync(false);
	AdminUserDS.findRightsByRole(roleId, function(dataSelect){
		var roleArr = [];
		if(null != dataSelect)
		{
			for (var i = 0; i < dataSelect.length; i++) 
			{
				roleArr.push(dataSelect[i].resourceID);
				
				if(null != dataSelect[i].childRights)
				{
					 for(var j = 0; j < dataSelect[i].childRights.length; j++)
					 {
						 roleArr.push(dataSelect[i].childRights[j].resourceID);
					 }
				}
			}
//			alert(roleArr);
			$("input[name='rights']").each(function(){
				var rightId = parseInt($(this).val());
				if ($.inArray(rightId, roleArr) != -1)
				{
//					alert(1);
//					$("#"+rightId).attr("checked", 'true');
					$(this).prop("checked", true);
				}
				else
				{
//					$("#"+rightId).removeAttr("checked");
					$(this).prop("checked", false);
				}
			 })
		}
	});
}

function unCkeckedChild(obj)
{
	
	var value = $(obj).val();
	if($(obj).prop("checked") == false)
	{
		$("input[rel="+value+"]").each(function(){
			$(this).removeAttr("checked");
		});
	}else
	{
		$("input[rel="+value+"]").each(function(){
			$(this).prop("checked", true);
		});
	}
}
function unCkeckedParent(obj)
{
	var value = $(obj).attr("rel");
	var parentChecked = false;
	$("input[rel="+value+"]").each(function(){
		if($(this).prop("checked") == true)
		{
			parentChecked = true;
		}
	});
	if(parentChecked)
	{
//		$("input[value="+ value +"]").removeAttr("checked");
		$("#"+ value).attr("checked", true);
	}
}

//
//function selectRights(roleId){
//	AdminUserDS.findRightsByRole(roleId, function(dataSelect){
//		if(null != dataSelect)
//		{
//			$("#rightsSelect input[name='rights']").each(function(){
//				 
//				 var objId = this.value;
//				 for(var i = 0; i < dataSelect.length; i++)
//				 {
//					 if(objId == dataSelect[i].resourceID)
//					 {
//						 $("#"+objId).attr("checked", true);
//					 }
//				 }
//			 })
//		}
//	});
//}

function doRoleRightBeforeManage(){
	
	initRoleSelect();
	
	AdminUserDS.findAllRights(function(data){
		
		if(data != null)
		{
			
			for (var i=0; i<data.length; i++) 
			{	
				var atr = "";
				atr += '<div class="listDiv">';
				atr += '<div class="titleDiv"><input name="rights" onclick="unCkeckedChild(this)" id='+ data[i].resourceID +' value='+ data[i].resourceID +' type="checkbox"/><span>'+ data[i].resourceName +'</span><img src="../../css/simple/image/show.gif" id='+ data[i].resourceID+"img" +' class="img" onclick="showOrHide(\''+data[i].resourceID+"img"+'\')"/></div>';
				if(null != data[i].childRights)
				{
					for(var j=0; j<data[i].childRights.length; j++)
					{
						atr += '<div class="detailDiv"><input name="rights" onclick="unCkeckedParent(this)" class="childMenu" rel='+ data[i].resourceID +' id='+data[i].childRights[j].resourceID+' value='+ data[i].childRights[j].resourceID +' type="checkbox"/><span>'+ data[i].childRights[j].resourceName +'</span></div>';
					}
				}
				atr += '</div>';
				$(".mainDiv").append(atr);
			}
		}
	});
}

function doRoleRightManage(){
	
	var productBuyWayList = [];
	$("input[name='rights']:checked").each(function(){
		var select = this.value;
		var roleRights = {};
		roleRights.roleid = $("#roleSelect").val();
		roleRights.rightid = select;
		productBuyWayList.push(roleRights);
	});
 	AdminUserDS.manageRoleRights(productBuyWayList, function(data){
 		if(data)
 		{
 			alert("权限分配成功!");
// 			initMenu();
 			parent.parent.frames["menu"].location.reload();
 			parent.removeTab('roleRightManage');
 		}
 	});
}

function showOrHide(id){
		
	 if($("#"+id).parent().next().css("display") != "none"){
				$("#"+id).parent().siblings().hide("slow");
				$("#"+id).attr("src","../../css/simple/image/hide.gif");
			}else{	
				
				$("#"+id).parent().siblings().show("slow");
				$("#"+id).attr("src","../../css/simple/image/show.gif");
			}	
	
}














