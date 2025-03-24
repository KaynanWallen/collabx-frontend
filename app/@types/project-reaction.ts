import { ProfileType } from "./profile"

export type ReactionType = {
  id: number,
  projectId: number,
  authorId: number,
  reactionType: string,
  createdAt: Date,
  lastModified: Date,
  author: ProfileType
}
