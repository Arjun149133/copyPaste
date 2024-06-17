import React from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

const Dashboard = () => {
  return (
    <section className=" flex flex-col space-y-3">
      <h1 className="text-3xl text-transparent from-purple-500 to-purple-800 bg-clip-text bg-gradient-to-b font-bold">
        Copy & Paste
      </h1>
      <Button variant="" asChild>
        <Link
          href="/new"
          className=" text-lg text-gray-100 font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500 transition duration-300 ease-in-out"
        >
          Create New Note
        </Link>
      </Button>
    </section>
  );
};

export default Dashboard;
