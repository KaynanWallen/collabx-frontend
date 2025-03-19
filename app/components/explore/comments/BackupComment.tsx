export const CardComment = () => {
  return (
    <div key={comment.id} className="space-y-4">
      <Card className="p-4">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-purple-700 text-white rounded-md shrink-0">
            {comment.user.initial}
          </div>
          <div className="space-y-2 w-full">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{comment.user.name}</span>
                <span className="text-xs text-muted-foreground ml-2">{comment.user.role}</span>
              </div>
              <span className="text-xs text-muted-foreground">{comment.date}</span>
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
                  className={`h-4 w-4 ${comment.userLiked ? 'fill-green-500 text-green-500' : 'text-muted-foreground'}`}
                />
                <span className="text-xs">{comment.likes}</span>
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
                    placeholder={`Responder a ${comment.user.name}...`}
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

      {/* Sub-comentários */}
      {comment.subComments.length > 0 && (
        <div className="ml-12 space-y-3">
          {/* Botão para mostrar/esconder respostas */}
          {comment.subComments.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs flex items-center gap-1 mb-2"
              onClick={() => toggleShowReplies(comment.id)}
            >
              {comment.showAllReplies ? (
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
          {(comment.showAllReplies || comment.subComments.length === 1) &&
            comment.subComments.map((subComment) => (
              <Card key={subComment.id} className="p-3 bg-muted/50">
                <div className="flex gap-2">
                  <div className="flex h-8 w-8 items-center justify-center bg-purple-700 text-white rounded-md shrink-0 text-xs">
                    {subComment.user.initial}
                  </div>
                  <div className="space-y-1 w-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-sm">{subComment.user.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{subComment.user.role}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{subComment.date}</span>
                    </div>
                    <p className="text-sm">{subComment.content}</p>

                    {/* Ações do sub-comentário */}
                    <div className="flex items-center gap-4 mt-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 flex items-center gap-1"
                        onClick={() => toggleLike(subComment.id, true, comment.id)}
                      >
                        <ThumbsUp
                          className={`h-3.5 w-3.5 ${subComment.userLiked ? 'fill-green-500 text-green-500' : 'text-muted-foreground'}`}
                        />
                        <span className="text-xs">{subComment.likes}</span>
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
  )
}