function isLeap(year) {
	//判断是否闰年
	if (year % 400 == 0) {
		return true;
	}
	if (year % 100 != 0 && year % 4 == 0) {
		return true;
	} else {
		return false;
	}
}

function isData(x) {
	x = +x;
	if (x != x) {
		return "Not A Number!"
	}
	if (x <= 0) {
		return "Too Low!"
	}
	if (!(Math.round(x) === x)) {
		return "Natural Number Please"
	} else {
		return "ok"
	}
}

function input() {
	document.getElementById("output").innerHTML = "";

	var n_day = prompt('输入当前天数');

	if (isData(n_day) != "ok") {
		window.alert(isData(n_day));
		document.getElementById("output").innerHTML = "";
	} else {
		//获得年
		var n_year = 0;
		var day = 0;
		do {
			n_year += 1;
			if (isLeap(n_year)) {
				day += 366;
			} else {
				day += 365;
			}
		}
		while (day < n_day)

		//获得今年的第几日
		if (isLeap(n_year)) {
			day = 366 - (day - n_day);
		} else {
			day = 365 - (day - n_day);
		}

		var daysinMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var daysinLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		var dayc = day;

		var month = 0;
		var dayB = 0;

		//获得月份
		if (!(isLeap(n_year))) {
			do {
				month += 1;
				dayB += daysinMonth[month - 1];
			} while (dayB < day);
			day = daysinMonth[month - 1] - (dayB - day);
		} else {
			do {
				month += 1;
				dayB += daysinLeap[month - 1];
			} while (dayB < day);
			day = daysinLeap[month - 1] - (dayB - day);
		}

		//获得星期
		var weekname = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]

		var timeH = document.getElementById("timeHour").value;
		var timeM = document.getElementById("timeMinute").value;

		var obj = document.getElementsByName("timeOff");
		if (!obj[0].checked) {
			var InGameTime = "IN GAME TIME: " + n_year + "年" + month + "月" + day + "日 " + weekname[(n_day - 1) % 7] +
				" " + timeH + ":" + timeM;
		} else {
			var InGameTime = "IN GAME TIME: " + n_year + "年" + month + "月" + day + "日 " + weekname[(n_day - 1) % 7];
		}


		var now = new Date();
		if (!obj[1].checked) {
			var RealityTime = "REALITY TIME: " + now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() +
				"日 " + weekname[now.getDay() - 1] + " " + now.getHours() + ":" + now.getMinutes();
		} else {
			var RealityTime = "REALITY TIME: " + now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() +
				"日 " + weekname[now.getDay() - 1];
		}


		document.getElementById("output").innerHTML = InGameTime + " | " + RealityTime;
	}
}
