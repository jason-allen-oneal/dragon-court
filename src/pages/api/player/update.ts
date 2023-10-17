import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { p, id, i } = JSON.parse(req.body);
  console.log('p', p);
  try {
    const updatedPlayer = await prisma.player.update({
      where: {
        id: id
      },
      data: p,
    });
    
    const inventory = [];
    for(const item of i) {
      const itm = await prisma.playerItem.upsert({
        where: {
          id: item.id,
        },
        update: {
          itemId: item.itemId,
          playerId: id,
          qty: item.qty,
          equipped: item.equipped,
          identified: item.identified,
          traits: item.traits.join(","),
          guts: item.guts,
          wits: item.wits,
          charm: item.charm,
          attack: item.attack,
          defend: item.defend,
          skill: item.skill,
          enchants: item.enchants,
          stored: item.stored,
        },
        create: {
          itemId: item.itemId,
          playerId: id,
          qty: item.qty,
          equipped: item.equipped,
          identified: item.identified,
          traits: item.traits.join(","),
          guts: item.guts,
          wits: item.wits,
          charm: item.charm,
          attack: item.attack,
          defend: item.defend,
          skill: item.skill,
          enchants: item.enchants,
          stored: item.stored,
        },
      });
      inventory.push(itm);
    }

    let data: APIResponse = {
      status: "ok",
      result: {
        player: updatedPlayer,
        inventory: inventory,
      },
    };
    res.json(data);
  } catch (err) {
    console.log("prisma error", err);
    let data: APIResponse = {
      status: "error",
      result: JSON.stringify(err),
    };
    res.json(data);
  }
};

export default handler;
