import { AlignLeft, BellRing, Filter, Folders, MessageSquare, Search } from "lucide-react";
import CardProject from "~/components/explore/CardProject";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function Index() {
  return (
    <>
      <div className="w-screen h-screen grid grid-rows-[72px_1fr] justify-items-center gap-6">
        <header className="max-w-[1440px] w-screen border-b-2 px-8 py-3 flex flex-row items-center justify-between">
          <div className="flex flex-row gap-3 items-center h-full">
            <AlignLeft className="size-10"/>
            <img src="/collabx-logo.png" className="max-h-[30px]" />
            <span className="flex flex-row items-center relative w-[280px]">
              <Input placeholder="Procurando algo expecifico?" />
              <Search className="absolute right-2 text-muted-foreground" />
            </span>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <section className="flex flex-row gap-3 px-4">
            <span className="relative">
                <div className="px-2 bg-red-500 rounded-full text-center absolute right-[-12px] top-[-8px]">
                  <p className="text-white font-semibold  text-xs">8</p>
                </div>
                <BellRing className="size-6 cursor-pointer text-muted-foreground hover:text-primary"/>
              </span>

              <span className="relative">
                <div className="px-2 bg-red-500 rounded-full text-center absolute right-[-12px] top-[-8px]">
                  <p className="text-white font-semibold  text-xs">3</p>
                </div>
                <Folders className="size-6 cursor-pointer text-muted-foreground hover:text-primary"/>
              </span>

              <span className="relative">
                <div className="px-2 bg-red-500 rounded-full text-center absolute right-[-12px] top-[-8px]">
                  <p className="text-white font-semibold  text-xs">67</p>
                </div>
                <MessageSquare className="size-6 cursor-pointer text-muted-foreground hover:text-primary"/>
              </span>
            </section>
            <Button className="h-12 px-6" variant={"default"}>
              Portfólio
            </Button>
            <section className="flex flex-row gap-2">
              <div className="size-12 bg-pink-800 rounded-md flex items-center justify-center text-white">
                KW
              </div>
              <span>
                <p className="font-bold ">Kaynan Wallen</p>
                <p className="text-[#1E1E1E]/75 font-semibold">Freelancer</p>
              </span>
            </section>
          </div>
        </header>
        <div className="w-screen max-w-[1440px] overflow-y-auto">
        <main className="flex flex-col justify-center items-center gap-6">
        <section className="max-w-[728px] flex flex-col gap-3">
          <p className="text-4xl font-bold text-center">
            Descubra projetos incríveis, inspire-se com novas ideias e
            compartilhe seu feedback!
          </p>
          <p className="text-center text-lg">
            Explore projetos inovadores de desenvolvedores talentosos, troque
            ideias e compartilhe seu feedback. Conecte-se, colabore e
            inspire-se!
          </p>
        </section>

        <section className="w-full flex flex-col gap-4">
          <header className="w-full flex flex-row justify-between">
            <Select defaultValue="relevance">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevância</SelectItem>
                <SelectItem value="old">Mais antigo</SelectItem>
                <SelectItem value="new">Mais novo</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
                <SelectItem value="other2">Outro</SelectItem>
              </SelectContent>
            </Select>

            <span className="flex flex-row gap-2">
              <Badge
                variant={"secondary"}
                className="px-3 py-1 text-muted-foreground text-xl font-semibold cursor-pointer"
              >
                Descobrir
              </Badge>

              <Badge
                variant={"secondary"}
                className="px-3 py-1 text-muted-foreground text-xl font-semibold bg-transparent cursor-pointer"
              >
                Sites
              </Badge>

              <Badge
                variant={"secondary"}
                className="px-3 py-1 text-muted-foreground text-xl font-semibold bg-transparent cursor-pointer"
              >
                APIs
              </Badge>

              <Badge
                variant={"secondary"}
                className="px-3 py-1 text-muted-foreground text-xl font-semibold bg-transparent cursor-pointer"
              >
                Designs
              </Badge>

              <Badge
                variant={"secondary"}
                className="px-3 py-1 text-muted-foreground text-xl font-semibold bg-transparent cursor-pointer"
              >
                Outros
              </Badge>
            </span>

            <Badge
              className="flex flex-row gap-3 text-muted-foreground font-semibold text-lg"
              variant={"outline"}
            >
              <Filter className="text-muted-foreground" />
              Filtros
            </Badge>
          </header>

          <div className="flex flex-row flex-wrap gap-4 justify-center">
            <CardProject />
            <CardProject />
            <CardProject />
            <CardProject />
            <CardProject />
            <CardProject />
          </div>
        </section>
      </main>
        </div>
      </div>
    </>
  );
}
