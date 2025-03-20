import { ProfileType } from "./profile";
import { User } from "./user";

export type CommentType = {
  id: number;
  authorId: number;
  projectId: number;
  parentId?: number;
  content: string;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  createdAt: Date;
}

export type CommentReactionType = {
    id: number,
    commentId: number,
    authorId: number,
    reactionType: string,
    createdAt: string,
    lastModified: string
}