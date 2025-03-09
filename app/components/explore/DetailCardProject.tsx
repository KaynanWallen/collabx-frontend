import * as React from "react";
import {
  Github,
  MessageSquare,
  Minus,
  Plus,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

interface DetailCardProjectProps {
  detailCardOpen: boolean;
  setDetailCardOpen: (v: boolean) => void;
}

export default function DetailCardProject({
  detailCardOpen,
  setDetailCardOpen,
}: DetailCardProjectProps) {
  return (
    <>
      <Drawer open={detailCardOpen} onOpenChange={setDetailCardOpen}>
        {/* <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger> */}
        <DrawerContent className="max-h-[95vh] w-[95vw] mx-auto px-16 flex flex-col gap-4 overflow-y-auto">
          <section className="W-full min-w-full h-full max-h-[728px] min-h-[728px] bg-[#DDDDDD] rounded-md"></section>

          <section className="px-6">
            <header className="flex flex-col gap-3 border-b pb-2">
              <div className="flex flex-row justify-between items-center">
                <span className="flex flex-row gap-3 items-center">
                  <p className="text-4xl font-bold">Nome do projeto aqui</p>
                  <Star className="text-[#F8C100] size-8" />
                </span>

                <ul className="flex flex-row gap-2">
                  <li className="flex flex-row items-center gap-2 font-semibold text-3xl">
                    <ThumbsUp className="size-8 text-[#22C55E]" />
                    12
                  </li>

                  <li className="flex flex-row items-center gap-2 font-semibold text-3xl">
                    <ThumbsDown className="size-8 text-[#EF4444]" />3
                  </li>

                  <li className="flex flex-row items-center gap-2 font-semibold text-3xl">
                    <MessageSquare className="size-8 text-[#3B82F6]" />
                    18
                  </li>
                </ul>
              </div>

              <div className="flex flex-row justify-between items-center">
                <section className="flex flex-row gap-2">
                  <div className="size-12 bg-pink-800 rounded-md flex items-center justify-center text-white">
                    KW
                  </div>
                  <span>
                    <p className="font-bold ">Kaynan Wallen</p>
                    <p className="text-[#1E1E1E]/75 font-semibold">
                      12/02/2024 13:22
                    </p>
                  </span>
                </section>

                <span className="flex flex-row gap-4">
                  <Github className="text-muted-foreground size-7"/>
                  <Github className="text-muted-foreground size-7"/>
                  <Github className="text-muted-foreground size-7"/>
                  <Github className="text-muted-foreground size-7"/>
                </span>
              </div>
            </header>
          </section>

          <section className="flex flex-col gap-2">
          </section>
        </DrawerContent>
      </Drawer>
    </>
  );
}
