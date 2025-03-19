import { AxiosError } from "axios";
import { api } from "../config";
import { ProfileDTOType } from "../DTO/profile/profile";
import { FindProjectDTOType } from "../DTO/project/find-projects.dto.";

// Alterar por alguma coisa com IA? Recomendado
export const apiGetProfileByIdOrUsername = async(username: string) => {
  try {
    const response = await api.get(`/profiles/${username}?q=username`, {
      headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJleGFtcGxlQGdtYWlsLmNvbSIsInR3b0ZhY3RvciI6dHJ1ZSwiaWQiOjEsInByb2ZpbGVJZCI6MSwiaWF0IjoxNzQxOTEyMTY2LCJleHAiOjE3NDI1MTY5NjZ9.iGYAzdMD2ai3KCG2fm3oOJqWSe7L9PjhoeQ4fhON-AI'}` }
    }).then((res) => {
      return res.data as ProfileDTOType
    }).catch((err) => {
      console.log(err)
      const messageError = err.response?.data as { message: string} || {message: 'Erro ao buscar projetos'}
      return { err: {message: messageError.message, data: err.response}, status: err.response?.status || 500}
    })

    return response
  } catch (error) {
    console.error(error)
    return { err: {message: 'Erro ao criar projeto', data: error}, status: 500}
  }
}

export const apiGetProjectsByProfileById = async(id: number) => {
  try {
    const response = await api.get(`/profiles/${id}/projects`).then((res) => {
      return res.data as FindProjectDTOType[]
    }).catch((err) => {
      console.log(err)
      const messageError = err.response?.data as { message: string} || {message: 'Erro ao buscar projetos'}
      return { err: {message: messageError.message, data: err.response}, status: err.response?.status || 500}
    })

    return response
  } catch (error) {
    console.error(error)
    return { err: {message: 'Erro ao criar projeto', data: error}, status: 500}
  }
}