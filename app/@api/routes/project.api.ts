import { AxiosError } from "axios";
import { api } from "../config";
import { NewProjectDTOType } from "../DTO/project/new-project.dto";
import { ProjectDTOType } from "../DTO/project/project.dto";
import { FindProjectDTOType } from "../DTO/project/find-projects.dto.";
import { apiGetMeInfos } from "./me.api";
import { ToogleProjectReactionDTOType } from "../DTO/project/toogle-project.dto";

export const apiCreateProject = async(project: NewProjectDTOType, token: string) => {
  try {
    const response = await api.post('/projects', {
      ...project
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      return res.data as ProjectDTOType
    }).catch((err: AxiosError) => {
      console.log(err)
      const messageError = err.response?.data as { message: string} || {message: 'Erro ao criar projeto'}
      return { err: {message: messageError.message, data: err.response}, status: err.response?.status || 500}
    })

    if('err' in response){
      return response
    }
    
    const formDataImage = new FormData()
    formDataImage.append('file', project.images[0])
    const addImageInProjectResponse = api.post(`/projects/${response.id}/add-image`, formDataImage, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      return res.data.url
    }).catch((err) => {
      const messageError = err.response?.data as { message: string} || {message: 'Erro ao vincular imagem'}
      return { err: {message: messageError.message, data: err.response}, status: err.response?.status || 500}
    })

    return response
  } catch (error) {
    console.error(error)
    return { err: {message: 'Erro ao criar projeto', data: error}, status: 500}
  }
}

// Alterar por alguma coisa com IA? Recomendado
export const apiGetAllProject = async() => {
  try {
    const response = await api.get('/projects', {
      headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJleGFtcGxlQGdtYWlsLmNvbSIsInR3b0ZhY3RvciI6dHJ1ZSwiaWQiOjEsInByb2ZpbGVJZCI6MSwiaWF0IjoxNzQxOTEyMTY2LCJleHAiOjE3NDI1MTY5NjZ9.iGYAzdMD2ai3KCG2fm3oOJqWSe7L9PjhoeQ4fhON-AI'}` }
    }).then((res) => {
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

export const apiToggleProjectReaction = async(projectReaction: ToogleProjectReactionDTOType, token: string) => {
  try {
    const response = await api.post('/projects-reactions/toggle', {
      ...projectReaction
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      return {message: 'Reaction Success'}
    }).catch((err: AxiosError) => {
      console.log(err)
      const messageError = err.response?.data as { message: string} || {message: 'Erro ao adicionar reação ao comentário'}
      return { err: {message: messageError.message, data: err.response}, status: err.response?.status || 500}
    })

    if('err' in response){
      return response
    }

    return response
  } catch (error) {
    console.error(error)
    return { err: {message: 'Erro no toogle de reação de projeto', data: error}, status: 500}
  }
}
