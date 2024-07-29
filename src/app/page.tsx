"use client";


import { Layout } from "./_layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {


  return (
      <Layout >
        <div className="h-screen flex flex-col justify-center items-center gap-4">
        <div>Home</div>
        <Button>
          <Link href="/feed">Feeds</Link>
        </Button>
        </div>
      </Layout>
  );
}
