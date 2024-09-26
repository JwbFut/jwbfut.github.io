window.onload = on_config_change;

function setO(x) {
	document.getElementById("r_output").innerHTML = x;
}

let flag = false;

function k(a) {
	if (!flag) return;
	localStorage.setItem("exclude", document.getElementById("r_exclude").value);
	let exclude = document.getElementById("r_exclude").value.split(",");

    let choices = [];
    for (let i = 1; i <= document.getElementById("r_total").value; i++) {
        let f_1 = false;
        for (let j in exclude) {
            if (i == exclude[j]) f_1 = true;
            if (exclude[j].includes("-")) {
                let k1 = exclude[j].split("-")[0],
                    k2 = exclude[j].split("-")[1];
                if (i >= k1 && i <= k2) f_1 = true;
            }
        }
        if (!f_1) choices.push(i);
    }

    let n = choices.length == 0 ? "None" : choices[Math.floor(Math.random() * choices.length)];
	setO(n);
	setTimeout(() => k(--a), 100);
}

function getR() {
	if (flag) {
		flag = false;
	} else {
		flag = true;
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