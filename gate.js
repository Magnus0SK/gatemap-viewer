var gates = null;
var current_gate_index = 0;
var next_gate_time = 0;
var lineno = 0;
var timer = null;
var rotation_timer = null;
var next_level_timer = null;
var next_level_time = 0;
var gate_refresh_time = Infinity;
var section_heights = null;
var rot_data = null;
var current_depth = 0;
var selected_levels = [0];
var params = {};

// 'diamond_queen' -> 'Diamond Queen'
function to_gatename(s) {
	return s.split('_').map(e => e[0].toUpperCase() + e.slice(1)).join(' ');
}

// '20190616' -> '2019-06-16'
function format_date(s) {
	return s.slice(0, 4) + '-' + s.slice(4, 6) + '-' + s.slice(6);
}

// (async) fetches gate description text file
function fetch_gate_data() {
	let current_gate = gates[current_gate_index];
	let fn = current_gate.join('_');
	fetch('gates/' + fn + '.txt')
		.then(response => response.text())
		.then(text => populate(text));
}

// callback function to handle all the gate data, also populates the jump bar
function populate_gates(text) {
	gates = text.split('\n').map(e => e.split(','));
	current_gate_index = gates.length - 1;  // set to latest gate
	fetch_gate_data();
	// new gates are created at midnight Eastern Time, every two days
	// i had to include this time zone library solely for this smh
	let latest_gate = gates[current_gate_index];
	next_gate_time = moment.tz(format_date(latest_gate[0]) + ' 00:00', 'America/New_York').add(2, 'days').valueOf();

	let div = document.createElement('div');
	div.setAttribute('class', 'entry');
	let img = document.createElement('img');
	img.setAttribute('draggable', 'false');
	img.setAttribute('src', 'page-icons/unknown.png');
	let name_div = document.createElement('div');
	name_div.setAttribute('class', 'name-date');
	let p = document.createElement('p');
	p.setAttribute('class', 'text-title');
	p.innerHTML = '---';
	name_div.appendChild(p);
	p = document.createElement('p');
	p.setAttribute('class', 'text-title no-bold');
	p.setAttribute('id', 'nextdate');
	p.innerHTML = '-';
	name_div.appendChild(p);
	div.appendChild(img);
	div.appendChild(name_div);
	document.getElementById('entry-wrapper').appendChild(div);

	for (let i=gates.length-1; i>=0; i--) {
		let e = gates[i];
		let div = document.createElement('div');
		div.setAttribute('class', 'entry');
		div.setAttribute('data-value', i.toString());
		div.addEventListener('click', gate_jump);
		if ((gates.length - i) % 2 !== 0) {
			div.setAttribute('class', 'entry dark-bg');
		}
		let img = document.createElement('img');
		img.setAttribute('draggable', 'false');
		img.setAttribute('src', 'page-icons/' + e[1] + '.png');
		let name_div = document.createElement('div');
		name_div.setAttribute('class', 'name-date');
		let p = document.createElement('p');
		p.setAttribute('class', 'text-title');
		p.innerHTML = to_gatename(e[1]) + ' Gate';
		name_div.appendChild(p);
		p = document.createElement('p');
		p.setAttribute('class', 'text-title no-bold');
		p.innerHTML = format_date(e[0]);
		name_div.appendChild(p);
		div.appendChild(img);
		div.appendChild(name_div);
		document.getElementById('entry-wrapper').appendChild(div);
	}
	add_style();
	timer_func();
	timer = setInterval(timer_func, 1000);
}

