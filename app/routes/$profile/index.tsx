import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BellRing, ChevronDown, Folders, Github, Globe, Linkedin, Mail, MapPin, MessageSquare, User } from "lucide-react";
import { apiGetMeInfos } from "~/@api/routes/me.api";
import CardProject from "~/components/explore/CardProject";
import { HeaderSection } from "~/components/layout/headerSection";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { getUserSession } from "~/utils/session.server";


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const sessionData = await getUserSession(request)
  if (!sessionData) {
    return json({ user: null })
  }

  const userRecord = await apiGetMeInfos(sessionData.token)
  if ('err' in userRecord) {
    console.log(userRecord.err.data)
    return json({ user: null })
  }

  return json({
    user: userRecord
  })
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>()


  return (
    <>
      <div className="w-screen h-screen grid grid-rows-[72px_1fr] justify-items-center gap-6">
        <HeaderSection
          user={user}
        />

        <div className="w-full overflow-y-auto">
          <main className="w-screen max-w-[1440px] container mx-auto px-4 py-8 flex flex-col items-center gap-4">
            <section className="w-full flex flex-col">
              <div className="w-full h-28 bg-blue-500 rounded-t-lg"></div>
              <div className="px-6 py-2 relative">
                <div className="flex flex-col md:flex-row">
                  {/* Avatar */}
                  <Avatar className="w-32 h-32 absolute -top-16">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>


                  <span className="mt-24 md:mt-0 md:ml-36">
                    <h1 className="text-3xl font-bold">Kaynan Wallen</h1>
                    <p className="text-gray-600">Desenvolvedor Freelancer</p>
                  </span>

                  <span className="mt-4 md:mt-0 md:ml-auto flex flex-wrap gap-2">
                    <Button
                      variant="default"
                      className="bg-gray-900 hover:bg-gray-700 flex items-center"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Seguir
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-300 flex items-center"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-300 flex items-center"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-300 flex items-center"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Portfólio
                    </Button>
                  </span>
                </div>

                <div className="mt-4 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>São Paulo, Brasil</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-2" />
                    <span>wallenkaynan@gmail.com</span>
                  </div>
                </div>
              </div>
            </section>

            <span className="px-6 flex flex-col gap-2">
              <h2 className="text-xl font-bold">Resumo</h2>
              <p className="text-muted-foreground leading-relaxed">Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e transformar ideias em realidade através da tecnologia. Com experiência sólida em React, Node.js e TypeScript, atuo no desenvolvimento de aplicações web escaláveis, intuitivas e de alto desempenho. Sempre em busca de novos desafios e aprendizados, gosto de explorar novas tecnologias, aprimorar minhas habilidades e contribuir para projetos que impactam positivamente a experiência dos usuários.</p>
            </span>

            <span className="w-full px-6 flex flex-col gap-2">
              <h2 className="text-xl font-bold">Habilidades</h2>
              <div className="flex flex-row flex-wrap gap-3">
                <Badge variant="outline" className="px-4 py-2 text-sm bg-background">
                  Montes
                </Badge>

                <Badge variant="outline" className="px-4 py-2 text-sm bg-background">
                  Montes
                </Badge>

                <Badge variant="outline" className="px-4 py-2 text-sm bg-background">
                  Montes
                </Badge>

                <Badge variant="outline" className="px-4 py-2 text-sm bg-background">
                  Montes
                </Badge>
              </div>
            </span>

            <section className="w-full px-6 flex flex-col gap-2">
              <h2 className="text-xl font-bold">Projetos</h2>
              <div className="flex flex-row gap-4 justify-center">
                {/* <CardProject />
                <CardProject />
                <CardProject />
                <CardProject /> */}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}