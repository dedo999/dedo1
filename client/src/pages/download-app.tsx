import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Chrome, Download, Plus, Share, Home, ArrowLeft, Globe } from 'lucide-react';
import kaizenLogo from '@assets/kaizen_logo_transparent_1751749979875.png';
import { Link } from 'wouter';

export default function DownloadApp() {
  const [selectedDevice, setSelectedDevice] = useState<'android' | 'ios'>('android');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <img src={kaizenLogo} alt="Kaizen" className="w-8 h-8" />
            <div>
              <h1 className="text-lg font-bold text-kaizen-gold">KaizenApp</h1>
              <p className="text-xs text-gray-400">Descargar</p>
            </div>
          </div>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-kaizen-gold mb-2">
            Descargar KaizenApp
          </h2>
          <p className="text-gray-400">
            Instala la app oficial de KaizenAcademy改善Burgos en tu móvil
          </p>
        </div>

        {/* Device Selection */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={selectedDevice === 'android' ? 'default' : 'outline'}
            onClick={() => setSelectedDevice('android')}
            className={`h-16 ${selectedDevice === 'android' ? 'bg-kaizen-red hover:bg-kaizen-red/80' : ''}`}
          >
            <div className="text-center">
              <Smartphone className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm">Android</span>
            </div>
          </Button>
          <Button
            variant={selectedDevice === 'ios' ? 'default' : 'outline'}
            onClick={() => setSelectedDevice('ios')}
            className={`h-16 ${selectedDevice === 'ios' ? 'bg-kaizen-red hover:bg-kaizen-red/80' : ''}`}
          >
            <div className="text-center">
              <Smartphone className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm">iPhone</span>
            </div>
          </Button>
        </div>

        {/* Instructions for Android */}
        {selectedDevice === 'android' && (
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Chrome className="w-6 h-6 text-kaizen-gold mr-2" />
                <h3 className="text-lg font-semibold">Instalación en Android</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-kaizen-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <p className="font-medium">Abre Chrome en tu móvil</p>
                    <p className="text-gray-400 text-sm">Ve a kaizenburgos.com/app</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-kaizen-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <p className="font-medium">Toca el menú de Chrome</p>
                    <p className="text-gray-400 text-sm">Los tres puntos en la esquina superior derecha</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-kaizen-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <p className="font-medium">Selecciona "Añadir a la pantalla de inicio"</p>
                    <p className="text-gray-400 text-sm">O "Instalar aplicación" si aparece</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-kaizen-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <p className="font-medium">Confirma la instalación</p>
                    <p className="text-gray-400 text-sm">La app aparecerá en tu pantalla principal</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Instructions for iOS */}
        {selectedDevice === 'ios' && (
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Globe className="w-6 h-6 text-kaizen-gold mr-2" />
                <h3 className="text-lg font-semibold">Instalación en iPhone</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-kaizen-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <p className="font-medium">Abre Safari en tu iPhone</p>
                    <p className="text-gray-400 text-sm">Ve a kaizenburgos.com/app</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-kaizen-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <p className="font-medium">Toca el botón de compartir</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Share className="w-4 h-4 text-blue-400" />
                      <p className="text-gray-400 text-sm">Icono en la parte inferior</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-kaizen-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <p className="font-medium">Busca "Añadir a la pantalla de inicio"</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Plus className="w-4 h-4 text-green-400" />
                      <p className="text-gray-400 text-sm">Desplázate hacia abajo si no lo ves</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-kaizen-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <p className="font-medium">Confirma con "Añadir"</p>
                    <p className="text-gray-400 text-sm">La app aparecerá junto a tus otras apps</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Features */}
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-kaizen-gold">
              ¿Qué incluye la app?
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-kaizen-red rounded-full"></div>
                <span className="text-sm">Notificaciones personalizadas para tus disciplinas</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-kaizen-red rounded-full"></div>
                <span className="text-sm">Horarios de clases en tiempo real</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-kaizen-red rounded-full"></div>
                <span className="text-sm">Control de aforo del gimnasio</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-kaizen-red rounded-full"></div>
                <span className="text-sm">Galería de fotos y eventos</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-kaizen-red rounded-full"></div>
                <span className="text-sm">Chat directo con la academia</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Access Button */}
        <div className="text-center">
          <Link href="/app">
            <Button className="bg-kaizen-red hover:bg-kaizen-red/80 text-white px-8 py-3">
              <Download className="w-4 h-4 mr-2" />
              Probar KaizenApp Ahora
            </Button>
          </Link>
          <p className="text-gray-400 text-xs mt-2">
            O ve directamente a kaizenburgos.com/app
          </p>
        </div>

        {/* Support */}
        <Card className="bg-gray-900 border-gray-700">
          <div className="p-4 text-center">
            <p className="text-gray-400 text-sm mb-2">¿Necesitas ayuda?</p>
            <p className="text-kaizen-gold text-sm font-medium">
              WhatsApp: +34 662 32 32 82
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}