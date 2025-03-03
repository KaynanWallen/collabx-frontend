
import { Button } from "~/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl animate-fade-up">
            Bem-vindo ao nosso aplicativo
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-up animate-delay-100">
            Comece sua jornada com uma experiência incrível e design elegante.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up animate-delay-200">
          <Button 
            size="lg" 
            onClick={() => navigate("auth/login")}
            className="transition-all duration-300 hover:shadow-md"
          >
            Entrar
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/explore")}
            className="transition-all duration-300 hover:shadow-md"
          >
            Explorar
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-muted-foreground">
        <p>© 2025 Kaynan Wallen. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default Index;
