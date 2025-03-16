import { api } from "../config"
import { ProfileDTOType } from "../DTO/profile/profile"

export const apiGetMeInfos = async(token: string) => {
  try {
    const response = await api.get('/me', {
      headers: { Authorization: `Bearer ${token}` }
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