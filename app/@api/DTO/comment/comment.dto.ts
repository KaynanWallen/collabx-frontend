// export type CommentDTOType = {
//   id: number;
//   title: string;
//   authorId: number,
//   content: string,
//   techs?: string,
//   figmaLink?: string,
//   githubLink?: string,
//   linkedinLink?: string,
//   likeCount: number,
//   dislikeCount: number,
//   commentCount: number,
//   projectImage?: string,
//   subComments?: CommentDTOType[],
//   commentReaction?: CommentReactionsDTOType[]
//   createdAt: string,
//   lastModified: string,
// }

import { CommentReactionsDTOType } from "./comment-reaction";

// export type CommentReactionsDTOType = {
//   id: number,
//   commentId: number,
//   authorId: number,
//   reactionType: string,
//   createdAt: string,
//   lastModified: string
// }

export type CommentDTOType = {
  id: number;
  title: string;
  authorId: number,
  content: string,
  techs?: string,
  figmaLink?: string,
  githubLink?: string,
  linkedinLink?: string,
  likeCount: number,
  dislikeCount: number,
  commentCount: number,
  projectImage?: string,
  subComments?: CommentDTOType[],
  commentReaction?: CommentReactionsDTOType[]
  createdAt: string,
  lastModified: string,
}