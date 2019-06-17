var specials = ['aurora', 'concrete', 'darkcity', 'jigsaw', 'starlight', 'scarlet', 'gww', 'rjp', 'imf', 'fsc', 'terminal'];
var gates = null;
var current_gate_index = 0;
var next_gate_time = 0;
var lineno = 0;
var timer = null;

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
	// new gates are created on 11pm Eastern Time
	// i had to include this time zone library solely for this smh
	let latest_gate = gates[current_gate_index];
	next_gate_time = moment.tz(format_date(latest_gate[0]) + ' 23:00', 'America/New_York').add(2, 'days').valueOf();

	let div = document.createElement('div');
	div.setAttribute('class', 'entry');
	let img = document.createElement('img');
	img.setAttribute('draggable', 'false');
	img.setAttribute('src', 'page-icons/unknown.png');
	let name_div = document.createElement('div');
	name_div.setAttribute('class', 'name-date');
	let p = document.createElement('p');
	p.innerHTML = '---';
	name_div.appendChild(p);
	p = document.createElement('p');
	p.setAttribute('class', 'no-bold');
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
		p.innerHTML = to_gatename(e[1]) + ' Gate';
		name_div.appendChild(p);
		p = document.createElement('p');
		p.setAttribute('class', 'no-bold');
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
	let gate_data = text_expand(text);
	let spacer = null;
	document.getElementById('gate-img').setAttribute('src', 'page-icons/' + current_gate[1] + '.png');
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
		} else if (depth === 8) {
			container.appendChild(wrap_icon(['moorcroft']));
		} else if (depth === 18) {
			container.appendChild(wrap_icon(['emberlight']));
		} else if (depth === 29) {
			container.appendChild(wrap_icon(['terminal', 'core']));
		} else if (depth === 4 || depth === 13 || depth === 23) {
			container.appendChild(wrap_icon(['terminal']));
		} else {
			let depth_data = gate_data[lineno].split(',');
			let direction = depth_data[0] === 'l' ? 'left' : depth_data[0] === 'r' ? 'right' : 'random';
			if (depth_data.length > 2) {
				spacer = document.createElement('img');
				spacer.setAttribute('draggable', 'false');
				spacer.setAttribute('src', 'spacer_' + direction + '.png');
				container.appendChild(spacer);
			}
			for (let i=1; i<depth_data.length; i++) {
				container.appendChild(wrap_icon(depth_data[i].trim().split(' ')));
				if (depth_data.length > 2) {
					spacer = document.createElement('img');
					spacer.setAttribute('draggable', 'false');
					spacer.setAttribute('src', 'spacer_' + direction + '.png');
					container.appendChild(spacer);
				}
			}
			lineno++;
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
	remove_style();
	current_gate_index = parseInt(this.getAttribute('data-value'));
	add_style();
	fetch_gate_data();
}

function remove_style() {
	document.querySelector('div.entry[data-value="' + current_gate_index.toString() + '"]').classList.remove('light-bg');
	document.querySelector('div.entry[data-value="' + current_gate_index.toString() + '"]>img').removeAttribute('style');
}

function add_style() {
	document.querySelector('div.entry[data-value="' + current_gate_index.toString() + '"]').classList.add('light-bg');
	document.querySelector('div.entry[data-value="' + current_gate_index.toString() + '"]>img').setAttribute('style', 'opacity: 1');
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
}