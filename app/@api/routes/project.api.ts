import { AxiosError } from "axios";
import { api } from "../config";
import { NewProjectDTOType } from "../DTO/project/new-project.dto";
import { ProjectDTOType } from "../DTO/project/project.dto";

export const apiCreateProject = async(project: NewProjectDTOType, token: string) => {
  try {
    const response = await api.post('/projects', {
      ...project,
      authorId: 1
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
    

    return response
  } catch (error) {
    console.error(error)
    return { err: {message: 'Erro ao criar projeto', data: error}, status: 500}
  }
}