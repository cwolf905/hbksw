
var powertype = getCookie("powertype");
var myId = getCookie("teacherId");
var myCid = getCookie("cid");
var isEn = (getCookie("cid") == 0);
var myRole = getCookie("roleId");
var isCheck = (getCookie("role") == 1); // 审核

function initMenu() {
	var data = [];
	var childData = [];
	switch (parseInt(powertype)) {
		case sysAdminUser :
			$("#enquestionMenu").hide();
			$("a.enquestion").hide();
			$("#questionMenu").hide();
			$("a.question").hide();
			$("#comquestionMenu").hide();
			$("a.comquestion").hide();
			var roleId = getCookie("roleId");
			DWREngine.setAsync(false);
			//查询所有的父菜单 
			AdminUserDS.findRightsByRole(roleId, function(data){
				
				for(var i = 0; i < data.length; i++)
				{
					var parent = "";
					parent += "<a href="+"#"+data[i].labelId+" class='nav-header menu-first collapse user' data-toggle='collapse'>"+data[i].resourceName+"</a>"
					parent += " <ul id="+data[i].labelId+" class='nav nav-list menu-second collapse'></ul>"	
					$("#adminMenu").append(parent);
					
					//查询父菜单下的子菜单
					var child = ""; 
					var childData = data[i].childRights;
					for(var j = 0; j < childData.length; j++)
					{
						child += " <li><a id="+childData[j].labelId+" href='###' class='bbb'>"+childData[j].resourceName+"</a></li>"
					}
					$("#"+data[i].labelId).append(child);
				}
			});
//			parent.frames["gather"].hrefTab("mobileuserlist");
			DWREngine.setAsync(true);
			break;
		case sysTeacher :
			if (isEn) {
				$("#enquestionMenu").siblings(".menu-second").hide();
				$("a.enquestion").siblings(".menu-first").hide();
				timeNotify("enquestiontodo");
			} else {
				$("#questionMenu").siblings(".menu-second").hide();
				$("a.question").siblings(".menu-first").hide();
				timeNotify("questiontodo");
			}
			if (!isCheck) {
				$("#comquestionMenu").show();
				$("a.comquestion").show();
			}
			break;
		default :
	}
	// IE6下面不会自动展开
	if (YQ.browser != "ie" || YQ.browserVersion != "6.0")
    	$("a:visible").click();
	
//	setTimeout(xxx,4000);
//	DWREngine.setAsync(false);
	$("a.bbb").click(function() {
		var k = $(this).text().indexOf("(");
		if (k != -1) {
			$(this).text($(this).text().substring(0, k));
		}
//		alert(this);
		parent.frames["gather"].hrefTab(this);
	});
//	DWREngine.setAsync(true);
}

function xxx(){
	$("a.bbb").click(function() {
		var k = $(this).text().indexOf("(");
		if (k != -1) {
			$(this).text($(this).text().substring(0, k));
		}
		parent.frames["gather"].hrefTab(this);
	});
}

function timeNotify(ele) {
	if(typeof(ele) == "string") 
		ele = $("#" + ele);
	if(!ele) return; 
	window.setInterval(
		function(){
			$.ajax({
				type: "get",
				url: "../service/" + (isEn ? "en" : "") + "question/size?cid=" + myCid 
					+ "&teacherId=" + myId + "&role=" + myRole + "&filter=&qtype=",
				dataType: "text",
				success: function(data, textStatus){
					if (data) {
						var txt = ele.text();
						var k = txt.indexOf("(");
						if (k != -1) 
							txt = txt.substring(0, k);
						ele.html(txt + "<span style=\"color:blue\">(" + data + ")</span>"); 
					}
				}
			});
		}, 10*60*1000
	);
}
