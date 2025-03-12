import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "~/hooks/use-toast";
import { set, useFormContext } from "react-hook-form";
import { ProjectFormInterface } from "~/interfaces/new-project.interface";

interface ProjectFormData {
  title: string;
  description: string;
  images: File[];
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  technologies: string[];
}


export default function NewProjectForm() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<ProjectFormInterface>()

  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    images: [],
    githubUrl: "",
    linkedinUrl: "",
    portfolioUrl: "",
    technologies: [],
  });
  const [newTech, setNewTech] = useState("");
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const { toast } = useToast();
  const maxImages = 1

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + (watch('images')?.length || 0) > maxImages) {
      toast({
        title: "Limite de imagens",
        description:`Você pode adicionar no máximo ${maxImages} imagens`,
        variant: "destructive",
      });
      return;
    }
    
    setValue('images', [...(watch('images') || []), ...files])
    
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    URL.revokeObjectURL(imagePreviewUrls[index]);
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const addTechnology = () => {
    const techs = watch('techs')
    const techsArray = techs ? techs.split(',') : []
    if (newTech && !techsArray.includes(newTech)) {
      techsArray.push(newTech)
      setValue('techs', techsArray.join(','))
      setNewTech("");
    }
  };

  const removeTechnology = (tech: string) => {
    const techs = watch('techs')
    const techsArray = techs ? techs.split(',') : []
    const index = techsArray.findIndex((t) => t === tech)
    if (index !== -1) {
      techsArray.splice(index, 1)
    }
    
    if (!(techsArray.length == 0)) {
      setValue('techs', techsArray.join(','))
      return
    }
    
    setValue('techs', null)
  };

  return (
    <>
      <section className="space-y-6 w-full">
        <div className="bg-primary-foreground p-6 rounded-lg space-y-6">
          <div>
            <label className="block text-primary text-sm font-medium mb-2">
              Nome do Projeto *
            </label>
            <Input
              {...register('title', { required: 'Campo Obrigatório' })}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-primary text-sm font-medium mb-2">
              Conteúdo *
            </label>
            <Textarea
              {...register('content', { required: 'Campo Obrigatório' })}
              className="min-h-[120px]"
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
          </div>

          <div>
            <label className="block text-primary text-sm font-medium mb-2">
              Imagens do Projeto (Máx. {maxImages})
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {imagePreviewUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden"
                >
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-primary hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="bg-background text-primary"
            />
          </div>

          <div>
            <label className="block text-primary text-sm font-medium mb-2">
              GitHub * (Obrigatório)
            </label>
            <Input
              {...register('githubLink')}
            />
          </div>

          <div>
            <label className="block text-primary text-sm font-medium mb-2">
              LinkedIn (Opcional)
            </label>
            <Input
              {...register('linkedinLink')}
            />
          </div>

          <div>
            <label className="block text-primary text-sm font-medium mb-2">
              Figma (Opcional)
            </label>
            <Input
              {...register('figmaLink')}
            />
          </div>

          <div>
            <label className="block text-primary text-sm font-medium mb-2">
              Tecnologias Utilizadas
            </label>
            <div className="flex gap-2 mb-4 flex-wrap">
              {watch('techs')?.split(',') && watch('techs')?.split(',').map((tech) => (
                <span 
                  key={tech}
                  className="bg-background text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Adicionar tecnologia"
                className="bg-background text-primary placeholder:text-gray-400"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTechnology();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addTechnology}
              // className="bg-[#991C06] hover:bg-[#7a1705] text-white"
              >
                Adicionar
              </Button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          form="new-project-form"
        // className="w-full bg-[#991C06] hover:bg-[#7a1705] text-white"
        >
          Adicionar Projeto
        </Button>
      </section>
    </>
  )
}