"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/neuro-nexa.appspot.com/o/open-ai-img.png?alt=media&token=1e1f5aa8-9c0d-4488-bca1-437ae80c00de"
        width={300}
        height={300}
        alt="logo"
      />
      <button
        onClick={() => signIn("google")}
        className="text-white font-bold text-3xl animate-pulse"
      >
        Sign In To Use NeuroNexa
      </button>
    </div>
  );
}

export default Login;
