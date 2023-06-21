export default class Auth {
	getTokenFromHash() {
		let hash = window.location.hash;
		if (hash.substr(0, 10) != "#id_token=") {
			return false;
		}
		let id_token, state;
		try {
			id_token = hash.match(/=\S+&/).toString().match(/[^=&]+/).toString();
			state = hash.match(/e=\S+/).toString();
			state = state.substr(1, state.length).match(/[^=&]+/).toString();
		} catch (e) {
			return false;
		}

		if (state != localStorage.getItem("state")) {
			return false;
		}

		return id_token;
	}

	checkLogin(id_token, callback) {
		return $.ajax({
			method: "GET",
			url: "https://api.jawbts.org/profiles/me",
			headers: {
				Authorization: "Bearer " + id_token
			},
			data: {
				"nonce": localStorage.getItem("nonce"),
				"forcedStatus": "200"
			},
			dataType: 'JSON',
			success: function(response) {
				if (response.success == "true") {
					localStorage.setItem("id_token", id_token);
					callback(true);
					return;
				}
				callback(response.reason);
			},
			error: function() {
				callback(false)
			}
		});
	}

	checkLoginByHash(callback) {
		let id_token = this.getTokenFromHash();
		if (id_token === false) {
			return "Failed To Get Token From Hash";
		}
		return this.checkLogin(id_token, callback);
	}

	checkLoginByLocalstorage(callback) {
		let id_token = localStorage.getItem("id_token");
		return this.checkLogin(id_token, callback);
	}
}
