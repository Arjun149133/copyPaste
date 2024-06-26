"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { MdContentCopy } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

//just a commit

const Home = async () => {
  const [notes, setNotes] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const res = await fetch("/api/note", {
        cache: "no-store",
      });
      const data = await res.json();
      setNotes(data);
      setLoading(false);
    };
    fetchNotes();
  }, []);

  return (
    <section className=" flex flex-col mt-7 mx-10 space-y-5">
      <Suspense fallback={<Loading />}>
        <div>
          <h1 className="text-3xl text-transparent from-blue-500 to-blue-800 bg-clip-text bg-gradient-to-b font-bold">
            Notes:
          </h1>
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
                  <div className=" flex justify-center items-center mx-5 space-x-7">
                    <MdContentCopy
                      onClick={() => {
                        navigator.clipboard.writeText(note.content);
                        toast.success("Copied to clipboard");
                      }}
                    />
                    <Button asChild className="h-7 w-24">
                      <Link href={`/note/${note._id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Suspense>
    </section>
  );
};

export default Home;
