import { json, redirect } from "@remix-run/node";
import { ActionFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { apiToggleCommentReaction } from "~/@api/routes/comment.api";
import { apiGetMeInfos } from "~/@api/routes/me.api";
import { getUserSession } from "~/utils/session.server";

const commentReactionSchema = z.object({
  reactionType: z.string(),
  commentId: z.number(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const sessionData = await getUserSession(request)
    if (!sessionData) {
      console.error('Not Permited to access this route')
      return redirect('/auth/login')
    }

    const newCommentReaction = await request.json()
    const newCommentReactionValidation = commentReactionSchema.safeParse(newCommentReaction);
    if (!newCommentReactionValidation.success) {
      console.error("Erro de validação", newCommentReactionValidation.error.format());
      return new Response(JSON.stringify({ err: newCommentReactionValidation.error.format() }), { status: 400 });
    }

    const getUserInfo = await apiGetMeInfos(sessionData.token)
    if ('err' in getUserInfo) {
      console.error("Erro de validação", getUserInfo.err.data);
      return new Response(JSON.stringify({ err: getUserInfo.err.message }), { status: getUserInfo.status });
    }

    const commentReactioResponse = await apiToggleCommentReaction({
      ...newCommentReactionValidation.data,
      authorId: getUserInfo.id
    }, sessionData.token)

    if('err' in commentReactioResponse){
      console.error("Erro de validação", commentReactioResponse.err.data);
      return new Response(JSON.stringify({ err: commentReactioResponse.err.message }), { status: commentReactioResponse.status });
    }

    return json({status: 200})
  } catch (error) {
    return new Response(JSON.stringify({ err: error }), { status: 500 });
  }
}