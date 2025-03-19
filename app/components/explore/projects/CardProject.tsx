import {
  ChevronRight,
  MessageCircle,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { ProjectViewInterface } from "~/@interfaces/project.interface";
import { Button } from "~/components/ui/button";
import { ProjectDialog } from "./DialogCardProject";

export const CardProject = ({project}: {project: ProjectViewInterface}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  
  return (
    <>
      <div
        key={project.id}
        className="border border-border rounded-lg overflow-hidden bg-card"
      >
        {/* Project Image */}
        <div className="h-48 bg-muted overflow-hidden">
          <img
            // src={project.image || "/placeholder.svg"}
            src={
              "https://preview--auth-trove-solution.lovable.app/lovable-uploads/64646fc7-881b-4ee9-a16c-1be4c9383d44.png"
            }
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Project Info */}
        <div className="p-4">
          {/* Author */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center bg-purple-700 text-white rounded-md text-sm">
              {project.author.name.charAt(0)}
            </div>
            <span className="text-sm">{project.author.name}</span>
          </div>

          {/* Title and Description */}
          <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {project.content}
          </p>

          {/* Interactions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4 text-green-500" />
                <span className="text-sm">{project.likeCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsDown className="h-4 w-4 text-red-500" />
                <span className="text-sm">{project.dislikeCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{project.comments.length}</span>
              </div>
              <button>
                <Star
                  className={`h-4 w-4 ${
                    true // Ajeitar com project.favorite
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-xs flex items-center gap-1"
              onClick={() => setIsOpen(true)}
            >
              Ver mais
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      
      <ProjectDialog detailCardOpen={isOpen} setDetailCardOpen={setIsOpen} project={project}/>
    </>
  );
};
