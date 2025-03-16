import { ProjectViewInterface } from "~/@interfaces/project.interface";

export const useProjectService = () => {
  const findAllProjects = async() => {
    try {
      const baseUrl = typeof window === 'undefined' 
      ? process.env.VITE_BASE_URL || 'http://127.0.0.1:2222' 
      : window.location.origin;
  
      const response = await fetch(`${baseUrl}/api/projects`, {
        method: 'GET',
      })

      // Verifica se o status HTTP indica erro (ex: 401, 500)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          err: "Erro desconhecido ao processar a resposta",
        }));
        return { error: errorData.err as string, status: response.status };
      }

      return (await response.json()).projects as ProjectViewInterface[]
    } catch (error) {
      return {error , status: 500}
    }
  }

  return {
    findAllProjects,
  };
}