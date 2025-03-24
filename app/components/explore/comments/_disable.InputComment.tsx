import { Mention, MentionsInput } from "react-mentions";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useState } from "react";
import { Button } from "../../ui/button";
import { CornerDownRight, MessageSquarePlus } from "lucide-react";

interface CommentInputProps {
  users: {
    id: string;
    display: string;
    avatar?: string;
  }[];
  onSubmit: (content: string) => void;
  replyingTo?: {
    id: string;
    display: string;
    avatar?: string;
  };
  placeholder?: string;
  buttonText?: string;
  autoFocus?: boolean;
}

export default function InputComment({
  users,
  onSubmit,
  replyingTo,
  placeholder = "Write a comment...",
  buttonText = "Post",
  autoFocus = false,
}: CommentInputProps) {
  const [comment, setComment] = useState(
    replyingTo ? `@${replyingTo.display} ` : ""
  );

  return (
    <>
      <div className="flex flex-row gap-3">
        <span className="size-12 bg-pink-800 rounded-md flex items-center justify-center text-white">
          KW
        </span>

        <section className="flex flex-col gap-3 w-full">
          <MentionsInput
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={"place holder"}
            className="mentions"
            autoFocus={autoFocus}
          >
            <Mention
              trigger="@"
              data={users}
              renderSuggestion={(
                suggestion: any,
                search,
                highlightedDisplay,
                index,
                focused
              ) => (
                <div
                  className={`flex items-center gap-2 p-2 ${
                    focused ? "bg-gray-100" : ""
                  }`}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={suggestion.avatar}
                      alt={suggestion.display}
                    />
                    <AvatarFallback>
                      {suggestion.display.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{suggestion.display}</span>
                </div>
              )}
              displayTransform={(id, display) => `@${display}`}
              markup="@[__display__](__id__)"
            />
          </MentionsInput>

          <span>
            {replyingTo ? (
              <div className="flex items-center text-sm text-gray-500">
                <CornerDownRight className="h-4 w-4 mr-1" /> Replying to{" "}
                {replyingTo.display}
              </div>
            ) : (
              <Button type="submit" disabled={!comment.trim()}>
                <MessageSquarePlus className="h-4 w-4 mr-2" />
                {buttonText}
              </Button>
            )}
          </span>
        </section>
      </div>
    </>
  );
}
