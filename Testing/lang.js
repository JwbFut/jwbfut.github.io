var arrLang = {
	"zh_cn": {
		"你好": "你好"
	},
	"en_us": {
		"你好": "Hello"
	}
}

var lang = "en_us";

if('localStorage' in window) {
	var lang = localStorage.getItem('lang') || navigator.language.slice(0, 2);
	if(!Object.keys(arrLang).includes(lang)) lang = 'en_us';
}

$(document).ready(function() {
	$(".lang").each(function(index, element) {
		$(this).text(arrLang[lang][$(this).attr("key")]);
	});
});

$(document).ready(function() {
	$(".langchanger").click(function() {
		var lang = $(this).attr("id");
		
		if('localStorage' in window) {
			localStorage.setItem('lang', lang);
			console.log(localStorage.getItem('lang'));
		}
		
		$(".lang").each(function(index, element) {
			$(this).text(arrLang[lang][$(this).attr("key")]);
		});
	});
});