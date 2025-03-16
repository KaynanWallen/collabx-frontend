import { CommentDTOType } from "../comment/comment.dto";

export type FindProjectDTOType = {
  id: number;
  title: string;
  authorId: number;
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
  comments: CommentDTOType[];
}
