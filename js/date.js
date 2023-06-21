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

function input() {
	document.getElementById("output").innerHTML = "";
	var a = prompt('输入当前天数');
	if (isData(a) != "ok") {
		window.alert(isData(a));
		document.getElementById("output").innerHTML = "";
	} else {
		var b = 0;
		var c = 0;
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
		var g = 0;
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
		var i = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
		var j = document.getElementById("timeHour").value;
		var k = document.getElementById("timeMinute").value;
		var l = document.getElementsByName("timeOff");
		if (!l[0].checked) {
			var m = "IN GAME TIME: " + b + "年" + g + "月" + c + "日 " + i[(a - 1) % 7] + " " + j + ":" + k;
		} else {
			var m = "IN GAME TIME: " + b + "年" + g + "月" + c + "日 " + i[(a - 1) % 7];
		}
		var n = new Date();
		if (!l[1].checked) {
			var o = "REALITY TIME: " + n.getFullYear() + "年" + (n.getMonth() + 1) + "月" + n.getDate() + "日 " + i[n.getDay() - 1] + " " + n.getHours() + ":" + n.getMinutes();
		} else {
			var o = "REALITY TIME: " + n.getFullYear() + "年" + (n.getMonth() + 1) + "月" + n.getDate() + "日 " + i[n.getDay() - 1];
		}
		document.getElementById("output").innerHTML = m + " | " + o;
	}
}