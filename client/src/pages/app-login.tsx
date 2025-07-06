import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import kaizenLogo from '@assets/kaizen_logo_transparent_1751749979875.png';
import { 
  Eye, 
  EyeOff, 
  Smartphone, 
  User,
  Lock,
  ArrowRight,
  Shield
} from 'lucide-react';

interface LoginForm {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    preferredDisciplines: string[];
  };
}

export default function AppLogin() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginForm>({
    username: '',
    password: ''
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm): Promise<LoginResponse> => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al iniciar sesión');
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_data', JSON.stringify(data.user));
      
      toast({
        title: "¡Bienvenido! 🥋",
        description: `Hola ${data.user.firstName}, ¡que tengas un gran entrenamiento!`,
      });

      // Redirect to mobile app
      window.location.href = '/app/dashboard';
    },
    onError: (error: Error) => {
      toast({
        title: "Error de acceso",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor introduce tu usuario y contraseña",
        variant: "destructive",
      });
      return;
    }

    loginMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof LoginForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const getDisciplineEmoji = (discipline: string) => {
    const emojis: Record<string, string> = {
      'BJJ': '🥋',
      'MMA': '🥊', 
      'Kickboxing': '🦵',
      'Boxeo': '👊'
    };
    return emojis[discipline] || '💪';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <img 
              src={kaizenLogo} 
              alt="Kaizen Burgos" 
              className="w-24 h-24 mx-auto object-contain animate-pulse"
            />
            <Badge 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-kaizen-red text-white"
            >
              <Smartphone size={12} className="mr-1" />
              APP
            </Badge>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-kaizen-gold">
              KaizenAcademy改善
            </h1>
            <p className="text-gray-400 text-lg">
              Burgos • Martial Arts
            </p>
            <p className="text-gray-500">
              Tu entrenamiento en la palma de tu mano
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-white flex items-center justify-center">
              <Shield className="mr-2 text-kaizen-red" size={20} />
              Acceso de Miembros
            </CardTitle>
            <p className="text-gray-400 text-sm">
              Solo para miembros activos de KaizenAcademy
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  Usuario
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={16} />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Tu nombre de usuario"
                    value={formData.username}
                    onChange={handleInputChange('username')}
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Tu contraseña"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-kaizen-red hover:bg-red-700 text-white font-medium py-6 text-lg"
              >
                {loginMutation.isPending ? (
                  <div className="flex items-center">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3" />
                    Conectando...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Acceder a la App
                    <ArrowRight className="ml-2" size={18} />
                  </div>
                )}
              </Button>
            </form>

            {/* Features Preview */}
            <div className="pt-4 border-t border-gray-600">
              <p className="text-gray-400 text-sm text-center mb-3">
                ¿Qué puedes hacer en la app?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-2xl mb-1">📅</div>
                  <p className="text-xs text-gray-400">Confirmar clases</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">💬</div>
                  <p className="text-xs text-gray-400">Chat del gym</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🏆</div>
                  <p className="text-xs text-gray-400">Ver rankings</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">📸</div>
                  <p className="text-xs text-gray-400">Fotos del gym</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help */}
        <div className="text-center space-y-3">
          <p className="text-gray-500 text-sm">
            ¿No tienes acceso? Habla con tu instructor
          </p>
          <div className="flex space-x-3 justify-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://wa.me/34662323282?text=Hola%2C%20necesito%20acceso%20a%20la%20app%20m%C3%B3vil', '_blank')}
              className="border-gray-600 text-gray-400 hover:bg-gray-700"
            >
              💬 WhatsApp
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('tel:+34662323282', '_blank')}
              className="border-gray-600 text-gray-400 hover:bg-gray-700"
            >
              📞 Llamar
            </Button>
          </div>
        </div>

        {/* Disciplines */}
        <div className="text-center">
          <p className="text-gray-500 text-xs mb-2">Disciplinas disponibles</p>
          <div className="flex justify-center space-x-2">
            {['BJJ', 'MMA', 'Kickboxing', 'Boxeo'].map((discipline) => (
              <Badge
                key={discipline}
                variant="outline"
                className="border-gray-600 text-gray-400 text-xs"
              >
                {getDisciplineEmoji(discipline)} {discipline}
              </Badge>
            ))}
          </div>
        </div>

        {/* Back to website */}
        <div className="text-center">
          <Button 
            variant="link" 
            onClick={() => window.location.href = '/'}
            className="text-gray-500 text-sm"
          >
            ← Volver a kaizenburgos.com
          </Button>
        </div>
      </div>
    </div>
  );
}