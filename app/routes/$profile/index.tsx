import { BellRing, ChevronDown, Folders, Github, Globe, Linkedin, Mail, MapPin, MessageSquare, User } from "lucide-react";
import CardProject from "~/components/explore/CardProject";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export default function Index() {
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

        <div className="w-screen max-w-[1440px] overflow-y-auto flex flex-col gap-3 bg-gray-100">
          <section className="flex flex-col">
            <div className="w-full h-28 bg-blue-500 rounded-t-lg"></div>

            <div className="bg-gray-100 px-6 py-2 relative">
              <div className="flex flex-col md:flex-row">
                {/* Avatar */}
                <Avatar className="w-32 h-32 absolute -top-16">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>


                <span className="mt-24 md:mt-0 md:ml-36">
                  <h1 className="text-3xl font-bold">Kaynan Wallen</h1>
                  <p className="text-gray-600">Desenvolvedor Freelancer</p>
                </span>

                <span className="mt-4 md:mt-0 md:ml-auto flex flex-wrap gap-2">
                  <Button
                    variant="default"
                    className="bg-gray-900 hover:bg-gray-700 flex items-center"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Seguir
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 flex items-center"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 flex items-center"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 flex items-center"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Portfólio
                  </Button>
                </span>
              </div>

              <div className="mt-4 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>São Paulo, Brasil</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>wallenkaynan@gmail.com</span>
                </div>
              </div>
            </div>
          </section>

          <span className="px-6 flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Resumo</h2>
            <p className="text-gray-800 leading-relaxed">Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e transformar ideias em realidade através da tecnologia. Com experiência sólida em React, Node.js e TypeScript, atuo no desenvolvimento de aplicações web escaláveis, intuitivas e de alto desempenho. Sempre em busca de novos desafios e aprendizados, gosto de explorar novas tecnologias, aprimorar minhas habilidades e contribuir para projetos que impactam positivamente a experiência dos usuários.</p>
          </span>

          <span className="px-6 flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Habilidades</h2>
            <div className="flex flex-row flex-wrap gap-3">
              <Badge className="px-3 py-2 text-xl bg-background text-muted-foreground hover:bg-background/80 cursor-pointer">
                Montes
              </Badge>

              <Badge className="px-3 py-2 text-xl bg-background text-muted-foreground hover:bg-background/80 cursor-pointer">
                Montes
              </Badge>

              <Badge className="px-3 py-2 text-xl bg-background text-muted-foreground hover:bg-background/80 cursor-pointer">
                Montes
              </Badge>

              <Badge className="px-3 py-2 text-xl bg-background text-muted-foreground hover:bg-background/80 cursor-pointer">
                Montes
              </Badge>
            </div>
          </span>

          <section className="px-6 flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Projetos</h2>
            <div className="flex flex-row gap-4 justify-center">
                <CardProject />
                <CardProject />
                <CardProject />
                <CardProject />
              </div>
          </section>
        </div>
      </div>
    </>
  )
}