import { BellRing, Folders, Menu, MessageSquare, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link, useSearchParams } from "@remix-run/react";
import { ProfileType } from "~/@types/profile";

type HeaderSectionProps = {
  variant?: string;
  searchTerm: string | undefined;
  setSearchTerm: (v: string) => void;
  onHandleSearchParams: () => void;
  user: ProfileType | null;
};

export const HeaderSection = ({
  variant = "default",
  searchTerm,
  setSearchTerm,
  onHandleSearchParams,
  user
}: HeaderSectionProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isLoggedIn = false;

  return (
    <header className="max-w-[1440px] w-screen border-b-2 px-8 py-3 flex flex-row items-center justify-between">
      <div className="flex flex-row gap-3 items-center h-full">
        <div className="flex items-center gap-2">
          {searchParams.get("search") && (
            <Menu
              className="h-6 w-6 cursor-pointer md:mr-2"
              onClick={() => {}}
            />
          )}
          <div className="font-bold text-2xl">Collabx</div>
        </div>

        <nav className={`flex gap-6 ${searchParams.get("search") && "hidden"}`}>
          <div className="flex items-center gap-1 cursor-pointer">
            Explorar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <div className="cursor-pointer">Procurar serviço</div>
          <div className="cursor-pointer">Procurar freelancer</div>
          <div className="cursor-pointer">Blog</div>
        </nav>

        {searchParams.get("search") && (
          <span className="flex flex-row items-center relative w-[360px]">
            <Input
              placeholder="Procurando algo expecifico?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  onHandleSearchParams();
                }
              }}
            />
            <Search
              className="absolute right-2 text-muted-foreground"
              onClick={onHandleSearchParams}
            />
          </span>
        )}
      </div>
      <div className="flex flex-row gap-2 items-center">
        {user ? (
          <>
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
                {user.name.charAt(0)}
              </div>
              <span>
                <p className="font-bold ">{user.name}</p>
                <p className="text-[#1E1E1E]/75 font-semibold">{user.title}</p>
              </span>
            </section>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <Link to="/auth/login">
                <Button variant="outline" className="rounded-lg">
                  Entrar
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button variant="default" className="rounded-lg">
                  Registre-se
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
