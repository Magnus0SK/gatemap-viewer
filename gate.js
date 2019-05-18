specials = ['aurora', 'concrete', 'darkcity', 'jigsaw', 'starlight', 'scarlet', 'compound', 'gww', 'rjp', 'imf', 'fsc'];

function wrap_icon(fn, ident) {
	var div = document.createElement('div');
	div.setAttribute('class', 'icon-wrapper');
	var hover = document.createElement('div');
	hover.setAttribute('class', 'hover-wrapper');
	var textcontainer = document.createElement('div');
	textcontainer.setAttribute('class', 'title-wrapper text-title');
	var text = document.createElement('div');
	text.setAttribute('class', 'title');
	var blurbdiv = document.createElement('div');
	blurbdiv.setAttribute('class', 'blurb');
	var footer = document.createElement('div');
	footer.setAttribute('class', 'hover-footer');
	
	var img = document.createElement('img');
	img.setAttribute('draggable', false);
	if (fn == 'core') {
		img.setAttribute('src', 'page-icons/terminal.png');
	} else {
		img.setAttribute('src', 'page-icons/' + fn + '.png');
	}
	
	var title = '';
	var subtitle = '';
	var blurb = '';
	if (ident == null) {
		switch(fn){
			case 'haven':
				title = 'Haven';
				// blurb = 'A peaceful town that is home to the Strangers. These salvagers offer the Spiral Knights sanctuary in return for the treasures that they acquire while investigating the Clockworks. Haven is also heavily populated with snipes, bulbous little birds with a curious means of locomotion.';
				// this is too fucking long and it goes above the viewport.
				break;
			case 'lobby':
				title = 'The Clockworks';
				subtitle = 'Party Lobby';
				blurb = 'A lobby before entering a gate where knights can strategize and gear up for the adventure to come.';
				break;
			case 'moorcroft':
				title = 'Moorcroft Manor';
				subtitle = 'Town of Restless Spirits';
				blurb = 'A mysterious old manor home to a number of restless spirits. Moorcroft Manor appears to act as a station stop for spirits in their travels, however none of them appear to actually be going anywhere in particular.';
				break;
			case 'emberlight':
				title = 'Emberlight';
				subtitle = 'Town of Gremlin Outcasts';
				blurb = 'A village of outcasts, Emberlight serves as a refuge for gremlins who were banished from the Great Colony. Now they live humble lives, selling wares and repairs to passing travelers, always fearful that one day the gremlin king Tinkinzar would see fit to wipe them out entirely.';
				break;
			case 'terminal':
				title = 'Clockwork Terminal';
				subtitle = 'The Crossroads of Adventure';
				blurb = 'A level where travelers can safely return to town, or journey further into the depths of the Clockworks.';
				break;
			case 'core':
				title = 'The Core';
				subtitle = 'The Path is Sealed';
				blurb = 'A small terminal in the darkest depths of the Clockworks that looks out on to the colossal, ever-beating heart of the world.';
				break;
		}
	} else {
		switch(ident[0]){
			case 'arena':
				var x = {fire: 'Flame Lash Arena', freeze: 'Ice Maul Arena', shock: 'Thunder Fist Arena', poison: 'Venom Fang Arena', x: 'Iron Edge Arena'};
				var y = {beast: 'Beastly Brawl', construct: 'Robo Rampage', fiend: 'Fiendish Fray', gremlin: 'Wrench Warfare', slime: 'Slimey Showdown', undead: 'Cadaverous Clash'};
				title = x[ident[2]]; subtitle = y[ident[1]];
				break;
			case 'tunnel':
				var x = {fire: 'Blast Furnace', freeze: 'Cooling Chamber', shock: 'Power Complex', poison: 'Wasteworks', x: 'Clockwork Tunnels'};
				var y = {beast: 'Wild Path', construct: 'Mechanized Mile', fiend: 'Infernal Passage', gremlin: 'Gremlin Grounds', slime: 'Slimeway', undead: 'Haunted Passage'};
				title = x[ident[2]];
				subtitle = y[ident[1]];
				break;
			case 'compound':
				var x = {fire: 'Charred Compound', freeze: 'Frozen Compound', shock: 'Shocking Compound', poison: 'Blighted Compound', x: 'Ruined Compound'};
				var y = {beast: 'Ravenous Warrens', slime: 'Creeping Colony', undead: 'Chittering Burrows'};
				title = x[ident[2]];
				subtitle = y[ident[3]];
				break;
			case 'csk':
				var x = {fire: 'Burning Blackout', freeze: 'Cold Shadows', shock: 'Galvanized Gloom', poison: 'Noxious Night', x: 'Fear the Dark'};
				title = 'Candlestick Keep';
				subtitle = x[ident[1]];
				break;
			case 'decon':
				var x = {fire: 'Molten Mayhem', freeze: 'Cold Storage', shock: 'Circuit Breakers', poison: 'Radioactive Recycling', x: 'Savage Salvaging'};
				title = 'Deconstruction Zone';
				subtitle = x[ident[1]];
				break;
			case 'den':
				var x = {fire: 'Ashes to Ash Tails', freeze: 'Frosty Fury', shock: 'High Voltail', poison: 'Raving Rabids', x: 'Pack Brutality'};
				title = 'Wolver Den';
				subtitle = x[ident[1]];
				break;
			case 'lichen':
				var x = {fire: 'Fiery Fusion', freeze: 'Cold Fusion', shock: 'Shocking Synthesis', poison: 'Toxic Union', x: 'Prognosis: Symbiosis'};
				title = 'Lichenous Lair';
				subtitle = x[ident[1]];
				break;
			case 'dd':
				var x = {fire: 'Everybody\'s Fired', freeze: 'Hiring Freeze', shock: 'Wired for Synergy', poison: 'Toxic Workplace', x: 'Overtime, Every Time'};
				title = 'Devilish Drudgery';
				subtitle = x[ident[1]];
				break;
			case 'starlight':
				var x = {ss: 'Shrine of Slumber', ss2: 'Shrine of Slumber II', ss3: 'Shrine of Slumber III', ss4: 'Shrine of Slumber IV', mm: 'Meteor Mile', mm2: 'Meteor Mile II'};
				title = 'Starlight Cradle';
				subtitle = x[ident[1]];
				blurb = 'Beneath a moonlit sky azure islands drift in a sea of stars. These islands are home to creatures that are more than happy to creep upon those who succumb to this world\'s endless lullaby.';
				break;
			case 'starlight_boss':
				title = 'Starlight Cradle';
				subtitle = 'Torporal Titan';
				blurb = 'Beneath a moonlit sky azure islands drift in a sea of stars. These islands are home to creatures that are more than happy to creep upon those who succumb to this world\'s endless lullaby.';
				break;
			case 'darkcity':
				var x = {ss: 'Sinful Steps', ss2: 'Sinful Steps II', pm: 'Plazamonium', rr: 'Ritual Road', rr2: 'Ritual Road II', rr3: 'Ritual Road III'}
				title = 'Dark City';
				subtitle = x[ident[1]];
				blurb = 'This once bustling city from an advanced world is now home to innumerable fiends from the Underworld. Under the light of the moon they burn their dark sigils into the ground, summoning more of their cohorts for reasons yet unknown.';
				break;
			case 'darkcity_boss':
				title = 'Dark City';
				subtitle = 'Stygian Steeds';
				blurb = 'This once bustling city from an advanced world is now home to innumerable fiends from the Underworld. Under the light of the moon they burn their dark sigils into the ground, summoning more of their cohorts for reasons yet unknown.';
				break;
			case 'concrete':
				var x = {tt: 'Totem Trouble', tt2: 'Totem Trouble II', bb: 'Blight Boulevard', bb2: 'Blight Boulevard II'};
				title = 'Concrete Jungle';
				subtitle = x[ident[1]];
				blurb = 'This long forgotten city was reclaimed by nature and then by the legions of the undead. Now it is a vile nest of malady, home to all manners of toxic monsters, living and otherwise.';
				break;
			case 'concrete_boss':
				title = 'Concrete Jungle';
				subtitle = 'Briar Bone Barrage';
				blurb = 'This long forgotten city was reclaimed by nature and then by the legions of the undead. Now it is a vile nest of malady, home to all manners of toxic monsters, living and otherwise.';
				break;
			case 'scarlet':
				var x = {ch: 'Cravat Hall', ch2: 'Cravat Hall II', ch3: 'Cravat Hall III', gg: 'Grim Gallery', sc: 'Spiral Court', sc2: 'Spiral Court II'};
				title = 'Scarlet Fortress';
				subtitle = x[ident[1]];
				blurb = 'Named for its vibrant tapestries, the scarlet fortress is a deconstructed mass of forgotten castle, drifting endlessly in the void of the clockworks. Strange beastial ghosts haunt its long corridors, tirelessly pursuing those that enter their domain.';
				break;
			case 'aurora':
				var x = {sto: 'Stone Grove', jly: 'The Jelly Farm', jly2: 'The Jelly Farm II', low: 'The Low Gardens'};
				title = 'Aurora Isles';
				subtitle = x[ident[1]];
				blurb = 'From atop mysterious floating islands, sun bleached ruins crumble under a false sky. Though the green grass and cool air feels real enough, the ever present grinding of the machine just below the surface is a constant reminder of this world\'s mechanical skeleton.';
				break;
			case 'jigsaw':
				var x = {ax: 'Emerald Axis', ax2: 'Emerald Axis II', jt: 'Jade Tangle', jt2: 'Jade Tangle II', pp: 'Perimeter Promenade', pp2: 'Perimeter Promenade II'};
				title = 'Jigsaw Valley';
				subtitle = x[ident[1]];
				blurb = 'Appearing to be sky islands ripped apart and put back together again as if it were a puzzle this world can sometimes be confusing to navigate. Unfortunately it also seems to be home to a host of mindless slimes and constructs who do not seem to mind its erratic layout.';
				break;
			case 'tv':
				title = 'Treasure Vault';
				subtitle = 'Fortune Smiles on the Greedy';
				break;
			case 'graveyard':
				title = 'Graveyard';
				subtitle = 'Where Monsters Fear to Tread';
				break;
			case 'gww':
				var x = {d1: 'Terrilous Trail', d2: 'Roarsterous Ruins'};
				title = 'Gloaming Wildwoods';
				subtitle = x[ident[1]];
				blurb = 'Spiral Knights recruits are advised to avoid this dark and misty forest until they are experienced with the dangers of the Clockworks. The Gloaming Wildwoods is home to packs of vicious beasts, the worst of all being the mythical Snarbolax. Said to be a \'living shadow\', the Snarbolax prefers the taste of prey that had been in a state of terror before death and will often mercilessly harass its victims before delivering the final blow.';
				break;
			case 'rjp':
				var x = {d1: 'Garden of Goo', d2: 'Red Carpet Runaround'};
				title = 'Royal Jelly Palace';
				subtitle = x[ident[1]];
				blurb = 'The Royal Jelly Palace is an ancient castle overtaken by a legion of slime monsters. It is unclear what purpose the castle serves, though it is rumored to house a Royal Jelly, said to be nobility within the slime kingdoms. If true then the purpose of the castle is likely to serve the Royal Jelly, and nothing more.';
				break;
			case 'imf':
				var x = {d1: 'Abandoned Assembly', d2: 'Warfare Workshop'};
				title = 'Ironclaw Munitions Factory';
				subtitle = x[ident[1]];
				blurb = 'The Ironclaw Munitions Factory is a gremlin-operated weapons factory that specializes in the production of high-calibur explosives. Intel has revealed that it is developing a secret weapon known as \'Project Roarmulus\' designed with the sole purpose of destroying Haven!';
				break;
			case 'fsc':
				var x = {d1: 'Blackstone Bridge', d2: 'Charred Court', d3: 'Ashen Armory', d4: 'Smoldering Steps'};
				title = 'Firestorm Citadel';
				subtitle = x[ident[1]];
				blurb = 'All that remains of the once great kingdom of Almire, the Firestorm Citadel houses the legions of lost souls burning in the flames of a forgotten war, endlessly rekindled by the twisted spirit of their former lord.';
				break;
			case 'snarb':
				title = 'Gloaming Wildwoods';
				subtitle = 'Lair of the Snarbolax';
				blurb = 'Spiral Knights recruits are advised to avoid this dark and misty forest until they are experienced with the dangers of the Clockworks. The Gloaming Wildwoods is home to packs of vicious beasts, the worst of all being the mythical Snarbolax. Said to be a \'living shadow\', the Snarbolax prefers the taste of prey that had been in a state of terror before death and will often mercilessly harass its victims before delivering the final blow.';
				break;
			case 'jk':
				title = 'Royal Jelly Palace';
				subtitle = 'Battle Royale';
				blurb = 'The Royal Jelly Palace is an ancient castle overtaken by a legion of slime monsters. It is unclear what purpose the castle serves, though it is rumored to house a Royal Jelly, said to be nobility within the slime kingdoms. If true then the purpose of the castle is likely to serve the Royal Jelly, and nothing more.';
				break;
			case 'rt':
				title = 'Ironclaw Munitions Factory';
				subtitle = 'The Roarmulus Twins';
				blurb = 'The Ironclaw Munitions Factory is a gremlin-operated weapons factory that specializes in the production of high-calibur explosives. Intel has revealed that it is developing a secret weapon known as \'Project Roarmulus\' designed with the sole purpose of destroying Haven!';
				break;
			case 'vana':
				title = 'Firestorm Citadel';
				subtitle = 'Throne Room';
				blurb = 'All that remains of the once great kingdom of Almire, the Firestorm Citadel houses the legions of lost souls burning in the flames of a forgotten war, endlessly rekindled by the twisted spirit of their former lord.';
				break;
		};
	};
	
	text.innerHTML = title + '<br>' + subtitle;
	textcontainer.appendChild(text);
	
	blurbdiv.innerHTML = blurb
	hover.appendChild(textcontainer);
	hover.appendChild(blurbdiv);
	hover.appendChild(footer);
	div.appendChild(img);
	div.appendChild(hover);
	return div;
}

