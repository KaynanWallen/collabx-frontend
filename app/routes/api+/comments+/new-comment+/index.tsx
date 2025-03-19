import { ActionFunctionArgs } from "@remix-run/node"
import { redirect } from "@remix-run/node";
import { json, LoaderFunctionArgs } from "@remix-run/node"
import { z } from "zod";
import { apiCreateComment } from "~/@api/routes/comment.api";
import { apiGetMeInfos } from "~/@api/routes/me.api";
import { getUserSession } from "~/utils/session.server";

const commentSchema = z.object({
  content: z.string().min(1, "Conteúdo é obrigatório"),
  projectId: z.number(),
  parentId: z.number().optional().nullable()
});


export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    // const newComment = await request.json()
    console.log('Passou loader')
    // console.log(newComment)
    return null
  } catch (error) {
    return json({err: error}, {status: 500})
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const sessionData = await getUserSession(request)
    if (!sessionData) {
      return redirect('/auth/login')
    }

    const newComment = await request.json()
    const newCommentValidation = commentSchema.safeParse(newComment);
    if (!newCommentValidation.success) {
      console.error("Erro de validação", newCommentValidation.error.format());
      return new Response(JSON.stringify({ err: newCommentValidation.error.format() }), { status: 400 });
    }

    const getUserInfo = await apiGetMeInfos(sessionData.token)
    if ('err' in getUserInfo) {
      console.error("Erro de validação", getUserInfo.err.data);
      return new Response(JSON.stringify({ err: getUserInfo.err.message }), { status: getUserInfo.status });
    }

    const commentResponse = await apiCreateComment({
      ...newCommentValidation.data,
      authorId: getUserInfo.id
    }, sessionData.token)

    if('err' in commentResponse){
      console.error("Erro de validação", commentResponse.err.data);
      return new Response(JSON.stringify({ err: commentResponse.err.message }), { status: commentResponse.status });
    }

    return json({
      ...commentResponse,
      author: getUserInfo
    }, {status: 200})
  } catch (error) {
    return new Response(JSON.stringify({ err: error }), { status: 500 });
  }
}