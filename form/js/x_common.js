
var sysPageSize = 10; //每页默认显示的行数
var sysSelectAll = false; // 下拉框是否显示一个全部选择项
var sysAdminUser = 0	;
var sysTeacher = 2;//招生
var sysTeacher2 = 1;//院校
var sysPassword = "123456"; //系统初始密码
var dictT = {"101":"高考","102":"自考","103":"成考","104":"考研"}; // +sel
var dictExamtype = {"101":"高考","102":"自考","103":"成考","104":"考研"}; // +sel
var dictAdtype = {"1":"资讯","2":"专题","3":"院校","4":"院校资讯","5":"插件", "6":"外部链接"}; // +sel
var dictRstype = {"1":"资讯","2":"专题","3":"院校","4":"院校资讯","5":"插件", "6":"外部链接"}; // +sel

/**
 * 浏览器版本检查，兼容处理
 */
var YQ = {};
var ua = navigator.userAgent.toLowerCase(),
	browserRegExp = {
		ie:/msie[ ]([\w.]+)/,
		firefox:/firefox[ |\/]([\w.]+)/,
		chrome:/chrome[ |\/]([\w.]+)/,
		safari:/version[ |\/]([\w.]+)[ ]safari/,
		opera:/opera[ |\/]([\w.]+)/
	};
YQ.browser = 'unknow';
YQ.browserVersion = '0';
for(var i in browserRegExp){
	var match = browserRegExp[i].exec(ua);
	if(match){
		YQ.browser = i;
		YQ.browserVersion = match[1];
		break;	
	}
}

/**
 * 设置ajax缓存
 */
$.ajaxSetup({cache:false});

/**
 * 注册DWR错误处理方法
 * if (DWREngine)
	DWREngine.setErrorHandler(errHandle);
 */

/**
 * 错误编码规则：-[funcid]+(CRUD)+(0-99)<br>
 * 	如-1101，指funcid=1的新增1型错误<br>
 *  -2，指(CRUD)没有权限<br>
 *  -1，指(SQL)异常<br>
 *  0，指(HTTP)异常<br>
 *  其他，指后台接口失败，由接口返回错误码和错误描述<br>
 */
function errHandle(message, ex) {
//	alert(message);
	if (!ex) {
		ex = "";
	} else if (typeof(ex) == "object") {
		ex = ex.description;
		if (ex == undefined) ex = "系统异常";
	} else 
		ex =   ex  ;
	switch (parseInt(message)) {
		case -1201:
			alert("此名称的插件已存在!");
			break;
		case -120:
			alert("此考试类型与模版类型的插件已存在!");
			break;
		case -504:
			alert("用户已经在"+ ex + "登陆!");
			break;
		case -503:
			alert("用户已经被注销!");
			break;
		case -502:
			alert("用户名或者密码错误!");
			break;
		case -501:
			alert("该登陆名已经存在!");
			break;
		case -301:
			alert("删除失败!" + ex);
			break;
		case -201:
			alert("修改失败!" + ex);
			break;
		case -101:
			alert("新增失败!" + ex);
			break;
		case -2:
			alert("相关操作的权限不足xxx!");
			// history.back();
			var id = ex.replace(".", "");
			parent.removeTab(id); 
			break;
		case -1:
			alert("操作失败," + ex + "，请联系管理员!");
			break;
		case 0 :
			//alert("系统异常," + ex + "，请联系管理员!");
			alert("连接超时，请重试！");
			break;
		default:
			alert(ex );
		//alert(ex + "(" + message + ")");
	}
}

/**
 * Cookie管理，默认有效期到session结束
 */
function setCookie(data) {
	$.cookie("powertype", data.powertype);
	$.cookie("teacherId", data.teacherId);
	$.cookie("userName", data.userName);
	$.cookie("cid", data.cid);
	$.cookie("t", data.t); // 考试类型
	$.cookie("role", data.role);
	$.cookie("roleId", data.roleId);
}

function getCookie(key) {
	return $.cookie(key);
}

function removeCookie() {
	$.cookie("powertype", null);
	$.cookie("teacherId", null);
	$.cookie("userName", null);
	$.cookie("cid", null);
	$.cookie("t", null);
	$.cookie("role", null);
}

