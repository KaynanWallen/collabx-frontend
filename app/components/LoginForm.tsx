
import { useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon } from "lucide-react";
import { useToast } from "~/hooks/use-toast";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      toast({
        title: "Login attempt",
        description: "Essa seria uma tentativa real de login com credenciais.",
      });
      setIsLoading(false);
    }, 1500);
  }

  return (
    <div className={cn("grid gap-6 animate-fade-up", className)} {...props}>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label 
              htmlFor="email" 
              className="text-sm font-medium opacity-90 animate-fade-in animate-delay-100"
            >
              Email
            </Label>
            <div className="relative">
              <UserIcon 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4"
                aria-hidden="true" 
              />
              <Input
                id="email"
                name="email"
                placeholder="nome@exemplo.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 input-transition animate-fade-in animate-delay-100"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label 
                htmlFor="password" 
                className="text-sm font-medium opacity-90 animate-fade-in animate-delay-200"
              >
                Senha
              </Label>
              <a 
                href="#" 
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 animate-fade-in animate-delay-200"
              >
                Esqueceu a senha?
              </a>
            </div>
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
                autoComplete="current-password"
                disabled={isLoading}
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10 input-transition animate-fade-in animate-delay-200"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
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
          className="w-full font-medium transition-all duration-200 shadow-sm animate-fade-in animate-delay-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
              Entrando...
            </div>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
      <div className="relative my-2 animate-fade-in animate-delay-300">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 animate-fade-in animate-delay-300">
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
      <p className="text-center text-sm text-muted-foreground mt-4 animate-fade-in animate-delay-300">
        Ao fazer login, você concorda com nossos{" "}
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
  );
}
