window.onload = function() {
    on_config_change();
}

mspc_pos = [];
function on_mspc_update() {
    let output = "";
    for (let i in mspc_pos) {
        output += "x: " + mspc_pos[i].x + ", z: " + mspc_pos[i].y + ", deg: " + mspc_pos[i].deg + "<br />";
    }
    document.getElementById("mspc_pos_output").innerHTML = output;

    if (mspc_pos.length < 2) return;

    let funcs = [];
    for (let i in mspc_pos) {
        let k = 1 / Math.tan(-mspc_pos[i].deg / 180 * Math.PI);
        funcs.push({
            k: k,
            b: mspc_pos[i].y - k * mspc_pos[i].x
        })
    }
    
    pos_x_sum = 0;
    pos_y_sum = 0;
    sum = 0;
    for (let i in mspc_pos) {
        for (let j in mspc_pos) {
            if (i == j) continue;
            // 求一次函数交点
            let x = (funcs[j].b - funcs[i].b) / (funcs[i].k - funcs[j].k);
            let y = funcs[i].k * x + funcs[i].b;
            pos_x_sum += x;
            pos_y_sum += y;
            sum++;
        }
    }
    let pos_x = pos_x_sum / sum;
    let pos_y = pos_y_sum / sum;
    document.getElementById("mspc_output").innerHTML = "x: " + pos_x.toFixed(0) + ", z: " + pos_y.toFixed(0);
}

function mspc_save_pos() {
    x = document.getElementById("mspc_x").value;
    y = document.getElementById("mspc_y").value;
    deg = document.getElementById("mspc_deg").value;

    document.getElementById("mspc_x").value = "";
    document.getElementById("mspc_y").value = "";
    document.getElementById("mspc_deg").value = "";
    mspc_pos.push({x: x, y: y, deg: deg});

    on_mspc_update();
}

class Interval {
    /**
     * left are included, right are not included
     * @param {*} left 
     * @param {*} right 
     */
    constructor(left, right) {
        this.left = left * 1;
        this.right = right * 1;
    }

    exclude(left, right) {
        // if the interval is completely inside the excluded interval, return empty interval
        if (this.left >= left && this.right <= right) return [new Interval(0, 0)];
        // if the excluded interval is completely outside the interval, return the interval
        if (left >= this.right || right <= this.left) return [this];
        // if the excluded interval is inside the interval, return two intervals
        if (left > this.left && right < this.right) return [new Interval(this.left, left), new Interval(right, this.right)];
        // if the excluded interval overlaps the left side of the interval, return one interval
        if (left <= this.left && right >= this.left) return [new Interval(right, this.right)];
        // if the excluded interval overlaps the right side of the interval, return one interval
        if (left <= this.right && right >= this.right) return [new Interval(this.left, left)];

        // should not reach here
        return null;
    }

    count() {
        return this.right - this.left;
    }

    toString() {
        return "[" + this.left + ", " + this.right + ")";
    }
}

function setO(x) {
	document.getElementById("r_output").innerHTML = x;
}

let flag = false;

let intervals_cache = [];
function compile_intervals(exclude) {
    let intervals = [new Interval(1, document.getElementById("r_total").value * 1 + 1)];
    for (let i in exclude) {
        if (exclude[i].includes("-")) {
            let k1 = exclude[i].split("-")[0],
                k2 = exclude[i].split("-")[1] * 1 + 1;
            intervals = intervals.flatMap(x => x.exclude(k1, k2));
        } else {
            intervals = intervals.flatMap(x => x.exclude(exclude[i], exclude[i] * 1 + 1));
        }
    }
    intervals_cache = intervals;
}

function k(a) {
	if (!flag) return;

    let sum = intervals_cache.flatMap(x => x.count()).reduce((a, b) => a + b, 0);
    let pick_one = Math.floor(Math.random() * sum);
    let n = "None";
    if (sum != 0) {
        for (let i in intervals_cache) {
            let count = intervals_cache[i].count();
            if (pick_one < count) {
                n = intervals_cache[i].left + pick_one;
                break;
            }
            pick_one -= count;
        }
    }

	setO(n);
	setTimeout(() => k(--a), 100);
}

function getR() {
	if (flag) {
		flag = false;
	} else {
		flag = true;

        localStorage.setItem("exclude", document.getElementById("r_exclude").value);
	    let exclude = document.getElementById("r_exclude").value.split(",");
        compile_intervals(exclude);

		k(10);
	}
}

function start_rand() {
	getR();
}

function on_config_change() {
    // load config and output it to the page div "r_config_output" as buttons
    let config = localStorage.getItem("RNConfig") || "[]";
    config = JSON.parse(config);
    let output = "";
    for (let i in config) {
        output += '<br /><button class="uk-button uk-button-default" style="margin: 5px;" onclick="load_config(' + i + ')">' + "Load " + config[i].name + '</button>';
    }
    document.getElementById("r_config_output").innerHTML = output;
}

function load_config(index) {
    let config = localStorage.getItem("RNConfig") || "[]";
    config = JSON.parse(config);
    document.getElementById("r_total").value = config[index].total;
    document.getElementById("r_exclude").value = config[index].exclude;
}

function save_config() {
    var name = prompt('Name?');
    if (!name) return;

    let config = localStorage.getItem("RNConfig") || "[]";
    config = JSON.parse(config);
    config.push({name: name, total: document.getElementById("r_total").value, exclude: document.getElementById("r_exclude").value});
    localStorage.setItem("RNConfig", JSON.stringify(config));
    
    on_config_change();
}