var keywords = ['ai', 'dc_2d', 'dc_3d', 'cj_bb', 'cj_tt', 'jv_ax', 'jv_jt', 'jv_pp', 'sf_sc', 'sf_ch', 'sf_2d', 'sc_mm', 'sc_ss', 's_gww', 's_rjp', 's_imf', 's_fsc'];

// returns a div DOMElement to be appended to each depth
// descriptor should be an array of strings
function wrap_icon(descriptor) {
	let div = document.createElement('div');
	div.setAttribute('class', 'icon-wrapper');
	let hover = document.createElement('div');
	hover.setAttribute('class', 'hover-wrapper');
	let textcontainer = document.createElement('div');
	textcontainer.setAttribute('class', 'title-wrapper');
	let text = document.createElement('div');
	text.setAttribute('class', 'title text-title');
	let blurbdiv = document.createElement('div');
	blurbdiv.setAttribute('class', 'blurb');
	let footer = document.createElement('div');
	footer.setAttribute('class', 'hover-footer');
	
	let img = document.createElement('img');
	img.setAttribute('draggable', 'false');
	let fn = '';
	if (specials.indexOf(descriptor[0]) !== -1) {
		fn = descriptor[0];
	} else {
		fn = descriptor.join('_');
	}
	img.setAttribute('src', 'page-icons/' + fn + '.png');
	
	let title = undefined;
	let subtitle = undefined;
	let blurb = '';
	let x = null, y = null;
	switch(descriptor[0]){
		// subtowns
		case 'haven':
			title = 'Haven';
			subtitle = '';
			/* this is too fucking long and it goes above the viewport.
			blurb = 'A peaceful town that is home to the Strangers. These salvagers offer the Spiral Knights sanctuary in return for the treasures that they acquire while investigating the Clockworks. Haven is also heavily populated with snipes, bulbous little birds with a curious means of locomotion.';
			*/
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
			if (descriptor[1] === 'core') {
				title = 'The Core';
				subtitle = 'The Path is Sealed';
				blurb = 'A small terminal in the darkest depths of the Clockworks that looks out on to the colossal, ever-beating heart of the world.';
			} else {
				title = 'Clockwork Terminal';
				subtitle = 'The Crossroads of Adventure';
				blurb = 'A level where travelers can safely return to town, or journey further into the depths of the Clockworks.';
			}
			break;
		// levels
		case 'arena':
			x = {fire: 'Flame Lash Arena', freeze: 'Ice Maul Arena', shock: 'Thunder Fist Arena', poison: 'Venom Fang Arena', x: 'Iron Edge Arena'};
			y = {beast: 'Beastly Brawl', construct: 'Robo Rampage', fiend: 'Fiendish Fray', gremlin: 'Wrench Warfare', slime: 'Slimey Showdown', undead: 'Cadaverous Clash'};
			title = x[descriptor[2]]; subtitle = y[descriptor[1]];
			break;
		case 'tunnel':
			x = {fire: 'Blast Furnace', freeze: 'Cooling Chamber', shock: 'Power Complex', poison: 'Wasteworks', x: 'Clockwork Tunnels'};
			y = {beast: 'Wild Path', construct: 'Mechanized Mile', fiend: 'Infernal Passage', gremlin: 'Gremlin Grounds', slime: 'Slimeway', undead: 'Haunted Passage'};
			title = x[descriptor[2]];
			subtitle = y[descriptor[1]];
			break;
		case 'compound':
			x = {fire: 'Charred Compound', freeze: 'Frozen Compound', shock: 'Shocked Compound', poison: 'Blighted Compound', x: 'Ruined Compound'};
			y = {beast: 'Ravenous Warrens', slime: 'Creeping Colony', undead: 'Chittering Burrows'};
			title = x[descriptor[2]];
			subtitle = y[descriptor[3]];
			break;
		case 'csk':
			x = {fire: 'Burning Blackout', freeze: 'Cold Shadows', shock: 'Galvanized Gloom', poison: 'Noxious Night', x: 'Fear the Dark'};
			title = 'Candlestick Keep';
			subtitle = x[descriptor[1]];
			break;
		case 'decon':
			x = {fire: 'Molten Mayhem', freeze: 'Cold Storage', shock: 'Circuit Breakers', poison: 'Radioactive Recycling', x: 'Savage Salvaging'};
			title = 'Deconstruction Zone';
			subtitle = x[descriptor[1]];
			break;
		case 'den':
			x = {fire: 'Ashes to Ash Tails', freeze: 'Frosty Fury', shock: 'High Voltail', poison: 'Raving Rabids', x: 'Pack Brutality'};
			title = 'Wolver Den';
			subtitle = x[descriptor[1]];
			break;
		case 'lichen':
			x = {fire: 'Fiery Fusion', freeze: 'Cold Fusion', shock: 'Shocking Synthesis', poison: 'Toxic Union', x: 'Prognosis: Symbiosis'};
			title = 'Lichenous Lair';
			subtitle = x[descriptor[1]];
			break;
		case 'dd':
			x = {fire: 'Everybody\'s Fired', freeze: 'Hiring Freeze', shock: 'Wired for Synergy', poison: 'Toxic Workplace', x: 'Overtime, Every Time'};
			title = 'Devilish Drudgery';
			subtitle = x[descriptor[1]];
			break;
		case 'starlight':
			x = {ss: 'Shrine of Slumber', ss2: 'Shrine of Slumber II', ss3: 'Shrine of Slumber III', ss4: 'Shrine of Slumber IV', mm: 'Meteor Mile', mm2: 'Meteor Mile II', mm3: 'Meteor Mile III'};
			title = 'Starlight Cradle';
			subtitle = x[descriptor[1]];
			blurb = 'Beneath a moonlit sky azure islands drift in a sea of stars. These islands are home to creatures that are more than happy to creep upon those who succumb to this world\'s endless lullaby.';
			break;
		case 'starlight_boss':
			title = 'Starlight Cradle';
			subtitle = 'Torporal Titan';
			blurb = 'Beneath a moonlit sky azure islands drift in a sea of stars. These islands are home to creatures that are more than happy to creep upon those who succumb to this world\'s endless lullaby.';
			break;
		case 'darkcity':
			x = {ss: 'Sinful Steps', ss2: 'Sinful Steps II', pm: 'Plazamonium', rr: 'Ritual Road', rr2: 'Ritual Road II', rr3: 'Ritual Road III'};
			title = 'Dark City';
			subtitle = x[descriptor[1]];
			blurb = 'This once bustling city from an advanced world is now home to innumerable fiends from the Underworld. Under the light of the moon they burn their dark sigils into the ground, summoning more of their cohorts for reasons yet unknown.';
			break;
		case 'darkcity_boss':
			title = 'Dark City';
			subtitle = 'Stygian Steeds';
			blurb = 'This once bustling city from an advanced world is now home to innumerable fiends from the Underworld. Under the light of the moon they burn their dark sigils into the ground, summoning more of their cohorts for reasons yet unknown.';
			break;
		case 'concrete':
			x = {tt: 'Totem Trouble', tt2: 'Totem Trouble II', bb: 'Blight Boulevard', bb2: 'Blight Boulevard II'};
			title = 'Concrete Jungle';
			subtitle = x[descriptor[1]];
			blurb = 'This long forgotten city was reclaimed by nature and then by the legions of the undead. Now it is a vile nest of malady, home to all manners of toxic monsters, living and otherwise.';
			break;
		case 'concrete_boss':
			title = 'Concrete Jungle';
			subtitle = 'Briar Bone Barrage';
			blurb = 'This long forgotten city was reclaimed by nature and then by the legions of the undead. Now it is a vile nest of malady, home to all manners of toxic monsters, living and otherwise.';
			break;
		case 'scarlet':
			x = {ch: 'Cravat Hall', ch2: 'Cravat Hall II', ch3: 'Cravat Hall III', gg: 'Grim Gallery', sc: 'Spiral Court', sc2: 'Spiral Court II'};
			title = 'Scarlet Fortress';
			subtitle = x[descriptor[1]];
			blurb = 'Named for its vibrant tapestries, the scarlet fortress is a deconstructed mass of forgotten castle, drifting endlessly in the void of the clockworks. Strange beastial ghosts haunt its long corridors, tirelessly pursuing those that enter their domain.';
			break;
		case 'aurora':
			x = {sto: 'Stone Grove', jly: 'The Jelly Farm', jly2: 'The Jelly Farm II', low: 'The Low Gardens'};
			title = 'Aurora Isles';
			subtitle = x[descriptor[1]];
			blurb = 'From atop mysterious floating islands, sun bleached ruins crumble under a false sky. Though the green grass and cool air feels real enough, the ever present grinding of the machine just below the surface is a constant reminder of this world\'s mechanical skeleton.';
			break;
		case 'jigsaw':
			x = {ax: 'Emerald Axis', ax2: 'Emerald Axis II', jt: 'Jade Tangle', jt2: 'Jade Tangle II', pp: 'Perimeter Promenade', pp2: 'Perimeter Promenade II'};
			title = 'Jigsaw Valley';
			subtitle = x[descriptor[1]];
			blurb = 'Appearing to be sky islands ripped apart and put back together again as if it were a puzzle this world can sometimes be confusing to navigate. Unfortunately it also seems to be home to a host of mindless slimes and constructs who do not seem to mind its erratic layout.';
			break;
		case 'tv':
			title = 'Treasure Trove';
			subtitle = 'Fortune Smiles on the Greedy';
			break;
		case 'pv':
			x = {fire: 'Burn Rate', freeze: 'Frozen Assets', shock: 'Flash Crash', poison: 'Toxic Debt', x: 'Obscurity through Security'};
			title = 'Treasure Vault';
			subtitle = x[descriptor[1]];
			break;
		case 'graveyard':
			title = 'Graveyard';
			subtitle = 'Where Monsters Fear to Tread';
			break;
		case 'gww':
			x = {d1: 'Terrilous Trail', d2: 'Roarsterous Ruins'};
			title = 'Gloaming Wildwoods';
			subtitle = x[descriptor[1]];
			blurb = 'Spiral Knights recruits are advised to avoid this dark and misty forest until they are experienced with the dangers of the Clockworks. The Gloaming Wildwoods is home to packs of vicious beasts, the worst of all being the mythical Snarbolax. Said to be a \'living shadow\', the Snarbolax prefers the taste of prey that had been in a state of terror before death and will often mercilessly harass its victims before delivering the final blow.';
			break;
		case 'rjp':
			x = {d1: 'Garden of Goo', d2: 'Red Carpet Runaround'};
			title = 'Royal Jelly Palace';
			subtitle = x[descriptor[1]];
			blurb = 'The Royal Jelly Palace is an ancient castle overtaken by a legion of slime monsters. It is unclear what purpose the castle serves, though it is rumored to house a Royal Jelly, said to be nobility within the slime kingdoms. If true then the purpose of the castle is likely to serve the Royal Jelly, and nothing more.';
			break;
		case 'imf':
			x = {d1: 'Abandoned Assembly', d2: 'Warfare Workshop'};
			title = 'Ironclaw Munitions Factory';
			subtitle = x[descriptor[1]];
			blurb = 'The Ironclaw Munitions Factory is a gremlin-operated weapons factory that specializes in the production of high-calibur explosives. Intel has revealed that it is developing a secret weapon known as \'Project Roarmulus\' designed with the sole purpose of destroying Haven!';
			break;
		case 'fsc':
			x = {d1: 'Blackstone Bridge', d2: 'Charred Court', d3: 'Ashen Armory', d4: 'Smoldering Steps'};
			title = 'Firestorm Citadel';
			subtitle = x[descriptor[1]];
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
	}
	
	if (typeof title === 'undefined' || typeof subtitle === 'undefined') {
		console.log('malformed entry in ' + gates[current_gate_index].join('_') + ':' + (lineno+1) + ' ("' + descriptor + '")')
	}
	
	text.innerHTML = title + '<br>' + subtitle;
	textcontainer.appendChild(text);
	
	blurbdiv.innerHTML = blurb;
	hover.appendChild(textcontainer);
	hover.appendChild(blurbdiv);
	hover.appendChild(footer);
	div.appendChild(img);
	div.appendChild(hover);
	return div;
}

