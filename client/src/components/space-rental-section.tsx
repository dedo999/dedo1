import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users, CheckCircle, Calendar, Phone, MessageCircle } from 'lucide-react';

export default function SpaceRentalSection() {
  const openWhatsApp = () => {
    const phoneNumber = '34947123456';
    const message = 'Hola, estoy interesado en alquilar el espacio de Kaizen Burgos para entrenamientos personales. ¿Podrían darme más información sobre horarios y precios?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const facilities = [
    'Suelo acolchado profesional de 100m²',
    'Vestuarios separados hombres/mujeres',
    'Duchas con agua caliente',
    'Aire acondicionado',
    'Equipo de sonido disponible',
    'Espejos de pared completa',
    'Almacenamiento para equipos',
    'Acceso independiente'
  ];

  const targetProfessionals = [
    'Entrenadores personales',
    'Instructores de yoga/pilates',
    'Fisioterapeutas',
    'Coaches de wellness',
    'Terapeutas deportivos',
    'Profesionales de rehabilitación'
  ];

  return (
    <section id="alquiler-espacio" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-600 text-white px-4 py-2">
            ALQUILER DE ESPACIO PROFESIONAL
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Alquila Nuestro Espacio en Burgos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Espacio profesional de 100m² disponible para entrenadores personales, instructores de yoga, fisioterapeutas y profesionales del wellness. Instalaciones modernas con horarios flexibles.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Facility Info */}
          <div className="space-y-8">
            <Card className="border-2 border-blue-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardTitle className="flex items-center text-xl">
                  <MapPin className="w-5 h-5 mr-2" />
                  Instalaciones Profesionales
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Todo lo necesario para tu actividad profesional
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-3">
                  {facilities.map((facility, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <CardTitle className="flex items-center text-xl">
                  <Clock className="w-5 h-5 mr-2" />
                  Horarios Disponibles
                </CardTitle>
                <CardDescription className="text-green-100">
                  Flexibilidad total para tu negocio
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-bold text-yellow-800 mb-2">🌅 Horarios Matutinos (Preferentes)</h4>
                    <p className="text-yellow-700 text-sm">
                      <strong>Lunes a Viernes:</strong> 6:00 - 11:00<br />
                      <strong>Sábados:</strong> 8:00 - 12:00<br />
                      <strong>Domingos:</strong> 9:00 - 13:00
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">🌙 Otros Horarios</h4>
                    <p className="text-blue-700 text-sm">
                      Consulta disponibilidad para tardes y noches según demanda
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Target Professionals & Contact */}
          <div className="space-y-8">
            <Card className="border-2 border-purple-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <CardTitle className="flex items-center text-xl">
                  <Users className="w-5 h-5 mr-2" />
                  ¿Eres Profesional del Wellness?
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Ideal para estos profesionales
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-3">
                  {targetProfessionals.map((professional, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 font-medium">{professional}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
                  <h4 className="font-bold text-purple-800 mb-2">💡 Ventajas para tu Negocio:</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Ubicación céntrica en Burgos</li>
                    <li>• Sin necesidad de inversión inicial</li>
                    <li>• Flexibilidad total de horarios</li>
                    <li>• Ambiente profesional y motivador</li>
                    <li>• Parking disponible para clientes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <CardTitle className="flex items-center text-xl">
                  <Calendar className="w-5 h-5 mr-2" />
                  Precios y Contacto
                </CardTitle>
                <CardDescription className="text-red-100">
                  Tarifas competitivas y flexibles
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 mb-2">💰 Tarifas Estimadas:</h4>
                    <div className="text-sm text-green-700">
                      <p><strong>Horario matutino:</strong> Desde €25/hora</p>
                      <p><strong>Paquetes mensuales:</strong> Descuentos disponibles</p>
                      <p><strong>Uso regular:</strong> Tarifas preferenciales</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">
                      Contacta para condiciones personalizadas
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        onClick={openWhatsApp}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button 
                        onClick={() => window.location.href = 'tel:+34947123456'}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Llamar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="max-w-4xl mx-auto border-2 border-yellow-300 shadow-2xl">
            <CardContent className="p-8 bg-gradient-to-r from-yellow-50 to-orange-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🏟️ ¿Necesitas un Espacio Profesional en Burgos?
              </h3>
              <p className="text-gray-700 mb-6 text-lg">
                Kaizen Burgos te ofrece instalaciones modernas y flexibilidad horaria para hacer crecer tu negocio. 
                Ideal para entrenadores personales, instructores de yoga, fisioterapeutas y profesionales del wellness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={openWhatsApp}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Consultar Disponibilidad
                </Button>
                <Button 
                  onClick={() => window.location.href = '/alquiler-espacios'}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Ver Más Detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}