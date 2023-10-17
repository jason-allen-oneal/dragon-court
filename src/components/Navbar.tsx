'use client';

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const {data: session, status} = useSession();
  
  if(status == "loading"){
    return <></>;
  }
  
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Dragon Court</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/">Home</Link></li>
          <li>
            <details>
              <summary>
                Account
              </summary>
              <ul className="p-2 bg-base-100">
              {status == "authenticated" && (
              <>
                <li><Link href="/game">Play!</Link></li>
                <li><Link href="/user/dashboard">Dashboard</Link></li>
                <li><Link href="#" onClick={() => signOut()}>Log Out</Link></li>
              </>
              )}
              {status != "authenticated" && (
              <>
                <li><Link
                  href="#"
                  onClick={() =>
                    signIn("credentials", {
                      callbackUrl: `${window.location.href}`,
                    })
                  }
                >Login</Link></li>
                <li><Link href="/user/register">Register</Link></li>
              </>
              )}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}