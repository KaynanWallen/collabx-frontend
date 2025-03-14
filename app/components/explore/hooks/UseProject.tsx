import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useState, useEffect, useMemo } from "react";
import { ProjectType } from "~/@types/project";
import { useToast } from "~/hooks/use-toast";
import { useProjectService } from "~/services/projects.service";

export const useProjects = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [dateFilter, setDateFilter] = useState<string>("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const navigate = useNavigate();
  const { toast } = useToast();
  const projectService = useProjectService();

  useEffect(() => {
    const fetchProjects = async () => {
      const responseProjects = await projectService.findAllProjects();
      if ("error" in responseProjects) {
        if (responseProjects.status === 401) {
          console.error("Usuário não autorizado, redirecionando...");
          navigate("/auth/logout");
          return;
        }
        console.error("Error fetching projects:", responseProjects.error);
        toast({
          description: responseProjects.error as string,
          variant: "destructive",
        });
        return;
      }
      if(responseProjects.length > 0){
        setProjects(responseProjects);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((client) => {
      const matchesSearch = client.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      // const matchesStatus = statusFilter === "todos" ||
      //   client.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch;
    });
  }, [projects, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProjects.slice(start, end);
  }, [filteredProjects, currentPage, itemsPerPage]);

  return {
    paginatedProjects: paginatedProjects,
    totalProjects: filteredProjects.length,
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
    projects,
    setProjects,
    totalPages,
  };
};