// expands special keywords that describe entire depth(s)
// returns array of strings
function text_expand(text) {
	let data = text.split('\n');
	let expanded_data = [];
	let ndir = 'r';
	let rdir = 'l';
	
	for (let i=0; i < data.length; i++) {
		let data_arr = data[i].split(',');
		if (data_arr.length === 1 && keywords.indexOf(data_arr[0].trim()) === -1) {
			expanded_data.push(ndir + ',' + data[i]);
			ndir = ndir === 'r' ? 'l' : 'r';
		} else if (data_arr[0].indexOf('rand') !== -1) {
			let level = '';
			switch(data_arr[0]) {
				case 'rand':
					level = 'tv';
					break;
				case 'rand_x':
					level = 'pv x';
					break;
				case 'rand_fire':
					level = 'pv fire';
					break;
				case 'rand_freeze':
					level = 'pv freeze';
					break;
				case 'rand_poison':
					level = 'pv poison';
					break;
				case 'rand_shock':
					level = 'pv shock';
					break;
			}
			data_arr[0] = 'graveyard';
			data_arr.unshift('?');
			data_arr.push(level);
			expanded_data.push(data_arr.join(','));
		} else {
			if (keywords.indexOf(data_arr[0].trim()) !== -1 || keywords.indexOf(data_arr[1].trim()) !== -1) {
				let kw = '';
				if (data_arr.length === 2) {
					kw = data_arr[1].trim();
					ndir = data_arr[0];
				} else {
					kw = data_arr[0].trim();
				}
				rdir = ndir === 'r' ? 'l' : 'r';
				switch(kw){
					case 'ai':
						expanded_data.push(ndir + ', aurora low, aurora sto, aurora jly, aurora jly2');
						ndir = rdir;
						break;
					case 'dc_2d':
						expanded_data.push(ndir + ', darkcity ss, darkcity ss2');
						expanded_data.push(rdir + ', darkcity pm');
						break;
					case 'dc_3d':
						expanded_data.push(ndir + ', darkcity rr, darkcity rr2, darkcity rr3');
						expanded_data.push(rdir + ', darkcity ss, darkcity ss2');
						expanded_data.push(ndir + ', darkcity_boss');
						ndir = rdir;
						break;
					case 'cj_bb':
						expanded_data.push(ndir + ', concrete bb, concrete bb2');
						ndir = rdir;
						break;
					case 'cj_tt':
						expanded_data.push(ndir + ', concrete tt, concrete tt2');
						ndir = rdir;
						break;
					case 'jv_ax':
						expanded_data.push(ndir + ', jigsaw ax, jigsaw ax2');
						ndir = rdir;
						break;
					case 'jv_jt':
						expanded_data.push(ndir + ', jigsaw jt, jigsaw jt2');
						ndir = rdir;
						break;
					case 'jv_pp':
						expanded_data.push(ndir + ', jigsaw pp, jigsaw pp2');
						ndir = rdir;
						break;
					case 'sf_sc':
						expanded_data.push(ndir + ', scarlet sc, scarlet sc2, scarlet gg');
						ndir = rdir;
						break;
					case 'sf_ch':
						expanded_data.push(ndir + ', scarlet ch, scarlet ch2, scarlet ch3, scarlet gg');
						ndir = rdir;
						break;
					case 'sf_2d':
						expanded_data.push(ndir + ', scarlet sc, scarlet sc2, scarlet gg');
						expanded_data.push(rdir + ', scarlet ch, scarlet ch2, scarlet ch3');
						break;
					case 'sc_mm':
						expanded_data.push(ndir + ', starlight mm, starlight mm2');
						ndir = rdir;
						break;
					case 'sc_ss':
						expanded_data.push(ndir + ', starlight ss, starlight ss2');
						expanded_data.push(rdir + ', starlight ss3, starlight ss4');
						break;
					case 's_gww':
						expanded_data.push('x, gww d1');
						expanded_data.push('x, gww d2');
						expanded_data.push('x, snarb');
						break;
					case 's_rjp':
						expanded_data.push('x, rjp d1');
						expanded_data.push('x, rjp d2');
						expanded_data.push('x, jk');
						break;
					case 's_imf':
						expanded_data.push('x, imf d1');
						expanded_data.push('x, imf d2');
						expanded_data.push('x, rt');
						break;
					case 's_fsc':
						expanded_data.push('x, fsc d1');
						expanded_data.push('x, fsc d2');
						expanded_data.push('x, fsc d3');
						expanded_data.push('x, fsc d4');
						expanded_data.push('x, vana');
				}
			} else {
				if (data_arr[0].length === 1) {
					ndir = data_arr[0];
					expanded_data.push(data[i]);
				} else {
					expanded_data.push(ndir + ', ' + data[i]);
				}
				ndir = ndir === 'r' ? 'l' : 'r';
			}
		}
	}
	
	return expanded_data;
}

