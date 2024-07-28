"use client";

import { useRouter } from "next/navigation";
import { Layout } from "./_layout";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/feed");
  }, []);

  return (
      <Layout >
        <div>Home</div>
      </Layout>
  );
}
