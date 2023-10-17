const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'jason',
  password: "P455w3rd3d",
  database: 'dc'
});

const quests = require('./Quests');

let nameRegionArray = [];

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

function extractInner(input, startTag, endTag) {
  const startIndex = input.indexOf(startTag);
  if (startIndex !== -1) {
    let depth = 1;
    let endIndex = startIndex + startTag.length;

    while (endIndex < input.length && depth > 0) {
      if (input[endIndex] === '{') {
        depth++;
      } else if (input[endIndex] === '}') {
        depth--;
      }
      endIndex++;
    }

    if (depth === 0) {
      return input.substring(startIndex, endIndex);
    }
  }

  return null;
}

function captureText(inputString) {
  const regex = /([a-zA-Z]+):([a-zA-Z]+)/;
  const match = inputString.match(regex);
  if (match) {
    return { region: match[1], name: match[2] };
  } else {
    return null;
  }
}

function getRegion(name) {
  const foundObject = nameRegionArray.find(obj => obj.key === name);
  return foundObject.name;
}

let nameRegion = `add("Town:Guard", Quests.townGuard);
  add("Castle:Guard", Quests.castleGuard);
  add("Vortex:Guard", Quests.vortexGuard);
  add("FaeryRing:Fairy", Quests.faeryRing);
  add("Fields:Rodent", Quests.fieldRodent);
  add("Fields:Goblin", Quests.fieldGoblin);
  add("Fields:Gypsy", Quests.fieldGypsy);
  add("Fields:Centaur", Quests.fieldCentaur);
  add("Fields:Merchant", Quests.fieldMerchant);
  add("Fields:Wizard", Quests.fieldWizard);
  add("Fields:Soldier", Quests.fieldSoldier);
  Tools.repaint();
  add("Forest:Boar", Quests.forestBoar);
  add("Forest:Orc", Quests.forestOrc);
  add("Forest:Elf", Quests.forestElf);
  add("Forest:Gryphon", Quests.forestGryphon);
  add("Forest:Snot", Quests.forestSnot);
  add("Forest:Unicorn", Quests.forestUnicorn);
  add("Mound:Gate", Quests.moundGate);
  add("Mound:Gang", Quests.moundGang);
  add("Mound:Rager", Quests.moundRager);
  add("Mound:Thief", Quests.moundThief);
  add("Mound:Worm", Quests.moundWorm);
  add("Mound:Mage", Quests.moundMage);
  add("Mound:Guard", Quests.moundGuard);
  add("Mound:Vault", Quests.moundVault);
  add("Mound:Champ", Quests.moundChamp);
  add("Mound:Queen", Quests.moundQueen);
  Tools.repaint();
  add("Hills:Goat", Quests.hillsGoat);
  add("Hills:Basilisk", Quests.hillsBasilisk);
  add("Hills:Wyvern", Quests.hillsWyvern);
  add("Hills:Troll", Quests.hillsTroll);
  add("Hills:Sphinx", Quests.hillsSphinx);
  add("Hills:Giant", Quests.hillsGiant);
  add("Hills:Dragon", Quests.hillsDragon);
  add("Dunjeon:Rodent", Quests.dungRodent);
  add("Dunjeon:Snot", Quests.dungSnot);
  add("Dunjeon:Rager", Quests.dungRager);
  add("Dunjeon:Gang", Quests.dungGang);
  add("Dunjeon:Troll", Quests.dungTroll);
  add("Dunjeon:Mage", Quests.dungMage);
  Tools.repaint();
  add("Ocean:Traders", Quests.seaTraders);
  add("Ocean:Serpent", Quests.seaSerpent);
  add("Ocean:Mermaid", Quests.seaMermaid);
  add("Brasil:Harpy", Quests.braHarpy);
  add("Brasil:Fighter", Quests.braFighter);
  add("Brasil:Golem", Quests.braGolem);
  add("Brasil:Medusa", Quests.braMedusa);
  add("Brasil:Hero", Quests.braHero);
  Tools.repaint();
  add("Shang:Gunner", Quests.shaGunner);
  add("Shang:Plague", Quests.shaPlague);
  add("Shang:Peasant", Quests.shaPeasant);
  add("Shang:Ninja", Quests.shaNinja);
  add("Shang:Shogun", Quests.shaShogun);
  add("Shang:Panda", Quests.shaPanda);
  add("Shang:Samurai", Quests.shaSamurai);`;

