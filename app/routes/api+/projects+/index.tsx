import { json, LoaderFunctionArgs } from "@remix-run/node";
import { apiGetAllProject } from "~/@api/routes/project.api";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    // const jsonData: {params?: string} = await request.json()
    const projectsResponse = await apiGetAllProject()
    if('err' in projectsResponse){
      return json({...projectsResponse})
    }

    return json({projects: projectsResponse}, {status: 200})
  } catch (error) {
    return json({err: error}, {status: 500})
    
  }
}