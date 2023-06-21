import Auth from "./authChecker.js";
const auth = new Auth();

$(document).ready(function() {
	auth.checkLoginByLocalstorage(function(result) {
		if (!(result === true)) {
			window.location.href = "https://www.jawbts.org/auth";
		}
	});
});