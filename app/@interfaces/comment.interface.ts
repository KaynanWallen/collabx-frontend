import { CommentType } from "~/@types/comment";
import { ProfileType } from "~/@types/profile";
import { User } from "~/@types/user";

export interface CommentInterface extends CommentType{
  author: ProfileType;
  subComments?: CommentInterface[];
}

export interface NewCommentInterface extends Omit<CommentType, 'id' | 'authorId' |  'createdAt' | 'lastModified' | 'likeCount' | 'dislikeCount' | 'commentCount'> {

}