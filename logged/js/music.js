const context = new AudioContext();
let cur_playing = null;

let playing = false;
function play_music() {
	if (!cur_playing) return;
	playing = !playing;
	if (playing) {
		context.resume();
	} else {
		context.suspend();
	}
}

let source = null;
async function onPlayingChange() {
	context.suspend();
	if (source) source.disconnect();
	const url = "http://localhost:3000/music/get?bv=" + cur_playing.bvid;
	
	const cache = await caches.open("music_cache");
	let settings = await cache.match(url);
	if (!settings) {
		const response = await fetch(url, {
			type: "GET",
			headers: {
				"Authorization": "customscheme " + localStorage.getItem("token")
			}
		});
		settings = response.clone();
		cache.put(url, response);
	}
	
	const array_buffer = await settings.arrayBuffer();
	const audio_buffer = await context.decodeAudioData(array_buffer);
	source = context.createBufferSource();
	source.buffer = audio_buffer;
	source.connect(context.destination);
	source.start();
	playing = true;
	context.resume();
	$("#play_info").text(`${cur_playing.bvid}/${cur_playing.title}`);
}

let folder_show, song_show;

function isData(x) {
	x = +x;
	if (x != x) {
		return "Not A Number!";
	}
	if (x < 0) {
		return "Too Low!";
	}
	if (!(Math.round(x) === x)) {
		return "Natural Number Please";
	} else {
		return "ok";
	}
}

var data_js = null, song_list = null;

function hide_folder() {
	document.getElementById("select_folder_title").style.display = "none";
}

function show_folder() {
	document.getElementById("select_folder_title").style.display = "";
	window.location.hash = "";
}

function select_folder_sh() {
	$("#select_folder_title").text("切换收藏夹");
	hide_folder();
	folder_show = !folder_show;
	
	if (folder_show) {
		const up_mid = prompt('输入收藏夹所属 up 的 mid');
		if (isData(up_mid) != "ok") {
			folder_show = false;
			$("#select_folder_title").text("你在输入什么?");
			show_folder();
			return;
		}
		fetch("http://localhost:3000/music/get/folder?up_mid=" + up_mid, {
			type: "GET",
			headers: {
				"Authorization": "customscheme " + localStorage.getItem("token")
			}
		}).then(response => response.json()).then(json => {
			data_js = json.data;

			if (!data_js[0]) {
				$("#SelectFolderDropdown").show();
				$("#select_folder_title").text("出问题了");
				show_folder();
				return;
			}

			for (var i in data_js) {
				const data_block = data_js[i];
				$("#SelectFolderDropdownList").append("<li id=SelectFolderObj><a name=SelectFolderInnerObj href=#" +
					i + ">" + data_block.title + "</a></li>");
			}

			document.getElementsByName("SelectFolderInnerObj").forEach(element => {
				element.addEventListener('click', function() {
					let objL = document.getElementsByName("SelectFolderInnerObj");
					for (let i = 0; i < objL.length; i++) {
						objL[i].style = "";
					}
					this.style = "color: orange";
				});
			});

			$("#SelectFolderDropdown").show();
			$("#select_folder_title").text("确定");
			show_folder();
		});
	} else {
		const hash = +window.location.hash.substring(1);
		if (isData(hash) != "ok" || window.location.hash.length == 0 || !data_js[hash]) {
			$("#select_folder_title").text("出问题了");
			$("#SelectFolderDropdown").hide();
			document.getElementById("SelectFolderDropdownList").replaceChildren();
			show_folder();
			return;
		}
		
		fetch("http://localhost:3000/profiles/set?bilibili_music_folder=" + data_js[hash].id, {
			type: "GET",
			headers: {
				"Authorization": "customscheme " + localStorage.getItem("token")
			}
		}).then(response => response.json()).then(json => {
			if (json.code != "Success") {
				console.log(json);
				show_folder();
				$("#select_folder_title").text("出问题了");
			}
		});
		
		$("#SelectFolderDropdown").hide();
		document.getElementById("SelectFolderDropdownList").replaceChildren();
		show_folder();
	}
	window.location.hash = "";
}

