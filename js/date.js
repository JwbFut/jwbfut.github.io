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
	var time_stamp = prompt('输入时间戳');
	if (isData(time_stamp) != "ok") {
		window.alert(isData(time_stamp));
		return;
	}
	var sec = time_stamp % 60;
	var min = Math.floor(time_stamp % 3600 / 60);
	var hour = Math.floor(time_stamp / 3600 % 24);
	
	var days = Math.floor(time_stamp / 3600 / 24);
	var day = days % 30 + 1;
	var month = Math.floor(days / 30) % 12 + 1;
	var year = Math.floor(days / 30 / 12) + 1;
	
	document.getElementById("output2").innerHTML = year + "年" + month + "月" + day + "日 "
	+ hour.toString().padStart(2, "0") + ":" + min.toString().padStart(2, "0")
	+ ":" + sec.toString().padStart(2, "0");
}

function inputTTS() {
	document.getElementById("output_TTS").innerHTML = "";
	var y = +document.getElementById("t_year").value;
	var mon = +document.getElementById("t_month").value;
	var d = +document.getElementById("t_day").value;
	var h = +document.getElementById("t_hour").value;
	var min = +document.getElementById("t_minute").value;
	var s = +document.getElementById("t_second").value;
	document.getElementById("output_TTS").innerHTML = (((((y - 1) * 12 + mon - 1) * 30 + d - 1) * 24 + h) * 60 + min) * 60 + s;
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
