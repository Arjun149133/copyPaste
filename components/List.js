"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const List = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch("/api/note", {
        cache: "no-store",
      });
      const data = await res.json();
      setNotes(data);
    };
    fetchNotes();
  }, []);
  return (
    <div className=" text-black">
      {notes?.map((note) => (
        <div
          key={note._id}
          className=" border-gray-200 border-2 m-1 rounded-lg my-5 h-10 p-1 cursor-pointer bg-gray-100"
        >
          <div className=" flex justify-between">
            <div className=" mx-5 flex">
              <h2 className=" font-bold">{note.title}</h2>
            </div>
            <div className=" mx-5 space-x-5">
              <Button asChild className="h-7 w-24">
                <Link href={`/note/${note._id}`}>View</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
