import { json, redirect } from "@remix-run/node";
import { ActionFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { apiGetMeInfos } from "~/@api/routes/me.api";
import { apiToggleProjectReaction } from "~/@api/routes/project.api";
import { getUserSession } from "~/utils/session.server";

const projectReactionSchema = z.object({
  reactionType: z.string(),
  projectId: z.number(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const sessionData = await getUserSession(request)
    if (!sessionData) {
      console.error('Not Permited to access this route')
      return redirect('/auth/login')
    }

    const newProjectReaction = await request.json()
    const newProjectReactionValidation = projectReactionSchema.safeParse(newProjectReaction);
    if (!newProjectReactionValidation.success) {
      console.error("Erro de validação", newProjectReactionValidation.error.format());
      return new Response(JSON.stringify({ err: newProjectReactionValidation.error.format() }), { status: 400 });
    }

    const getUserInfo = await apiGetMeInfos(sessionData.token)
    if ('err' in getUserInfo) {
      console.error("Erro de validação", getUserInfo.err.data);
      return new Response(JSON.stringify({ err: getUserInfo.err.message }), { status: getUserInfo.status });
    }

    const projectReactioResponse = await apiToggleProjectReaction({
      ...newProjectReactionValidation.data,
      authorId: getUserInfo.id
    }, sessionData.token)

    if('err' in projectReactioResponse){
      console.error("Erro de validação", projectReactioResponse.err.data);
      return new Response(JSON.stringify({ err: projectReactioResponse.err.message }), { status: projectReactioResponse.status });
    }

    return json({status: 200})
  } catch (error) {
    return new Response(JSON.stringify({ err: error }), { status: 500 });
  }
}