import { ProfileType } from "./profile";
import { User } from "./user";

export type CommentType = {
  id: number;
  authorId: number;
  projectId: number;
  content: string;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  createdAt: Date;
  parentId?: string;
}