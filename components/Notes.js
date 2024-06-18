import { Button } from "@/components/ui/button";
import List from "./List";
import Link from "next/link";
import React from "react";

const Notes = () => {
  return (
    <section className=" flex flex-col mt-7 mx-10 space-y-5">
      <div>
        <h1 className="text-3xl text-transparent from-blue-500 to-blue-800 bg-clip-text bg-gradient-to-b font-bold">
          Notes:
        </h1>
        <List />
      </div>
    </section>
  );
};

export default Notes;
