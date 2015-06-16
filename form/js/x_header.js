
function initHeader() {
	var userName = getCookie("userName");
	if (isInvalid(userName)) {
		gotoLogin();
		return;
	}
	$("#spnName").html(userName);
	timeLoad("spnTime");
}

function gotoLogin() {
	var powertype = getCookie("powertype");
	var uri = getWebAddr("/html/");
	switch (parseInt(powertype)) {
		case sysAdminUser:
			window.top.location = uri + "/html/admin.html";
			break;
		case sysTeacher:
			var myCid = getCookie("cid");
			if (myCid == 0)
				window.top.location = uri + "/html/teacher2.html";
			else 
				window.top.location = uri + "/html/teacher1.html";
			break;
		default:
			window.top.location = uri + "/html/login.html";
	}
}

function hrefUpdateUserPassword() {
	parent.frames["gather"].hrefUpdateUserPassword();
}

function doLogoutUser(closewindow) {
	if (closewindow)
	{
		//window.top.close();
	    if (navigator.userAgent.indexOf("MSIE") > 0) {
		    if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
		        window.opener = null; 
		        window.close();
		    } else {
		        window.open('', '_top');
		        window.top.close();
		    }
	    }else if (navigator.userAgent.indexOf("Firefox") > 0) 
	    {	    	
	    	parent.window.location.href = 'about:blank ';
	    }else 
	    {
	    	parent.window.location.href = 'about:blank ';
		}
	}
	else {
		gotoLogin();
	}
	removeCookie();
}

