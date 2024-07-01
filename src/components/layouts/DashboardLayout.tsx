import { TooltipProvider } from "~/components/ui/tooltip";
import React from "react";
import Navbar from "../common/Navbar";
import SideNav from "../common/SideNav";

type Props = {
  children: React.ReactNode;
};

export function Dashboard({ children }: Props) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <TooltipProvider>
        <SideNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Navbar />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </TooltipProvider>
    </div>
  );
}
