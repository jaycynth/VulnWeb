"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/next.svg";
import { useRouter } from "next/navigation";
import { NotifyError, NotifySuccess } from "@/components/Toast/Notification";
import Cookies from "js-cookie";
import { useUser } from "@/context/UserContext";

export default function SignUp() {
  const router = useRouter();

  const { setUserData } = useUser();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");


  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}register`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        email:email
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data.data);
        NotifySuccess(`Successfully signup`);
        Cookies.set("Token", data.data.token);
        setLoading(false);

        router.push("/auth/signin");
      })
      .catch((error) => {
        setLoading(false);
        NotifyError(error);
      });
  };
  return (
    <div className="flex flex-wrap items-center bg-white  h-screen">
      <div className="hidden w-full xl:block xl:w-1/2">
        <div className="px-26 py-17.5 text-center">
          <Link className="mb-5.5 inline-block" href="/">
            <Image
              className="hidden dark:block"
              src={logo}
              alt="Logo"
              width={176}
              height={32}
            />
            <Image
              className="dark:hidden"
              src={logo}
              alt="Logo"
              width={176}
              height={32}
            />
          </Link>

          <p className="2xl:px-20">Fill in all the details to REGISTER</p>

        </div>
      </div>

      <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            Sign In to OM Security
          </h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Email Address"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-5">
              <input
                type="submit"
                value="Sign UP"
                className="w-full cursor-pointer rounded-lg borderborder-black bg-black p-4 text-white transition hover:bg-opacity-90"
              />

              {loading && (
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-black h-full rounded-full transition-width duration-500"
                  ></div>
                </div>
              )}
            </div>

            <div className="mt-6 text-center text-black">
              <p>
                Don’t have any account?{" "}
                <Link href="/auth/signin" className="text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
