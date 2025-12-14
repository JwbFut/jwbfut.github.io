localStorage.setItem("bannerTextSet", false);

let textList = localStorage.getItem("bannerText");
if (textList) {
	try {
		textList = JSON.parse(textList);
	} catch (e) {
		textList = null;
	}
}

if (textList && textList.length > 2) {
	localStorage.setItem("bannerText", JSON.stringify(textList.splice(2)));
} else {
	localStorage.removeItem("bannerText");
}

if (textList) {
	localStorage.setItem("bannerTextA", textList[0]);
	localStorage.setItem("bannerTextB", textList[1]);
} else {
	$.ajax({
		type: 'GET',
		url: 'https://api.jawbts.org/text',
		data: {},
		dataType: 'JSON',
		success: function (data) {
			if (data.data?.context?.length > 0) {
				let textList = data.data.context;
				localStorage.setItem("bannerText", JSON.stringify(textList.splice(2)));
				localStorage.setItem("bannerTextA", textList[0]);
				localStorage.setItem("bannerTextB", textList[1]);

				setBanner();

				return;
			}
			localStorage.setItem("bannerTextA", data.data?.a);
			localStorage.setItem("bannerTextB", data.data?.b);

			setBanner();
		},
	})
}

function setBanner() {
	if (localStorage.getItem("bannerTextA") && localStorage.getItem("bannerTextB") && localStorage.getItem("bannerTextSet") !== "true") {
		$(".bannerTA").text(localStorage.getItem("bannerTextA"));
		$(".bannerTB").text(localStorage.getItem("bannerTextB"));

		localStorage.removeItem("bannerTextA");
		localStorage.removeItem("bannerTextB");
		localStorage.setItem("bannerTextSet", true);
	}
}

$(document).ready(function () {
	setBanner();
});