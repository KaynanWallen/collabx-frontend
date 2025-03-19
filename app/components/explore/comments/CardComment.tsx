import { format } from "date-fns";
import { ChevronDown, ChevronUp, Reply, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { CommentInterface } from "~/@interfaces/comment.interface";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";

export const CardComment = ({ comment, setComments }: { comment: CommentInterface, setComments: React.Dispatch<React.SetStateAction<CommentInterface[]>> }) => {
  const [replyingToId, setReplyingToId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [showReplies, setShowReplies] = useState(false);

  const toggleLike = (commentId: number, isSubComment = false, parentId?: number) => {

  };

  const handleAddReply = (commentId: number) => {
    
  };

  return (
    <>
      <div key={comment.id} className="space-y-4">
        <Card className="p-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-purple-700 text-white rounded-md shrink-0">
              {comment.author.name?.charAt(0)}
            </div>
            <div className="space-y-2 w-full">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{comment.author.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{comment.author.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">{format(comment.createdAt, "dd/MM/yyyy HH:mm")}</span>
              </div>
              <p className="text-sm">{comment.content}</p>

              {/* Ações do comentário */}
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 flex items-center gap-1"
                  onClick={() => toggleLike(comment.id)}
                >
                  <ThumbsUp
                    // className={`h-4 w-4 ${comment ? 'fill-green-500 text-green-500' : 'text-muted-foreground'}`}
                    className={`h-4 w-4  text-green-500}`}
                  />
                  <span className="text-xs">{comment.likeCount}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 flex items-center gap-1"
                  onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                >
                  <Reply className="h-4 w-4" />
                  <span className="text-xs">Responder</span>
                </Button>
              </div>

              {/* Formulário de resposta */}
              {replyingToId === comment.id && (
                <div className="mt-3 space-y-2">
                  <div className="flex gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-purple-700 text-white rounded-md text-xs">
                      UA
                    </div>
                    <Textarea
                      className="w-full min-h-16 text-sm"
                      placeholder={`Responder a ${comment.author.name}...`}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setReplyingToId(null)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => handleAddReply(comment.id)}
                      disabled={!replyContent.trim()}
                    >
                      Responder
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {comment.subComments && (
        <div className="ml-12 space-y-3">
          {/* Botão para mostrar/esconder respostas */}
          {comment.subComments.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs flex items-center gap-1 mb-2"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? (
                <>
                  <ChevronUp className="h-3 w-3" />
                  Ver menos
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3" />
                  Ver {comment.subComments.length} respostas
                </>
              )}
            </Button>
          )}

          {/* Lista de sub-comentários */}
          {(showReplies || comment.subComments.length === 1) &&
            comment.subComments.map((subComment) => (
              <Card key={subComment.id} className="p-3 bg-muted/50">
                <div className="flex gap-2">
                  <div className="flex h-8 w-8 items-center justify-center bg-purple-700 text-white rounded-md shrink-0 text-xs">
                    {subComment.author?.name?.charAt(0)}
                  </div>
                  <div className="space-y-1 w-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-sm">{subComment.author?.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{subComment.author?.title}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{format(subComment.createdAt, "dd/MM/yyyy")}</span>
                    </div>
                    <p className="text-sm">{subComment.content}</p>

                    {/* Ações do sub-comentário */}
                    <div className="flex items-center gap-4 mt-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 flex items-center gap-1"
                        // onClick={() => toggleLike(subComment.id, true, comment.id)}
                      >
                        <ThumbsUp
                          // className={`h-3.5 w-3.5 ${subComment.userLiked ? 'fill-green-500 text-green-500' : 'text-muted-foreground'}`}
                          className={`h-3.5 w-3.5 text-muted-foreground`}
                        />
                        <span className="text-xs">{subComment.likeCount}</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 flex items-center gap-1"
                        onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                      >
                        <Reply className="h-3.5 w-3.5" />
                        <span className="text-xs">Responder</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          }
        </div>
      )}
      </div>
    </>
  )
}