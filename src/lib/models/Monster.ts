import { prisma } from "@/lib/prisma";
import { percent, roll, spread, scale, apiCall } from "@/lib/game";
import Item from "@/lib/models/Item";

const Monster = {
  id: 0,
  name: "",
  region: "",
  guts: 0,
  wits: 0,
  charm: 0,
  attack: 0,
  defend: 0,
  skill: 0,
  pack: [],
  gear: [],
  temp: "",
  opts: "",
  text: "",
  temperment: "",
  fight: 0,
  magic: 0,
  trader: 0,
  actions: 0,
  fame: 0,
  exp: 0,
  power: 0,
  stance: "",
  adjust: false,
    
  init({id, name, region, guts, wits, charm, attack, defend, skill, pack, gear, temp, opts, text, temperment, actions}: MonsterType){
    this.id = id;
    this.name = name;
    this.region = region;
    this.guts = guts;
    this.wits = wits;
    this.charm = charm;
    this.attack = attack;
    this.defend = defend;
    this.skill = skill;
    this.pack = JSON.parse(pack);
    this.gear = JSON.parse(gear);
    this.actions = actions;
    this.temp = [];
    for (const tmp of JSON.parse(temp)) {
      this.temp.push(tmp);
    }
    this.opts = (opts !== "") ? opts.split(",") : [];
    this.text = JSON.parse(text);
    this.temperment = temperment;
    this.fight = 0;
    this.magic = 0;
    this.trader = 0;
    
    for(const tmp of temp){
      if(tmp.name == "fight"){
        this.fight = tmp.qty;
        this.temp = this.tmp.filter(function(el) {
          return el.name != tmp.name;
        });
      }
      if(tmp.name == "magic"){
        this.magic = tmp.qty;
        this.temp = this.tmp.filter(function(el) {
          return el.name != tmp.name;
        });
      }
      if(tmp.name == "trader"){
        this.trader = tmp.trader;
        this.temp = this.tmp.filter(function(el) {
          return el.name != tmp.name;
        });
      }
    }
    
    return this;
  },
  
  hasTrait(t: string){
    const found = this.temp.find((e) => e.name === t);
    if(found != undefined){
      return true;
    }
    
    return false;
  },
  
  setup(l: number, w: number, p: number){
    console.log('Monster', JSON.stringify(this))
    this.calcPrimary(l, w, p);
    this.calcCombat();
    this.calcSecondary(w);
    this.buildInventory();
    console.log('Monster post-setup', JSON.stringify(this));
  },
  
  getPower(): number {
    return (
      0 +
      this.attack * 4 +
      this.defend * 4 +
      this.skill +
      this.guts * 2 +
      this.wits +
      this.charm +
      scale(this.fight, 12) +
      scale(this.magic, 16) +
      scale(this.trader, 8)
    );
  },

  calcPrimary(l: number, weight: number, p: number) {
    const ratio = 0.9 + (l * 0.1);
    this.guts = Math.floor(spread(this.guts * ratio));
    this.wits = Math.floor(spread(this.wits * ratio));
    this.charm = Math.floor(spread(this.charm * ratio));
    
    if (this.opts.includes('adjust')) {
      const ratio2 = (1.0 + (weight * 0.1)) / (this.getPower() / p);
      if (ratio2 > 1.0) {
        this.guts = Math.floor(spread(this.guts * ratio));
        this.wits = Math.floor(spread(this.wits * ratio));
        this.charm = Math.floor(spread(this.charm * ratio));
        this.attack = Math.floor(this.attack * ratio2);
        this.defend = Math.floor(this.defend * ratio2);
        this.skill = Math.floor(this.skill * ratio2);
      }
    }
  },
  
  calcCombat() {
    let num = Math.floor((this.wits * 2 + this.charm + 2) / 3 + this.skill + this.magic);
    if (num < 1) {
      num = 1;
    }
    this.skill = num;

    this.attack = this.attack + this.fight;

    this.defend = this.defend + this.trader;
  },
  
  calcSecondary(weight: number) {
    this.actions = Math.floor((((this.guts + this.wits) + this.charm) / 30) + ((((this.trader + this.magic) + this.fight) + weight) / 4));
    this.fame = Math.floor(((this.guts + this.wits) + this.charm) / 30 + (((this.trader + this.magic) + this.fight) + weight) / 4);
    this.exp = Math.floor(((1 + this.attack) + this.defend) * (100 + this.skill) / 100)
    
    const passion = this.temperment;
    if (passion === "aggressive") {
      this.stance = 4;
    } else if ("hostile" === passion) {
      this.stance = 3;
    } else if ("defensive" === passion) {
      this.stance = 2;
    } else if (passion === 'timid') {
      this.stance = 1;
    } else if ("passive" === passion) {
      this.stance = 0;
    } else {
      this.stance = 2;
    }
  },
  
  buildInventory(){
    let gear = [];
    
    for(const gears of this.gear){
      let canDrop = false;
      if(gears.percent > 0 && percent(gears.percent)){
        canDrop = true;
      }
      
      const obj = {
        name: gears.name,
        canDrop: canDrop,
      };
      
      gear.push(obj);
    }
    
    this.gear = gear;
  }
}

export default Monster;