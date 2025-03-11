import { User } from "./user";

export interface CommentData {
  id: string;
  user: User;
  content: string;
  createdAt: Date;
  parentId?: string;
  replies: CommentData[];
}