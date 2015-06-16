var adminUserForm = new autoForm("#frmAdminUser");

function initAdminUserCollection()
{
	
	initYearSelect();
	
	$("#collectionByMonth").attr("checked", true);
	var selectYear = $("#yearSelect").val();
	generateChart(selectYear);
	
	//选择按年统计
	$("#collectionByYear").change(function(){
		
			var collectionTime = $('input:radio[name="collectionTime"]:checked').val();
			if("collectionByYear" == collectionTime)
			{
				generateChart(null);
			}
	});
	//选择按月统计
	$("#yearSelect").change(function(){
		
		var collectionTime = $('input:radio[name="collectionTime"]:checked').val();
		if("collectionByMonth" == collectionTime)
		{
			var selectYear = $("#yearSelect").val();
			generateChart(selectYear);
		}
	});

	 
	
}

function initYearSelect()
{
	DWREngine.setAsync(false);
	AdminUserDS.initYearSelect(function(data)
			{
				var atr = "";
				for(var i = 0; i < data.length; i++)
				{
					atr += "<option value="+data[i]+">"+data[i]+"</option>"
				}
				$("#yearSelect").append(atr);
			});
	DWREngine.setAsync(true);	
	var yearNow = new Date().getFullYear();
	$("#yearSelect").val(yearNow);
}

function generateChart(selectYear)
{
	
	var dataChart = new Array();
	DWREngine.setAsync(false);
	AdminUserDS.generateChartData(selectYear, function(data){
		var dataChart = [];
		if(data)
		{
		     if(null != data)
		     {
		   	  for(var i = 0; i < data.length; i++)
		   	  {
		   		dataChart.push(eval("["+data[i]+"]"));
		   	  }
		     }
		}
		var chart = new Highcharts.Chart({  
	        chart: {  
	            renderTo: 'container',  
	            type: 'column',  
	            events: {  
	              load: function() {      
	                  var series = this.series[0];  
	                  setInterval(function() {  
	                      series.setData(dataChart);  
	                  }, 2000);  
	              }  
	          }  
	        },  
	        title: {  
	            text: '<b>会员注册统计</b>'  
	        }, 
	        credits: {
	        	enabled:false
	        	},
	        xAxis: {  
	            categories: []  
	        },  
	        yAxis: {  
	            min: 0,  
	            title: {  
	                text: '注册人数'  
	            },
	            stackLabels: {  
	                enabled: true,  
	                style: {  
	                    fontWeight: 'bold',  
	                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'  
	                }  
	            }  
	        },  
	        legend: {  
//		            align: 'right',  
//		            x: -100,  
//		            verticalAlign: 'top',  
//		            y: 20,  
//		            floating: true,  
//		            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',  
//		            borderColor: '#CCC',  
//		            borderWidth: 1,  
//		            shadow: false  
	        	enabled: false
	        },  
	        tooltip: {  
	            formatter: function() {  
	                return '<b>'+ this.x +'</b><br/>'+  
	                    this.series.name +': '+ this.y +'<br/>'+  
	                    'Total: '+ this.point.stackTotal;  
	            }  
	        },  
	        plotOptions: {  
	            column: {  
	                stacking: 'normal',  
	                dataLabels: {  
	                    enabled: true,  
	                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'  
	                }  
	            }  
	        },  
	        series: [{  
	            name: '',  
	            data: []  
	        }]  
	    }); 
			
		}); 
	DWREngine.setAsync(true);
	
}

/*****************查询列表***********************/
/**
 * 初始化用户列表页面
 * @return
 */
function initAdminUserList(){
	
	$("#divTip").dialog( {
		autoOpen : false,
		height : 200,
		width : 550,
		modal : true,
		buttons : {}
	});
	$("#searchconds button").click(function() {
		doAdminUserList(1);
	});
	doAdminUserList(1);
}

/**
 * 查询所有的用户
 * @return
 */
function doAdminUserAll(){
	$("#txtName").val("");
	doAdminUserList(1);
}

/**
 * 根据页码查询用户列表
 * @param page
 * @return
 */
function doAdminUserList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	//alert("doAdminUserList");

	var name = $("#txtName").val();
	var adminUser = {};
	adminUser.loginname = name;
	adminUser.pagestart = (page - 1) * sysPageSize;
	adminUser.pagesize = sysPageSize;
	AdminUserDS.countUsers(adminUser, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		AdminUserDS.findUsersByPage(adminUser, function(data) {
			if (!data)
				return;
			for ( var i = 0; i < data.length; i++) {
				var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "")
						+ ">";
				atr += "<td align=\"center\">" + data[i].adminid + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].loginname + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].truename + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].regdate + "&nbsp;</td>";
				if(data[i].logindate != null)
				{
					atr += "<td align=\"center\">" + data[i].logindate + "&nbsp;</td>";
				}else
				{
					atr += "<td align=\"center\">" + "&nbsp;</td>";
				}
				atr += "<td align=\"center\" nowrap>" + getActionTd(data[i].id)
						+ "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doAdminUserList(?)", count, page);
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
	rok = haveRight("adminUser.update");
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
 * 跳到用户新增界面
 * @return
 */
