import { Outlet } from "@remix-run/react";
import collabx_logo from 'collabx-logo.png'
import { ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function Layout(){
  return (
    <>
      <div className="w-screen h-screen grid grid-rows-[72px_1fr] justify-items-center">
        <header className="max-w-[1440px] w-screen border-b-2 px-8 py-3 flex flex-row items-center justify-between">
          <div className="flex flex-row gap-3 items-center h-full">
            <img src="/collabx-logo.png" className="max-h-[30px]"/>

            <ul className="flex flex-row gap-1">
              <li className="flex flex-row gap-1 text-[#1D1D1D]/80 px-2">
                <p>Explorar</p>
                <ChevronDown className="text-[#1D1D1D]/80"/>
              </li>

              <li className="flex flex-row gap-1 text-[#1D1D1D]/80 px-2">
                <p>Procurar serviço</p>
              </li>

              <li className="flex flex-row gap-1 text-[#1D1D1D]/80 px-2">
                <p>Blog</p>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-row gap-2 items-center">
            <Button className="h-12 px-6" variant={'default'}>
              Portfólio
            </Button>
            <span className="flex flex-row gap-2">
              <div className="size-12 bg-pink-800 rounded-md flex items-center justify-center text-white">
                KW
              </div>
              <span>
                <p className="font-bold ">Kaynan Wallen</p>
                <p className="text-[#1E1E1E]/75 font-semibold">Freelancer</p>
              </span>
            </span>
          </div>
        </header>
        <div className="w-screen max-w-[1440px]">
          <Outlet />
        </div>
      </div>
    </>
  )
}