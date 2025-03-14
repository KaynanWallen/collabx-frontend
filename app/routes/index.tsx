import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BellRing, ChevronDown, ChevronRight, Filter, Folders, MessageSquare, Search, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import CardProject from "~/components/explore/CardProject";
import { useProjects } from "~/components/explore/hooks/UseProject";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({request})
}

export default function Index() {

  const {
    paginatedProjects,
    projects,
    setProjects,
    totalProjects,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
  } = useProjects();
  
  console.log(projects)
  return (
    <>
      <div className="w-screen h-screen grid grid-rows-[72px_1fr] justify-items-center gap-6">
        <header className="max-w-[1440px] w-screen border-b-2 px-8 py-3 flex flex-row items-center justify-between">
          <div className="flex flex-row gap-3 items-center h-full">
            <img src="/collabx-logo.png" className="max-h-[30px]" />
            {/* <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>
                      <a className="select-none space-y-1 flex flex-row items-center gap-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Star className="size-5" />
                        <p>Popular</p>
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>
                      <a className="select-none space-y-1 flex flex-row items-center gap-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Star className="size-5" />
                        <p>Popular</p>
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu> */}
            <ul className="flex flex-row gap-1">
              <li className="flex flex-row items-center gap-1 text-[#1D1D1D]/80 px-2">
                <p>Explorar</p>
                <ChevronDown className="text-[#1D1D1D]/80 size-4" />
              </li>

              <li className="flex flex-row gap-1 text-[#1D1D1D]/80 px-2">
                <p>Procurar serviço</p>
              </li>

              <li className="flex flex-row gap-1 text-[#1D1D1D]/80 px-2">
                <p>Procurar freelancer</p>
              </li>

              <li className="flex flex-row gap-1 text-[#1D1D1D]/80 px-2">
                <p>Blog</p>
              </li>
            </ul>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <section className="flex flex-row gap-3 px-4">
              <span className="relative">
                <div className="px-2 bg-red-500 rounded-full text-center absolute right-[-12px] top-[-8px]">
                  <p className="text-white font-semibold  text-xs">8</p>
                </div>
                <BellRing className="size-6 cursor-pointer text-muted-foreground hover:text-primary" />
              </span>

              <span className="relative">
                <div className="px-2 bg-red-500 rounded-full text-center absolute right-[-12px] top-[-8px]">
                  <p className="text-white font-semibold  text-xs">3</p>
                </div>
                <Folders className="size-6 cursor-pointer text-muted-foreground hover:text-primary" />
              </span>

              <span className="relative">
                <div className="px-2 bg-red-500 rounded-full text-center absolute right-[-12px] top-[-8px]">
                  <p className="text-white font-semibold  text-xs">67</p>
                </div>
                <MessageSquare className="size-6 cursor-pointer text-muted-foreground hover:text-primary" />
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

            <section className="w-full flex flex-col gap-4">
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