function to_gatename(s) {
	return s.split('_').map(e => e[0].toUpperCase() + e.slice(1)).join(' ');
}

function format_date(s) {
	return s.slice(0, 4) + '-' + s.slice(4, 6) + '-' + s.slice(6);
}

function fetch_gate_data() {
	var fn = current_gate.join('_');
	fetch('gates/' + fn + '.txt')
		.then(response => response.text())
		.then(text => populate(text));
}

function populate(text) {
	var gatename = to_gatename(current_gate[1]);
	var parent = document.getElementById('depth-container');
	parent.innerHTML = '';
	var name = document.createElement('div');
	name.setAttribute('class', 'gate-name text-title');
	name.innerHTML = gatename + ' Gate';
	parent.appendChild(name);
	var gate_data = text.split('\n');
	var i = 0;
	var img_name = '';
	for (var depth=-1; depth<30; depth++) {
		var container = document.createElement('div');
		container.setAttribute('class', 'depth-entry');
		if (depth == -1) {
			img_name = 'haven';
			container.appendChild(wrap_icon(img_name));
		} else if (depth == 0) {
			img_name = 'lobby';
			container.appendChild(wrap_icon(img_name));
		} else if (depth == 8) {
			img_name = 'moorcroft';
			var img = document.createElement('img');
			container.appendChild(wrap_icon(img_name));
		} else if (depth == 18) {
			img_name = 'emberlight';
			container.appendChild(wrap_icon(img_name));
		} else if (depth == 29) {
			img_name = 'core';
			container.appendChild(wrap_icon(img_name));
		} else if (depth == 4 || depth == 13 || depth == 23) {
			img_name = 'terminal';
			container.appendChild(wrap_icon(img_name));
		} else {
			var depth_data = gate_data[i].split(',');
			var direction = depth_data[0] == 'l' ? 'left' : depth_data[0] == 'r' ? 'right' : 'random';
			if (depth_data.length > 2) {
				var spacer = document.createElement('img');
				spacer.setAttribute('draggable', false);
				spacer.setAttribute('src', 'spacer_' + direction + '.png');
				container.appendChild(spacer);
			};
			for (var j=1; j<depth_data.length; j++) {
				var parts = depth_data[j].trim().split(' ');
				if (specials.indexOf(parts[0]) != -1) {
					img_name = parts.slice(0, -1).join('_');
				} else if (parts[0] == 'decon') {
					img_name = ['tunnel', 'construct'].concat(parts.slice(-1)).join('_');
				} else {
					img_name = parts.join('_');
				};
				container.appendChild(wrap_icon(img_name, parts));
				if (depth_data.length > 2) {
					var spacer = document.createElement('img');
					spacer.setAttribute('draggable', false);
					spacer.setAttribute('src', 'spacer_' + direction + '.png');
					container.appendChild(spacer);
				};
			};
			i++;
		};
		parent.appendChild(container);
	};
	if (current_gate_num > 0) {
		document.getElementById('prevgate').setAttribute('src', 'page-icons/' + gates[current_gate_num-1][1] + '.png')
		document.getElementById('prevname').innerHTML = to_gatename(gates[current_gate_num-1][1]);
		document.getElementById('prevdate').innerHTML = format_date(gates[current_gate_num-1][0]);
		document.getElementById('prev').addEventListener('click', event_prev);
	} else {
		document.getElementById('prevgate').setAttribute('src', 'page-icons/unknown.png')
		document.getElementById('prevname').innerHTML = '---';
		document.getElementById('prevdate').innerHTML = '-';
		document.getElementById('prev').removeEventListener('click', event_prev);
	};
	if (current_gate_num < gates.length - 1) {
		document.getElementById('nextgate').setAttribute('src', 'page-icons/' + gates[current_gate_num+1][1] + '.png')
		document.getElementById('nextname').innerHTML = to_gatename(gates[current_gate_num+1][1]);
		document.getElementById('nextdate').innerHTML = format_date(gates[current_gate_num+1][0]);
		document.getElementById('next').addEventListener('click', event_next);
	} else {
		document.getElementById('nextgate').setAttribute('src', 'page-icons/unknown.png')
		document.getElementById('nextname').innerHTML = '---';
		document.getElementById('nextdate').innerHTML = '-';
		document.getElementById('next').removeEventListener('click', event_next);
	};
	var divs = document.getElementsByTagName('div');
	for (var i=0; i < divs.length; i++) {
		divs[i].style.visibility = 'visible';
	}
};

function event_prev() {
	current_gate_num -= 1;
	current_gate = gates[current_gate_num];
	fetch_gate_data();
}

function event_next() {
	current_gate_num += 1;
	current_gate = gates[current_gate_num];
	fetch_gate_data();
}

function prepare(text) {
	gates = text.split('\n').map(e => e.split(','));
	current_gate = gates[gates.length - 1];
	current_gate_num = gates.length - 1;
	fetch_gate_data();
}

function init() {
	fetch('gates/gate_list.txt')
		.then(response => response.text())
		.then(text => prepare(text));
}