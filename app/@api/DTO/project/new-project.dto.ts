export type NewProjectDTOType = {
  // authorId: number;
  title: string;
  content: string;
  // techs: string | null;
  // figmaLink: string | null;
  // githubLink: string | null;
  // linkedinLink: string | null;
  images: File[];
  githubLink?: string | null | undefined;
  linkedinLink?: string | null | undefined;
  figmaLink?: string | null | undefined;
}