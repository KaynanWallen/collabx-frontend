import { CommentType } from "./comment";
import { ProfileType } from "./profile";
import { ReactionType } from "./project-reaction";

export type ProjectType = {
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
  comments: CommentType[];
}