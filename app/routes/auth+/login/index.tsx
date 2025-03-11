import { LoginForm } from "~/components/LoginForm";
import { useEffect, useState } from "react";
import { ActionFunctionArgs, useNavigate, useSubmit } from "react-router-dom";
import { useToast } from "~/hooks/use-toast";
import { Label } from "~/components/ui/label";
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { AccountLogin } from "~/interfaces/account/login.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";


const loginSchema = z.object({
  email: z
    .string({ required_error: "Email é obrigatório." })
    .email("Email inválido."),
  password: z
    .string({ required_error: "Senha é obrigatório." })
    .min(4, "Deve conter mais de 4 caracteres."),
  // userAddress: z.string().optional(),
  // userDevice: z.string().optional(),
});


export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const variables = await request.json();

    // Usa safeParse para evitar exceptions
    const result = loginSchema.safeParse(variables);

    if (!result.success) {
      console.error("Erro de validação:", result.error.format());
      return { success: false, errors: result.error.format() };
    }

    console.log("Dados validados:", result.data);
    return { success: true, data: result.data };
  } catch (error) {
    console.error("Erro desconhecido:", error);
    return { success: false, error: "Erro interno do servidor" };
  }
};


export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AccountLogin>()

  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const { toast } = useToast();
  const submit = useSubmit()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  const onSubmit: SubmitHandler<AccountLogin> = (data) => {
    console.log(data)
    submit({ ...data }, { method: "POST", encType: "application/json" });
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 overflow-hidden">
      {/* Background with blur effect */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-purple-100/40 rounded-full filter blur-3xl opacity-30 animate-pulse-soft" />
        <div
          className="absolute top-[40%] right-[15%] w-[400px] h-[400px] bg-slate-100/40 rounded-full filter blur-3xl opacity-30 animate-pulse-soft"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-[15%] left-[35%] w-[300px] h-[300px] bg-gray-100/40 rounded-full filter blur-3xl opacity-30 animate-pulse-soft"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 grid gap-8 w-full max-w-md mx-auto">
        {/* Logo and heading */}
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
            <h1 className="text-3xl font-semibold tracking-tight">Bem-vindo</h1>
            <p className="text-muted-foreground text-sm">
              Faça login para acessar sua conta
            </p>
          </div>
        </div>

        <div
          className={`rounded-lg border bg-card p-8 shadow-subtle glass transition-opacity duration-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="grid gap-6 animate-fade-up">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                      placeholder="nome@exemplo.com"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...register('email', {required: 'Campo obrigatório'})}
                      className="pl-10 input-transition animate-fade-in animate-delay-100"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
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
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      disabled={isLoading}
                      {...register('password', {
                        required: 'Campo obrigatório',
                        minLength: {
                          value: 4,
                          message: 'Deve conter mais de 4 caracteres'
                        }
                      })}
                      className="pl-10 pr-10 input-transition animate-fade-in animate-delay-200"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
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
              <Button
                variant="outline"
                type="button"
                disabled={isLoading}
                className="transition-all duration-200"
              >
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
              <Button
                variant="outline"
                type="button"
                disabled={isLoading}
                className="transition-all duration-200"
              >
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
        </div>

        {/* Register link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/90 transition-colors"
            >
              Registre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
