import { prisma } from "@/lib/prisma";
import { percent, roll, skew, twice } from "@/lib/game";
import { VALUED_TRAITS, TRAIT_VALUES } from "@/lib/constants";

const Item = {
  id: 0,
  name: "",
  attack: 0,
  defend: 0,
  skill: 0,
  location: "",
  traits: [],
  equippable: false,
  type: 0,
  cost: 0,
  itemId: 0,
  playerId: 0,
  qty: 0,
  equipped: false,
  identified: false,
  enchants: 0,
  stored: false,
  guts: 0,
  wits: 0,
  charm: 0,
  
  init: function(i: any){
    console.log('i', JSON.stringify(i));
    this.id = i.id;
    this.itemId = i.itemId;
    this.name = i.name;
    this.attack = i.attack;
    this.defend = i.defend;
    this.skill = i.skill;
    this.location = i.location;
    this.traits = Array.isArray(i.traits) ? i.traits : i.traits.split(",");
    this.equippable = i.equippable;
    this.type = i.type;
    this.cost = i.cost;
    this.playerId = i.playerId;
    this.qty = i.qty;
    this.equipped = i.equipped;
    this.identified = i.identified;
    this.enchants = i.enchants;
    this.stored = i.stored;
    this.guts = i.guts;
    this.wits = i.wits;
    this.charm = i.charm;
    
    return this;
  },
  
  randomize: function(){
    let sum = this.getPower();
    let value = 7 + twice(4) + skew(50);
    
    this.attack = this.attack < 0 ? (this.attack * 10) / value : (this.attack * value) / 10;
    
    this.defend = this.defend < 0 ? (this.defend * 10) / value : (this.defend * value) / 10;
    
    this.skill = this.skill < 0 ? (this.skill * 10) / value : (this.skill * value) / 10;
    while (true) {
      let value2 = roll(1024);
      if (value2 >= sum) {
        break;
      }
      sum -= value2;
      /*
      let trait = ArmsTrait.VISIBLE_TRAIT + Tools.roll(ArmsTrait.ENCHANT_TRAIT - ArmsTrait.VISIBLE_TRAIT);
      if ((value2 & 1) === 0) {
        this.clrTrait(trait);
      } else {
        this.fixTrait(trait);
      }
      */
    }
    /*
    if (this.isCursed()) {
      this.clrTrait(ArmsTrait.CURSE);
      this.fixTrait(ArmsTrait.CURSED);
    }
    if (this.isCursed() || this.stockValue() >= 70) {
      this.fixTrait(ArmsTrait.SECRET);
    }
    */
  },
  
  getPower: function(){
    let power = (this.attack * 3) + (this.defend * 2) + this.skill;
    if (power < 1) {
      return 1;
    }
    return power;
  },
  
  hasTrait: function(t: string){
    return this.traits.includes(t.toLowerCase());
  },
  
  toShow: function() {
    let msg = this.name;
    if (this.identified === false) {
      return `${msg}[?]`;
    }
    let msg2 = `${msg}[`;
    if (this.fullAttack() > 0) {
      msg2 += '+';
    }
    if (this.fullAttack() !== 0) {
      msg2 += `${this.fullAttack()}a`;
    }
    if (this.fullDefend() > 0) {
      msg2 += '+';
    }
    if (this.fullDefend() !== 0) {
      msg2 += `${this.fullDefend()}d`;
    }
    if (this.fullSkill() > 0) {
      msg2 += '+';
    }
    if (this.fullSkill() !== 0) {
      msg2 += `${this.fullSkill()}s`;
    }
    if (this.hasTrait("decay")) {
      msg2 += '@';
    }
    if (this.hasTrait("Cursed")) {
      msg2 += '*';
    }
    return `${msg2}]`;
  },

  fullAttack: function(){
    let num = this.attack;
    if (this.location === "right" && this.hasTrait("Flame")) {
      num += 8;
    }
    return num + ((this.enchants + 9) / 10);
  },

  fullDefend: function(){
    let num = this.defend;
    if (this.hasTrait("Bless")) {
      num++;
    }
    return num + ((this.enchants + 4) / 10);
  },

  fullSkill: function() {
    let num = this.skill;
    if (this.location === "right" && this.hasTrait("Lucky")) {
      num += 12;
    }
    if (this.hasTrait("Glows")) {
      num += 2;
    }
    return num + this.enchants;
  },
  
  decay: function(rate: number) {
    if (rate < 2) {
      rate = 2;
    }
    if (roll(rate) > 0) {
      return false;
    }
    
    let num = this.attack;
    this.attack -= (num <= 1) ? 1 - (num / 12) : 1 + (num / 12);
    
    let num2 = this.defend;
    this.defend -= (num2 <= 1) ? 1 - (num2 / 12) : 1 + (num2 / 12);
    
    let num3 = this.skill;
    this.skill -= (num3 <= 1) ? 1 - (num3 / 12) : 1 + (num3 / 12);
    
    if (roll(12) !== 0) {
      return true;
    }
    
    this.enchants -= (this.enchants + 4) / 5;
    
    return true;
  },
  
  stockValue: function() {
    if (!this.identified || this.hasTrait("cursed")) {
      return 2;
    }
    
    let num = this.attack + this.defend;
    let value = 0 + ((num > 0 ? 1 : -1) * num * num * 5);
    let num2 = this.skill;
    let value2 = (value + ((((num2 > 0 ? 1 : -1) * num2) * num2) * 2)) / 2;
    
    for (let ix = 0; ix < VALUED_TRAITS.length; ix++) {
      if(this.hasTrait(VALUED_TRAITS[ix])){
        value2 += TRAIT_VALUES[ix];
      }
    }
    return value2;
  }
}

export default Item;