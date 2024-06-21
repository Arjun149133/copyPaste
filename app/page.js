import Notes from "@/components/Notes";
import React, { Suspense } from "react";
import Loading from "./loading";

const Home = () => {
  return (
    <section className="">
      <Suspense fallback={<Loading />}>
        <Notes />
      </Suspense>
    </section>
  );
};

export default Home;
