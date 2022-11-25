var arrLang = {
	"en_us": {
		"你好": "Hello",
		"主页": "Index",
		"新闻": "News",
		"项目": "Projects",
		"工具": "Tools",
		"关于": "About",
		"语言": "Language",
		"设置": "Settings",
	}
}

var lang = "en_us";

if('localStorage' in window) {
	var lang = localStorage.getItem("lang") || navigator.language.slice(0, 2);
	if(!Object.keys(arrLang).includes(lang) && lang != "zh_cn") lang = "en_us";
}

$(document).ready(function() {
	$("*").each(function(index, element) {
		if(lang == "zh_cn") {
			$(this).text($(this).attr("key"));
		} else {
			$(this).text(arrLang[lang][$(this).attr("key")]);
		}
	});
});

$(document).ready(function() {
	$(".langchanger").click(function() {
		var lang = $(this).attr("id");
		
		if('localStorage' in window) {
			localStorage.setItem("lang", lang);
			console.log(localStorage.getItem("lang"));
		}
		
		$("*").each(function(index, element) {
			if(lang == "zh_cn") {
				$(this).text($(this).attr("key"));
			} else {
				$(this).text(arrLang[lang][$(this).attr("key")]);
			}
		});
	});
});