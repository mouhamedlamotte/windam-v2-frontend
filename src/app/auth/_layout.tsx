import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

const AuthLayout = ({ name, description, children }: { name: string; description: string; children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="px-6 py-8 w-full">
        <div className="flex items-center gap-4 text-primary">
          <Bot size={35} />
          <h1 className="text-3xl font-bold">Windam</h1>
        </div>
      </div>
        <div className="flex grow  justify-between">
            <div className="div flex-1 h-full flex justify-center items-center">
                    <div className="w-full px-56">
                        <h3 className="text-3xl font-bold text-center">{name}</h3>
                        <p className="text-sm text-center mt-2">{description}</p>
                        <div className="flex flex-col gap-2 mt-8">
                            <Button variant="outline">Continue with Google</Button>
                            <Button variant="outline">Continue with Github</Button>
                        </div>
                        <div className="w-full flex items-center mt-6">
                            <div className="flex-1 bg-muted h-0.5"></div>
                            <p className="text-sm text-center mx-4">or</p>
                            <div className="flex-1 bg-muted h-0.5"></div>
                        </div>
                        <div className="mt-6">
                            {children}
                        </div>
                    </div>
            </div>
            <div className="flex-1  h-full items-center flex justify-center self-end">
                <div className="w-full h-[70%]  bg-muted/70 -mt-16 rounded-l-3xl overflow-hidden bg-[url('https://img.freepik.com/free-photo/portrait-young-person-with-thought-bubble_23-2149184870.jpg?t=st=1722445752~exp=1722449352~hmac=ee8b9c03077e6f0d41acf23f334955fe2da1cef933a43834f3c691ada5d1f9a4&w=996')] bg-cover bg-center" />
            </div>
        </div>
    </div>
  );
};

export default AuthLayout;
