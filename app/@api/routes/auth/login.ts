import { LoginDTOType } from "~/@api/DTO/auth/login.dto"
import { api } from "../../config"
import { AxiosError } from "axios"

export default async function SignIn(data: LoginDTOType){
  try {
    const response = await api.post('auth/login', {
      ...data
    }).then((res) => {
      return res.data as {access_token: string}
    }).catch((err: AxiosError) => {
      const messageError = err.response?.data as { message: string}
      return { err: {message: messageError.message, data: err.response}, status: err.response?.status || 500}
    })

    if('err' in response){
      return response
    }
    

    return response
  } catch (error) {
    console.error(error)
    return { err: {message: 'Erro ao remover cliente', data: error}, status: 500}
  }
}