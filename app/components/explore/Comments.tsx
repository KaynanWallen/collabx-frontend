import { ChevronUp, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { CommentType } from "~/@types/comment";
import { initialComments, users } from "~/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";

export default function CommentsSection({comments}: {comments: CommentType[]}) {
  const [comment, setComment] = useState<string>()
  return (
    <>
      <ul className="flex flex-col gap-5">
        {comments.length === 0 ? (
          <div className="text-center py-10">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold">No comments yet</h3>
            <p className="text-gray-500">Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map(comment => (
            <li className="flex flex-row gap-3 bg-[#F1F5F9] p-3 rounded-sm">
              <span className="size-12 bg-pink-800 rounded-md flex items-center justify-center text-white">
                {comment.author.name.charAt(0)}
              </span>

              <section className="flex flex-col gap-3 w-full">
                <span className="flex flex-col gap-1">
                  <p className="font-bold text-md">{comment.author.name}</p>
                  <p className="text-[#1E1E1E]/75 font-semibold text-sm">
                  {format(comment.createdAt, "dd/MM/yyyy HH:mm")}
                  </p>
                </span>

                <span>
                  <p className="text-md">
                    {comment.content}
                  </p>
                </span>

                <span className="flex flex-row gap-5">
                  <li className="flex flex-row items-center gap-2 font-semibold text-lg">
                    <ThumbsUp className="size-5 text-[#22C55E]" />
                    {comment.likeCount}
                  </li>

                  <li className="flex flex-row items-center gap-2 font-semibold text-lg">
                    <ThumbsDown className="size-5 text-[#EF4444]" />
                    {comment.dislikeCount}
                  </li>

                  <li className="flex flex-row items-center gap-2 font-semibold text-lg">
                    <MessageSquare className="size-5 text-[#3B82F6]" />
                    Responder
                  </li>
                </span>

                {/* Sub comentários */}
                {comment.subComments.map((replie) => (
                  <ul className="flex flex-col gap-3">
                    <li className="flex flex-row gap-3 bg-background p-3 rounded-sm">
                      <span className="size-12 bg-pink-800 rounded-md flex items-center justify-center text-white">
                        {replie.author.name.charAt(0)}
                      </span>

                      <section className="flex flex-col gap-3 w-full">
                        <span className="flex flex-col gap-1">
                          <p className="font-bold text-md">{replie.author.name}</p>
                          <p className="text-[#1E1E1E]/75 font-semibold text-sm">
                          {format(replie.createdAt, "dd/MM/yyyy HH:mm")}
                          </p>
                        </span>

                        <span>
                          <p className="text-md">
                            {replie.content}
                          </p>
                        </span>

                        <span className="flex flex-row gap-5">
                          <li className="flex flex-row items-center gap-2 font-semibold text-lg">
                            <ThumbsUp className="size-5 text-[#22C55E]" />
                            {comment.likeCount}

                          </li>

                          <li className="flex flex-row items-center gap-2 font-semibold text-lg">
                            <ThumbsDown className="size-5 text-[#EF4444]" />
                            {comment.dislikeCount}
                          </li>

                          <li className="flex flex-row items-center gap-2 font-semibold text-lg">
                            <MessageSquare className="size-5 text-[#3B82F6]" />
                            Marcar
                          </li>
                        </span>
                      </section>
                    </li>

                    <li className="flex flex-row gap-1 items-center">
                      <p className="font-semibold text-xl">Ver menos</p>
                      <ChevronUp />
                    </li>
                  </ul>
                ))}
              </section>
            </li>
          )
        ))}
      </ul>
    </>
  );
}
