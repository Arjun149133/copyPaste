"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    //for create button
    if (pathname === "/") {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [pathname]);

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);

  return (
    <section className=" flex justify-evenly w-full my-5">
      <div className="flex w-full pl-7">
        <h1 className="text-3xl max-sm:text-sm text-transparent from-purple-500 to-purple-800 bg-clip-text bg-gradient-to-b font-bold">
          Copy & Paste
        </h1>
      </div>
      <div className=" flex w-full justify-end pr-7 space-x-5">
        {session?.user ? (
          <div className=" flex space-x-2">
            <div className=" mr-3">
              {showButton && (
                <Button variant="" asChild>
                  <Link
                    href="/new"
                    className=" text-lg text-gray-100 font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500 transition duration-300 ease-in-out"
                  >
                    Create New Note
                  </Link>
                </Button>
              )}
            </div>
            <div>
              <Button
                variant=""
                onClick={() => signOut()}
                className="text-gray-100 font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-500 transition duration-300 ease-in-out"
              >
                SignOut
              </Button>
            </div>
            <div>
              <Image
                src={session?.user?.image}
                alt="User"
                width={37}
                height={37}
                className=" rounded-full hover:cursor-pointer"
              />
            </div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers)?.map((provider) => (
                <Button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className=" bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 transition duration-500 ease-in"
                >
                  SignIn
                </Button>
              ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
