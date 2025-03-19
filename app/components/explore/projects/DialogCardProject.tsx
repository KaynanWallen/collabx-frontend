import { useState } from "react";
import { Eye, Heart, MessageCircle, ThumbsUp, ThumbsDown, Users, UserPlus, Reply, ChevronUp, ChevronDown, Loader } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card } from "~/components/ui/card";
import { ProjectViewInterface } from "~/@interfaces/project.interface";
import { Textarea } from "~/components/ui/textarea";
import { CardComment } from "../comments/CardComment";
import { CommentInterface } from "~/@interfaces/comment.interface";
import { ProfileType } from "~/@types/profile";
import { useCommentService } from "~/services/comments.service";
import { toast } from "~/hooks/use-toast";

// Mock data para likes e comentários
const mockLikes = [
  { id: 1, name: "Kaynan Wallen", initial: "KW", avatar: null, role: "Freelancer" },
  { id: 2, name: "Maria Silva", initial: "MS", avatar: null, role: "Designer" },
  { id: 3, name: "João Costa", initial: "JC", avatar: null, role: "Desenvolvedor" },
  { id: 4, name: "Ana Luiza", initial: "AL", avatar: null, role: "Product Owner" },
  { id: 5, name: "Pedro Santos", initial: "PS", avatar: null, role: "UI Designer" },
];

interface SubComment {
  id: number;
  user: { name: string; initial: string; avatar: string | null; role: string };
  content: string;
  date: string;
  likes: number;
  userLiked: boolean;
}

// Modelo atualizado para comentários com sub-comentários
interface Comment {
  id: number;
  user: { name: string; initial: string; avatar: string | null; role: string };
  content: string;
  date: string;
  likes: number;
  userLiked: boolean;
  subComments: SubComment[];
  showAllReplies: boolean;
}

