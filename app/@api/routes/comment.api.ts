import { AxiosError } from "axios";
import { api } from "../config";
import { NewProjectDTOType } from "../DTO/project/new-project.dto";
import { ProjectDTOType } from "../DTO/project/project.dto";
import { FindProjectDTOType } from "../DTO/project/find-projects.dto.";
import { apiGetMeInfos } from "./me.api";
import { NewCommentDTOType } from "../DTO/comment/new-comment.dto";
import { CommentDTOType } from "../DTO/comment/comment.dto";

export const apiCreateComment = async(comment: NewCommentDTOType, token: string) => {
  try {
    const response = await api.post('/comments', {
      ...comment
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      return res.data as CommentDTOType
    }).catch((err: AxiosError) => {
      console.log(err)
      const messageError = err.response?.data as { message: string} || {message: 'Erro ao adicione comentário'}
      return { err: {message: messageError.message, data: err.response}, status: err.response?.status || 500}
    })

    if('err' in response){
      return response
    }

    return response
  } catch (error) {
    console.error(error)
    return { err: {message: 'Erro ao adicionar comentário', data: error}, status: 500}
  }
}