/**
 * 页面级权限校验，如果没有权限提示并返回父页面
 * @param {Object} funcid
 * @param {Object} callback
 */
function checkUser(funcid, callback) {
	var uri = getWebAddr("/html/");
	var powertype = getCookie("powertype");
	if (isInvalid(powertype)) {
		window.top.location = uri + "/html/login.html";
		return;
	}
//	if (!funcid || !haveRight(funcid)) {
//		errHandle(-2, funcid);
//		return;
//	}
	uri = "http://www.hbksw.com/";
	buildFooterHTML(uri);
	if (callback) callback();
}

/**
 * 功能级权限校验，一般用来控制功能操作的显示状态
 * @param {Object} funcid
 */
function haveRight(funcid) {
	var powertype = getCookie("powertype");
	if (isInvalid(powertype)) {
		return false;
	}
	var rok = false;
	switch (parseInt(powertype)) {
		case sysAdminUser : //管理员
			rok = !funcid.startWith("question.");
			break;
		case sysTeacher : //教师
			rok = funcid.startWith("question.")
				|| funcid.startWith("college.")
				|| funcid.startWith("qrcode.");
			break;
		default :
	}
	return rok;
}

/**
 * 页面框架显示
 */
function buildFooterHTML(uri){
	var tbl = "<table width=\"90%\" border=\"0\" class=\"footer\">";
	tbl += "<tr>";
	tbl += "<td align=\"center\"><hr size=\"1\"><b>版权所有</b>&nbsp;<a href=\"" 
		+ uri + "\" target=\"new\">湖北招生考试网</a></td>";
	tbl += "</tr>";
	tbl += "</table>";
	$("#footer").after(tbl);
}

/**
 * 查询无结果的表格处理
 */
function buildListsBlankHTML() {
	var atr = "<tr>";
	atr += "<td colspan=\"20\" align=\"center\">";
	atr += "没有可以操作的记录!";
	atr += "</td>";
	atr += "</tr>";
	$("#showlists").append(atr);
}

/**
 * 查询有数据时的表格处理
 * @param {Object} parent
 */
function buildListsStyle(){
	$("#showlists tr").bind({
		mouseover : function() {$(this).css("backgroundColor", "#cccccc")},
		mouseout : function() {$(this).css("backgroundColor", "")}
	});
}

function buildPagesHTML(url, count, page) {
	var pagecount = Math.floor(count / sysPageSize);
	if (count % sysPageSize != 0) {
		pagecount++;
	}
	page = parseInt(page);
	var atr = "<tr bgcolor=\"#cccccc\">";
	//atr += "<input type=\"hidden\" id=\"frmPage\" value=\"" + url + "\"/>";
	atr += "<form id=\"frmPage\" action=\"" + url + "\" method=\"post\" onsubmit=\"return false;\">";
	atr += "<td colspan=\"20\" align=\"right\">共有&nbsp;" 
		+ count + "&nbsp;条记录，每页&nbsp;" 
		+ sysPageSize + "&nbsp;条，这是第&nbsp;" 
		+ page + "/" + pagecount + "&nbsp;页";
	atr += "<button onclick=\"gotoPage(1)\">首 页</button>";
	atr += "<button " + (page==1 ? "disabled" : "onclick=\"gotoPage(" 
		+ (page-1) + ")\"") + ">上一页</button>";
	atr += "<button " + (page==pagecount ? " disabled" : "onclick=\"gotoPage(" 
		+ (page+1) + ")\"") + ">下一页</button>";
	atr += "<button onclick=\"gotoPage(" 
		+ pagecount + ")\">尾 页</button>";
	//atr += "<button onclick=\"gotoPage(0, " + pagecount + ")\">跳转到</button>";
	atr += "跳转到第&nbsp;<input type=\"text\" id=\"txtGoto\" name=\"txtGoto\" size=\"1\" value=\"" 
		+ page + "\" style=\"background-color:#ffffff\">&nbsp;页&nbsp;";
	atr += "<button onclick=\"gotoPage(0, " + pagecount + ")\">GO</button>&nbsp;&nbsp;";
	atr += "</td>";
	//atr += "</form>";
	atr += "</tr>";
	$("#showpages").append(atr);
}
function gotoPage(page, pagecount) {
	if (page == 0) {
		page = $("#showpages #txtGoto").val();
		var match = /^[0-9]*[1-9][0-9]*$/;
		if(!match.test(page)){
			alert("请输入正整数！");
			return;
		}
		if (isInvalid(page)) {
			alert("请输入要跳转的页数!");
			return false;
		}
		page = parseInt(page);
		if (page < 1) page = 1;
		if (page > pagecount) page = pagecount;
	}
	// chrome会自动提交，必须要设置onsubmit=return false;
	var url = $("#frmPage")[0].action;
	//alert(url);
	if (url.indexOf("$") > -1) {
		// chrome会自动加上本窗口的http地址
		url = url.substr(url.indexOf("$") + 1).replace('?', page);
		eval(url);
	} else {
		url += (url.indexOf("?") > 0) ? "&page=" + page : "?page=" + page;
		$("#frmPage")[0].action = url;
		$("#frmPage")[0].submit();
	}
}

