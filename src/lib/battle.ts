import { twice, contest, roll } from "@/lib/game";

const Battle = {
  player: {},
  monster: {},
  killStop: false,
  power: ["Fly Swat", "Weak Blow", "Good Hit", "Potent Hit", "POWER HIT!"],
  effect: ["DODGED!", "Unharmed", "Scratched", "Injured!", "Wounded!!", "KILLED!!!"],
  berzerks: [
    "With a scream of fury, you tear into it!",
    "Foaming at the mouth you leap onto it!",
    "You attack like a whirlwind, screaming!",
    "KILL!  KILL!  KILL!  KILL!  KILL!  KILL!"
  ],
  backstabs: [
    "You pat it on the back with a knife",
    "You point down \"Hey your shoes are untied\"",
    "You pretend to leave, but circle back!",
    "I'm your best friend - DIE! DIE! DIE!"
  ],
  first: "",
  action: "",
  attack: false,
  
  initialize(player: any, inv: any, equip: any, monster: any, first: string){
    console.log('battle monster param', JSON.stringify(monster));
    this.monster = {
      name: monster.name,
      guts: monster.guts,
      wits: monster.wits,
      charm: monster.charm,
      attack: monster.attack,
      defend: monster.defend,
      speed: monster.skill,
      skill: monster.skill,
      skillFighter: monster.fight,
      skillMagic: monster.magic,
      skillTrader: monster.trader,
      traits: [],
      hit: twice(3),
      inventory: monster.pack,
      equipment: monster.gear,
      wounds: 0,
      alive: true,
      ail: 0,
      actions: monster.actions,
    };
    
    this.player = {
      name: player.name,
      guts: player.guts,
      wits: player.wits,
      charm: player.charm,
      attack: player.attack,
      defend: player.defend,
      speed: player.skill,
      skill: player.skill,
      skillFighter: player.skillFighter,
      skillMagic: player.skillMagic,
      skillTrader: player.skillTrader,
      traits: [],
      hit: twice(3),
      inventory: inv,
      equipment: equip,
      wounds: 0,
      alive: true,
      ail: 0,
    };
    
    this.first = first;
    this.action = "";
    this.attack = false;
    console.log("battle.init monstee.pack", JSON.stringify(this.monster.pack))
  },
  
  monsterHasItem(t: string) {
    const found = this.monster.pack.find((e) => e.name.toLowerCase() === t.toLowerCase());
    if(found) {
      return true;
    }
    
    return false;
  },
  
  hasTrait(it: any, t: string){
    const found = it.traits.find((e) => e.name === t.toLowerCase());
    if(found != undefined){
      return true;
    }
    
    return false;
  },
  
  getTrait(it: any, t: string){
    const found = it.traits.find((e) => e.name === t);
    if(found != undefined){
      return found.qty;
    }
    return 0;
  },
  
  addTrait(it: any, t: string, amt?: number){
    const found = it.traits.find((e) => e.name === t);
    if(found != undefined){
      found.qty = amt;
      return;
    }
    
    it.traits.push({ name: t, qty: amt });
    return;
  },
  
  removeTrait(it: any, t: string){
    it.traits = it.traits.filter(i => i.name.toLowerCase() !== t.toLowerCase());
    return it.traits;
  },
  
  doCure(): void {
    this.monster.disease = 0;
    
    this.monster.traits = this.removeTrait(this.monster, "Blinded");
    this.monster.traits = this.removeTrait(this.monster, "Panic");
  },

  doHeal(): void {
    this.monster.wounds = Math.max(0, this.monster.wounds - 15);
  },

  doRevive(): void {
    this.monster.wounds = Math.max(0, this.monster.wounds - 30);
    this.doCure();
  },
  
  doAction(type: string): string {
    console.log('pack', JSON.stringify(this.monster.pack));
    let msg = "";
    this.action = type;
    let heroFirst = (this.first == "monster") ? false : contest(this.player.speed, this.monster.speed);
    
    if(type == "backstab" || type == "berzerk" || type == "attack" || type == "ninja"){
      this.attack = true;
    }
    
    if(heroFirst){
      if (type == "backstab") {
        this.player.guts *= 2;
        this.player.speed *= 2;
        this.monster.hit = 1;
      } else if (type == "berzerk" || type == "ninja") {
        this.player.guts *= 2;
        this.player.speed *= 2;
        this.player.hit = 4;
      } else if (type == "hypnotize") {
        this.player.speed = this.player.wits;
      } else if (type == "swindle") {
        this.player.speed = this.player.charm;
      }
      
      if (this.hasTrait(this.player, "Reflex")) {
        this.player.speed += 30;
      }
      if (this.hasTrait(this.player, "Blinded")) {
        this.player.speed /= 2;
        this.player.hit /= 2;
      }
    }
    
    if(!heroFirst){
      if (type == "backstab") {
        this.monster.guts *= 2;
        this.monster.speed *= 2;
        this.player.hit = 1;
      } else if (type == "berzerk" || type == "ninja") {
        this.monster.guts *= 2;
        this.monster.speed *= 2;
        this.monster.hit = 4;
      } else if (type == "hypnotize") {
        this.monster.speed = this.monster.wits;
      } else if (type == "swindle") {
        this.monster.speed = this.monster.charm;
      }
      
      if (this.hasTrait(this.monster, "Reflex")) {
        this.monster.speed += 30;
      }
      if (this.hasTrait(this.monster, "Blinded")) {
        this.monster.speed /= 2;
        this.monster.hit /= 2;
      }
    }
    
    if (heroFirst) {
      msg += `${this.performAction(this.player, this.monster)}`;
      if (!this.killStop) {
        msg += `${this.performAction(this.monster, this.player)}`;
      }
    } else {
      msg += `${this.performAction(this.monster, this.player)}`;
      if (!this.killStop) {
        msg += `${this.performAction(this.player, this.monster)}`;
      }
    }
    
    return msg;
  },
  
  performAction(attacker: any, defender: any): string {
    let stk: number;
    let dmg: number;
    let useBlast = false;
    let act = this.action;
    
    if (act == "hypnotize") {
      return this.actorControls(attacker, defender, 2 * attacker.wits);
    }
    
    if (act == "swindle") {
      return this.actorSwindles(attacker, defender, 2 * attacker.charm);
    }
    
    if (act == "backstab") {
      attacker.skillTrader -= 1;
      if (this.hasTrait(defender, "Alert")) {
        defender.speed += 30;
      }
    }
    
    if (act == "berzerk") {
      attacker.skillFighter -= 1;
      if (this.hasTrait(defender, "Fencer")) {
        defender.speed += 30;
      }
    }
    
    /*
    if (act == "ninja") {
      attacker.ieatsu(1);
      if (this.hasTrait(defender, "Fencer")) {
        defender.speed += 30;
      }
    }
    */
    
    let weapon = attacker.equipment.equipped.right;
    
    if (roll(defender.speed) > attacker.speed) {
      dmg = 0;
      stk = 0;
    } else {
      dmg = (((attacker.guts * (2 + attacker.hit)) / 10) + attacker.attack) - defender.defend;
      
      let val = 25;
      useBlast = val > dmg;
      if (useBlast) {
        dmg = val;
      }
      
      let val2 = defender.guts - defender.wounds;
      if (dmg < 1) {
        stk = 1;
      } else {
        stk = dmg >= val2 ? 5 : 2 + ((3 * dmg) / val2);
      }
    }
    
    console.log('stk', stk);
    
    if (stk > 1) {
      defender.wounds += dmg;
    }
    
    if (stk === 5) {
      this.killStop = true;
      defender.alive = false;
    }
    
    if (weapon !== null) {
      if (weapon.hasTrait("Blind")) {
        
        this.addTrait(defender, "Blinded");
      }
      if (weapon.hasTrait("Panic")) {
        this.addTrait(defender, "Panic");
      }
      if (weapon.hasTrait("Disease")) {
        this.addTrait(defender, "Disease");
      }
    }
    
    let msg = `${attacker.name}: `;
    msg += this.attack
      ? msg + this.power[attacker.hit]
      : msg + `${defender.name} ${this.effect[stk]} ${this.spellEffects(attacker, defender)}\n`;
      
    
  },
  
  actorControls(at: any, df: any, as: number): string {
    let msg: string;
    at.skillMagic--;
    let msg2 = `${at.name} tries Hypnosis!\n`;
    let ds = df.wits;
    if (hasTrait(df, "Stubborn")) {
      ds += 30;
    }
    if (contest(as, ds)) {
      msg = `${msg2} ------  ${df.name} is Mesmerized!\n`;
      addTrait(df, "Controlled");
      this.killStop = true;
    } else {
      msg = `${msg2} ------  But the ${df.name} Resists!\n`;
    }
    return msg;
  },

  actorSwindles(at: any, df: any, as: number): string {
    let msg: string;
    at.traderSkill--;
    let msg2 = `${at.name} starts 'Trading'!\n`;
    let ds = df.charm;
    if (hasTrait(df, "Clever")) {
      ds += 30;
    }
    if (contest(as, ds)) {
      msg = `${msg2} ------  ${df.name} falls for It!\n`;
      addTrait(df, "Swindled");
      this.killStop = true;
    } else {
      msg = `${msg2} ------  But the ${df.name} is too Cunning!\n`;
    }
    return msg;
  },

  spellEffects(at: any, df: any): string {
    let msg = "";
    
    if(this.hasTrait(df, "Blinded")){
      const num = this.getTrait(df, "Blinded");
      if(contest(at.wits * num, df.wits)) {
        msg += " *BLIND*";
      }
    }
    
    if(this.hasTrait(df, "Panic")){
      const num = this.getTrait(df, "Panic");
      if(contest(at.wits * num, df.wits)) {
        msg += " +BLIND+";
        if(df instanceof Monster){
          df.stance = 0;
        }
      }
    }
    
    if(this.hasTrait(df, "Disease")){
      msg += " ^Sick^";
      const num = this.getTrait(df, "Disease");
      if (this.hasTrait(df, "Hardy")) {
        df.ail += Math.floor(num / 2);
      } else {
        df.ail += num;
      }
    }
    
    if (this.hasTrait(df, "Blasted")) {
      msg += " >KABOOM<";
    }
    
    return msg;
  },

  combatEvents(msg: string): string {
    if (msg === null) {
      msg = "";
    }
    
    let ginsengCt = this.monster.pack.find(x => x.name === 'Ginseng Root').qty;
    if (ginsengCt > 0) {
      msg += `\tThe ${this.monster.name} gains energy by eating ${ginsengCt} Ginseng Root\n`;
    }
    
    let seltzerCt = this.monster.pack.find(x => x.name === "Seltzer Water").qty;
    if (seltzerCt > 0) {
      msg += `\tThe ${this.monster.name} washes dust from its eyes by using Seltzer Water\n`;
    }
    
    let appleCt = this.monster.pack.find(x => x.name === "Golden Apple").qty;
    let num2 = this.monster.pack.find(x => x.name === "Healing Salve").qty;
    if (appleCt > 0 || num2 > 0) {
      let msg2 = `\tThe ${this.monster.name} swallows`;
      if (appleCt > 0) {
        msg2 += ` ${appleCt} Golden Apple`;
      }
      if (appleCt > 0 && num2 > 0) {
        msg2 += " and";
      }
      if (num2 > 0) {
        msg2 += ` ${num2} Healing Salve`;
      }
      msg = `${msg2} healing its wounds.\n`;
      while (val--) {
        this.doRevive();
        // remove apple
      }
      while (num2--) {
        this.doHeal();
        // remove salve
      }
    }
    
    let val2 = this.getTrait(this.monster, "Troll");
    if (val2 > 0) {
      msg += `\tThe ${this.monster.name} regenerates!\n`;
      while (val2--) {
        this.doRevive();
        this.removeTrait(this.monster, "Troll");
      }
    }
    /*
    if (this.hasTrait(this.monster, "Goat")) {
      if (contest(2 * this.monster.guts, this.player.guts)) {
        let it = h.findGearTrait(ArmsTrait.GLOWS);
        if (it === null) {
          it = h.findGearTrait(ArmsTrait.FLAME);
        }
        if (it === null) {
          return "";
        }
        h.dropGear(it);
        it.decay(3);
        this.getPack().insert(it);
        return `\tThe ${this.getName()} rips the ${it.getName()} from your body and swallows it whole!\n`;
      }
    }
    
    if (this.hasTrait(this.monster, "Worm")) {
      if (contest(2 * this.monster.guts, this.player.guts)) {
        let it = h.findGearTrait(ArmsTrait.GLOWS);
        if (it === null) {
          it = h.findGearTrait(ArmsTrait.FLAME);
        }
        if (it === null) {
          return "";
        }
        h.dropGear(it);
        it.decay(3);
        this.getPack().insert(it);
        return `\tThe ${this.getName()} rips the ${it.getName()} from your body and swallows it whole!\n`;
      }
    }
    */
  },
  /*
  battleActionResult() {
    let next: any = null;
    if (!this.player.alive) {
      next = this.hero.killedScreen(getHome(), null, true);
    } else if (this.hasTrait(this.monster, "controlled")) {
      next = this.heroControls('');
    } else if (this.hasTrait(this.monster, "swindled")) {
      next = this.heroSwindles();
    } else if (!this.monster.alive) {
      next = this.heroWins();
    } else if (this.hasTrait(this.player, "controlled")) {
      next = this.mobControls('');
    } else if (this.hasTrait(this.player, "swindled")) {
      next = this.mobSwindles();
    } else {
      // reset player actions
      if (this.monster.stance == 3 || this.monster.stance == 2) {
        this.monster.stance++;
      }
      // reset monster actions
      this.mob.chooseActions(false);
      next = this;
    }
    Tools.setRegion(next);
  },
  
  chooseActions() {
    const pm = this.packMagic();
    const ph = this.packHeal();
    const sk = this.guildSkill();
    const acts = this.getActions();
    const temp = this.getTemp();
    acts.setName(Constants.ATTACK);
    
    if (this.actions < 1) {
      this.useSkills(first);
      return "";
    }
    
    if ((this.hasTrait(this.monster, "Blinded") || this.hasTrait(this.monster, "Panic")) && monsterHasItem("Seltzer water") {
      this.removeTrait(this.monster, "blinded");
      this.removeTrait(this.monster, "panic");
      this.monster.actions--;
    }
    
    let num = this.monster.wounds;
    let val = this.monster.actions;
    if (num > val * 20 && ph > val && this.subPack(GearTypes.GINSENG, 1) === 1) {
      acts.add(GearTypes.GINSENG, 1);
      temp.add(Constants.ACTIONS, 2);
    }
    let num2 = num - this.actionHeal(GearTypes.TROLL, num, 30);
    let num3 = num2 - this.actionHeal(GearTypes.APPLE, num2, 30);
    let actionHeal = num3 - this.actionHeal(GearTypes.SALVE, num3, 15);
    if (temp.getCount(Constants.GOAT) > 0) {
      acts.setName(Constants.GOAT);
      temp.sub(Constants.GOAT, 1);
    } else if (temp.getCount(Constants.WORM) > 0) {
      acts.setName(Constants.WORM);
      temp.sub(Constants.WORM, 1);
    } else {
      let danger = this.getPower();
      let danger2 = ((enemy.getPower() - danger) * 4) / danger;
      let num4 = this.actions() + (this.packCount(GearTypes.GINSENG) * 2);
      if (pm > num4) {
        pm = num4;
      }
      if (sk > 0) {
        sk += danger2;
      }
      if (Tools.contest(pm, first ? sk - this.fight() : sk - this.thief())) {
        this.useMagic();
      } else {
        this.useSkills(first);
      }
    }
  }
  
    useMagic(): void {
    let bd = this.packCount(GearTypes.BLIND_DUST);
    let pn = this.packCount(GearTypes.PANIC_DUST);
    let bt = this.packCount(GearTypes.BLAST_DUST);
    const acts = this.getActions();
    const temp = this.getTemp();
    acts.setName(Constants.SPELLS);
    while (bd + pn > this.actions() && this.subPack(GearTypes.GINSENG, 1) === 1) {
      acts.add(GearTypes.GINSENG, 1);
      temp.add(Constants.ACTIONS, 2);
    }
    while (bd + pn + bt > 0 && this.actions() > 0) {
      if (Tools.contest(bd, pn + bt)) {
        this.subPack(GearTypes.BLIND_DUST, 1);
        acts.add("Blind", 1);
        bd--;
      } else if (Tools.contest(pn, bt)) {
        this.subPack(GearTypes.PANIC_DUST, 1);
        acts.add("Panic", 1);
        pn--;
      } else {
        this.subPack(GearTypes.BLAST_DUST, 1);
        acts.add(ArmsTrait.BLAST, 1);
        bt--;
      }
      this.useAction();
    }
  }

  useSkills(first: boolean): void {
    const wr = this.fight();
    const mg = this.magic();
    const tf = this.thief();
    const sm = this.ieatsu();
    const acts = this.getActions();
    if (Tools.roll(3) >= this.stance) {
      acts.setName(Constants.RUNAWAY);
    } else if (first) {
      if (tf + mg + sm >= 1) {
        if (Tools.contest(mg, tf + sm)) {
          acts.setName("Control");
        } else if (Tools.contest(sm, tf)) {
          acts.setName(Constants.IEATSU);
        } else {
          acts.setName(Tools.roll(2) === 0 ? "Swindle" : Constants.BACKSTAB);
        }
      }
    } else if (mg + wr >= 1) {
      if (Tools.contest(mg, wr)) {
        acts.setName("Control");
      } else {
        acts.setName(Constants.BERZERK);
      }
    }
  }

  actionHeal(id: string, wounds: number, val: number): number {
    let num = (wounds + (val / 2)) / val;
    const has = this.packCount(id);
    if (num > has) {
      num = has;
    }
    const has2 = this.actions();
    if (num > has2) {
      num = has2;
    }
    this.useAction(num);
    this.getActions().add(id, num);
    return num * val;
  }
  */
};

export default Battle;