function hide_song() {
	document.getElementById("select_song_title").style.display = "none";
}

function show_song() {
	document.getElementById("select_song_title").style.display = "";
	window.location.hash = "";
}

function treat_song_list(song_list) {
	if (!song_list[0]) {
		$("#SelectSongDropdown").show();
		$("#select_song_title").text("出问题了");
		show_song();
		return;
	}
	
	for (var i in song_list) {
		const data_block = song_list[i];
		$("#SelectSongDropdownList").append("<li id=SelectSongObj><a name=SelectSongInnerObj href=#" +
			i + ">" + data_block.title + "</a></li>");
	}
	
	document.getElementsByName("SelectSongInnerObj").forEach(element => {
		element.addEventListener('click', function() {
			let objL = document.getElementsByName("SelectSongInnerObj");
			for (let i = 0; i < objL.length; i++) {
				objL[i].style = "";
			}
			this.style = "color: orange";
		});
	});
	
	$("#SelectSongDropdown").show();
	$("#select_song_title").text("确定");
	show_song();
}

function select_song_sh() {
	$("#select_song_title").text("切换歌曲");
	hide_song();
	folder_show = !folder_show;
	
	if (folder_show) {
		if (song_list) {
			treat_song_list(song_list);
		} else {
			fetch("http://localhost:3000/music/get/play", {
				type: "GET",
				headers: {
					"Authorization": "customscheme " + localStorage.getItem("token")
				}
			}).then(response => response.json()).then(json => {
				song_list = json.data;
				treat_song_list(json.data);
			});
		}
	} else {
		const hash = +window.location.hash.substring(1);
		if (isData(hash) != "ok" || window.location.hash.length == 0 || !song_list[hash]) {
			$("#select_song_title").text("出问题了");
			$("#SelectSongDropdown").hide();
			document.getElementById("SelectSongDropdownList").replaceChildren();
			show_song();
			return;
		}
		
		cur_playing = song_list[hash];
		onPlayingChange();

		$("#SelectSongDropdown").hide();
		document.getElementById("SelectSongDropdownList").replaceChildren();
		show_song();
	}
}

function select_folder_filter() {
	var input, filter, ul, li, a, i;
	input = document.getElementById("FolderSearch");
	filter = input.value;
	div = document.getElementById("SelectFolderDropdownList");
	a = div.getElementsByTagName("li");
	for (i = 0; i < a.length; i++) {
		txtValue = a[i].textContent || a[i].innerText;
		if (txtValue.search(filter) > -1) {
			a[i].style.display = "";
		} else {
			a[i].style.display = "none";
		}
	}
}

function select_song_filter() {
	var input, filter, ul, li, a, i;
	input = document.getElementById("SongSearch");
	filter = input.value;
	div = document.getElementById("SelectSongDropdownList");
	a = div.getElementsByTagName("li");
	for (i = 0; i < a.length; i++) {
		txtValue = a[i].textContent || a[i].innerText;
		if (txtValue.search(filter) > -1) {
			a[i].style.display = "";
		} else {
			a[i].style.display = "none";
		}
	}
}

async function refresh_folder() {
	$("#refresh_folder_output").text("刷新中");
	// refresh folder
	await fetch("http://localhost:3000/music/update", {
		type: "GET",
		headers: {
			"Authorization": "customscheme " + localStorage.getItem("token")
		}
	});
	
	// refresh song list
	await fetch("http://localhost:3000/music/get/play", {
		type: "GET",
		headers: {
			"Authorization": "customscheme " + localStorage.getItem("token")
		}
	}).then(response => response.json()).then(json => {
		song_list = json.data;
	});
	$("#refresh_folder_output").text("刷新完成");
}

$(document).ready(function() {
	folder_show = false;
	$("#SelectFolderDropdown").hide();
	song_show = false;
	$("#SelectSongDropdown").hide();
});
