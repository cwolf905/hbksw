
function initLogin(powertype) {
	$("#txtName").bind({
		blur : function(){$(this).removeClass("InputYes").addClass("InputNo");},
		focus : function(){$(this).removeClass("InputNo").addClass("InputYes").select();}
	}).focus();
	$("#txtPass").bind({
		blur : function(){$(this).removeClass("InputYes").addClass("InputNo");},
		focus : function(){$(this).removeClass("InputNo").addClass("InputYes");}
	}).addClass("InputNo");
	$("#txtCode").bind({
		blur : function(){$(this).removeClass("InputYes").addClass("InputNo");},
		focus : function(){$(this).removeClass("InputNo").addClass("InputYes");}
	}).addClass("InputNo");
	
	if (powertype == "admin") {
		$("#btnAdmin").click(function() {
			checkInput(sysAdminUser);
		});
	} else if (powertype == "teacher1"){
		$("#btnTeacher").click(function() {
			checkInput(sysTeacher2);
		});
	}
	else {
		$("#btnTeacher").click(function() {
			checkInput(sysTeacher);
		});
	}
	createCode();
}

function onmouseupFn(eventTag) {  
    var event = eventTag||window.event;    
    event.preventDefault();  
}  

var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
var code;
function createCode(){
   	code = "";
    for (var i = 0; i < 4; i++) {
        var charIndex = Math.floor(Math.random() * 36);
        code += selectChar[charIndex];
    }
    var checkCode = document.getElementById("checkCode");
	checkCode.className = "code";
    checkCode.value = code;
}

function checkInput(powertype){
	var objCode = $("#txtCode");
    var inputcode = objCode.val();
    if (inputcode.length <= 0) {
        alert("请输入验证码！");
		objCode.focus();
		return;
    }
    if (inputcode.toUpperCase() != code) {
		alert("验证码输入错误！");
		createCode();
		objCode.focus();
		return;
	}
	var objName = $("#txtName");
	var loginname = objName.val();
	if (getLength(loginname) < 1) {
		alert("请输入用户名！");
		objName.focus();
		return;
	}
	var objPass = $("#txtPass");
	var password = objPass.val();
	if (getLength(password) < 1) {
		alert("请输入密码！");
		objPass.focus();
		return;
	}
	doLoginUser(loginname, password, powertype);
}

function doLoginUser(loginname, password, powertype) {
	switch (parseInt(powertype)) {
		case sysAdminUser :
			AdminUserDS.applyUserLogin(loginname, password, function(data) {
				//alert(JSON.stringify(data));
				if (!data) {
					errHandle(-1); return;
				}
				if (data.lastip) {
					alert("您上次登录的地址是" + data.lastip + "!");
				}
				var user = {};
				user.powertype = sysAdminUser;
				user.teacherId = data.adminid;
				user.userName = data.loginname;
				user.roleId = data.roleId;
				setCookie(user);
				window.location = "../html/main.html";
			});
			break;
		case sysTeacher:
		case sysTeacher2:
			var jsonstr = '{"userName":"' + loginname + '", "password":"' + password + '", "powertype":"' + powertype + '"}';
			$.ajax({
				type: "post",
				url: "../service/teacher/login",
				data: jsonstr,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data, textStatus){
					if (!data) {
						errHandle(-1); return;
					}
					//alert(JSON.stringify(data));
					if (data.result == 0) {
						var user = data.content;
						user.powertype = powertype;
						setCookie(user);
						window.location = "../html/main.html";
					} else 
						errHandle(data.result, data.content);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
					errHandle(0, XMLHttpRequest.status);
				}
			});
			break;
		default :
	}
}
