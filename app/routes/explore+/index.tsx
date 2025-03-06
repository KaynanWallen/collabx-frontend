import { Filter, Search } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function Index() {
  return (
    <>
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

          <span className="flex flex-row items-center relative">
            <Input placeholder="Procurando algo expecifico?" />
            <Search className="absolute right-2 text-muted-foreground" />
          </span>

          <div className="flex flex-row items-center gap-4 justify-center">
            <p className="font-medium">Pesquisas Recentes: </p>
            <span className="flex flex-row gap-3">
              <Badge variant={"secondary"} className="px-3 py-2">
                Montes
              </Badge>
            </span>
          </div>
        </section>

        <section className="w-full">
          <header className="w-full flex flex-row justify-between">
            <Select defaultValue='relevance'>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder="Select a fruit"
                />
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
              <Badge variant={"secondary"} className="px-3 py-1 text-muted-foreground text-xl font-semibold cursor-pointer">
                Descobrir
              </Badge>

              <Badge variant={"secondary"} className="px-3 py-1 text-muted-foreground text-xl font-semibold bg-transparent cursor-pointer">
                Sites
              </Badge>

              <Badge variant={"secondary"} className="px-3 py-1 text-muted-foreground text-xl font-semibold bg-transparent cursor-pointer">
                APIs
              </Badge>

              <Badge variant={"secondary"} className="px-3 py-1 text-muted-foreground text-xl font-semibold bg-transparent cursor-pointer">
                Designs
              </Badge>

              <Badge variant={"secondary"} className="px-3 py-1 text-muted-foreground text-xl font-semibold bg-transparent cursor-pointer">
                Outros
              </Badge>
            </span>
            
            <Badge className="flex flex-row gap-3 text-muted-foreground font-semibold text-lg" variant={'outline'}>
              <Filter className="text-muted-foreground"/>
              Filtros
            </Badge>
          </header>
        </section>
      </main>
    </>
  );
}
