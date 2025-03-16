import { ProfileType } from "./profile";
import { User } from "./user";

export interface CommentType {
  id: string;
  user: User;
  content: string;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  createdAt: Date;
  parentId?: string;
  author: ProfileType;
  subComments: CommentType[];
}