
//1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时9院校资讯10院校介绍
var dictPushtype = {"1":"资讯", "9":"院校资讯","10":"院校介绍"};
// 内容审核状态字典编辑后的内容审核（0：待审核 1：通过 2：不通过）
var dictcontentAudit = {"0":"待审核", "1":"通过","2":"不通过"};

//======================================新增页面的js方法们 begin==========================================================
/**
 * 列表页面初始化
 */
	function initCustomContentList(){
		$("#divTip").dialog({
			autoOpen: false,
			height: 500,
			width: 650,
			modal: true,
			buttons: {
				'关闭':function(){
					$("#divTip").dialog("close");
				}
			}
		});
		
		$("#divAudit").dialog({
			autoOpen: false,
			height: 200,
			width: 470,
			modal: true,
			//position:[300,5],
			buttons: {}
		});
		$("#searchconds button").click(function() {
			doCustomList(1);
		});
		doCustomList(1);
	}
	
	/**
	 * 分页查询推送信息
	 */
	function doCustomList(page) {
		$("#showlists").empty();
		// modified by yanfulei 修复分页会显示多个分页栏问题
		$("#showpages").html("");
		var _title = $("#txtTitle").val();
		if(!page){
			page = 1;
		}
		var push = {};
		push.pagestart = (page - 1) * sysPageSize;
		push.pagesize = sysPageSize;
		push.title = encodeURIComponent(_title);
		// 将属性审核状态加入参数
		push.contentAudit = 0;
		CustomPushDS.countCustomPushs(push, function(count) {
			if (count == 0) {
				buildListsBlankHTML();
				return;
			}
			CustomPushDS.findCustomPushsByPage(push, function(data) {
				if (!data) 
					return;
				for (var i=0; i<data.length; i++) {
					var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
					atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
					atr += "<td align=\"center\">" + data[i].title + "&nbsp;</td>";
					atr += "<td align=\"center\">" + "<a onclick=\"hrefContent(this);\">查看内容</a>" + "&nbsp;</td>";
					atr += "<td align=\"center\" nowrap>" + getActionTd() + "&nbsp;</td>";
					atr += "</tr>";
					$("#showlists").append(atr);
				}
				buildListsStyle();
				buildPagesHTML("$doCustomList(?)", count, page);
				buildPagesStyle();
			});
		});
	}
	
	/**
	 * 生成操作图标
	 */
	function getActionTd(commend, infoId, data) {
		var rok = false;
		var atd = "";
		rok = haveRight("informationContent.audit");
		atd += "<a href=\"#\""
				+ (rok ? " onclick=\"hrefContentAudit(this);return false;\">" : ">")
				+ "<img src=\"../../css/former/images/review" + (rok ? "" : "2")
				+ ".png\" title=\"" + (rok ? "审核" : "不可审核")
				+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
		return atd;
	}
	
	/**
	 * 翻译字典项
	 */
	function getSidName(sid,dictType) {
		if("pushType"==dictType){ 
			for(var key in dictPushtype) {
				if(key == sid) return dictPushtype[key];
			}
		}else if("examType"==dictType){
			for(var key in dictExamtype) {
				if(key == sid) return dictExamtype[key];
			}
		}else if("contentAudit"==dictType){
			for(var key in dictcontentAudit) {
				if(key == sid) return dictcontentAudit[key];
			}
		}
		return "";
	}
	
	/**
	 * 查看全部
	 */
	function doCustomAll() {
		$("#txtTitle").val("");
		$("#selT").val("0");
		doCustomList(1);
	}
	
	/**
	 * 审核推送信息
	 */
	function hrefContentAudit(obj){
		$("#divAudit").dialog("open");
		$("#ui-id-2").text("内容审核");
		$("#btnContentAuditOK").unbind("click").bind("click", function(){
			var tr = obj.parentNode.parentNode;
			var iid = $.trim($(tr).find("td").eq(0).text());
			var push = {};
			push.id = iid;
			var contentAudit = $("#auditStatus").val();
			push.contentAudit = contentAudit;
			CustomPushDS.pushContentAudit(push, function(data){
				
				if(data==1){
					alert("推送内容审核" + (contentAudit == 1 ? "通过" : "不通过") + "!");
				}else{
					alert("推送内容审核不通过！");
				}
				doCustomList(1);
				$("#divAudit").dialog("close");
			});
		});
		
		$("#btnContentAuditCancle").unbind("click").bind("click",function(){
			$("#divAudit").dialog("close");
		});
		
	}
	/**
	 * 查看全部
	 */
	function hrefContent(obj){
		var tr = obj.parentNode.parentNode;
		var iid = $.trim($(tr).find("td").eq(0).text());
		$("#divTip").dialog("open");
		iid = parseInt(iid);
		CustomPushDS.findCustomPushById(iid, function(data){
			$("#divTip").empty();
			if(data){
				$("#divTip").html(data.content);
			}
		});
	}
//======================================新增页面的js方法们 end==========================================================





