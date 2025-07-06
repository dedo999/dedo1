import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import kaizenLogo from '@assets/kaizen_logo_transparent_1751749979875.png';

export default function DemoAccess() {
  useEffect(() => {
    // Automatically set up demo account with full access
    const demoUser = {
      id: 'demo-001',
      username: 'kaizen_demo',
      firstName: 'Demo',
      lastName: 'Member',
      email: 'demo@kaizenburgos.com',
      phone: '+34662323282',
      preferredDisciplines: ['BJJ', 'MMA', 'Kickboxing'],
      membershipType: 'premium',
      membershipExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      profileImageUrl: '/api/placeholder/user-avatar.jpg',
      isAdmin: true,
      hasFullAccess: true,
      checkedIn: false
    };

    // Set authentication tokens
    localStorage.setItem('kaizen_demo_token', 'demo_full_access_token');
    localStorage.setItem('kaizen_demo_user', JSON.stringify(demoUser));
    localStorage.setItem('kaizen_demo_auth', 'true');

    // Redirect to mobile app after 2 seconds
    setTimeout(() => {
      window.location.href = '/app';
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm p-8 text-center max-w-md">
        <div className="space-y-6">
          <img 
            src={kaizenLogo} 
            alt="Kaizen Burgos" 
            className="w-20 h-20 mx-auto object-contain animate-pulse"
          />
          
          <div>
            <h1 className="text-2xl font-bold text-kaizen-gold mb-2">
              KaizenAcademy改善
            </h1>
            <p className="text-white mb-4">
              Configurando acceso demo completo...
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-kaizen-red h-2 rounded-full animate-pulse" style={{width: '80%'}}></div>
            </div>
          </div>

          <div className="text-left text-sm text-gray-300 space-y-2">
            <p>✓ Cuenta demo creada</p>
            <p>✓ Acceso premium activado</p>
            <p>✓ Todas las disciplinas disponibles</p>
            <p>✓ Funciones administrativas habilitadas</p>
            <p className="text-kaizen-gold">⟳ Redirigiendo a KaizenApp...</p>
          </div>
        </div>
      </Card>
    </div>
  );
}