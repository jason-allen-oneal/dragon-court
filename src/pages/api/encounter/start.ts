import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let data: APIResponse;
  
  const { m } = JSON.parse(req.body);
  
  try {
    let monster = await prisma.monster.findFirst({
      where: {
        id: m,
      },
    });
    
    const pack = [];
    const gear = [];
    for(const it of JSON.parse(monster.pack)){
      let itm = await prisma.item.findFirst({
        where: {
          name: it.name
        }
      });
      pack.push(itm);
    }
    
    for(const itm of JSON.parse(monster.gear)){
      
      gear.push(itm);
    }
    
    data = {
      status: "ok",
      result: {
        monster: monster,
        pack: pack,
        gear: gear,
      },
    };
  } catch (err) {
    console.log("prisma error", err);
    data = {
      status: "error",
      result: err,
    };
  }
  
  res.json(data);
};

export default handler;
