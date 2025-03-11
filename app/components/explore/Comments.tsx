import { ChevronUp, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { CommentData } from "~/@types/comment";
import { initialComments, users } from "~/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Comments() {
  const [comments, setComments] = useState<CommentData[]>(initialComments);
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
                KW
              </span>

              <section className="flex flex-col gap-3 w-full">
                <span className="flex flex-col gap-1">
                  <p className="font-bold text-md">Kaynan Wallen</p>
                  <p className="text-[#1E1E1E]/75 font-semibold text-sm">
                    12/02/2024 13:22
                  </p>
                </span>

                <span>
                  <p className="text-md">
                    Projeto muito interessante! Adorei a ideia.
                  </p>
                </span>

                <span className="flex flex-row gap-5">
                  <li className="flex flex-row items-center gap-2 font-semibold text-lg">
                    <ThumbsUp className="size-5 text-[#22C55E]" />
                    12
                  </li>

                  <li className="flex flex-row items-center gap-2 font-semibold text-lg">
                    <ThumbsDown className="size-5 text-[#EF4444]" />3
                  </li>

                  <li className="flex flex-row items-center gap-2 font-semibold text-lg">
                    <MessageSquare className="size-5 text-[#3B82F6]" />
                    Responder
                  </li>
                </span>

                {/* Sub comentários */}
                <ul className="flex flex-col gap-3">
                  <li className="flex flex-row gap-3 bg-background p-3 rounded-sm">
                    <span className="size-12 bg-pink-800 rounded-md flex items-center justify-center text-white">
                      KW
                    </span>

                    <section className="flex flex-col gap-3 w-full">
                      <span className="flex flex-col gap-1">
                        <p className="font-bold text-md">Kaynan Wallen</p>
                        <p className="text-[#1E1E1E]/75 font-semibold text-sm">
                          12/02/2024 13:22
                        </p>
                      </span>

                      <span>
                        <p className="text-md">
                          Projeto muito interessante! Adorei a ideia.
                        </p>
                      </span>

                      <span className="flex flex-row gap-5">
                        <li className="flex flex-row items-center gap-2 font-semibold text-lg">
                          <ThumbsUp className="size-5 text-[#22C55E]" />
                          12
                        </li>

                        <li className="flex flex-row items-center gap-2 font-semibold text-lg">
                          <ThumbsDown className="size-5 text-[#EF4444]" />3
                        </li>

                        <li className="flex flex-row items-center gap-2 font-semibold text-lg">
                          <MessageSquare className="size-5 text-[#3B82F6]" />
                          Marcar
                        </li>
                      </span>
                    </section>
                  </li>

                  <li className="flex flex-row gap-3 bg-background p-3 rounded-sm">
                    <span className="size-12 bg-pink-800 rounded-md flex items-center justify-center text-white">
                      KW
                    </span>

                    <section className="flex flex-col gap-3 w-full">
                      <span className="flex flex-col gap-1">
                        <p className="font-bold text-md">Kaynan Wallen</p>
                        <p className="text-[#1E1E1E]/75 font-semibold text-sm">
                          12/02/2024 13:22
                        </p>
                      </span>

                      <span>
                        <p className="text-md">
                          Projeto muito interessante! Adorei a ideia.
                        </p>
                      </span>

                      <span className="flex flex-row gap-5">
                        <li className="flex flex-row items-center gap-2 font-semibold text-lg">
                          <ThumbsUp className="size-5 text-[#22C55E]" />
                          12
                        </li>

                        <li className="flex flex-row items-center gap-2 font-semibold text-lg">
                          <ThumbsDown className="size-5 text-[#EF4444]" />3
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
              </section>
            </li>
          )
        ))}
      </ul>
    </>
  );
}
