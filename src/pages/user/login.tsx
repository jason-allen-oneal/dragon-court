import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "@/components/Layout";
import { loginSchema, LoginInput } from "@/lib/validations/auth";

type PageProps = {
  callbackUrl: string;
  csrfToken: string;
};

export default function SignIn(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const redirect = props.callbackUrl;

  const { handleSubmit, control, reset, register } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
      callbackUrl: "/game",
    },
  });

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        await signIn("credentials", { ...data });
        reset();
      } catch (err) {
        console.log("error", JSON.stringify(err));
      }
    },
    [reset]
  );

  const data = {
    title: "Login",
    description: ""
  };
  
  return (
    <Layout data={data}>
      <h1 className="font-bold text-2xl">Welcome Back</h1>
      <form className="flex flex-col border border-primary rounded shadow-lg p-12 mt-12" onSubmit={handleSubmit(onSubmit)}>
        <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
        <label className="font-semibold text-xs" htmlFor="usernameField">Email</label>
        <input className="flex items-center h-12 px-4 w-64 bg-base-700 mt-2 rounded focus:outline-none focus:ring-2 border border-primary" type="text" {...register('email')} />
        <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Password</label>
        <input className="flex items-center h-12 px-4 w-64 bg-base-700 mt-2 rounded focus:outline-none focus:ring-2 border border-primary" type="password" {...register('password')} />
        <button className="flex items-center justify-center mt-2 btn btn-primary">Login</button>
        <div className="flex mt-6 justify-center text-xs">
          <Link className="btn btn-accent" href="#">Forgot Password</Link>
          
          <Link className="btn btn-secondary" href="/user/register">Sign Up</Link>
        </div>
      </form>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { callbackUrl } = context.query;
  
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      callbackUrl: callbackUrl == undefined ? "/" : callbackUrl,
    },
  }
}