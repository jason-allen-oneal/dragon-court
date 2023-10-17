import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let data: any;
  
  const { name } = req.body;
  
  try {
    let guild = await prisma.clan.findMany({
      where: {
        name: {
          search: name,
        },
      },
    });

    data = {
      status: 201,
      result: {
        guild: guild || {},
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
