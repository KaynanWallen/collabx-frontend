import { Outlet } from "@remix-run/react";
import collabx_logo from "collabx-logo.png";
import { BellRing, ChevronDown, Folders, MessageSquare, Star } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "~/components/ui/navigation-menu";

export default function Layout() {
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
                <ChevronDown className="text-[#1D1D1D]/80 size-4"/>
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
        <div className="w-screen max-w-[1440px]">
          <Outlet />
        </div>
      </div>
    </>
  );
}
