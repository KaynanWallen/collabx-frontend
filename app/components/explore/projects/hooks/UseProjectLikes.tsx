import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useState, useEffect, useMemo } from "react";
import { ProjectViewInterface } from "~/@interfaces/project.interface";
import { ReactionType } from "~/@types/project-reaction";
import { useToast } from "~/hooks/use-toast";

export const useProjectLikes = () => {
  const [projectLikes, setProjectLikes] = useState<ReactionType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [dateFilter, setDateFilter] = useState<string>("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [state, setState] = useState<'default' | 'loading'>('default')
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredProjectLikes = useMemo(() => {
    return projectLikes.filter((projectLike) => {
      const matchesSearch = projectLike.author.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      // const matchesStatus = statusFilter === "todos" ||
      //   client.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch;
    });
  }, [projectLikes, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredProjectLikes.length / itemsPerPage);

  const paginatedProjectLikes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProjectLikes.slice(start, end);
  }, [filteredProjectLikes, currentPage, itemsPerPage]);

  return {
    paginatedProjectLikes: paginatedProjectLikes,
    totalProjectLikes: filteredProjectLikes.length,
    state,
    setState,
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
    projectLikes,
    setProjectLikes,
    totalPages,
  };
};
