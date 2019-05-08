import os
import sys

import recolor_configs as rc
from PIL import Image, ImageDraw, ImageFont


def linear_burn(col, val):
    return (max(c + val - 255, 0) for c in col)


def colorize(fn, fg_color, bg_color):
    im = Image.open(os.path.join(*fn))
    palette = zip(*[iter(im.getpalette())]*3)

    fg_index = palette.index((255, 0, 255))
    for i, c in enumerate(palette):
        if i != fg_index:
            palette[i] = linear_burn(bg_color, c[0])
        else:
            palette[i] = fg_color
    palette = [b for a in palette for b in a]

    im.putpalette(palette)
    return im.convert(mode='RGBA').resize((32, 32), resample=Image.BICUBIC)


def get_icon(s):
    params = s.split(' ')
    if params[0] in ['tunnel', 'arena', 'compound']:
        fn = rc.get_name[params[0]]
        fg = rc.family[params[1]]
        bg = rc.status[params[2]]
    elif params[0] in ['decon']:
        fn = rc.get_name['tunnel']
        fg = rc.family['construct']
        bg = rc.status[params[1]]
    elif params[0] in rc.boss_level:
        fn = rc.get_name[params[0]]
        fg, bg = rc.boss_level[params[0]]
    elif params[0] in rc.boss_depth:
        fn = rc.get_name['boss']
        fg, bg = rc.boss_depth[params[0]]
    elif params[0] in rc.specials:
        fn = rc.get_name[params[0]]
        fg, bg = rc.specials[params[0]]
    elif params[0] in ['den', 'lichen', 'dd']:
        fn = rc.get_name['monsters']
        fg = (rc.family['beast'] if params[0] == 'den' else
              rc.family['slime'] if params[0] == 'lichen' else
              rc.family['fiend'])
        bg = rc.status[params[1]]
    elif params[0] in ['graveyard']:
        fn = rc.get_name['graveyard']
        fg = rc.family['undead']
        bg = rc.status['x']
    elif params[0] in ['csk']:
        fn = rc.get_name[params[0]]
        fg = rc.family['undead']
        bg = rc.status[params[1]]
    elif params[0] in ['starlight_boss', 'darkcity_boss', 'concrete_boss']:
        fn = rc.get_name['miniboss']
        fg, bg = rc.specials[params[0].split('_')[0]]
    elif params[0] in ['haven', 'moorcroft', 'emberlight']:
        fn = rc.get_name['town']
        fg, bg = rc.towns[params[0]]
    elif params[0] in ['terminal', 'lobby']:
        fn = rc.get_name[params[0]]
        fg, bg = rc.towns[params[0]]
    elif params[0] in rc.gate_color:
        fn = rc.gate_names[params[1]]
        fg, bg = rc.gate_color[params[0]]
    else:
        raise ValueError('bad string: {}'.format(s))
    
    return colorize(fn, fg, bg)


input_fn = sys.argv[1]

base = Image.open('background.png').convert(mode='RGBA')
border = Image.open('border.png').convert(mode='RGBA')
ticks = Image.open('hashmarks.png').convert(mode='RGBA')
arrow = {'l': Image.open('spacer_left.png').convert(mode='RGBA'),
         '?': Image.open('spacer_random.png').convert(mode='RGBA'),
         'r': Image.open('spacer_right.png').convert(mode='RGBA')}

font = ImageFont.truetype('Ubuntu-M.ttf', 12)
draw = ImageDraw.Draw(base, mode='RGBA')

gate = open(input_fn, 'r')
gate_name = ' '.join(os.path.splitext(os.path.basename(input_fn))[0].split('_')[-2:])

title_image = gate_name.split(' ') + ['gate']
title_image = [Image.open(os.path.join('text', a) + '.png').convert(mode='RGBA') for a in title_image]
hwidth = [a.size[0] for a in title_image]
text_width = 10 + sum(hwidth)
xpos, ypos = 170 + 16 - text_width/2, 30
for text in title_image:
    base.paste(text, (xpos, ypos), mask=text)
    xpos += text.size[0] + 5
xpos, ypos = 170, 100

depth = -1
for depth in xrange(-1, 30):
    if depth not in [-1, 0, 4, 8, 13, 18, 23, 29]:
        line = gate.readline()
        
        entries = line.strip().split(',')
        direction = entries[0]
        levels = entries[1:]
        
        xpos -= 30 * (len(levels) - 1)
        for level in levels:
            icon = get_icon(level)
            if len(levels) != 1:
                base.paste(arrow[direction], (xpos-23, ypos-3), mask=arrow[direction])
            base.paste(icon, (xpos, ypos), mask=icon)
            base.paste(border, (xpos-5, ypos-6), mask=border)
            xpos += 59
        if len(levels) != 1:
            base.paste(arrow[direction], (xpos-22, ypos-3), mask=arrow[direction])
    else:
        if depth == -1:
            icon = get_icon(gate_name)
        elif depth == 0:
            icon = get_icon('lobby')
        elif depth == 8:
            icon = get_icon('moorcroft')
        elif depth == 18:
            icon = get_icon('emberlight')
        elif depth in [4, 13, 23, 29]:
            icon = get_icon('terminal')
        base.paste(icon, (xpos, ypos), mask=icon)
        base.paste(border, (xpos-5, ypos-6), mask=border)
    xpos = 170
    ypos += 88

xpos, ypos = 343, 1
for depth in xrange(-2, 31):
    base.paste(ticks, (xpos, ypos), mask=ticks)
    if depth % 5 == 0:
        draw.text((xpos+4, ypos+6), str(depth), fill=(255, 255, 255), font=font)
    ypos += 88

tier1 = base.crop((0, 0, 372, 863))
tier2 = base.crop((0, 864, 372, 1743))
tier3 = base.crop((0, 1744, 372, 2867))

base.save('.'.join(input_fn.split('.')[:-1] + ['png']))
tier1.save('.'.join(input_fn.split('.')[:-1] + ['t1', 'png']))
tier2.save('.'.join(input_fn.split('.')[:-1] + ['t2', 'png']))
tier3.save('.'.join(input_fn.split('.')[:-1] + ['t3', 'png']))

gate.close()
