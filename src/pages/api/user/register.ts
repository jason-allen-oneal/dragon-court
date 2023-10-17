import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { hash } from "argon2";

type Response = {
  status: number;
  message: string;
  result: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let returnData: Response;

  try {
    const { name, email, password } = JSON.parse(req.body);

    const exists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (exists) {
      returnData = {
        status: 200,
        message: "An account already exists with this email address.",
        result: "error",
      };
    } else {
      const hashedPassword = await hash(password as string);

      const data = {
        name: name as string,
        email: email as string,
        password: hashedPassword,
      };

      const result = await prisma.user.create({
        data: data,
      });

      returnData = {
        status: 201,
        message: "Account created successfully! You may now login.",
        result: result.email,
      };
    }
  } catch (err) {
    console.log("reg err", err);
    returnData = {
      status: 200,
      message: "Something went wrong: " + err,
      result: "error",
    };
  }

  return res.json(returnData);
};

export default handler;
