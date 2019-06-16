specials = ['aurora', 'concrete', 'darkcity', 'jigsaw', 'starlight', 'scarlet', 'gww', 'rjp', 'imf', 'fsc', 'terminal'];

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
	var current_gate = gates[current_gate_index];
	var fn = current_gate.join('_');
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
	var latest_gate = gates[current_gate_index];
	next_gate_time = moment.tz(format_date(latest_gate[0]) + ' 23:00', 'America/New_York').add(2, 'days').valueOf();
	for (var i=0; i<gates.length; i++) {
		var e = gates[i];
		var img = document.createElement('img');
		img.setAttribute('draggable', false);
		img.setAttribute('class', 'animate');
		img.setAttribute('src', 'page-icons/' + e[1] + '.png');
		img.setAttribute('title', to_gatename(e[1]) + ' Gate (' + format_date(e[0]) + ')');
		img.setAttribute('data-value', i);
		img.addEventListener('click', gate_jump);
		document.getElementById('gate-tab').appendChild(img);
	};
	document.getElementById('gate-tab').scrollLeft = Number.MAX_SAFE_INTEGER;
}

// fills up the gate map with level icons
function populate(text) {
	var current_gate = gates[current_gate_index];
	var gatename = to_gatename(current_gate[1]);
	var gate_data = text_expand(text);
	console.log(gate_data);
	document.getElementById('gate-img').setAttribute('src', 'page-icons/' + current_gate[1] + '.png');
	document.getElementById('gate-name').innerHTML = gatename + ' Gate';
	document.getElementById('gate-date').innerHTML = format_date(current_gate[0]);
	var parent = document.getElementById('depth-container');
	parent.innerHTML = '';
	lineno = 0;
	for (var depth = -1; depth<30; depth++) {
		var container = document.createElement('div');
		container.setAttribute('class', 'depth-entry');
		if (depth == -1) {
			container.appendChild(wrap_icon(['haven']));
		} else if (depth == 0) {
			container.appendChild(wrap_icon(['lobby']));
		} else if (depth == 8) {
			img_name = 'moorcroft';
			container.appendChild(wrap_icon(['moorcroft']));
		} else if (depth == 18) {
			img_name = 'emberlight';
			container.appendChild(wrap_icon(['emberlight']));
		} else if (depth == 29) {
			container.appendChild(wrap_icon(['terminal', 'core']));
		} else if (depth == 4 || depth == 13 || depth == 23) {
			container.appendChild(wrap_icon(['terminal']));
		} else {
			var depth_data = gate_data[lineno].split(',');
			var direction = depth_data[0] == 'l' ? 'left' : depth_data[0] == 'r' ? 'right' : 'random';
			if (depth_data.length > 2) {
				var spacer = document.createElement('img');
				spacer.setAttribute('draggable', false);
				spacer.setAttribute('src', 'spacer_' + direction + '.png');
				container.appendChild(spacer);
			};
			for (var i=1; i<depth_data.length; i++) {
				container.appendChild(wrap_icon(depth_data[i].trim().split(' ')));
				
				if (depth_data.length > 2) {
					var spacer = document.createElement('img');
					spacer.setAttribute('draggable', false);
					spacer.setAttribute('src', 'spacer_' + direction + '.png');
					container.appendChild(spacer);
				};
			};
			lineno++;
		};
		parent.appendChild(container);
	};
	if (current_gate_index > 0) {
		document.getElementById('prevgate').setAttribute('src', 'page-icons/' + gates[current_gate_index-1][1] + '.png')
		document.getElementById('prevname').innerHTML = to_gatename(gates[current_gate_index-1][1]) + ' Gate';
		document.getElementById('prevdate').innerHTML = format_date(gates[current_gate_index-1][0]);
		document.getElementById('prev').addEventListener('click', event_prev);
	} else {
		document.getElementById('prevgate').setAttribute('src', 'page-icons/unknown.png')
		document.getElementById('prevname').innerHTML = '---';
		document.getElementById('prevdate').innerHTML = '-';
		document.getElementById('prev').removeEventListener('click', event_prev);
	};
	if (current_gate_index < gates.length - 1) {
		document.getElementById('nextgate').setAttribute('src', 'page-icons/' + gates[current_gate_index+1][1] + '.png')
		document.getElementById('nextname').innerHTML = to_gatename(gates[current_gate_index+1][1]) + ' Gate';
		document.getElementById('nextdate').innerHTML = format_date(gates[current_gate_index+1][0]);
		document.getElementById('next').addEventListener('click', event_next);
		clearInterval(timer);
	} else {
		document.getElementById('nextgate').setAttribute('src', 'page-icons/unknown.png')
		document.getElementById('nextname').innerHTML = '---';
		document.getElementById('nextdate').innerHTML = '-';
		document.getElementById('next').removeEventListener('click', event_next);
		timer_func();
		timer = setInterval(timer_func, 1000);
	};
};

// counts down time remaining to the next gate update
function timer_func() {
	var dist = next_gate_time - Date.now();
	if (dist < 0) dist = 0;
	
	var days = Math.floor(dist / (24 * 60 * 60 * 1000));
	var hrs = Math.floor(dist / (60 * 60 * 1000)) % 24;
	var mins = Math.floor(dist / (60 * 1000)) % 60;
	var secs = Math.floor(dist / 1000) % 60;
	
	time_str = 'in ';
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
	current_gate_index -= 1;
	fetch_gate_data();
}

// function to be bound to Next gate button
function event_next() {
	current_gate_index += 1;
	fetch_gate_data();
}

// function to be bound to gate icons in jump bar
function gate_jump(e) {
	current_gate_index = parseInt(this.getAttribute('data-value'));
	fetch_gate_data();
}

// function to run when the page loads
function init() {
	// why write the page with the tickmarks when i can just do this
	var tick_container = document.getElementById('tick-container');
	for (var i=0; i<32; i++) {
		var tick = document.createElement('img');
		tick.setAttribute('draggable', false);
		tick.setAttribute('src', 'hashmarks.png');
		tick_container.appendChild(tick);
	}
	fetch('gates/gate_list.txt')
		.then(response => response.text())
		.then(text => populate_gates(text));
}