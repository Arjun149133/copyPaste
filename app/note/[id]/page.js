"use client";
import Input from "@components/Input";
import { Button } from "@components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { Input as Title } from "@components/ui/input";
import { toast } from "react-toastify";
import { MdContentCopy } from "react-icons/md";

const Page = ({ params }) => {
  const { data: session } = useSession();
  const [note, setNote] = useState({});
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [Loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      const response = await fetch(`/api/note/${params.id}`);
      const data = await response.json();
      setTitle(data.title);
      setCode(data.content);
      setNote(data);
      setLoading(false);
    };
    fetchNote();
  }, [params.id]);

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
        toast.success("Note updated successfully");
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
        toast.error("Note deleted successfully");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
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
          <div className=" mx-10 space-x-5 flex justify-center items-center">
            <MdContentCopy
              onClick={() => {
                navigator.clipboard.writeText(note.content);
                toast.success("Copied to clipboard");
              }}
              className=" text-xl cursor-pointer hover:text-gray-500 transition duration-300 ease-in-out"
            />
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
                <Button onClick={updateNote} disable={submitting}>
                  Update
                </Button>
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
    </Suspense>
  );
};

export default Page;
