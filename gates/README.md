# Gate file specs
A single line describes a single depth. However, by using special level group keywords, multiple depths can be described.
Subtowns and Clockwork Terminals are automatically inserted, so there will always be at most 23 lines.
The contents within a line is comma-separated. Whitespace surrounding commas are allowed.

Each line may or may not start with the direction of the depth's rotation.
If using a level group keyword, it specifies the rotation of the first depth.
It must be one of the following: l, r, ? -- corresponding to left, right, random rotation.
If it is omitted, then it is assumed to be the opposite of the previous depth's rotation.
If a depth only has a single level, then the direction does not matter.

The levels within the depth follows afterwards.
Each level is described by a keyword, and if needed, descriptors follow.
These must be separated by a single space.

## Level keywords

| Keyword        | Level name                           | Descriptor(s)
| -------------- | ------------------------------------ | -------------
| arena          | Battle Arena                         | Monster family, status
| tunnel         | Clockwork Tunnels                    | Monster family, status
| compound       | Compounds                            | Monster family, status, mini family
| csk            | Candlestick Keep                     | Status
| decon          | Deconstruction Zone                  | Status
| dd             | Devilish Drudgery                    | Status
| den            | Wolver Den                           | Status
| lichen         | Lichenous Lair                       | Status
| starlight      | Starlight Cradle                     | Special descriptor
| starlight_boss | Starlight Cradle - Torporal Titan    | -
| darkcity       | Dark City                            | Special descriptor
| darkcity_boss  | Dark City - Stygian Steeds           | -
| concrete       | Concrete Jungle                      | Special descriptor
| concrete_boss  | Concrete Jungle - Briar Bone Barrage | -
| scarlet        | Scarlet Fortress                     | Special descriptor
| aurora         | Aurora Isles                         | Special descriptor
| jigsaw         | Jigsaw Valley                        | Special descriptor
| tv             | Treasure Trove                       | -
| pv             | Treasure Vault                       | Status
| graveyard      | Graveyard                            | -
| gww            | Gloaming Wildwoods                   | Depth specifier (d1, d2)
| rjp            | Royal Jelly Palace                   | Depth specifier (d1, d2)
| imf            | Ironclaw Munitions Factory           | Depth specifier (d1, d2)
| fsc            | Firestorm Citadel                    | Depth specifier (d1, d2, d3, d4)
| snarb          | GWW - Lair of the Snarbolax          | -
| jk             | RJP - Battle Royale                  | -
| rt             | IMF - The Roarmulus Twins            | -
| vana           | FSC - Throne Room                    | -

## Special descriptors for certain levels

| Region           | Code | Level name
| ---------------- | ---- | ----------
| Aurora Isles     | low  | The Low Gardens
|                  | sto  | Stone Grove
|                  | jly  | The Jelly Farm
|                  | jly2 | The Jelly Farm II
| Dark City        | ss   | Sinful Steps
|                  | ss2  | Sinful Steps II
|                  | rr   | Ritual Road
|                  | rr2  | Ritual Road II
|                  | rr3  | Ritual Road III
|                  | pm   | Plazamonium
| Concrete Jungle  | bb   | Blight Boulevard
|                  | bb2  | Blight Boulevard II
|                  | tt   | Totem Trouble
|                  | tt2  | Totem Trouble II
| Jigsaw Valley    | ax   | Emerald Axis
|                  | ax2  | Emerald Axis II
|                  | jt   | Jade Tangle
|                  | jt2  | Jade Tangle II
|                  | pp   | Perimeter Promenade
|                  | pp2  | Perimeter Promenade II
| Scarlet Fortress | ch   | Cravat Hall
|                  | ch2  | Cravat Hall II
|                  | ch3  | Cravat Hall III
|                  | sc   | Spiral Court
|                  | sc2  | Spiral Court II
|                  | gg   | Grim Gallery
| Starlight Cradle | ss   | Shrine of Slumber
|                  | ss2  | Shrine of Slumber II
|                  | ss3  | Shrine of Slumber III
|                  | ss4  | Shrine of Slumber IV
|                  | mm   | Meteor Mile
|                  | mm2  | Meteor Mile II
|                  | mm3  | Meteor Mile III

## Level group keywords

| Keyword       | Definition
| ------------- | ----------
| ai            | `aurora low, aurora sto, aurora jly, aurora jly2`
| dc_2d         | `darkcity ss, darkcity ss2⏎ darkcity pm`
| dc_3d         | `darkcity rr, darkcity rr2, darkcity rr3⏎ darkcity ss, darkcity ss2⏎ darkcity_boss`
| cj_bb         | `concrete bb, concrete bb2`
| cj_tt         | `concrete tt, concrete tt2`
| jv_ax         | `jigsaw ax, jigsaw ax2`
| jv_jt         | `jigsaw jt, jigsaw jt2`
| jv_pp         | `jigsaw pp, jigsaw pp2`
| sf_sc         | `scarlet sc, scarlet sc2, scarlet gg`
| sf_ch         | `scarlet ch, scarlet ch2, scarlet ch3, scarlet gg`
| sf_2d         | `scarlet sc, scarlet sc2, scarlet gg⏎ scarlet ch, scarlet ch2, scarlet ch3`
| sc_mm         | `starlight mm, starlight mm2`
| sc_ss         | `starlight ss, starlight ss2⏎ starlight ss3, starlight ss4`
| s_gww         | `gww d1⏎ gww d2⏎ snarb`
| s_rjp         | `rjp d1⏎ rjp d2⏎ jk`
| s_imf         | `imf d1⏎ imf d2⏎ rt`
| s_fsc         | `fsc d1⏎ fsc d2⏎ fsc d3⏎ fsc d4⏎ vana`
| rand          | Circumfixes levels with `graveyard` and `tv`
| rand_(status) | Circumfixes levels with `graveyard` and `pv (status)`