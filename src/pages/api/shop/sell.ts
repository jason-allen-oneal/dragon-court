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
    
    let itm = await prisma.playerItem.findFirst({
      where: {
        id: item.id
      },
      include: {
        Item: true,
      }
    });
    
    let i: any = null;
    
    if(itm.qty > 1){
      const updatedItem = await prisma.playerItem.update({
        where: {
          id: itm.id,
        },
        data: {
          qty: itm.qty-1,
        },
      });
      
      i = updatedItem;
    }else{
      const deletedItem = await prisma.user.delete({
        where: {
          id: itm.id,
        },
      });
    }
    
    const gain = ((itm.Item.cost / 2) + (0.23 * player.level));
    const updatedPlayer = await prisma.player.update({
      where: {
        id: player.id,
      },
      data: {
        cash: player.cash + gain
      },
    });
    
    const message = "You have sold the item.";

    data = {
      status: 201,
      result: {
        message: message,
        item: i,
        gain: gain,
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
