import { CommentReactionType, CommentType } from "~/@types/comment";
import { ProfileType } from "~/@types/profile";
import { User } from "~/@types/user";

export interface CommentInterface extends CommentType{
  author: ProfileType;
  commentReaction: CommentReactionType[]
  subComments?: CommentInterface[];
}

export interface NewCommentInterface extends Omit<CommentType, 'id' | 'authorId' |  'createdAt' | 'lastModified' | 'likeCount' | 'dislikeCount' | 'commentCount'> {
}

export interface ToggleReactionCommentInterface extends Omit<CommentReactionType, 'id' | 'authorId' | 'createdAt' | 'lastModified'> {

}