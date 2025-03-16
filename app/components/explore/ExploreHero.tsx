import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams, useSearchParams } from "@remix-run/react";

const recentSearches = ["Montes"];

type ExploreHeroProps = {
  variant: "default" | "search";
  searchTerm: string | undefined;
  setSearchTerm: (v: string) => void;
  onHandleSearchParams: () => void;
}

export const ExploreHero = ({
  variant = "default",
  searchTerm,
  setSearchTerm,
  onHandleSearchParams
}: ExploreHeroProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <section className="max-w-[728px] flex flex-col gap-3">
        <p className="text-4xl font-bold text-center">
          Descubra projetos incríveis, inspire-se com novas ideias e compartilhe
          seu feedback!
        </p>
        <p className="text-center text-lg text-muted-foreground">
          Explore projetos inovadores de desenvolvedores talentosos, troque
          ideias e compartilhe seu feedback. Conecte-se, colabore e inspire-se!
        </p>
        {!searchParams.get('search') && (
          <>
            <span className="flex flex-row items-center relative">
              <Input 
                placeholder="Procurando algo expecifico?" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                onKeyDown={(e) => {
                  if(e.key == 'Enter'){
                    onHandleSearchParams()
                  }
                }}
              />
              <Search className="absolute right-2 text-muted-foreground" onClick={onHandleSearchParams}/>
            </span>

            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="text-sm text-muted-foreground">
                Pesquisas Recentes:
              </span>
              {recentSearches.map((term, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs h-6 px-3"
                >
                  {term}
                </Button>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};
