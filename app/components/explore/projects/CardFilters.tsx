import { Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";

const filterCategories = ["Descobrir", "Sites", "APIs", "Designs", "Outros"];

export const CardFilters = () => {
  const [activeTab, setActiveTab] = useState("Descobrir");

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="flex gap-8 overflow-x-auto pb-2 mb-4 md:mb-0">
          {filterCategories.map((category) => (
            <button
              key={category}
              className={`pb-1 whitespace-nowrap ${
                activeTab === category
                  ? "font-medium border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <Button variant="outline" className="self-start flex gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>
    </>
  );
};
