import {
  ChevronRight,
  MessageSquare,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "~/hooks/use-toast";
import DetailCardProject from "./DetailCardProject";

export default function CardProject() {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const {toast} = useToast()


  const toogleFavorite = () => {
    if(isFavorite){
      toast({
        title: "Projeto removido dos favoritos!!",
        variant: 'destructive'
      })
      setIsFavorite(!isFavorite)
      return
    }

    toast({
      title: "Projeto adicionado aos favoritos!!"
    })
    setIsFavorite(!isFavorite)
  }
  return (
    <>
      <div className="w-full max-w-[340px] min-h-[400px] max-h-[400px] bg-primary-foreground rounded-lg flex flex-col shadow-lg gap-3">
        <section className="min-w-full max-w-full max-h-[200px] min-h-[200px] bg-[#DDDDDD] rounded-t-lg"></section>

        <section className="flex flex-row gap-2 items-center px-3">
          <div className="size-8 bg-pink-800 rounded-md flex items-center justify-center text-white text-sm">
            KW
          </div>

          <p className="font-bold text-sm">Kaynan Wallen</p>
        </section>

        <section className="px-3 gap-3 flex flex-col justify-between h-full pb-3">
          <span>
            <p className="font-semibold text-xl">Nome do Projeto</p>
            <p className="line-clamp-4 text-xs font-normal">
              Lorem ipsum odor amet, consectetuer adipiscing elit. Fames
              sollicitudin duis nascetur, quis magna arcu. Vestibulum feugiat
              nascetur in tellus senectus fringilla dictumst.
            </p>
          </span>

          <span className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <span className="flex flex-row items-center gap-2 font-semibold">
                <ThumbsUp className="size-5 text-[#22C55E]" />
                12
              </span>

              <span className="flex flex-row items-center gap-2 font-semibold">
                <ThumbsDown className="size-5 text-[#EF4444]" />3
              </span>

              <span className="flex flex-row items-center gap-2 font-semibold pl-2">
                <MessageSquare className="size-5 text-[#3B82F6]" />
                18
              </span>

              <Star className={`size-5 text-[#F8C100] cursor-pointer ${isFavorite && 'fill-[#F8C100]'}`} onClick={toogleFavorite}/>
            </div>

            <span className="flex flex-row gap-1 items-center" onClick={() => setIsOpen(true)}>
              <p className="text-sm font-semibold cursor-pointer">Ver mais</p>
              <ChevronRight className="size-3" />
            </span>
          </span>
        </section>
      </div>

      <DetailCardProject detailCardOpen={isOpen} setDetailCardOpen={setIsOpen}/>
    </>
  );
}
