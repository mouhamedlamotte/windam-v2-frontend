"use client";

import { Layout } from "./_layout";
import { Button } from "@/components/ui/button";
import useAuthStore from "./auth/stores/useAuthStore";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Home() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    deleteCookie("token");
    router.refresh();
  };

  return (
    <Layout>
      <div className="h-screen flex flex-col justify-center items-center gap-4">
        <div>
          <p className="text-3xl font-bold">Hey, {user?.username}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Layout>
  );
}
