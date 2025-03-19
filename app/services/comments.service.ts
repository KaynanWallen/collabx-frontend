import { CommentInterface, NewCommentInterface } from "~/@interfaces/comment.interface";
import { ProjectViewInterface } from "~/@interfaces/project.interface";

export const useCommentService = () => {
  const createComment = async(newComment: NewCommentInterface) => {
    try {
      const baseUrl = typeof window === 'undefined' 
      ? process.env.VITE_BASE_URL || 'http://127.0.0.1:2222' 
      : window.location.origin;
  
      const response = await fetch(`${baseUrl}/api/comments/new-comment`, {
        body: JSON.stringify(newComment),
        method: 'POST',
      })
      // Verifica se o status HTTP indica erro (ex: 401, 500)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          err: "Erro desconhecido ao processar a resposta",
        }));
        return { error: errorData.err as string, status: response.status };
      }

      return (await response.json()) as CommentInterface
    } catch (error) {
      return {error , status: 500}
    }
  }

  return {
    createComment,
  };
}