function hrefAdd(){
	if (!haveRight("adminUser.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("adminUserAdd", "新增用户");
	if (idx == -1)
		return;
	parent.frames["adminUserAdd"].doAdminUserBeforeAdd();
}

var adminUserForm = new autoForm("#frmAdminUser");

/**
 * 用户添加界面初始化
 * @return
 */
function initAdminUserAdd(){
	
	//校验登录名是否已经存在
	var flag = checkInput();
	$("#btnSubmit").click(function() {
		if(flag == true)	
		{
			doAdminUserAdd();
		}
	});
	doAdminUserBeforeAdd();
}

function doAdminUserBeforeAdd(){
	
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
		$("#roleSelect").html(roleSelect);
	});
}

function checkInput(){
	var flag = true;
	//手机号码
	$("#txtLoginName").blur(function(){
		
		if(this.value.length>50){
			$("#LoginNameCheckImg").remove();
			var img = "<img id='LoginNameCheckImg' src='../images/wrong.png' />";
			$("#loginNameTr").append(img);
			alert("登录名长度超长，请输入少于50个字符!");return;
		}
		
		AdminUserDS.getUserByLoginName(this.value, function(data){
			if(null != data)
			{
				$("#LoginNameCheckImg").remove();
				var img = "<img id='LoginNameCheckImg' src='../images/wrong.png' />";
				$("#loginNameTr").append(img);
				flag = false;
			}else
			{
				$("#LoginNameCheckImg").remove();
				var img = "<img id='LoginNameCheckImg' src='../images/right.png' />";
				$("#loginNameTr").append(img);
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
function doAdminUserAdd(){
	
	if (!adminUserForm.valid()) {
		return false;
	}
	
	var adminUser = adminUserForm.toBean();
	var loginName = $("#txtLoginName").val();
	var trueName = $("#txtTrueName").val();
	if(trueName.length>100){
		alert("真实姓名长度超长，请输入少于100个字符!");return;
	}
	adminUser.loginname = loginName;
	adminUser.truename = trueName;
	adminUser.roleId = $("#roleSelect").val();
	
	AdminUserDS.addAdminUser(adminUser, function(data){
		
		alert("添加用户成功！！");
		parent.removeTab("adminUserAdd");
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
 * 初始化用户更新页面
 * @return
 */
function initAdminUserUpdate(){
	
	$("#btnSubmit").click(function() {
		doAdminUserUpdate();
	});
	// thirdProvideForm.readonly("#txtImg");
	var id = getArgFromHref("id");
	doAdminUserBeforeUpdate(id);
}

function doAdminUserBeforeUpdate(id){
	
	//初始化角色下拉框
	DWREngine.setAsync(false);
	initRoleSelect();
	
	AdminUserDS.getUser(id, function(data) {
		if (data) {
			$("#roleSelect").val(data.roleId);
			$("#txtId").val(data.id);
			$("#txtLoginName").val(data.loginname);
			$("#txtTrueName").val(data.truename);
		}
	});
	DWREngine.setAsync(true);
}

function doAdminUserUpdate(){
	
	if (!adminUserForm.valid()) {
		return;
	}

	var adminUser = adminUserForm.toBean();
	adminUser.adminid = getArgFromHref("id");
	var loginName = $("#txtLoginName").val();
	if(loginName.length>50){
		alert("真实姓名长度超长，请输入少于50个字符!");return;
	}
	var trueName = $("#txtTrueName").val();
	if(trueName.length>100){
		alert("真实姓名长度超长，请输入少于100个字符!");return;
	}
	adminUser.loginname = loginName;
	adminUser.truename = trueName;
	adminUser.roleId = $("#roleSelect").val();

	AdminUserDS.updateUser(adminUser, function(data) {
		if (data) {
			alert("修改用户信息成功!");
			parent.removeTab('adminUserUpdate');
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
	var idx = parent.addTab("adminUserUpdate", "修改用户信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["adminUserUpdate"], "?id=" + id);
}

/*************************删除begin************************************/
/**
 * 触发删除操作
 * @param obj
 * @return
 */
function hrefDelete(obj){
	DWREngine.setAsync(false);
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var userName;
	AdminUserDS.getUser(id, function(data) {
		if (data)
		{
			userName = data.loginname;
		}
	});
	if("admin" == userName)
	{
		alert("admin不允许删除！");
		return;
	}
	if (confirm("是否确认删除该用户?")){
		AdminUserDS.deleteUser(id, function(data){
			if(data){
				alert("删除成功！");
				doAdminUserList(1);
			}
		});
	}
	DWREngine.setAsync(true);
}

/*************************删除end************************************/

