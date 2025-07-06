import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone } from 'lucide-react';
import kaizenLogo from '@assets/kaizen_logo_transparent_1751749979875.png';
import { Link } from 'wouter';

export default function DemoLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleDemoLogin = () => {
    // Set demo login state
    localStorage.setItem('kaizen_demo_token', 'demo_session_token');
    localStorage.setItem('kaizen_demo_user', JSON.stringify({
      id: 'demo-001',
      username: 'kaizen_demo',
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@kaizenburgos.com',
      preferredDisciplines: ['BJJ', 'MMA'],
      membershipType: 'monthly',
      phone: '+34662323282'
    }));
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <img 
            src={kaizenLogo} 
            alt="Kaizen Burgos" 
            className="w-24 h-24 mx-auto object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold text-kaizen-gold mb-4">
              ¡Bienvenido a KaizenApp!
            </h1>
            <p className="text-white mb-6">
              Demo login exitoso. Ahora puedes acceder a todas las funciones.
            </p>
            <Link href="/app/dashboard">
              <Button className="w-full bg-kaizen-red hover:bg-red-700">
                Ir al Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              DEMO
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
              Demo de la aplicación móvil
            </p>
          </div>
        </div>

        {/* Demo Login Card */}
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-white">
              Acceso Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-gray-300 space-y-2">
              <p className="text-sm">Credenciales de prueba:</p>
              <div className="bg-gray-800 p-3 rounded-lg text-sm">
                <p><strong>Usuario:</strong> kaizen_demo</p>
                <p><strong>Contraseña:</strong> burgos2025</p>
              </div>
            </div>
            
            <Button 
              onClick={handleDemoLogin}
              className="w-full bg-kaizen-red hover:bg-red-700 text-white font-semibold"
            >
              Entrar con Demo
            </Button>

            <div className="text-center">
              <Link href="/" className="text-sm text-gray-400 hover:text-kaizen-gold">
                ← Volver al sitio web
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="bg-gray-800/30 border-gray-700">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-400">
              Esta es una demostración de KaizenApp con todas las funciones personalizadas para Kaizen Burgos.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}