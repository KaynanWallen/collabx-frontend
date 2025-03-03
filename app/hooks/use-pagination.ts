import { useMemo, useState } from "react";

interface UsePaginationProps<T> {
  data: T[]; // Array de dados
  perPage: number; // Quantidade de itens por página
  search?: string; // Termo de pesquisa (opcional)
  searchFilter?: (item: T, searchTerm: string) => boolean; // Função de filtro
}

interface UsePaginationReturn<T> {
  currentPage: number; // Página atual
  paginatedData: T[]; // Dados paginados para a página atual
  hasNextPage: boolean; // Botão "Próximo" habilitado
  hasPreviousPage: boolean; // Botão "Anterior" habilitado
  goToNextPage: () => void; // Função para avançar de página
  goToPreviousPage: () => void; // Função para retroceder de página
  filteredData: T[]; // Dados filtrados com base no termo de busca
}

export const usePagination = <T,>({
  data,
  perPage,
  search = "",
  searchFilter = (item, searchTerm) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()),
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState(0);

  // Filtrar os dados com base no termo de busca
  const filteredData = useMemo(() => {
    return search
      ? data.filter((item) => searchFilter(item, search))
      : data;
  }, [data, search, searchFilter]);

  // Dados paginados após o filtro
  const paginatedData = useMemo(() => {
    return filteredData.slice(
      currentPage * perPage,
      currentPage * perPage + perPage
    );
  }, [filteredData, currentPage, perPage]);

  const hasNextPage = useMemo(() => {
    return (
      filteredData.slice(
        (currentPage + 1) * perPage,
        (currentPage + 1) * perPage + perPage
      ).length > 0
    );
  }, [filteredData, currentPage, perPage]);

  const hasPreviousPage = useMemo(() => {
    return currentPage > 0;
  }, [currentPage]);

  const goToNextPage = () => {
    if (hasNextPage) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (hasPreviousPage) setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  return {
    currentPage,
    paginatedData,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    filteredData,
  };
};
