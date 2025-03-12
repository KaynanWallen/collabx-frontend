import { ProjectType } from "~/@types/project";

export interface ProjectFormInterface  extends Omit<ProjectType, 'id' | 'createdAt' | 'lastModified'> {
  images: File[]
}