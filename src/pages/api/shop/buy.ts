import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let data: any;
  let message = "";
  
  try {
    let { pid, item, shop, region } = JSON.parse(req.body);
    
    let player = await prisma.player.findFirst({
      where: {
        id: pid,
      }
    });
    
    let itm = await prisma.item.findFirst({
      where: {
        id: item.id
      },
    });
    
    if(player.cash - item.cost < 0){
      message = "You do not have enough Marks for this transaction.";
      item = null;
    } else {
      message = "You have purchased: " + item.name;
      
      let qty = 0;
      const itemCount = await prisma.playerItem.count({
        where: {
          AND: [
            playerId: player.id,
            itemId: itm.id,
          ],
        },
      });
      
      const updatedPlayer = await prisma.player.update({
        where: {
          id: player.id,
        },
        data: {
          cash: player.cash - itm.cost
        },
      });
      
      if(itemCount > 0) {
        qty = itemCount++;
      }else{
        qty = 1;
      }
      
      const upsertPItem = await prisma.playerItem.upsert({
        where: {
          AND: [
            playerId: player.id,
            itemId: itm.id
          ],
        },
        update: {
          qty: qty,
        },
        create: {
          itemId: itm.id,
          playerId: player.id,
          qty: 1,
          equipped: 0,
          identified: 1,
          abilities: "",
          guts: 0,
          wits: 0,
          charm: 0,
          attack: 0,
          defend: 0,
          skill: 0,
          timesEnchanted: 0,
          inStorage: 0,
        },
      });
    }

    data = {
      status: 201,
      result: {
        message: message,
        item: itm,
        player: updatedPlayer
      },
    };
  } catch (err) {
    console.log("prisma error", err);
    data = {
      status: 200,
      result: err,
    };
  }
  
  res.json(data);
};

export default handler;
