import { AtSignIcon, EyeIcon, EyeOffIcon, LockIcon, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useToast } from "~/hooks/use-toast";
import { cn } from "~/lib/utils";

export default function Register() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulação de API call com timeout
    setTimeout(() => {
      toast({
        title: "Registro realizado",
        description: "Sua conta foi criada com sucesso!",
      });
      setIsLoading(false);
      navigate("/login");
    }, 1500);
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 overflow-hidden">
      {/* Background com efeito blur */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-purple-100/40 rounded-full filter blur-3xl opacity-30 animate-pulse-soft" />
        <div className="absolute top-[40%] right-[15%] w-[400px] h-[400px] bg-slate-100/40 rounded-full filter blur-3xl opacity-30 animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[15%] left-[35%] w-[300px] h-[300px] bg-gray-100/40 rounded-full filter blur-3xl opacity-30 animate-pulse-soft" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 grid gap-8 w-full max-w-md mx-auto">
        {/* Logo e título */}
        <div className="flex flex-col items-center space-y-4 mb-4">
          <div className="p-2 rounded-full bg-black/5 backdrop-blur-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">Crie sua conta</h1>
            <p className="text-muted-foreground text-sm">
              Preencha os dados abaixo para se registrar
            </p>
          </div>
        </div>
        
        {/* Formulário com efeito glass */}
        <div className={`rounded-lg border bg-card p-8 shadow-subtle glass transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="grid gap-6 animate-fade-up">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label 
              htmlFor="name" 
              className="text-sm font-medium opacity-90 animate-fade-in animate-delay-100"
            >
              Nome completo
            </Label>
            <div className="relative">
              <UserIcon 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4"
                aria-hidden="true" 
              />
              <Input
                id="name"
                name="name"
                placeholder="Seu nome completo"
                autoCapitalize="words"
                autoCorrect="off"
                disabled={isLoading}
                value={formData.name}
                onChange={handleInputChange}
                className="pl-10 input-transition animate-fade-in animate-delay-100"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label 
              htmlFor="email" 
              className="text-sm font-medium opacity-90 animate-fade-in animate-delay-200"
            >
              Email
            </Label>
            <div className="relative">
              <AtSignIcon 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4"
                aria-hidden="true" 
              />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nome@exemplo.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 input-transition animate-fade-in animate-delay-200"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label 
              htmlFor="password" 
              className="text-sm font-medium opacity-90 animate-fade-in animate-delay-300"
            >
              Senha
            </Label>
            <div className="relative">
              <LockIcon 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4"
                aria-hidden="true" 
              />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled={isLoading}
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10 input-transition animate-fade-in animate-delay-300"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('password')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label 
              htmlFor="confirmPassword" 
              className="text-sm font-medium opacity-90 animate-fade-in animate-delay-400"
            >
              Confirmar senha
            </Label>
            <div className="relative">
              <LockIcon 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4"
                aria-hidden="true" 
              />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled={isLoading}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="pl-10 pr-10 input-transition animate-fade-in animate-delay-400"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showConfirmPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full font-medium transition-all duration-200 shadow-sm animate-fade-in animate-delay-500"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
              Registrando...
            </div>
          ) : (
            "Criar conta"
          )}
        </Button>
      </form>
      
      <div className="relative my-2 animate-fade-in animate-delay-500">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou registre-se com
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 animate-fade-in animate-delay-500">
        <Button variant="outline" type="button" disabled={isLoading} className="transition-all duration-200">
          <svg
            className="mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
          Facebook
        </Button>
        <Button variant="outline" type="button" disabled={isLoading} className="transition-all duration-200">
          <svg
            className="mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          GitHub
        </Button>
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-4 animate-fade-in animate-delay-500">
        Ao criar uma conta, você concorda com nossos{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-primary transition-colors"
        >
          Termos de Serviço
        </a>{" "}
        e{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-primary transition-colors"
        >
          Política de Privacidade
        </a>
        .
      </p>
    </div>
        </div>
        
        {/* Link para login */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Já possui uma conta?{" "}
            <button
              onClick={() => navigate("/login")} 
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/90 transition-colors"
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
