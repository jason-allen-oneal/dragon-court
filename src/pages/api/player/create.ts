import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let data: any;
  
  const { owner, guts, wits, charm, cash, charClass, bg } = req.body;
  
  let rank = 0;
  let skillFighter = 0;
  let skillMagic = 0;
  let skillTrade = 0;
  
  switch (charClass) {
    default:
    case "peasant":
      break;

    case "noble":
      rank = 1;
      break;

    case "warrior":
      skillFighter = 1;
      break;

    case "wizard":
      skillMagic = 1;
      break;

    case "trader":
      skillTrade = 1;
      break;
  }

  const character = {
    owner: owner,
    region: "Town",
    className: charClass,
    background: bg,
    clanId: 0,
    guts: guts,
    maxGuts: guts,
    wits: wits,
    maxWits: wits,
    charm: charm,
    maxCharm: charm,
    attack: 1,
    defend: 1,
    skill: 4,
    skillFighter: skillFighter,
    skillFighterMax: skillFighter,
    skillMagic: skillMagic,
    skillMagicMax: skillMagic,
    skillTrade: skillTrade,
    skillTradeMax: skillTrade,
    level: 1,
    experience: 0,
    quests: 5,
    maxQuests: 5,
    cash: cash,
    rank: rank,
    storage: 0,
    maxStorage: 20,
    fame: 0,
    favor: 0,
  };

  try {
    const result = await prisma.player.create({
      data: character,
    });

    data = {
      status: 201,
      result: {
        player: result,
      },
    };
  } catch (err) {
    console.log("prisma error", err);
    data = {
      status: 200,
      result: "error",
    };
  }
  res.json(data);
};

export default handler;
