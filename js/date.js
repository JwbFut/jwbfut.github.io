function isLeap(a) {
	if (a % 400 == 0) {
		return true;
	}
	if (a % 100 != 0 && a % 4 == 0) {
		return true;
	} else {
		return false;
	}
}

function isData(x) {
	x = +x;
	if (x != x) {
		return "Not A Number!";
	}
	if (x <= 0) {
		return "Too Low!";
	}
	if (!(Math.round(x) === x)) {
		return "Natural Number Please";
	} else {
		return "ok";
	}
}

function dayToDate(a) {
	var b = 0; // 年
	var c = 0; // 日
	do {
		b += 1;
		if (isLeap(b)) {
			c += 366;
		} else {
			c += 365;
		}
	} while (c < a) if (isLeap(b)) {
		c = 366 - (c - a);
	} else {
		c = 365 - (c - a);
	}
	var d = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var e = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var f = c;
	var g = 0; // 月
	var h = 0;
	if (!(isLeap(b))) {
		do {
			g += 1;
			h += d[g - 1];
		} while (h < c);
		c = d[g - 1] - (h - c);
	} else {
		do {
			g += 1;
			h += e[g - 1];
		} while (h < c);
		c = e[g - 1] - (h - c);
	}
	return {
		b: b,
		g: g,
		c: c
	};
}

function inputSTT() {
	document.getElementById("output2").innerHTML = "";
	var a = prompt('输入时间戳');
	if (isData(a) != "ok") {
		window.alert(isData(a));
		return;
	}
	var date = dayToDate(Math.floor(a / 86400) + 1);
	document.getElementById("output2").innerHTML = date.b + "年" + date.g + "月" + date.c + "日 "
	+ Math.floor(a / 3600 % 24).toString().padStart(2, "0") + ":" + Math.floor(a % 3600 / 60).toString().padStart(2, "0")
	+ ":" + (a % 60).toString().padStart(2, "0");
}

function input() {
	document.getElementById("output").innerHTML = "";
	var a = prompt('输入当前天数');
	if (isData(a) != "ok") {
		window.alert(isData(a));
		return;
	}
	var date = dayToDate(a);
	var b = date.b;
	var g = date.g;
	var c = date.c;
	var i = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
	var j = document.getElementById("timeHour").value;
	var k = document.getElementById("timeMinute").value;
	var l = document.getElementsByName("timeOff");
	var m;
	if (!l[0].checked) {
		m = "IN GAME TIME: " + b + "年" + g + "月" + c + "日 " + i[(a - 1) % 7] + " " + j + ":" + k;
	} else {
		m = "IN GAME TIME: " + b + "年" + g + "月" + c + "日 " + i[(a - 1) % 7];
	}
	var n = new Date();
	var o;
	if (!l[1].checked) {
		o = "REALITY TIME: " + n.getFullYear() + "年" + (n.getMonth() + 1) + "月" + n.getDate() + "日 " + i[n.getDay()] +
			" " + n.getHours() + ":" + n.getMinutes();
	} else {
		o = "REALITY TIME: " + n.getFullYear() + "年" + (n.getMonth() + 1) + "月" + n.getDate() + "日 " + i[n.getDay()];
	}
	document.getElementById("output").innerHTML = m + " | " + o;
}
