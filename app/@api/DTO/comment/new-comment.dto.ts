export type NewCommentDTOType = {
  content: string;
  authorId: number;
  projectId: number;
  parentId?: number | null;
}