// fills up the gate map with level icons
function populate(text) {
	let current_gate = gates[current_gate_index];
	let gatename = to_gatename(current_gate[1]);
	let data_chunk, gate_data
	if (text.startsWith('##')) {
		data_chunk = get_chunks(text);
		gate_data = text_expand(data_chunk.levels);
	} else {
		data_chunk = {levels: text};
		gate_data = text_expand(text);
	}
	
	// clear out lines and timer
	current_depth = 0;
	selected_levels = [0];
	if (rotation_timer != null) {
		clearTimeout(rotation_timer);
	}
	if (next_level_timer != null) {
		clearTimeout(next_level_timer);
	}
	if ('rotations' in data_chunk && (gates.length - current_gate_index <= 4 || params['show_old_rotations'])) {
		rot_data = data_chunk.rotations;
	} else {
		rot_data = null;
		document.getElementById('rotation-timer').innerText = '\u2012\u2012:\u2012\u2012 to';
		document.getElementById('timer-img').setAttribute('src', 'page-icons/unknown.png');
		document.getElementById('next-level-name').innerHTML = '<p>---</p>';
		draw_lines(true);
	}
	
	// fill in the levels
	let spacer = null;
	document.getElementById('gate-img').setAttribute('src', `page-icons/${current_gate[1]}.png`);
	document.getElementById('gate-name').innerHTML = gatename + ' Gate';
	document.getElementById('gate-date').innerHTML = format_date(current_gate[0]);
	let parent = document.getElementById('depth-container');
	parent.innerHTML = '';
	lineno = 0;
	for (let depth = -1; depth<30; depth++) {
		let container = document.createElement('div');
		container.setAttribute('class', 'depth-entry');
		if (depth === -1) {
			container.appendChild(wrap_icon(['haven']));
		} else if (depth === 0) {
			container.appendChild(wrap_icon(['lobby']));
			container.setAttribute('id', 's1');
		} else if (depth === 8) {
			container.appendChild(wrap_icon(['moorcroft']));
			container.setAttribute('id', 's3');
		} else if (depth === 18) {
			container.appendChild(wrap_icon(['emberlight']));
			container.setAttribute('id', 's5');
		} else if (depth === 29) {
			container.appendChild(wrap_icon(['terminal', 'core']));
		} else if (depth === 4 || depth === 13 || depth === 23) {
			container.appendChild(wrap_icon(['terminal']));
			container.setAttribute('id', depth === 4 ? 's2' : depth === 13 ? 's4' : 's6');
		} else {
			let depth_data = gate_data[lineno].split(',');
			let direction = depth_data[0] === 'l' ? 'left' : depth_data[0] === 'r' ? 'right' : 'random';
			if (depth_data.length > 2) {
				spacer = document.createElement('img');
				spacer.setAttribute('draggable', 'false');
				spacer.setAttribute('src', `spacer_${direction}.png`);
				container.appendChild(spacer);
			}
			for (let i=1; i<depth_data.length; i++) {
				container.appendChild(wrap_icon(depth_data[i].trim().split(' ')));
				if (depth_data.length > 2) {
					spacer = document.createElement('img');
					spacer.setAttribute('draggable', 'false');
					spacer.setAttribute('src', `spacer_${direction}.png`);
					container.appendChild(spacer);
				}
			}
			lineno++;
		}
		if (rot_data != null && depth > -1) {
			let imgs = container.querySelectorAll('.icon-wrapper img');
			for (let i=0; i<imgs.length; i++) {
				imgs[i].setAttribute('data-depth', depth);
				imgs[i].setAttribute('data-levelnum', i);
				imgs[i].addEventListener('click', icon_click_func);
			}
		}
		parent.appendChild(container);
	}
	if (current_gate_index > 0) {
		document.getElementById('prev').addEventListener('click', event_prev);
	} else {
		document.getElementById('prev').removeEventListener('click', event_prev);
	}
	if (current_gate_index < gates.length - 1) {
		document.getElementById('next').addEventListener('click', event_next);
	} else {
		document.getElementById('next').removeEventListener('click', event_next);
	}
	
	// get section heights
	section_heights = [...Array(6).keys()]
		.map(s => s + 1)
		.map(s => document.getElementById(`s${s}`).offsetTop)
		.map(s => s - 33);  // quarter of one entry height (132)
	let container = document.getElementById('section-jump');
	for (let i=0; i<6; i++) {
		container.children[i].setAttribute('offset', section_heights[i]);
		container.children[i].addEventListener('click', section_jump_func);
		container.children[i].innerHTML = '';
		if ('themes' in data_chunk) {
			let icon = document.createElement('img');
			icon.setAttribute('class', 'stratum-icon');
			icon.setAttribute('alt', data_chunk.themes[i]);
			icon.setAttribute('src', `theme-icons/${data_chunk.themes[i].toLowerCase()}.png`);
			container.children[i].appendChild(icon);
		}
		let text = document.createElement('span');
		text.innerHTML = `S${i+1}`;
		container.children[i].appendChild(text);
	}
	
	// actually draw the lines now
	if (rot_data != null && params['show_timer']) {
		let lobby_node = document.querySelector('[data-depth="0"][data-levelnum="0"]').parentElement;
		lobby_node.classList.add('selected-level');
		get_next_level();
		draw_lines();
	}
}

// function to jump to a section (cuz i'm too cool for hash links)
function section_jump_func() {
	window.scrollTo(window.pageXOffset, parseInt(this.getAttribute('offset')));
}

// function to keep track of scroll position
function section_track_func() {
	let scroll_pos = window.pageYOffset;
	let stratum = 0;
	for (; stratum <= 5; stratum++){
		if (scroll_pos < section_heights[stratum]) {
			break;
		}
	}
	let container = document.getElementById('section-jump');
	for (let i=0; i<6; i++) {
		container.children[i].classList.remove('active');
		if (stratum === i+1) {
			container.children[i].classList.add('active');
		}
	}
}

