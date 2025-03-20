import { ProfileType } from "~/@types/profile";
import { CommentInterface } from "./comment.interface";
import { CommentReactionType } from "~/@types/comment";

export interface ProjectViewInterface {
  id: number;
  authorId: number;
  title: string;
  content: string;
  techs: string | null;
  figmaLink: string | null;
  githubLink: string | null;
  linkedinLink: string | null;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  createdAt: Date;
  lastModified: Date;
  author: ProfileType;
  comments: CommentInterface[];
}