async function main() {
const lines = nameRegion.trim().split('\n');
// Iterate through each line and extract the desired values
lines.forEach(line => {
  const pattern = /"([^:]+):([^"]+)",\s*Quests\.([^;]+);/g; 

  while ((match = pattern.exec(line)) !== null) {
    let name = match[1];
    if(name === "Ocean"){
      name = "Sea";
    }
    if(name === "Shang"){
      name = "Shangala";
    }
    if(name === "Brasil"){
      name = "Hie Brasil";
    }
    if(name === "Hills"){
      name = "Mountains";
    }
    if(name === "Dunjeon"){
      name = "Dungeon";
    }
    const key = match[3].slice(0, -1);
    nameRegionArray.push({ name, key });
  }
});

const monsters = [];

for (let [key, inputString] of Object.entries(quests)) {
const monster = {
  pack: [],
  temp: [],
  gear: [],
  opts: [],
  values: [],
  text: {
    string: "",
    replacements: []
  },
  stats: {
    guts: 0,
    wits: 0,
    charm: 0,
    attack: 0,
    defend: 0,
    skill: 0,
  },
  actions: 0,
};
// find 2nd occurrance of "{" (first object)
const firstObjIndex = getPosition(inputString, "{", 2);

// pull characters between first "{" and 2nd occurrance
let stats = inputString.substring(1, firstObjIndex-1);
stats = stats.trim();
let mStats = stats.split("|");
mStats.shift();

monster.name = mStats[0];
monster.region = getRegion(key);
monster.stats.guts = parseInt(mStats[1]);
monster.stats.wits = parseInt(mStats[2]);
monster.stats.charm = parseInt(mStats[3]);
monster.stats.attack = parseInt(mStats[4]);
monster.stats.defend = parseInt(mStats[5]);
monster.stats.skill = parseInt(mStats[6]);

// remove stats data from buffer input string
inputString = inputString.substr(0, 1) + inputString.substr(firstObjIndex);

if(inputString.indexOf("adjust")){
  monster.opts = "adjust";
}
// retrieve values
const valuesBlock = extractInner(inputString, "{~|values|", "}");
const valuesString = extractInner(valuesBlock, "{=|", "}");
const vals = valuesString.slice(0, -1).split("|");
vals.shift();
monster.values = vals[1];

// retrieve pack
const packBlock = extractInner(inputString, "{~|pack|", "}");
const packItems = packBlock.slice(0, -1).split(/\|(?![^{]*\})/);
packItems.shift();
packItems.shift();
for(const i of packItems){
  if (i.startsWith("{@")) {
    let obj = {};
            
    const d = i.split("|");
    d.shift();
    obj.name = d[0];
    obj.qty = d[1].substring(0, d[1].length-1);
            
    monster.pack.push(obj);
  }
}

// retrieve temp
const tempBlock = extractInner(inputString, "{~|temp|", "}");
if(tempBlock){
const tmp = tempBlock.slice(0, -1).split(/\|(?![^{]*\})/);
tmp.shift();
tmp.shift();
for(const tD of tmp){
  if (tD.startsWith("{#")) {
    let obj = {};
    const td = tD.split("|");
    td.shift();
    if(td[0] == "Actions"){
      monster.actions = td[1].substring(0, td[1].length-1);
    }else{
      obj.name = (td[0] == "thief") ? "trader" : td[0];
      obj.qty = td[1].substring(0, td[1].length-1);
            
      monster.temp.push(obj);
    }
  }
}
}

// retrieve gear
const gearBlock = extractInner(inputString, "{~|gear|", "}");
const gr = gearBlock.slice(0, -1).split(/\|(?![^{]*\})/);
gr.shift();
gr.shift();
for(const tD of gr){
  if (tD.startsWith("{%")) {
    let obj = {};
    const td = tD.split("|");
    td.shift();
    obj.name = td[0];
    obj.percent = td[1].substring(0, td[1].length-1);
            
    monster.gear.push(obj);
  }
}

// retrieve opts
const optsBlock = extractInner(inputString, "{~|opts|", "}");
const o = optsBlock.slice(0, -1).split("|");
o.shift();
o.shift();
monster.opts += (monster.opts.length) ? ","+o : o;

// retrieve texts
const textBlock = extractInner(inputString, "{itText|", "}");
const txt = textBlock.slice(0, -1).split(/\|(?![^{]*\})/);
txt.shift();
txt.shift();

monster.text.string = txt[0];


for(const txtStr of txt) {
  if(txtStr.startsWith("{~|$")){
    const rep = txtStr.slice(0, -1).split("|");
    rep.shift();
    const rpl = {
      name: "",
      values: []
    };
    rpl.name = rep[0];
    rep.shift();
    rpl.values = rep;
    
    monster.text.replacements.push(rpl);
  }
}

var sql = "INSERT INTO Monster (name, region, guts, wits, charm, attack, defend, skill, pack, gear, temp, opts, text, temperment, actions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
db.query(sql, [monster.name, monster.region, monster.stats.guts, monster.stats.wits, monster.stats.charm, monster.stats.attack, monster.stats.defend, monster.stats.skill, JSON.stringify(monster.pack), JSON.stringify(monster.gear), JSON.stringify(monster.temp), monster.opts, JSON.stringify(monster.text), monster.values, monster.actions], function (err, result) {
  if (err) console.log(err);
});
}


