import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken } from "next-auth/react";
import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { registerSchema, RegisterInput } from "@/lib/validations/auth";
import Layout from "@/components/Layout";

export default function Register({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  
  const { handleSubmit, control, reset, register } = useForm<RegisterInput>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  
  const onSubmit = useCallback(
    async (data: any) => {
    try {
      const request = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await request.json();

      if (result.status === 201) {
        router.push("/user/login/");
      } else {
        console.log("error", result.message);
      }
    } catch (err) {
      console.error("error", JSON.stringify(err));
    }
  },[router]);
  
  const data = {
    title: "Register",
    description: ""
  };
  
  return (
    <Layout data={data}>
      <h1 className="font-bold text-2xl">Create Account</h1>
      <form className="flex flex-col border border-primary rounded shadow-lg p-12 mt-12" onSubmit={handleSubmit(onSubmit)}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label className="font-semibold text-xs" htmlFor="usernameField">Username</label>
        <input className="flex items-center h-12 px-4 w-64 bg-base-700 mt-2 rounded focus:outline-none focus:ring-2" type="text" {...register('name')} />
        <label className="font-semibold text-xs" htmlFor="emailField">Email</label>
        <input className="flex items-center h-12 px-4 w-64 bg-base-700 mt-2 rounded focus:outline-none focus:ring-2" type="text" {...register('email')} />
        <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Password</label>
        <input className="flex items-center h-12 px-4 w-64 bg-base-700 mt-2 rounded focus:outline-none focus:ring-2" type="password" {...register('password')} />
        <button className="flex items-center justify-center mt-2 btn btn-primary">Register Account</button>
        <div className="flex mt-6 justify-center text-xs">
          <Link className="btn btn-secondary" href="/user/login">Login</Link>
        </div>
      </form>
    </Layout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}