import { QRCode } from '@/components/QRCode';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowLeft, Smartphone, Download } from 'lucide-react';
import kaizenLogo from '@assets/kaizen_logo_transparent_1751749979875.png';

export default function QRCodePage() {
  const appUrl = `${window.location.origin}/demo`;

  const downloadQR = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'kaizen-app-qr.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <img 
            src={kaizenLogo} 
            alt="Kaizen Burgos" 
            className="w-20 h-20 mx-auto object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold text-kaizen-gold">
              KaizenAcademy改善
            </h1>
            <p className="text-gray-400">
              Código QR para la App Móvil
            </p>
          </div>
        </div>

        {/* QR Code Card */}
        <Card className="bg-white p-6">
          <CardContent className="p-0 flex flex-col items-center space-y-4">
            <QRCode value={appUrl} size={250} />
            
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600 font-medium">
                Escanea para acceder a KaizenApp
              </p>
              <p className="text-xs text-gray-500">
                Solo para miembros del gimnasio
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 space-y-3">
            <h3 className="text-white font-medium mb-3 flex items-center">
              <Smartphone className="mr-2" size={16} />
              Cómo usar:
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>1. Abre la cámara de tu móvil</p>
              <p>2. Apunta al código QR</p>
              <p>3. Toca el enlace que aparece</p>
              <p>4. Inicia sesión con tus credenciales</p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex space-x-3">
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full border-gray-600">
              <ArrowLeft className="mr-2" size={16} />
              Volver
            </Button>
          </Link>
          <Button 
            onClick={downloadQR}
            className="flex-1 bg-kaizen-red hover:bg-red-700"
          >
            <Download className="mr-2" size={16} />
            Descargar QR
          </Button>
        </div>

        {/* Direct URL */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-3">
            <p className="text-xs text-gray-400 text-center">
              URL directa: {appUrl}
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}