const mockComments: CommentInterface[] = [
  { 
    id: 1, 
    authorId: 1,
    projectId: 1,
    author: { 
      id: 1,
      accountId: 101,
      username: "kaynanwallen",
      name: "Kaynan Wallen",
      title: "Freelancer",
      githubLink: "https://github.com/kaynanwallen",
      linkedinLink: "https://linkedin.com/in/kaynanwallen",
      twitterLink: "https://twitter.com/kaynanwallen",
      about: "Desenvolvedor full-stack apaixonado por tecnologia.",
      techs: "React, TypeScript, Node.js",
      followersCount: 120,
      followingCount: 80,
      createdAt: "2023-05-10",
      lastModified: "2024-02-12"
    },
    content: "Projeto muito interessante! Adorei a ideia.",
    likeCount: 12,
    dislikeCount: 0,
    commentCount: 2,
    createdAt: new Date("2024-02-12T13:22:00Z"),
    subComments: [
      {
        id: 101,
        content: "Concordo! Ficou excelente!",
        likeCount: 5,
        dislikeCount: 0,
        commentCount: 0,
        createdAt: new Date("2024-02-12T13:30:00Z"),
        parentId: "1",
        authorId: 2,
        projectId: 1,
        author: {
            id: 2,
            accountId: 102,
            username: "mariasilva",
            name: "Maria Silva",
            title: "Designer",
            githubLink: "https://github.com/mariasilva",
            linkedinLink: "https://linkedin.com/in/mariasilva",
            twitterLink: "https://twitter.com/mariasilva",
            about: "Designer apaixonada por UI/UX.",
            techs: "Figma, Photoshop, Illustrator",
            followersCount: 200,
            followingCount: 150,
            createdAt: "2022-09-15",
            lastModified: "2024-02-11"
        }
      },
      {
        id: 102,
        content: "Muito inspirador esse projeto!",
        likeCount: 3,
        dislikeCount: 0,
        commentCount: 0,
        createdAt: new Date("2024-02-12T13:35:00Z"),
        parentId: "1",
        authorId: 2,
        projectId: 1,
        author: {
          id: 2,
          accountId: 102,
          username: "mariasilva",
          name: "Maria Silva",
          title: "Designer",
          githubLink: "https://github.com/mariasilva",
          linkedinLink: "https://linkedin.com/in/mariasilva",
          twitterLink: "https://twitter.com/mariasilva",
          about: "Designer apaixonada por UI/UX.",
          techs: "Figma, Photoshop, Illustrator",
          followersCount: 200,
          followingCount: 150,
          createdAt: "2022-09-15",
          lastModified: "2024-02-11"
      }
      }
    ]
  },
  { 
    id: 2, 
    authorId: 2,
    projectId: 1,
    author: { 
      id: 2,
      accountId: 102,
      username: "mariasilva",
      name: "Maria Silva",
      title: "Designer",
      githubLink: "https://github.com/mariasilva",
      linkedinLink: "https://linkedin.com/in/mariasilva",
      twitterLink: "https://twitter.com/mariasilva",
      about: "Designer apaixonada por UI/UX.",
      techs: "Figma, Photoshop, Illustrator",
      followersCount: 200,
      followingCount: 150,
      createdAt: "2022-09-15",
      lastModified: "2024-02-11"
    },
    content: "Gostei muito da paleta de cores utilizada. Ficou excelente!", 
    likeCount: 8,
    dislikeCount: 0,
    commentCount: 0,
    createdAt: new Date("2024-02-11T14:30:00Z"),
    subComments: []
  },
  { 
    id: 3, 
    authorId: 3,
    projectId: 1,
    author: { 
      id: 3,
      accountId: 103,
      username: "joaopaulo",
      name: "João Paulo Silva",
      title: "Desenvolvedor",
      githubLink: "https://github.com/joaopaulo",
      linkedinLink: "https://linkedin.com/in/joaopaulo",
      twitterLink: "https://twitter.com/joaopaulo",
      about: "Engenheiro de software especializado em back-end.",
      techs: "Java, Spring Boot, PostgreSQL",
      followersCount: 180,
      followingCount: 90,
      createdAt: "2021-06-20",
      lastModified: "2024-02-12"
    },
    content: "A arquitetura do código está muito boa. Qual stack você utilizou?", 
    likeCount: 3,
    dislikeCount: 0,
    commentCount: 1,
    createdAt: new Date("2024-02-12T13:22:00Z"),
    subComments: [
      {
        id: 301,
        content: "Também fiquei curioso para saber a stack!",
        likeCount: 2,
        dislikeCount: 0,
        commentCount: 0,
        createdAt: new Date("2024-02-12T13:40:00Z"),
        parentId: "3",
        authorId: 1,
        projectId: 1,
        author: { 
          id: 1,
          accountId: 101,
          username: "kaynanwallen",
          name: "Kaynan Wallen",
          title: "Freelancer",
          githubLink: "https://github.com/kaynanwallen",
          linkedinLink: "https://linkedin.com/in/kaynanwallen",
          twitterLink: "https://twitter.com/kaynanwallen",
          about: "Desenvolvedor full-stack apaixonado por tecnologia.",
          techs: "React, TypeScript, Node.js",
          followersCount: 120,
          followingCount: 80,
          createdAt: "2023-05-10",
          lastModified: "2024-02-12"
        },
      }
    ]
  }
];

interface ProjectDialogProps {
  project: ProjectViewInterface;
  detailCardOpen: boolean;
  setDetailCardOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProjectDialog = ({ project, detailCardOpen, setDetailCardOpen}: ProjectDialogProps) => {
  const [activeTab, setActiveTab] = useState("post");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<CommentInterface[]>(mockComments);
  const [replyingToId, setReplyingToId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const commentService = useCommentService()
  const [isSending, setIsSending] = useState(false)

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true)
    const response = await commentService.createComment({
      content: newComment,
      projectId: project.id
    })

    if('error' in response){
      toast({
        title: "Erro ao adicionar comentário",
        variant: 'destructive'
      })
      setIsSending(false)
      return
    }
    
    setComments([...(comments || []), {
      ...response,
    }])

    setIsSending(false)
    setNewComment("");
  };

  const toggleLike = (commentId: number, isSubComment = false, parentId?: number) => {
   
  };

