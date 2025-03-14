import { ActionFunctionArgs } from "@remix-run/node";
import { redirect, useActionData, useNavigate, useSubmit } from "@remix-run/react";
import { ArrowLeft, BellRing, ChevronDown, Folders, MessageSquare } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { apiCreateProject } from "~/@api/routes/project.api";
import NewProjectForm from "~/components/perfil/NewProjectForm";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { ProjectFormInterface } from "~/interfaces/new-project.interface";
import { getUserSession } from "~/utils/session.server";

const projectSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  content: z.string().min(1, "Conteúdo é obrigatório"),
  images: z.array(z.instanceof(File)).min(1, "File is required"),
  githubLink: z.string().nullable().optional(),
  linkedinLink: z.string().nullable().optional(),
  figmaLink: z.string().nullable().optional(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const sessionData = await getUserSession(request)
  if(!sessionData){
    return redirect('/auth/login')
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

  const createProjectResponse = await apiCreateProject(result.data, sessionData.token);

  if ("err" in createProjectResponse) {
    return new Response(JSON.stringify({ errors: createProjectResponse.err.message }), { status: createProjectResponse.status });
  }

  return redirect('/perfil');
}

export default function Index() {
  const ActionData = useActionData<typeof action>()
  const methods = useForm<ProjectFormInterface>()
  const navigate = useNavigate()
  const submit = useSubmit()
  const { toast }= useToast()
  const onSubmit: SubmitHandler<ProjectFormInterface> = (data) => {
    const formData = new FormData()
    console.log(data)
    formData.append('title', data.title)
    formData.append('content', data.content)
    formData.append('techs', data.content)
    data.images?.forEach((image) => formData.append('images', image))
    data.githubLink && formData.append('githubLink', data.githubLink)
    data.linkedinLink && formData.append('linkedinLink', data.linkedinLink)
    data.figmaLink && formData.append('figmaLink', data.figmaLink)
    
    submit(formData, {method: 'POST', encType: 'multipart/form-data'})
  }

  useEffect(() => {
    if(ActionData){
      toast({
        description: 'Ocorreu um erro ao criar o projeto',
        variant: 'destructive'
      })
    } 
  }, [])
  
  return (
    <>
      <div className="w-screen h-screen grid grid-rows-[72px_1fr] justify-items-center gap-6">
        <header className="max-w-[1440px] w-screen border-b-2 px-8 py-3 flex flex-row items-center justify-between">
          <div className="flex flex-row gap-3 items-center h-full">
            <img src="/collabx-logo.png" className="max-h-[30px]" />
            {/* <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>
                      <a className="select-none space-y-1 flex flex-row items-center gap-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Star className="size-5" />
                        <p>Popular</p>
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>
                      <a className="select-none space-y-1 flex flex-row items-center gap-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Star className="size-5" />
                        <p>Popular</p>
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu> */}
            <ul className="flex flex-row gap-1">
              <li className="flex flex-row items-center gap-1 text-[#1D1D1D]/80 px-2">
                <p>Explorar</p>
                <ChevronDown className="text-[#1D1D1D]/80 size-4" />
              </li>

              <li className="flex flex-row gap-1 text-[#1D1D1D]/80 px-2">
                <p>Procurar serviço</p>
              </li>

              <li className="flex flex-row gap-1 text-[#1D1D1D]/80 px-2">
                <p>Procurar freelancer</p>
              </li>

              <li className="flex flex-row gap-1 text-[#1D1D1D]/80 px-2">
                <p>Blog</p>
              </li>
            </ul>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <section className="flex flex-row gap-3 px-4">
              <span className="relative">
                <div className="px-2 bg-red-500 rounded-full text-center absolute right-[-12px] top-[-8px]">
                  <p className="text-white font-semibold  text-xs">8</p>
                </div>
                <BellRing className="size-6 cursor-pointer text-muted-foreground hover:text-primary" />
              </span>

              <span className="relative">
                <div className="px-2 bg-red-500 rounded-full text-center absolute right-[-12px] top-[-8px]">
                  <p className="text-white font-semibold  text-xs">3</p>
                </div>
                <Folders className="size-6 cursor-pointer text-muted-foreground hover:text-primary" />
              </span>

              <span className="relative">
                <div className="px-2 bg-red-500 rounded-full text-center absolute right-[-12px] top-[-8px]">
                  <p className="text-white font-semibold  text-xs">67</p>
                </div>
                <MessageSquare className="size-6 cursor-pointer text-muted-foreground hover:text-primary" />
              </span>
            </section>
            <Button className="h-12 px-6" variant={"default"}>
              Portfólio
            </Button>
            <section className="flex flex-row gap-2">
              <div className="size-12 bg-pink-800 rounded-md flex items-center justify-center text-white">
                KW
              </div>
              <span>
                <p className="font-bold ">Kaynan Wallen</p>
                <p className="text-[#1E1E1E]/75 font-semibold">Freelancer</p>
              </span>
            </section>
          </div>
        </header>

        <div className="w-screen max-w-[1440px] overflow-y-auto px-5 pb-10">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('../clients')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-semibold text-card-foreground">Adicionar Projeto</h1>
            </div>
            <p className="text-muted-foreground">
              Adicione um novo projeto para o seu workspace
            </p>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} id="new-project-form">
              <NewProjectForm />
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  )
}