function tryLogin() {
	$("#logintitle").text("重定向中......");

	if (!'localStorage' in window) {
		window.alert("LocalStorage Not Found");
		return;
	}

	const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

	let nonce = "",
		state = "";
	for (let i = 0; i < 16; i++) {
		nonce += chars[Math.floor(Math.random() * chars.length)];
		state += chars[Math.floor(Math.random() * chars.length)];
	}

	localStorage.setItem("nonce", nonce);
	localStorage.setItem("state", state);

	window.location.href =
		"https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?client_id=ca10efe7-21c8-4a22-97a2-0ecd38853ab2&response_mode=fragment&response_type=id_token&redirect_uri=https%3A%2F%2Fwww.jawbts.org%2Flogged%2FauthVerify&scope=openid&state=" +
		state + "&nonce=" + nonce;
}

function logout() {
	localStorage.removeItem("state");
	localStorage.removeItem("nonce");
	localStorage.removeItem("id_token");
	window.location.href = "https://www.jawbts.org/";
}