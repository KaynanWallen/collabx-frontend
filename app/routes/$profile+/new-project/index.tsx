import { ActionFunctionArgs } from "@remix-run/node";
import { Link, redirect, useActionData, useNavigate, useSubmit } from "@remix-run/react";
import { ArrowLeft, BellRing, ChevronDown, Folders, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { apiGetMeInfos } from "~/@api/routes/me.api";
import { apiCreateProject } from "~/@api/routes/project.api";
import NewProjectForm from "~/components/explore/projects/NewProjectForm";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { ProjectFormInterface } from "~/interfaces/new-project.interface";
import { getUserSession } from "~/utils/session.server";

const projectSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  content: z.string().min(1, "Conteúdo é obrigatório"),
  images: z.array(z.instanceof(File)).min(1, "File is required"),
  techs: z.string().nullable(),
  githubLink: z.string().nullable().optional(),
  linkedinLink: z.string().nullable().optional(),
  figmaLink: z.string().nullable().optional(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const sessionData = await getUserSession(request)
  if (!sessionData) {
    return redirect('/auth/login')
  }

  const userInfo = await apiGetMeInfos(sessionData.token)
  if('err' in userInfo){
    return redirect('/auth/logout')
  }
  const formData = await request.formData();

  // Converte para um objeto base
  const rawData = {
    ...Object.fromEntries(formData),
    images: formData.getAll("images").filter(file => file instanceof File) as File[],
  };


  // Faz a validação com Zod
  const result = projectSchema.safeParse(rawData);
  if (!result.success) {
    console.error("Erro de validação", result.error.format());
    return new Response(JSON.stringify({ errors: result.error.format() }), { status: 400 });
  }
    
  const createProjectResponse = await apiCreateProject({
    ...result.data, 
    authorId: userInfo.id
  }, sessionData.token);

  if ("err" in createProjectResponse) {
    return new Response(JSON.stringify({ errors: createProjectResponse.err.message }), { status: createProjectResponse.status });
  }

  return redirect('../');
}

export default function Index() {
  const ActionData = useActionData<typeof action>()
  const methods = useForm<ProjectFormInterface>()
  const navigate = useNavigate()
  const submit = useSubmit()
  const { toast } = useToast()
  const [state, setState] = useState<'default' | 'loading'>('default')

  const onSubmit: SubmitHandler<ProjectFormInterface> = (data) => {
    setState('loading')
    const formData = new FormData()
    console.log(data)
    formData.append('title', data.title)
    formData.append('content', data.content)
    formData.append('techs', data.techs || "")
    data.images?.forEach((image) => formData.append('images', image))
    data.githubLink && formData.append('githubLink', data.githubLink)
    data.linkedinLink && formData.append('linkedinLink', data.linkedinLink)
    data.figmaLink && formData.append('figmaLink', data.figmaLink)

    submit(formData, { method: 'POST', encType: 'multipart/form-data' })
  }

  useEffect(() => {
    if (ActionData) {
      setState('default')
      toast({
        description: 'Ocorreu um erro ao criar o projeto',
        variant: 'destructive'
      })
    }
  }, [])

  return (
    <>
      <div className="w-screen max-w-[1440px] px-4 pb-10">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to='../'>
              <Button
                variant="ghost"
                size="icon"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold text-card-foreground">Adicionar Projeto</h1>
          </div>
          <p className="text-muted-foreground">
            Adicione um novo projeto para o seu workspace
          </p>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} id="new-project-form">
            <NewProjectForm state={state}/>
          </form>
        </FormProvider>
      </div>
    </>
  )
}