// counts down time remaining to the next gate update
function timer_func() {
	let dist = next_gate_time - Date.now();
	if (dist < 0) dist = 0;
	
	let days = Math.floor(dist / (24 * 60 * 60 * 1000));
	let hrs = Math.floor(dist / (60 * 60 * 1000)) % 24;
	let mins = Math.floor(dist / (60 * 1000)) % 60;
	let secs = Math.floor(dist / 1000) % 60;
	
	let time_str = 'in ';
	if (days > 0) time_str += days + ':';
	if (days > 0 && hrs < 10) time_str += '0';
	time_str += hrs + ':';
	if (mins < 10) time_str += '0';
	time_str += mins + ':';
	if (secs < 10) time_str += '0';
	time_str += secs;
	
	document.getElementById('nextdate').innerHTML = time_str;
	
	if (dist <= 0) {
		clearInterval(timer);
	}
}

// function to be bound to Previous gate button
function event_prev() {
	remove_style();
	current_gate_index -= 1;
	add_style();
	fetch_gate_data();
}

// function to be bound to Next gate button
function event_next() {
	remove_style();
	current_gate_index += 1;
	add_style();
	fetch_gate_data();
}

// function to be bound to gate icons in jump bar
function gate_jump() {
	if (current_gate_index == parseInt(this.getAttribute('data-value')))
		return;
	remove_style();
	current_gate_index = parseInt(this.getAttribute('data-value'));
	add_style();
	fetch_gate_data();
}

function remove_style() {
	document.querySelector(`div.entry[data-value="${current_gate_index}"]`).classList.remove('light-bg');
	document.querySelector(`div.entry[data-value="${current_gate_index}"]>img`).removeAttribute('style');
}

function add_style() {
	document.querySelector(`div.entry[data-value="${current_gate_index}"]`).classList.add('light-bg');
	document.querySelector(`div.entry[data-value="${current_gate_index}"]>img`).setAttribute('style', 'opacity: 1');
}

// function to run when the page loads
function init() {
	// why write the page with the tickmarks when i can just do this
	let tick_container = document.getElementById('tick-container');
	for (let i=0; i<32; i++) {
		let tick = document.createElement('img');
		tick.setAttribute('draggable', 'false');
		tick.setAttribute('src', 'hashmarks.png');
		tick_container.appendChild(tick);
	}
	fetch('gates/gate_list.txt')
		.then(response => response.text())
		.then(text => populate_gates(text));
	window.addEventListener('scroll', section_track_func);
	
	// get url params
	let param_string = location.search.slice(1);
	let param_pairs = param_string.split('&').map(p => p.split('='));
	params = Object.fromEntries(param_pairs);
	
	// show the timer bar if param is set
	if (params['show_timer'])
		document.getElementById('timer-container').style.display = '';
	
	/* add disclaimer that this stuff isn't accurate... yet.
	   someone please help me fix it
	   run this only when param is set */
	if (params['show_timer']) {
		// get cookie
		let cookie_array = document.cookie.split(';');
		cookie_array = cookie_array.map(s => s.trim());
		let message_seen = false;
		let key_name = 'timerWarning';
		for (let i=0; i<cookie_array.length; i++) {
			if (cookie_array[i].startsWith(`${key_name}=`)) {
				message_seen = Boolean(parseInt(cookie_array[i].substring(key_name.length + 1)));
				break;
			}
		}
		// set cookie
		let expiry_time = new Date();
		expiry_time.setTime(expiry_time.getTime() + 365 * 24 * 60 * 60 * 1000);
		document.cookie = `${key_name}=1; expires=${expiry_time.toUTCString()}; path=/`;
		// display message depending on cookie value
		if (!message_seen) {
			let d1 = document.createElement('div');
			d1.setAttribute('class', 'warning-cover');
			let d = document.createElement('div');
			d.setAttribute('class', 'warning-box');
			let p = document.createElement('p');
			p.setAttribute('class', 'warning-head dark-bg');
			p.innerText = 'Warning';
			d.appendChild(p);
			p = document.createElement('p');
			p.setAttribute('class', 'warning-body');
			p.innerText = 'While this version of the gatemap viewer features level rotation timings, the predicted timings might be inaccurate under certain conditions.';
			d.appendChild(p);
			p = document.createElement('p');
			p.setAttribute('class', 'warning-button');
			p.innerText = 'OK';
			p.addEventListener('click', function() {
				this.parentElement.parentElement.remove();
			});
			d.appendChild(p);
			d1.appendChild(d);
			document.body.appendChild(d1);
		}
	}
}