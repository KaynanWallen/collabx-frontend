import { CommentDTOType } from "../comment/comment.dto";
import { ProfileDTOType } from "../profile/profile";

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
  reactions: ReactionDTOType[]
}

export type ReactionDTOType = {
  id: number,
  projectId: number,
  authorId: number,
  reactionType: string,
  createdAt: Date,
  lastModified: Date,
  author: ProfileDTOType
}
