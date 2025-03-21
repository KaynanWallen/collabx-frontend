import { format } from "date-fns";
import { ChevronDown, ChevronUp, Loader, Reply, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { CommentInterface } from "~/@interfaces/comment.interface";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/hooks/use-toast";
import useMyProfileStore from "~/hooks/useMyProfile";
import { useCommentService } from "~/services/comments.service";

export const CardComment = ({ comment, setComments, handleAddReply }: { comment: CommentInterface, setComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>, handleAddReply: (replyContent: string, commentId: number) => Promise<void> }) => {
  const [replyingToId, setReplyingToId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [isSending, setIsSending] = useState(false)
  const { profile, setProfile } = useMyProfileStore();
  const [isLiked, setIsLiked] = useState(comment.commentReaction.find((comment) => comment.reactionType == 'like' && (profile && comment.authorId == profile.id)) ? true : false)

  const commentService = useCommentService()
  const { toast } = useToast()

  const toggleLike = async (comment_or_subcomment_id: number, isSubComment: boolean = false) => {
    if(isSubComment){
      setComments((prev) => {
        return [...prev.map((c) => {
          if(c.id == comment.id){
            return {
              ...c,
              subComments: c.subComments?.map((subComment) => {
                if(subComment.id == comment_or_subcomment_id){
                  const isLikedSubComment = subComment.commentReaction?.find((comment) => comment.reactionType == 'like' && (profile && comment.authorId == profile.id))
                  let newSubCommentReactions = subComment.commentReaction || []
                  console.log(isLikedSubComment)

                  if(isLikedSubComment){
                    newSubCommentReactions = newSubCommentReactions.filter((comment) => comment.id != isLikedSubComment.id) || []
                  }else {
                    newSubCommentReactions.push({
                      id: newSubCommentReactions.length * 3,
                      commentId: comment.id,
                      authorId: profile?.id || 0,
                      reactionType: 'like',
                      createdAt: new Date().toISOString(),
                      lastModified: new Date().toISOString()
                    })
                  }
                  
                  return {
                    ...subComment,
                    likeCount: subComment.likeCount + (isLikedSubComment ? -1 : 1),
                    commentReaction: newSubCommentReactions
                  } as CommentInterface
                }
                return {
                  ...subComment
                }
              })
            }
          }

          return {
            ...c
          }
        })]
      })
    }else {
      setIsLiked(!isLiked)
      setComments((prev) => {
        return [...prev.map((c) => {
          if (c.id == comment_or_subcomment_id) {
            return {
              ...c,
              likeCount: c.likeCount + (isLiked ? -1 : 1)
            } as CommentInterface
          }

          return {
            ...c
          } as CommentInterface
        })]
      })
    }


    const response = await commentService.toggleReactionCommentService({
      commentId: comment_or_subcomment_id,
      reactionType: 'like'
    })

    if ('error' in response) {
      toast({
        title: "Erro ao curtir comentário",
        variant: 'destructive'
      })
      setIsLiked(!isLiked)
      return
    }
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
                  disabled={!profile}
                  onClick={() => toggleLike(comment.id)}
                >
                  <ThumbsUp
                    className={`h-4 w-4 ${isLiked ? 'fill-blue-700 text-blue-700' : 'text-primary'}`}
                  />

                  <span className="text-xs">{comment.likeCount}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 flex items-center gap-1"
                  onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                  disabled={!profile}
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
                      onClick={async () => {
                        setIsSending(true)
                        await handleAddReply(replyContent, comment.id)
                        setIsSending(false)
                        setReplyContent('')
                        setReplyingToId(null)
                      }}
                      disabled={!replyContent.trim() || isSending || !profile}
                    >
                      {isSending && <Loader className="animate-spin" />}
                      {!isSending ? "Responder" : 'Enviando...'}
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
              comment.subComments.map((subComment) => {
                const isLikedSubComment = subComment?.commentReaction?.find((comment) => (comment?.reactionType && comment?.reactionType == 'like') && (profile && comment.authorId == profile.id)) ? true : false
                return (
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
                          disabled={!profile}
                          onClick={() => toggleLike(subComment.id, true)}
                        >
                          <ThumbsUp
                            className={`h-4 w-4 ${isLikedSubComment ? 'fill-blue-700 text-blue-700' : 'text-primary'}`}
                          />

                          <span className="text-xs">{subComment.likeCount}</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 flex items-center gap-1"
                          onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                          disabled={!profile}
                        >
                          <Reply className="h-3.5 w-3.5" />
                          <span className="text-xs">Responder</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )})
            }
          </div>
        )}
      </div>
    </>
  )
}