// converts expanded keywords to canonical names
// return array of array of strings
function to_canonical(text_array) {
	let out_array = [];
	for (let i=0; i<text_array.length; i++) {
		if (i === 0 || i === 3 || i === 6 || i === 10 || i === 14 || i === 18) {
			switch (i) {
				case 0:
					out_array.push(['m.arcade_lobby']);
					break;
				case 6:
					out_array.push(['m.moorcroft']);
					break;
				case 14:
					out_array.push(['m.emberlight']);
					break;
				case 3:
				case 10:
				case 18:
					out_array.push(['m.terminal_1']);
					break;
			}
		}
		let depth_data = text_array[i].split(',').slice(1).map(a => a.trim());
		let x = null;
		let depth_array = [];
		for (let j=0; j<depth_data.length; j++) {
			let descriptor = depth_data[j].split(' ');
			switch (descriptor[0]) {
				// levels
				case 'arena':
					x = {
						fire: 'fla',
						freeze: 'ima',
						shock: 'tfa',
						poison: 'vfa',
						x: 'iea'
					};
					depth_array.push('m.' + x[descriptor[2]] + '_' + descriptor[1]);
					break;
				case 'tunnel':
					x = {
						fire: 'bf',
						freeze: 'cc',
						shock: 'pc',
						poison: 'ww',
						x: 'ct'
					};
					depth_array.push('m.' + x[descriptor[2]] + '_' + descriptor[1]);
					break;
				case 'compound':
					x = {
						fire: 'cc',
						freeze: 'fc',
						shock: 'sc',
						poison: 'bc',
						x: 'rc'
					};
					depth_array.push('m.' + x[descriptor[2]] + '_' + descriptor[3] + '_minis');
					break;
				case 'csk':
					if (descriptor[1] === 'x') {
						depth_array.push('m.candlestick_keep_vanilla');
					} else {
						depth_array.push('m.candlestick_keep_' + descriptor[1]);
					}
					break;
				case 'decon':
					if (descriptor[1] === 'x') {
						depth_array.push('m.deconstruction_zone_vanilla');
					} else {
						depth_array.push('m.deconstruction_zone_' + descriptor[1]);
					}
					break;
				case 'den':
					if (descriptor[1] === 'x') {
						depth_array.push('m.wolver_den_vanilla');
					} else {
						depth_array.push('m.wolver_den_' + descriptor[1]);
					}
					break;
				case 'lichen':
					if (descriptor[1] === 'x') {
						depth_array.push('m.lichenous_lair_vanilla');
					} else {
						depth_array.push('m.lichenous_lair_' + descriptor[1]);
					}
					break;
				case 'dd':
					if (descriptor[1] === 'x') {
						depth_array.push('m.devilish_drudgery_vanilla');
					} else {
						depth_array.push('m.devilish_drudgery_' + descriptor[1]);
					}
					break;
				case 'starlight':
					x = {
						ss: 'shrine_of_slumber',
						ss2: 'shrine_of_slumber_2',
						ss3: 'shrine_of_slumber_3',
						ss4: 'shrine_of_slumber_4',
						mm: 'meteor_mile',
						mm2: 'meteor_mile_2',
						mm3: 'meteor_mile_3'
					};
					depth_array.push('m.starlight_cradle_' + x[descriptor[1]]);
					break;
				case 'starlight_boss':
					depth_array.push('m.starlight_cradle_miniboss');
					break;
				case 'darkcity':
					x = {
						ss: 'devilish_drudgery_4',
						ss2: 'devilish_drudgery_5',
						pm: 'devilish_drudgery_6',
						rr: 'devilish_drudgery',
						rr2: 'devilish_drudgery_2',
						rr3: 'devilish_drudgery_3'
					};
					depth_array.push('m.dark_city_' + x[descriptor[1]]);
					break;
				case 'darkcity_boss':
					depth_array.push('m.dark_city_miniboss');
					break;
				case 'concrete':
					x = {
						tt: 'totem_trouble',
						tt2: 'totem_trouble_2',
						bb: 'blight_boulevard',
						bb2: 'blight_boulevard_2'
					};
					depth_array.push('m.concrete_jungle_' + x[descriptor[1]]);
					break;
				case 'concrete_boss':
					depth_array.push('m.concrete_jungle_miniboss');
					break;
				case 'scarlet':
					x = {
						ch: 'cravat_hall',
						ch2: 'cravat_hall_2',
						ch3: 'cravat_hall_3',
						gg: 'grim_gallery',
						sc: 'spiral_court',
						sc2: 'spiral_court_2'
					};
					if (descriptor[1] === 'gg') {
						depth_array.push('m.scarlet_fortress_' + x[descriptor[1]]);
					} else {
						depth_array.push('m.lost_castle_' + x[descriptor[1]]);
					}
					break;
				case 'aurora':
					x = {sto: 'stone_grove', jly: 'the_jelly_farm', jly2: 'the_jelly_farm_2', low: 'the_low_gardens'};
					depth_array.push('m.aurora_isles_' + x[descriptor[1]]);
					break;
				case 'jigsaw':
					x = {
						ax: 'emerald_axis',
						ax2: 'emerald_axis_2',
						jt: 'the_jade_tangle',
						jt2: 'the_jade_tangle_2',
						pp: 'perimeter_promenade',
						pp2: 'perimeter_promenade_2'
					};
					depth_array.push('m.jigsaw_valley_' + x[descriptor[1]]);
					break;
				case 'tv':
					depth_array.push('m.treasure_vault_1');
					break;
				case 'graveyard':
					depth_array.push('m.graveyard_vanilla');
					break;
				case 'gww':
					x = {d1: 'path', d2: 'ruins'};
					depth_array.push('m.gloaming_wildwoods_' + x[descriptor[1]]);
					break;
				case 'rjp':
					x = {d1: 'garden', d2: 'court'};
					depth_array.push('m.royal_jelly_' + x[descriptor[1]]);
					break;
				case 'imf':
					x = {d1: 'assembly', d2: 'workshop'};
					depth_array.push('m.ironclaw_munitions_factory_' + x[descriptor[1]]);
					break;
				case 'fsc':
					x = {d1: 'blackstone_bridge', d2: 'charred_court', d3: 'ash_armory', d4: 'smoldering_steps'};
					depth_array.push('m.firestorm_citadel_' + x[descriptor[1]]);
					break;
				case 'snarb':
					depth_array.push('m.gloaming_wildwoods_snarbolax');
					break;
				case 'jk':
					depth_array.push('m.royal_jelly_lair');
					break;
				case 'rt':
					depth_array.push('m.ironclaw_munitions_factory_twins');
					break;
				case 'vana':
					depth_array.push('m.firestorm_citadel_vanaduke');
					break;
			}
		}
		out_array.push(depth_array);
	}
	out_array.push(['m.terminal_core']);
	return out_array;
}