  const toggleShowReplies = (commentId: number) => {
    // const updatedComments = comments.map(comment => {
    //   if (comment.id === commentId) {
    //     return { ...comment, showAllReplies: !comment.showAllReplies };
    //   }
    //   return comment;
    // });
    // setComments(updatedComments);
  };

  const handleAddReply = (commentId: number) => {
    // if (!replyContent.trim()) return;
    
    // const newReply: SubComment = {
    //   id: Date.now(),
    //   user: { name: "Usuário Atual", initial: "UA", avatar: null, role: "Você" },
    //   content: replyContent,
    //   date: new Date().toLocaleString('pt-BR'),
    //   likes: 0,
    //   userLiked: false
    // };
    
    // const updatedComments = comments.map(comment => {
    //   if (comment.id === commentId) {
    //     return {
    //       ...comment,
    //       subComments: [...comment.subComments, newReply],
    //       showAllReplies: true
    //     };
    //   }
    //   return comment;
    // });
    
    // setComments(updatedComments);
    // setReplyContent("");
    // setReplyingToId(null);
  };

  return (
    <Dialog open={detailCardOpen} onOpenChange={setDetailCardOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
            <Eye className="h-4 w-4" /> Ver completo
          </Button>
      </DialogTrigger> */}
      <DialogContent className={`max-w-4xl p-6 max-h-[90vh] min-h-[90vh] overflow-y-auto`}>
        <section className="flex flex-col gap-5">
          <DialogHeader>
            <DialogTitle className="text-xl">{project.title}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Visualize detalhes completos do projeto
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="post" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="post">Post</TabsTrigger>
              <TabsTrigger value="likes" className="flex items-center gap-1">
                <Heart className="h-4 w-4" /> Curtidas ({project.likeCount})
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" /> Comentários ({project.commentCount})
              </TabsTrigger>
            </TabsList>

            {/* Conteúdo da aba Post */}
            <TabsContent value="post" className="space-y-4">
              <div className="flex flex-row justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center bg-purple-700 text-white rounded-md">
                    {project.author.name.charAt(0)}
                  </div>
                  <span>
                    <p className="font-medium">{project.author.name}</p>
                    <p className="text-sm text-muted-foreground">{project.author.title}</p>
                  </span>
                </div>

                <Button variant="outline" className="rounded-lg">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Seguir
                </Button>
              </div>

              <div className="h-60 sm:h-80 bg-muted overflow-hidden rounded-lg">
                {/* <img 
                  src={project. || "/placeholder.svg"} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                /> */}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground">
                  {project.content}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="h-5 w-5 cursor-pointer" />
                    <span>{project.likeCount}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => setActiveTab("likes")}
                  >
                    <Users className="h-4 w-4" />
                    Ver curtidas
                  </Button>
                </div>
                
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => setActiveTab("comments")}
                >
                  Comentar
                </Button>
              </div>
            </TabsContent>

            {/* Conteúdo da aba Curtidas */}
            <TabsContent value="likes">
              <div className="space-y-4">
                <h3 className="font-medium">Pessoas que curtiram</h3>
                <div className="space-y-3">
                  {mockLikes.map((user) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-purple-700 text-white rounded-md">
                        {user.initial}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Conteúdo da aba Comentários */}
            <TabsContent value="comments">
            <div className="space-y-6">
              {/* Formulário para adicionar comentário */}
              <form onSubmit={handleAddComment} className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-purple-700 text-white rounded-md">
                    UA
                  </div>
                  <Textarea 
                    className="w-full min-h-20"
                    placeholder="Adicione um comentário..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={!newComment.trim() || isSending}>
                    {isSending && <Loader className="animate-spin"/>}
                    {!isSending ? "Comentar" : 'Enviando...'}
                  </Button>
                </div>
              </form>

              <Separator />

              {/* Lista de comentários */}
              <div className="space-y-4">
                <h3 className="font-medium">Comentários ({comments.length})</h3>
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <CardComment comment={comment} setComments={setComments}/>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          </Tabs>
        </section>
      </DialogContent>
    </Dialog>
  );
};