$(document).ready(function() {
	$.ajax({
		type: 'GET',
		url: 'https://api.jawbts.org/text',
		data: {},
		dataType: 'JSON',
		success: function(data) {
			$(".bannerTA").text(data.data.a);
			$(".bannerTB").text(data.data.b);
		},
	})
});