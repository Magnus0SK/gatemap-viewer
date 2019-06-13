# Gate file specs
A single line describes a single depth. Subtowns and Clockwork Terminals are automatically inserted, so there will always be exactly 23 lines. The contents within a line is comma-separated. Whitespace surrounding commas are allowed.

Each line starts with the direction of the depth's rotation. It must be one of the following: l, r, ?, x -- corresponding to left, right, random, and no rotation (exclusively used with single-level depths).

The levels within the depth follows afterwards. Each level is described by a keyword, and if needed, descriptors follow. These must be separated by a single space.

The following table describes the levels encoded by each keyword.

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
| starlight      | Starlight Cradle                     | Level specifier, given in the next table
| starlight_boss | Starlight Cradle - Torporal Titan    | (None)
| darkcity       | Dark City                            | Level specifier, given in the next table
| darkcity_boss  | Dark City - Stygian Steeds           | (None)
| concrete       | Concrete Jungle                      | Level specifier, given in the next table
| concrete_boss  | Concrete Jungle - Briar Bone Barrage | (None)
| scarlet        | Scarlet Fortress                     | Level specifier, given in the next table
| aurora         | Aurora Isles                         | Level specifier, given in the next table
| jigsaw         | Jigsaw Valley                        | Level specifier, given in the next table
| tv             | Treasure Vault                       | (None)
| graveyard      | Graveyard                            | (None)
| gww            | Gloaming Wildwoods                   | Depth specifier (d1, d2)
| rjp            | Royal Jelly Palace                   | Depth specifier (d1, d2)
| imf            | Ironclaw Munitions Factory           | Depth specifier (d1, d2)
| fsc            | Firestorm Citadel                    | Depth specifier (d1, d2, d3, d4)
| snarb          | GWW - Lair of the Snarbolax          | (None)
| jk             | RJP - Battle Royale                  | (None)
| rt             | IMF - The Roarmulus Twins            | (None)
| vana           | FSC - Throne Room                    | (None)

This table describes the level specifiers for each region.

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

# Upcoming work
Currently, every single level must be written down -- slightly tedious, but we can do better.

Some shortcuts can be taken to simplify the gate files. such as:
- If a depth has Aurora Isles in it, it will always have all four in rotation, in a fixed order (direction may vary).
- Jigsaw Valley levels always comes in sets of two, and it's always a level and its counterpart.
- Random depths always have a Treasure Vault and a Graveyard.
- Boss levels are fixed, so it is possible to describe at least 3 depths with just one keyword, and so on.