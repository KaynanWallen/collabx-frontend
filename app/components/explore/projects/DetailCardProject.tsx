import * as React from "react";
import { format } from "date-fns";
import {
  ChevronUp,
  CornerDownRight,
  Github,
  MessageSquare,
  Minus,
  Plus,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { currentUser, initialComments, users } from "~/data/mockData";
import { CommentType } from "~/@types/comment";
import { useToast } from "~/hooks/use-toast";
import { ProjectType } from "~/@types/project";
import InputComment from "../InputComment";
import CommentsSection from "../Comments";

interface DetailCardProjectProps {
  detailCardOpen: boolean;
  setDetailCardOpen: (v: boolean) => void;
  project: ProjectType
}

export default function DetailCardProject({
  detailCardOpen,
  setDetailCardOpen,
  project
}: DetailCardProjectProps) {
  const [comments, setComments] = React.useState<CommentType[]>(project.comments);
  const { toast } = useToast();

  
  const addComment = (content: string) => {
    // const newComment: CommentType = {
    //   id: `comment${Date.now()}`,
    //   user: currentUser,
    //   content,
    //   createdAt: new Date(),
    //   replies: []
    // };
    
    // setComments([newComment, ...comments]);
    toast({
      title: "Comment posted",
      description: "Your comment has been posted successfully",
      duration: 3000,
    });
  };

  return (
    <>
      <Drawer open={detailCardOpen} onOpenChange={setDetailCardOpen}>
        <DrawerContent className="max-h-[95vh] w-[95vw] h-[95vh] mx-auto gap-4">
          <ScrollArea className="max-h-[95vh] w-[95vw] h-[95vh] mx-auto px-16 pt-10 flex flex-col">
            <section className="W-full min-w-full h-full max-h-[728px] min-h-[728px] bg-[#DDDDDD] rounded-md"></section>

            <section className="px-6 flex flex-col gap-5 mb-5 mt-5">
              <header className="flex flex-col gap-3 border-b pb-2">
                <div className="flex flex-row justify-between items-center">
                  <span className="flex flex-row gap-3 items-center">
                    <p className="text-4xl font-bold">{project.title}</p>
                    <Star className="text-[#F8C100] size-8" />
                  </span>

                  <ul className="flex flex-row gap-2">
                    <li className="flex flex-row items-center gap-2 font-semibold text-3xl">
                      <ThumbsUp className="size-8 text-[#22C55E]" />
                      {project.likeCount}
                    </li>

                    <li className="flex flex-row items-center gap-2 font-semibold text-3xl">
                      <ThumbsDown className="size-8 text-[#EF4444]" />
                      {project.dislikeCount}
                    </li>

                    <li className="flex flex-row items-center gap-2 font-semibold text-3xl">
                      <MessageSquare className="size-8 text-[#3B82F6]" />
                      {project.comments.length}
                    </li>
                  </ul>
                </div>

                <div className="flex flex-row justify-between items-center">
                  <section className="flex flex-row gap-2">
                    <div className="size-12 bg-pink-800 rounded-md flex items-center justify-center text-white">
                      {project.author.name.charAt(0)}
                    </div>
                    <span>
                      <p className="font-bold ">{project.author.name}</p>
                      <p className="text-[#1E1E1E]/75 font-semibold">
                        {format(project.createdAt, "dd/MM/yyyy HH:mm")}
                      </p>
                    </span>
                  </section>

                  <span className="flex flex-row gap-4">
                    <Github className="text-muted-foreground size-7"/>
                    <Github className="text-muted-foreground size-7"/>
                    <Github className="text-muted-foreground size-7"/>
                    <Github className="text-muted-foreground size-7"/>
                  </span>
                </div>
              </header>

              <article className="flex flex-col gap-5">
                <span className="flex flex-col gap-3">
                  <p className="text-4xl font-bold">Sobre o Projeto</p>
                  <p className="text-xl">
                    {/* Um aplicativo para organizar sua rotina de autocuidado. Crie lembretes para skincare, hidratação e até mesmo aquela máscara facial que você sempre esquece de usar! O projeto foi desenvolvido utilizando React Native e Node.js, com foco em proporcionar uma experiência intuitiva e agradável aos usuários. A interface foi cuidadosamente projetada para ser minimalista e funcional, permitindo que os usuários se concentrem no que realmente importa: seu bem-estar. */}
                    {project.content}
                  </p>
                </span>

                <span className="flex flex-col gap-3">
                  <p className="text-4xl font-bold">Tecnologias utilizadas</p>
                  <div className="flex flex-row flex-wrap gap-2">
                    <Badge variant={"secondary"} className="px-3 py-2 text-xl text-muted-foreground">
                      Montes
                    </Badge>

                    <Badge variant={"secondary"} className="px-3 py-2 text-xl text-muted-foreground">
                    Vulputate
                    </Badge>

                    <Badge variant={"secondary"} className="px-3 py-2 text-xl text-muted-foreground">
                      Montes
                    </Badge>

                    <Badge variant={"secondary"} className="px-3 py-2 text-xl text-muted-foreground">
                    Lobortis
                    </Badge>

                    <Badge variant={"secondary"} className="px-3 py-2 text-xl text-muted-foreground">
                    Placerat
                    </Badge>
                  </div>
                </span>

                <span className="flex flex-col gap-3">
                  <p className="text-4xl font-bold">Imagens do Projeto</p>
                  <div className="flex flex-row justify-center flex-wrap gap-5">
                    <section className="w-[500px] h-[280px] bg-[#DDDDDD] rounded-md"></section>
                    <section className="w-[500px] h-[280px] bg-[#DDDDDD] rounded-md"></section>
                    <section className="w-[500px] h-[280px] bg-[#DDDDDD] rounded-md"></section>
                  </div>
                </span>

                <Separator />
              </article>

              {/* Seçao de comentários pode ser movida para um componente a parte */}
              <footer className="flex flex-col gap-5">
                <span className="flex flex-row gap-3 items-center">
                  <MessageSquare className="size-8"/>
                  <p className="text-4xl font-bold"> Comentários </p>
                </span>
                
                {/* Novo comentário */}
                <InputComment  users={users} onSubmit={addComment}/>
                
                {/* Comentários */}
                <CommentsSection comments={comments}/>
              </footer>
            </section>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  );
}
