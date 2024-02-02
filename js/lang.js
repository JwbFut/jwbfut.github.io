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
		"页面": "Pages",
		"了解更多": "Learn More",
		"由来": "About Us",
		"探索更多": "Learn More",
		"小工具": "Useful tool!",
		"拍片!": "A short film?",
		"模组编写": "MC Mod writing",
		"Jawbts - 新 闻": "Jawbts - News",
		"Jawbts - 项 目": "Jawbts - Projects",
		"网站维护": "Web Development",
		"模组维护": "MC Mod Development",
		"无线红石理论": "Wireless Redstone",
		"相关视频": "The Videos",
		"Jawbts - 关于我们": "Jawbts - About Us",
		"神奇的组织.": "Interesting organisation.",
		"只有一个现实人员WisW.": "Only one realist WisW.",
		"访问Wiki": "Visit Wiki",
		"与现实同步": "Synchronization with reality",
		"点击输入天数": "Click to enter the number of days",
		"禁用MC准确时间": "Disable MC Accurate Time",
		"禁用现实准确时间": "Disable Realistic Accurate Time",
		"在此填入MC一天中的时间 格式为 xx:xx": "Fill in the time of day for the MC here in the format xx:xx",
		"他的Github": "His Github",
		"他的BiliBili": "His BiliBili",
		"WisW为了命名他曾经搭建的一个服务器, 于是就组建了Jawbts.": "WisW formed Jawbts in order to name a server he had built.",
		"至今, Jawbts的正式现实人员还是只有一个.": "To this day, there is still only one official real person at Jawbts.",
		"一些大事和计划会被放在这里.": "Some of the major events and projects will be placed here.",
		"当然, 这页不是动态更新的. 你可以前往WinsreWu的B站以获取最新动态.": "However, this page is not dynamically updated.",
		"Jawbts会不时更新一些项目.": "Jawbts will update some projects from time to time.",
		"这些是仅在更新的项目.已经不会更新的会被放进新闻.": "These are the projects that are only being updated. Those that are no longer updated will be put in the news.",
		"Jawbts的一些工具会被放在这儿.": "Some of Jawbts' tools will be placed here.",
		"有用的小东西们.": "Nice useful tools.",
		"你可以从Mini Hud得到当前Mc日, 这个工具可以简单的帮你把它转换成年/月/日的格式.": "You can get the current Mc day from Mini Hud, and this tool will help you convert it to year/month/day format easily.",
		"些许简陋, 但是简单的日期系统还是可以胜任的.": "A little rudimentary, but can handle most problems.",
		"是的, WisW目前准备拍点片子.": "WisW is currently preparing to make some films.",
		"据悉, 他正在构思世界观.": "It is said that he is working on a world view.",
		"未完成世界观": "Learn More",
		"WisW正在编写一些模组.": "WisW is writing some MC Mods",
		"比如": "For example, ",
		"真正的和平": "Real Peace",
		"和 ": "and ",
		"星渊正在维护这个网站.": "XingYuan___ is developing this website.",
		"目前, 它已经经历了一次重构.": "Currently, it has undergone a refactoring.",
		"WisW正在维护": "WisW is developing ",
		"WisW正在探索无线红石技术.": "WisW is exploring wireless redstone technology.",
		"转换: MC天数 -> 年 月 日 星期": "Conversion: MC Days -> Year Month Day Week",
		"WisW, 全称WinsreWu, 你也可以叫他鸡蛋.": "WisW, full name WinsreWu, you can also call him 'Ji Dan' (In Chinese, it means 'egg').",
		"主要致力于无线红石(数电), 生电也会一点; 机器设计很糟糕, 臃肿 试图改进中...": "Mainly dedicated to wireless redstone (digital circuitry), but also a little survival circuitry; machine design is terrible and bloated Trying to improve...",
		"星渊, 名称取自'Ad Astra Abyssosque', 曾用名'AstraAbyssque'为原句的变体.": "xingYuan(In Chinese, it means Stars and Abysses), name taken from 'Ad Astra Abyssosque', formerly 'AstraAbyssque', a variant of the original.",
		"写写代码, 依然在学习, 数学不错, 但有一些基础依然不懂.": "Enjoys coding, still studying, good at maths, but still don't understand some of the basics.",
		"登陆": "Sign In",
		"我们不建议您登陆. 如果您登陆, 即代表您同意我们的": "We do not recommend that you log in. By logging in, you are agreeing to our", 
		"<用户服务协议和隐私政策>": "\"User Service Agreement and Privacy Policy\"(<用户服务协议和隐私政策>)",
		"我已知晓, 开始登陆": "DONT SIGN IN PLS",
		"这是员工通道, 我们强烈不建议您登陆, 如果登陆, 后果自负": "This is a staff channel, we strongly discourage you from logging in, if you do, you will be responsible for the consequences.",
		"转换: Jawbts标准时间戳 <-> Jawbts标准时间": "Convert: Jawbts standard timestamp <-> Jawbts standard time",
		"点击输入时间戳": "Click to enter a timestamp",
		"他的公钥": "His public key"
	}
};
var lang = "zh_cn";
if ('localStorage' in window) {
	var lang = localStorage.getItem("lang") || navigator.language.slice(0, 2);
	if (!Object.keys(arrLang).includes(lang) && lang != "en_us") lang = "zh_cn";
}
$(document).ready(function() {
	$("*").each(function(index, element) {
		if (lang == "zh_cn") {
			$(this).text($(this).attr("key"));
		} else {
			$(this).text(arrLang[lang][$(this).attr("key")]);
		}
	})
});
$(document).ready(function() {
	$(".langchanger").click(function() {
		var lang = $(this).attr("id");
		if ('localStorage' in window) {
			localStorage.setItem("lang", lang);
		}
		$("*").each(function(index, element) {
			if (lang == "zh_cn") {
				$(this).text($(this).attr("key"));
			} else {
				$(this).text(arrLang[lang][$(this).attr("key")]);
			}
		})
	})
});