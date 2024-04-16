function tryLogin() {
	$("#loginButton").hide();
	$("#output").text("");
	$("#logintitle").text("请求中......");
	$.ajax({
		type: "GET",
		url: "http://127.0.0.1:3000/auth/github?user_name=" + $("#user_name").val(),
		data: {},
		dataType: 'JSON',
		success: function(data) {
			$("#logintitle").text("重定向到GitHub......");
			window.location.href = data.data.url;
		},
		error: function(textStatus) {
			$("#logintitle").text("登录");
			$("#loginButton").show();
			$("#output").text(textStatus.responseJSON != null ? textStatus.responseJSON.data.reason : "Can't Reach API");
		}
	})
}

function logout() {
	$.ajax({
		type: "GET",
		url: "https://api.jawbts.org/auth/logout",
		headers: {
			"Authorization": "customscheme " + localStorage.getItem("token")
		}
	})
	localStorage.removeItem("token");
	window.location.href = "https://jawbts.org/";
}