let itemRawString = `this.add("{itArms|Knife|2|0|-1|right}");
      this.add("{itArms|Hatchet|4|0|-1|right}");
      this.add("{itArms|Short Sword|5|0|0|right}");
      this.add("{itArms|Long Sword|7|0|0|right}");
      this.add("{itArms|Spear|9|0|1|right}");
      this.add("{itArms|Broad Sword|11|0|1|right}");
      this.add("{itArms|Battle Axe|13|0|1|right|left}");
      this.add("{itArms|Pike|15|0|2|right|left}");
      this.add("{itArms|Silver Pike|30|0|2|right}");
      this.add("{itArms|Sling|4|0|4|right}");
      this.add("{itArms|Short Bow|8|0|6|right|left}");
      this.add("{itArms|Long Bow|12|0|8|right|left}");
      this.add("{itArms|Spike Helm|3|5|-2|head}");
      this.add("{itArms|Main Gauche|2|2|1|left}");
      this.add("{itArms|Clothes|0|2|0|body}");
      this.add("{itArms|Leather Jacket|0|4|0|body}");
      this.add("{itArms|Brigandine|0|6|-1|body}");
      this.add("{itArms|Chain Suit|0|8|-2|body}");
      this.add("{itArms|Scale Suit|0|10|-2|body}");
      this.add("{itArms|Buckler|0|2|-1|left}");
      this.add("{itArms|Targe|0|4|-1|left}");
      this.add("{itArms|Shield|0|6|-2|left}");
      this.add("{itArms|Spike Shield|3|5|-3|left}");
      this.add("{itArms|Sandals|0|0|3|feet}");
      this.add("{itArms|Shoes|0|2|5|feet}");
      this.add("{itArms|Boots|0|4|7|feet}");
      this.add("{itArms|Leather Cap|0|2|-1|head}");
      this.add("{itArms|Pot Helm|0|4|-2|head}");
      this.add("{itArms|Chain Coif|0|6|-3|head}");
      this.add("{itArms|Steel Sword|15|0|-3|right}");
      this.add("{itArms|Bill Hook|17|0|5|right|left}");
      this.add("{itArms|Sword Breaker|6|6|3|left}");
      this.add("{itArms|Shakrum|13|0|7|right}");
      this.add("{itArms|Recurve Bow|16|0|9|right|left}");
      this.add("{itArms|Half Plate|0|12|-6|body}");
      this.add("{itArms|Full Plate|0|15|-9|body}");
      this.add("{itArms|Steel Buckler|0|5|-1|left}");
      this.add("{itArms|Roman Helm|0|7|-3|head}");
      this.add("{itArms|Doc Martins|4|6|5|feet}");
      this.add("{itArms|Mercury Sandals|0|0|20|feet}");
      this.add("{itArms|Rusty Dagger|3|0|-1|right|decay}");
      this.add("{itArms|Throwing Knife|5|0|5|right}");
      this.add("{itArms|Silver Throwing Knife|10|0|10|right|panic}");
      this.add("{itArms|Staff|5|0|3|right|left}");
      this.add("{itArms|War Tusk|7|6|-3|left}");
      this.add("{itArms|Elf Bow|21|0|10|right|left}");
      this.add("{itArms|Silver Elf Bow|42|0|10|right|left|blast}");
      this.add("{itArms|Mithril Mail|0|13|-2|body}");
      this.add("{itArms|Dwarf Axe|13|2|5|right|lucky}");
      this.add("{itArms|Unicorn Horn|17|0|8|right|bless}");
      this.add("{itArms|Cross Bow|20|0|20|right|left}");
      this.add("{itArms|Miners Cap|0|12|-5|head|glows}");
      this.add("{itArms|Goblin Pick|18|0|0|right}");
      this.add("{itArms|Weird Knife|12|8|12|left}");
      this.add("{itArms|Silver Weird Knife|25|8|12|left|disease}");
      this.add("{itArms|Goblin Shield|0|13|-5|left}");
      this.add("{itArms|War Boots|7|8|10|feet}");
      this.add("{itArms|Goblin Pike|22|0|5|right}");
      this.add("{itArms|Magic Staff|15|10|12|right|left|bless|lucky}");
      this.add("{itArms|Silver Staff|30|10|12|right|bless|lucky}");
      this.add("{itArms|Magic Robes|0|10|3|head|bless|lucky}");
      this.add("{itArms|Goblin Mithril|0|15|-5|body}");
      this.add("{itArms|Flaming Sword|15|0|5|right|flames}");
      this.add("{itArms|Goblin Plate|0|18|-5|bless}");
      this.add("{itArms|Terror Rod|17|0|8|right|glows|panic}");
      this.add("{itArms|Rams Horn|7|13|-8|left}");
      this.add("{itArms|Giant Maul|45|0|-20|right|left}");
      this.add("{itArms|Silver Giant Maul|90|0|-20|right}");
      this.add("{itArms|Rat Tail Whip|25|6|25|right|disease}");
      this.add("{itArms|Silver Tail Whip|50|12|50|right|disease}");
      this.add("{itArms|Dragon Shield|0|25|18|left}");
      this.add("{itArms|Great Pike|54|0|15|right|left}");
            this.add("{itArms|Mystic Staff|25|25|25|right|left|bless|lucky}");
      this.add("{itArms|Mystic Robes|0|25|12|body|bless|lucky}");
      this.add("{itArms|Great Bow|50|0|35|right|left}");
      this.add("{itArms|Serpent Scale|0|20|25|left}");
      this.add("{itArms|Sea Slippers|0|10|100|feet}");
      this.add("{itArms|Silver Sea Slippers|0|20|200|feet}");
      this.add("{itArms|Gladius|50|0|20|right}");
      this.add("{itArms|Silver Gladius|100|0|20|right|blind}");
      this.add("{itArms|Great Targe|0|35|10|left}");
      this.add("{itArms|Snake Scale Suit|0|50|-15|body}");
      this.add("{itArms|Matchlock Rifle|80|0|80|right|left|blast}");
      this.add("{itArms|Foul Axe|30|0|15|right|disease}");
      this.add("{itArms|Asaura|0|20|12|feet}");
      this.add("{itArms|Nunchaku|25|0|30|right}");
      this.add("{itArms|Shuriken|30|0|50|left}");
      this.add("{itArms|Spirit Katana|50|0|80|right|panic}");
      this.add("{itArms|Masamune|60|0|40|right}");
      this.add("{itArms|Silver Masamune|120|0|40|right|panic}");
      this.add("{itArms|Koutetsu|10|60|-20|body}");`;

