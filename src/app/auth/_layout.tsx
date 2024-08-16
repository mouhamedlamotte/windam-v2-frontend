import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const AuthLayout = ({
  name,
  description,
  title,
  children,
}: {
  name: string;
  description: string;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Suspense>
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="px-6 py-8 w-full flex items-center">
        <div className="flex items-center gap-4 text-primary">
          <Bot size={30} />
          <h1 className="text-xl font-extrabold">Windam</h1>
        </div>
        <div className="ml-auto">
        {title === "Register" ? (
          <Button>
            <Link href="/auth/login" className="">
              login
            </Link>
          </Button>
        ) : (
          <Button>
            <Link href="/auth/register" className="">
              register
            </Link>
          </Button>
        )}
        </div>
      </div>
      <div className="flex grow  justify-between">
        <div className="div flex-1 h-full flex justify-center items-center">
          <div className="w-full px-56">
            <h3 className="text-3xl font-bold text-center">{name}</h3>
            <p className="text-sm text-center mt-2">{description} or</p>
            <div className="flex flex-col gap-2 mt-8">
              <Button variant="outline">Continue with Google</Button>
              <Button variant="outline">Continue with Github</Button>
            </div>
            <div className="w-full flex items-center mt-6">
              <div className="flex-1 bg-muted h-0.5"></div>
              <p className="text-sm text-center mx-4">or</p>
              <div className="flex-1 bg-muted h-0.5"></div>
            </div>
            <div className="mt-6">{children}</div>
          </div>
        </div>
        <div className="flex-1  h-full items-center flex justify-center self-end">
          <div className="w-full h-[70%]  bg-muted/70 -mt-16 rounded-l-3xl overflow-hidden bg-[url('/assets/img/chat.svg')] bg-cover bg-center" />
        </div>
    </div>
      </div>
    </Suspense>
  );
};

export default AuthLayout;