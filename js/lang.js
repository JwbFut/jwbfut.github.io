var arrLang = {
	"en_us": {
		"主页": "Index",
		"新闻": "News",
		"项目": "Projects",
		"工具": "Tools",
		"关于": "About",
		"语言": "Language",
		"设置": "Settings",
		"页面": "Pages",
		"了解更多": "Learn More",
		"由来": "About Us",
		"探索更多": "Learn More",
		"Jawbts - 新 闻": "Jawbts - News",
		"Jawbts - 项 目": "Jawbts - Projects",
		"Jawbts - 关于我们": "Jawbts - About Us",
	}
};

var lang;
if ('localStorage' in window) {
	var lang = localStorage.getItem("lang") || navigator.language.toLowerCase();
	if (lang.startsWith("en")) {
		lang = "en_us";
	} else if (lang.startsWith("zh")) {
		lang = "zh_cn";
	} else {
		lang = "zh_cn";
	}
}

function apply_language() {
	$("*").each(function(index, element) {
		if (!($(this).attr("key") || $(this).attr("key_" + lang))) {
			return;
		}
		
		if (lang == "zh_cn") {
			$(this).text($(this).attr("key"));
			return;
		}

		if ($(this).attr("key_" + lang)) {
			$(this).text($(this).attr("key_" + lang));
			return;
		}
		
		$(this).text(arrLang[lang][$(this).attr("key")]);
	});
}

$(document).ready(function() {
	apply_language();
});

$(document).ready(function() {
	$(".langchanger").click(function() {
		lang = $(this).attr("id");
		if ('localStorage' in window) {
			localStorage.setItem("lang", lang);
		}
		apply_language();
	})
});