function buildPagesStyle() {
	var uri = getWebAddr("/html/");
	$("#showpages tr:last button").css({
		"font-size": "12px",
		"color" : "red",
		"background-color": "#cccccc",
		"background-image": "url(" + uri + "/css/former/images/blank.gif)",
		"border": "1px solid #cccccc",
		"padding-top" : "8px",
		"padding-left" : "4px",
		"padding-right" : "4px",
		"clip": "rect(100px auto auto auto)"
	}).bind({
		mouseover:function() {
			$(this).css({
				"cursor": "hand",
				"borderRight": "1px solid buttonshadow",
				"borderLeft": "1px solid buttonhighlight",
				"borderBottom": "1px solid buttonshadow",
				"borderTop": "1px solid buttonhighlight"
			});
		},
		mouseout:function() {$(this).css("border", "1px solid #cccccc");}
	});
}
/*
window.alert = function(str) 
{ 
var shield = document.createElement("DIV"); 
shield.id = "shield"; 
shield.style.position = "absolute"; 
shield.style.left = "0px"; 
shield.style.top = "0px"; 
shield.style.width = "100%"; 
shield.style.height = document.body.scrollHeight+"px"; 
//弹出对话框时的背景颜色 
shield.style.background = "#fff"; 
shield.style.textAlign = "center"; 
shield.style.zIndex = "25"; 
//背景透明 
if(document.all){  //IE
     shield.style.filter='alpha(opacity=0)';
}else{             //FF
     shield.style.opacity=0;
}
var alertFram = document.createElement("DIV"); 
alertFram.id="alertFram"; 
alertFram.style.position = "absolute"; 
alertFram.style.left = "50%"; 
alertFram.style.top = "40%"; 
alertFram.style.marginLeft = "-150px"; 
alertFram.style.marginTop = "-50px"; 
alertFram.style.width = "300px"; 
alertFram.style.height = "100px"; 
alertFram.style.background = "#ff0000"; 
alertFram.style.textAlign = "center"; 
alertFram.style.lineHeight = "150px"; 
alertFram.style.zIndex = "300"; 
strHtml = "<ul style=\"list-style:none;margin:0px;padding:0px;width:100%\">\n"; 
//strHtml += " <li style=\"background:#DD828D;text-align:left;padding-left:20px;font-size:14px;font-weight:bold;height:25px;line-height:25px;border:1px solid #F9CADE;\">[自定义提示]</li>\n"; 
strHtml += " <li style=\"background:#fff;text-align:center;font-size:12px;height:120px;line-height:120px;border-left:1px solid #ccc;border-top:1px solid #ccc;border-right:1px solid #ccc;\">"+str+"</li>\n"; 
strHtml += " <li style=\"background:#eee;text-align:center;font-weight:bold;height:30px;line-height:25px; border:1px solid #ccc;\"><input type=\"button\" value=\"确 定\" onclick=\"doOk()\" style=\"padding:3px 15px 4px 15px;font-size:12px;\"/></li>\n"; 
strHtml += "</ul>\n"; 
alertFram.innerHTML = strHtml; 
document.body.appendChild(alertFram); 
document.body.appendChild(shield); 
var ad = setInterval("doAlpha()",5); 
this.doOk = function(){ 
alertFram.style.display = "none"; 
shield.style.display = "none"; 
} 
alertFram.focus(); 
document.body.onselectstart = function(){return false;}; 
}*/