"use client";
import Input from "@components/Input";
import { Button } from "@components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input as Title } from "@components/ui/input";

const page = ({ params }) => {
  const { data: session } = useSession();
  const [note, setNote] = useState({});
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      const response = await fetch(`/api/note/${params.id}`);
      const data = await response.json();
      setTitle(data.title);
      setCode(data.content);
      setNote(data);
    };
    fetchNote();
  }, []);

  const updateNote = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`/api/note/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title,
          content: code,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteNote = async () => {
    try {
      const res = await fetch(`/api/note/${params.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className=" flex justify-between">
        <div className=" mx-12">
          {session?.user?.id === note.creator?._id ? (
            <Title
              placeholder="Title"
              className="w-64 px-2 py-1 border-2 border-gray-800 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <div>
              <h1 className=" text-3xl font-bold">{note.title}</h1>
            </div>
          )}
        </div>
        <div className=" mx-10 space-x-5 flex">
          <Button variant="" asChild>
            <Link
              href="/"
              className=" text-lg text-gray-100 font-bold bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-500 transition duration-300 ease-in-out"
            >
              Back
            </Link>
          </Button>
          {session?.user?.id === note.creator?._id && (
            <>
              <Button onClick={updateNote}>Update</Button>
              <Button onClick={deleteNote} variant="destructive">
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
      <Input
        code={code}
        setCode={setCode}
        read={session?.user?.id !== note.creator?._id}
      />
    </div>
  );
};

export default page;
