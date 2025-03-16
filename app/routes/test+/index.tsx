import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Search,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  ChevronRight,
  Filter,
  BellRing,
  Folders,
  MessageSquare,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { HeaderSection } from "~/components/layout/headerSection";
import { CardProject } from "~/components/explore/projects/CardProject";
import { CardFilters } from "~/components/explore/projects/CardFilters";
import { ExploreHero } from "~/components/explore/ExploreHero";

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Descobrir");

  // Dados de exemplo para projetos
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

  return (
    <div className="w-screen h-screen grid grid-rows-[72px_1fr] justify-items-center gap-6">
      {/* Header */}
      <HeaderSection />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        {/* Hero Section */}
        <ExploreHero />

        {/* Projects Section */}
        <section>
          {/* Tabs and Filters */}
          <CardFilters />

          {/* Projects Grid */}
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6">
            {projects.map((project) => (
              <CardProject project={project}/>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
