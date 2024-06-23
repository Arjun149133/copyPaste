"use client";
import React, { useState } from "react";
import Input from "@/components/Input";
import { Input as Title } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState("--write your code here--");

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/note/new", {
        method: "POST",
        body: JSON.stringify({
          title,
          content: code,
          userId: session?.user.id,
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

  if (!session) return router.push("/");

  return (
    <section className=" flex flex-col mt-7 justify-center items-center">
      <div className=" flex w-full justify-between">
        <h1 className="text-3xl text-transparent from-gray-500 to-gray-800 bg-clip-text bg-gradient-to-b font-bold mx-10 xl:flex hidden">
          Create New Note
        </h1>
        <div className=" mx-12">
          <Title
            placeholder="Title"
            className="w-64 px-2 py-1 border-2 border-gray-800 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className=" mx-14 space-x-2">
          <Button variant="" asChild>
            <Link
              href="/"
              className=" text-lg text-gray-100 font-bold bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-500 transition duration-300 ease-in-out"
            >
              Back
            </Link>
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={submit}
            disabled={submitting}
          >
            Submit
          </Button>
        </div>
      </div>
      <div>
        <Input code={code} setCode={setCode} />
      </div>
    </section>
  );
};

export default Form;
