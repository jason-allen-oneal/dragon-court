import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let data: any;
  
  try {
    let { building, region, stock } = JSON.parse(req.body);
    
    let items = await prisma.item.findMany({
      where: {
        id: {
          in: stock,
        }
      },
    });
    
    console.log('server items', items);

    data = {
      status: 201,
      result: {
        items: items,
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
