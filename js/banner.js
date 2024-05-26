$(document).ready(function() {
	let textList = localStorage.getItem("bannerText");
	if (textList) {
		textList = JSON.parse(textList);
		if (textList.length > 2) {
			localStorage.setItem("bannerText", JSON.stringify(textList.splice(2)));
		} else {
			localStorage.removeItem("bannerText");
		}
		$(".bannerTA").text(textList[0]);
		$(".bannerTB").text(textList[1]);
		return;
	}
	$.ajax({
		type: 'GET',
		url: 'https://api.jawbts.org/text',
		data: {},
		dataType: 'JSON',
		success: function(data) {
			if (data.data.context.length > 0) {
				let textList = data.data.context;
				console.log(textList);
				localStorage.setItem("bannerText", JSON.stringify(textList.splice(2)));
				$(".bannerTA").text(textList[0]);
				$(".bannerTB").text(textList[1]);
				return;
			}
			$(".bannerTA").text(data.data.a);
			$(".bannerTB").text(data.data.b);
		},
	})
});