import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { hash } from "argon2";

type Response = {
  status: number;
  result: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let returnData: Response;

  try {
    const { user } = JSON.parse(req.body);
    console.log('api/user/update user', user);

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: user,
    });

    let data: APIResponse = {
      status: "ok",
      result: {
        user: updatedUser,
      },
    };
    res.json(data);
  } catch (err) {
    console.log("reg err", err);
    let data: APIResponse = {
      status: "error",
      result: "Something went wrong: " + err,
    };
    res.json(data);
  }
};

export default handler;
