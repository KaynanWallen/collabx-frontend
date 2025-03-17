import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import {
  BellRing,
  ChevronDown,
  ChevronRight,
  Filter,
  Folders,
  Loader,
  MessageSquare,
  Search,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ProjectType } from "~/@types/project";
import { ExploreHero } from "~/components/explore/ExploreHero";
import { useProjects } from "~/components/explore/projects/hooks/UseProject";
import { CardFilters } from "~/components/explore/projects/CardFilters";
import { CardProject } from "~/components/explore/projects/CardProject";
import { HeaderSection } from "~/components/layout/headerSection";
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
  return json({ request });
};

const projects = [
  {
    id: 1,
    title: "Nome do Projeto",
    description:
      "Um aplicativo para organizar sua rotina de autocuidado. Crie lembretes para skincare, hidratação e até mesmo aquela máscara facial que você sempre esquece de usar!",
    authorName: "Nome Chamativo",
    authorInitial: "N",
    likes: 0,
    dislikes: 0,
    comments: 1,
    favorited: true,
    image: "/lovable-uploads/64646fc7-881b-4ee9-a16c-1be4c9383d44.png",
  },
  {
    id: 2,
    title: "Nome do Projeto",
    description:
      "Um aplicativo para organizar sua rotina de autocuidado. Crie lembretes para skincare, hidratação e até mesmo aquela máscara facial que você sempre esquece de usar!",
    authorName: "Nome Chamativo",
    authorInitial: "N",
    likes: 0,
    dislikes: 0,
    comments: 0,
    favorited: false,
    image: "/lovable-uploads/64646fc7-881b-4ee9-a16c-1be4c9383d44.png",
  },
  {
    id: 3,
    title: "Nome do Projeto",
    description:
      "Um aplicativo para organizar sua rotina de autocuidado. Crie lembretes para skincare, hidratação e até mesmo aquela máscara facial que você sempre esquece de usar!",
    authorName: "Nome Chamativo",
    authorInitial: "N",
    likes: 0,
    dislikes: 0,
    comments: 0,
    favorited: false,
    image: "/lovable-uploads/64646fc7-881b-4ee9-a16c-1be4c9383d44.png",
  },
];

export default function Index() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>("")

  const {
    paginatedProjects,
    projects,
    state,
    setState,
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

  const onHandleSearchParams = () => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    navigate(`?${params.toString()}`, { replace: true });
  };

  return (
    <>
      <ExploreHero
        variant="search"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onHandleSearchParams={onHandleSearchParams}
      />

      <section className="w-full">
        <CardFilters />

        {/* Projects Grid */}
        {searchParams.get("search") && (
          <div className="mb-6">
            <h2 className="text-xl font-medium">
              Resultados para "{searchParams.get("search")}"
            </h2>
            <p className="text-muted-foreground">
              {projects.length} projetos encontrados
            </p>
          </div>
        )}

        {paginatedProjects.length == 0 && state == 'default' ? (
          <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
            <p className="text-sm">Nenhum Projeto Publicado</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
          <Loader className="animate-spin"/>
          <p className="text-sm">Carregando projetos...</p>
        </div>
        )}

        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6">
          {paginatedProjects.map((project) => (
            <CardProject project={project} key={project.id} />
          ))}
        </div>
      </section>
    </>
  );
}