const itLines = itemRawString.trim().split('\n');
// Iterate through each line and extract the desired values
itLines.forEach(line => {
  const item = {};
  const pattern = /\{([^}]+)\}/g; 
  
  while ((match = pattern.exec(line)) !== null) {
    let itmStr = match[1];
    let itm = itmStr.split("|");
    itm.shift();
    item.name = itm[0];
    itm.shift();
    item.attack = itm[0];
    itm.shift();
    item.defend = itm[0];
    itm.shift();
    item.skill = itm[0];
    itm.shift();
    item.location = itm[0];
    itm.shift();
    if(itm[0] === "left" || itm[0] === "right"){
      item.location = "both";
      itm.shift();
    }
    item.traits = itm.join(",");
    item.equippable = true;
    item.type = 10;
  }
  
  let sql = "INSERT INTO Item (name, attack, defend, skill, location, traits, equippable, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [item.name, item.attack, item.defend, item.skill, item.location, item.traits, item.equippable, item.type], function (err, result) {
    if (err) console.log(err);
  });
});

const gearStr = `this.add("Marks", 9, 1);
    this.add("Map to Warrens", 1, 500);
    this.add("Map to Treasury", 1, 2000);
    this.add("Map to Throne Room", 1, 5000);
    this.add("Map to Vortex", 1, 10000);
    this.add("Rutter for Hie Brasil", 1, 6000);
    this.add("Rutter for Shangala", 1, 12000);
    this.add("Time Crystal", 1, 18000);
    this.add("Castle Permit", 1, 5000);
    this.add("Sleeping Bag", 2, 25);
    this.add("Cooking Gear", 2, 75);
    this.add("Camp Tent", 2, 150);
    this.add("Food", 3, 2, 21);
    this.add("Fish", 3, 2, 21);
    this.add("Torch", 3, 5);
    this.add("Rope", 3, 8);
    this.add("Pen & Paper", 3, 12, 14);
    this.add("Teeth", 4, 2);
    this.add("Tusk", 4, 200);
    this.add("Gold Nugget", 4, 300);
    this.add("Horn", 4, 600);
    this.add("Crystal Crown", 4, 2500);
    this.add("Platinum Ring", 4, 8000);
    this.add("Dragon Scales", 4, 5000);
    this.add("Quartz", 5, 100, 1);
    this.add("Opal", 5, 250, 2);
    this.add("Garnet", 5, 650, 3);
    this.add("Emerald", 5, 1250, 5);
    this.add("Ruby", 5, 2400, 4);
    this.add("Turquoise", 5, 3500, 6);
    this.add("Diamond", 5, 5000, 10);
    this.add("Healing Salve, 6, 150, 2);
    this.add("Seltzer, 6, 200, 3);
    this.add("Gold Apple", 6, 500, 7);
    this.add("Ginseng", 6, 1000, 8);
    this.add("Mandrake", 6, 2000, 9);
    this.add("Blinding Dust", 6, 300, 4);
    this.add("Panic Dust", 6, 800, 5);
    this.add("Blast Powder", 6, 2000, 6);
    this.add("Youth Elixir", 6, 8000, 11);
    this.add("Aging Elixir", 6, 1000, 12);
    this.add("Faceless Potion", 6, 1500, 13);
    this.add("Identify Scroll", 7, 60, 1);
    this.add("Glow Scroll", 7, 600, 15);
    this.add("Bless Scroll", 7, 1000, 16);
    this.add("Luck Scroll", 7, 1500, 17);
    this.add("Flame Scroll", 7, 3500, 18);
    this.add("Enchant Scroll", 7, 2500, 19);
    this.add("Bottled Faery", 8, 800);
    this.add("Thief Insurance", 8, 1000);
    this.add("Bushido Token", 8, 0);
    this.add("Postcard", 8, 0);
    this.add("Letter", 8, 0);
    this.add("Petition", 8, 0);
    this.add("Grant", 8, 0, 20);
    this.add("Denial", 8, 0);
    this.add("Gobble Inn Postcard", 0, 50, 14);
    this.add("Gobble Inn T-Shirt", 0, 100);
    this.add("Troll Wart", 0, 0);
    this.add("Turnip", 0, 0);
    this.add("Rock", 0, 0);`;

const grLines = gearStr.trim().split('\n');
// Iterate through each line and extract the desired values
grLines.forEach(line => {
  const item = {};
  const pattern = /\(([^}]+)\)/g; 
  
  while ((match = pattern.exec(line)) !== null) {
    let grItem = match[1].split(",");
    item.name = grItem[0].replaceAll('"', "");
    item.type = grItem[1].trim();
    item.cost = grItem[2].trim();
    
    let sql = "INSERT INTO Item (name, type, cost) VALUES (?, ?, ?)";
    db.query(sql, [item.name, item.type, item.cost], function (err, result) {
    if (err) console.log(err);
    
  });
  
  }
});
}

main().then(() => {
  console.log("Done!");
}).catch(async (e) => {
  console.error(e);
  process.exit(1);
});