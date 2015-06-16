function initThirdProvideList() {

	$("#divTip").dialog( {
		autoOpen : false,
		height : 200,
		width : 550,
		modal : true,
		buttons : {}
	});
	
	$("#searchconds button").click(function() {
		doThirdProvideList(1);
	});
	doThirdProvideList(1);
}

function doThirdProvideAll() {
	$("#txtName").val("");
	doThirdProvideList(1);
}

function hrefAdd() {
	if (!haveRight("thirdProvide.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("thirdProvideAdd", "新增第三方");
	if (idx == -1)
		return;
	parent.frames["thirdProvideAdd"].doThirdProvideBeforeAdd();
}

var thirdProvideForm = new autoForm("#frmThirdProvide");

function regex(){
	
	var flag = true;
	//手机号码
	$("#txtTelephone").blur(function(){
		var match = /^(1[3|5|8])[\d]{9}$/;
		if(!match.test(this.value))
		{
			//alert("号码格式不正确，请重新输入！");
			$("#phoneImg").remove();
			var img = "<img id='phoneImg' src='../images/wrong.png' />";
			$("#phone").append(img);
			flag = false;
		}else
		{
			$("#phoneImg").remove();
			var img = "<img id='phoneImg' src='../images/right.png' />";
			$("#phone").append(img);
			flag = true;
		}
	});

	$("#txtEmail").blur(function(){
		//邮箱
		var match = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(this.value != null && this.value != "")
		{
			if(!match.test(this.value))
			{
				//alert("邮箱格式不正确，请重新输入！");
				$("#emailImg").remove();
				var img = "<img id='emailImg' src='../images/wrong.png' />";
				$("#email").append(img);
				flag = false;
			}else
			{
				$("#emailImg").remove();
				var img = "<img id='emailImg' src='../images/right.png' />";
				$("#email").append(img);
				flag = true;
			}
		}
	});
	
	return flag;
}

function initThirdProvideAdd() {
	
	var flag = regex();
	
	$("#btnSubmit").click(function() {
		if(flag)
		{
			doThirdProvideAdd();
		}
	});
	doThirdProvideBeforeAdd();
}

function doThirdProvideBeforeAdd() {
	
}

function doThirdProvideAdd(){
	if (!thirdProvideForm.valid()) {
		return false;
	}
	
	var des = $("#txtLinkname").val();
	if(des.length>25){
		alert("联系人最多25个字符!");return;
	}
	var thirdProvide = thirdProvideForm.toBean();
	
	//var thirdProvide = {};
	thirdProvide.name = $("#txtName").val();
	thirdProvide.telephone = $("#txtTelephone").val();
	thirdProvide.linkname = $("#txtLinkname").val();
	thirdProvide.email = $("#txtEmail").val();
	thirdProvide.password = $("#txtPassword").val();
	thirdProvide.username = $("#txtUsername").val();
	thirdProvide.postalAddr = $("#txtPostalAddr").val();
	//首先校验第三方插件名称，如果存在则提醒用户
	ThirdProvideDS.findThirdProvideByName(thirdProvide, function(data){
		if (data) {
			alert("第三方名称已存在!");
			return;
		}else{
			ThirdProvideDS.addThirdProvide(thirdProvide, function(data){
				if (data) {
					alert("新增第三方信息成功!");
					parent.removeTab("thirdProvideAdd");
				}
			});
		}
	});
	
	
}

function doThirdProvideList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();

	var name = $("#txtName").val();
	var thirdProvide = {};
	thirdProvide.name = name;
	thirdProvide.pagestart = (page - 1) * sysPageSize;
	thirdProvide.pagesize = sysPageSize;
	ThirdProvideDS.countThirdProvides(thirdProvide, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		ThirdProvideDS.findAllThirdProvide(thirdProvide, function(data) {
			if (!data)
				return;
			for ( var i = 0; i < data.length; i++) {
				var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "")
						+ ">";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].name + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].telephone
						+ "&nbsp;</td>";
				if(data[i].email == null)
				{
					atr += "<td align=\"center\">" + "&nbsp;</td>";
				}else
				{
					atr += "<td align=\"center\">" + data[i].email + "&nbsp;</td>";
				}
				atr += "<td align=\"center\">" + "admin"
						+ "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + getActionTd(data[i].status)
						+ "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doThirdProvideList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function getActionTd(status) {
	var rok = false;
	var atd = "";
	rok = haveRight("thirdProvide.update");
	atd += "<a href=\"#\""
			+ (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">")
			+ "<img src=\"../../css/former/images/edit" + (rok ? "" : "2")
			+ ".gif\" title=\"" + (rok ? "修改" : "不可修改")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	if(0 == status)
	{
		atd += "<a href=\"#\""
			+ (rok ? " onclick=\"hrefLogout(this);return false;\">" : ">")
			+ "<img src=\"../../css/former/images/cancel" + (rok ? "" : "2")
			+ ".png\" title=\"" + (rok ? "注销" : "不可注销")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	}
	else if(1 == status)
	{
		atd += "<a href=\"#\""
			+ (rok ? " onclick=\"hrefRestart(this);return false;\">" : ">")
			+ "<img src=\"../../css/former/images/start" + (rok ? "" : "2")
			+ ".png\" title=\"" + (rok ? "启用" : "不可启用")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	}
	return atd;
}

function hrefLogout(obj){
	
	if(confirm("是否确认注销？")){
		var tr = obj.parentNode.parentNode;
		var id = $.trim($(tr).find("td").eq(0).text());
		var thirdProvide ={};
		thirdProvide.id = id;
		ThirdProvideDS.logoutThirdProvide(thirdProvide, function(data){
			if (data) {
				alert("注销成功!");
				doThirdProvideList(1);
			}else{
				alert("此第三方还有未撤销的插件，不可注销！");
			}
		});
	}
}

function hrefRestart(obj){
	
	if(confirm("是否确认启用？")){
		var tr = obj.parentNode.parentNode;
		var id = $.trim($(tr).find("td").eq(0).text());
		var thirdProvide ={};
		thirdProvide.id = id;
		ThirdProvideDS.restartThirdProvide(thirdProvide, function(data){
			alert("启用成功!");
			doThirdProvideList(1);
		});
	}
}

function hrefUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("thirdProvideUpdate", "修改第三方信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["thirdProvideUpdate"], "?id=" + id);
}

function hrefResetPass(){
	//var tr = obj.parentNode.parentNode.parentNode;
	//var id = $.trim($(tr).find("td").eq(0).text());
	var id = $("#txtId").val();
	var thirdProvide ={};
	thirdProvide.id = id;
	ThirdProvideDS.ResetThirdAdminPass(id, function(data){
		if(data)
		{
			alert("重置密码成功！");
		}
	});
}

var thirdProvideForm = new autoForm("#frmThirdProvide");

function initThirdProvideUpdate() {

	var flag = regex();
	
	$("#btnSubmit").click(function() {
		
		if(flag)
		{
			doThirdProvideUpdate();
		}
	});
	// thirdProvideForm.readonly("#txtImg");
	var id = getArgFromHref("id");
	doThirdProvideBeforeUpdate(id);
}

function doThirdProvideBeforeUpdate(id) {
	ThirdProvideDS.findThirdProvide(id, function(data) {
		if (data) {
			$("#txtId").val(data.id);
			$("#txtName").val(data.name);
			$("#txtLinkname").val(data.linkname);
			$("#txtTelephone").val(data.telephone);
			$("#txtEmail").val(data.email);
			$("#txtUsername").val("admin");
			//第三方用户的密码（不是实际密码）
			$("#txtPassword").val("******");
			$("#txtPostalAddr").val(data.postalAddr);
		}
	});
}

function doThirdProvideUpdate() {
	if (!thirdProvideForm.valid()) {
		return;
	}
	var des = $("#txtLinkname").val();
	if(des.length>25){
		alert("联系人最多25个字符!");return;
	}
	var thirdProvide = {};
	thirdProvide.name = $("#txtName").val();
	thirdProvide.telephone = $("#txtTelephone").val();
	thirdProvide.email = $("#txtEmail").val();
	thirdProvide.linkname = $("#txtLinkname").val();
	thirdProvide.postalAddr = $("#txtPostalAddr").val();
	thirdProvide.id = $("#txtId").val();

	ThirdProvideDS.updateThirdProvide(thirdProvide, function(data) {
		if (data) {
			alert("修改第三方信息成功!");
			parent.removeTab("thirdProvideUpdate");
		}
	});
}
