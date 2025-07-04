import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Users, Euro, MapPin, Star, ArrowLeft, CalendarDays, Check, X } from 'lucide-react';
import { Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';

interface SpaceRental {
  id: number;
  name: string;
  description: string;
  pricePerHour: number;
  capacity: number;
  amenities: string[];
  availableHours: string[];
  imageUrl: string;
  rating: number;
  bookingsCount: number;
}

const spaceRentals: SpaceRental[] = [
  {
    id: 1,
    name: 'Espacio Principal para Entrenadores',
    description: 'Sala principal de 100m² ideal para entrenamiento personal, yoga, pilates y terapias. Suelo acolchado, vestuarios separados y acceso independiente.',
    pricePerHour: 25,
    capacity: 8,
    amenities: ['Suelo acolchado 100m²', 'Vestuarios hombre/mujer', 'Duchas', 'Aire acondicionado', 'Espejos', 'Equipo de sonido'],
    availableHours: ['06:00-11:00', '20:00-22:00'],
    imageUrl: '/api/placeholder/600/400',
    rating: 4.9,
    bookingsCount: 45
  },
  {
    id: 2,
    name: 'Sala Wellness & Terapias',
    description: 'Espacio tranquilo de 60m² perfecto para fisioterapia, terapias de rehabilitación y entrenamientos suaves.',
    pricePerHour: 30,
    capacity: 6,
    amenities: ['Ambiente relajado', 'Camilla disponible', 'Vestuarios privados', 'Calefacción', 'Música ambiental'],
    availableHours: ['07:00-12:00', '19:00-21:00'],
    imageUrl: '/api/placeholder/600/400',
    rating: 4.8,
    bookingsCount: 28
  },
  {
    id: 3,
    name: 'Zona Funcional Matutina',
    description: 'Área de 80m² equipada para entrenamientos funcionales, crossfit y acondicionamiento físico matutino.',
    pricePerHour: 35,
    capacity: 10,
    amenities: ['Equipamiento funcional', 'TRX', 'Kettlebells', 'Esterillas yoga', 'Pesas libres', 'Cronómetro'],
    availableHours: ['06:00-10:00', '21:00-23:00'],
    imageUrl: '/api/placeholder/600/400',
    rating: 4.7,
    bookingsCount: 52
  }
];

export default function SpaceRental() {
  const [selectedSpace, setSelectedSpace] = useState<SpaceRental | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [viewMode, setViewMode] = useState<'spaces' | 'calendar' | 'booking'>('spaces');
  const [bookingForm, setBookingForm] = useState({
    date: '',
    startTime: '',
    endTime: '',
    participants: '',
    purpose: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const { toast } = useToast();

  // Generate calendar dates for next 30 days
  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Mock availability data - in real app this would come from database
  const getAvailabilityForDate = (date: Date, spaceId: number) => {
    const dayOfWeek = date.getDay();
    const morningSlots = [
      '06:00-07:00', '07:00-08:00', '08:00-09:00', 
      '09:00-10:00', '10:00-11:00'
    ];
    
    // Mock some bookings to show realistic availability
    const mockBookings = Math.random() > 0.7 ? 1 : 0; // Random bookings
    return morningSlots.slice(mockBookings);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  // SEO optimization for local search
  useEffect(() => {
    document.title = 'Alquiler Espacio Gimnasio Burgos | Entrenadores Personales | Kaizen Burgos';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Alquila espacio profesional en Burgos para entrenamiento personal, yoga, pilates y fisioterapia. Gimnasio Kaizen - 100m², vestuarios, horarios flexibles desde €25/hora.'
      );
    }

    // Add local SEO keywords meta tag
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', 
      'alquiler espacio gimnasio burgos, entrenador personal burgos, alquiler sala yoga burgos, espacio fisioterapia burgos, alquiler gimnasio por horas, sala entrenamiento burgos, espacio wellness burgos, alquiler sala deportiva'
    );

    return () => {
      document.title = 'Kaizen Burgos - Gimnasio de Artes Marciales';
    };
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSpace) return;
    
    // Calculate total cost
    const startHour = parseInt(bookingForm.startTime.split(':')[0]);
    const endHour = parseInt(bookingForm.endTime.split(':')[0]);
    const totalHours = endHour - startHour;
    const totalCost = totalHours * selectedSpace.pricePerHour;

    toast({
      title: "Solicitud de Reserva Enviada",
      description: `Tu solicitud para ${selectedSpace.name} ha sido enviada. Te contactaremos pronto para confirmar.`,
    });

    // Reset form
    setBookingForm({
      date: '',
      startTime: '',
      endTime: '',
      participants: '',
      purpose: '',
      name: '',
      email: '',
      phone: '',
      notes: ''
    });
    setSelectedSpace(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-blue-900 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center text-white hover:text-blue-400 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver al Gimnasio
            </Link>
          </div>

          <div className="text-center py-8">
            <h1 className="text-5xl font-black bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent mb-6">
              ALQUILER DE ESPACIO PROFESIONAL
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Espacio premium disponible para profesionales del fitness y bienestar.<br/>
              Instalaciones modernas con equipamiento completo para desarrollar tu actividad profesional.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left mb-8">
              {/* Instalaciones */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">Instalaciones</h3>
                <ul className="text-gray-200 space-y-2">
                  <li>• 100 m² de sala diáfana</li>
                  <li>• Espejos de pared completa</li>
                  <li>• Vestuarios masculinos y femeninos</li>
                  <li>• Disponibilidad mañanas y tardes</li>
                  <li>• Excelente ubicación en Burgos</li>
                </ul>
              </div>

              {/* Ideal para */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">Ideal para:</h3>
                <ul className="text-gray-200 space-y-2">
                  <li>• Clases dirigidas</li>
                  <li>• Sesiones privadas</li>
                  <li>• Talleres y eventos</li>
                  <li>• Entrenamientos personales</li>
                </ul>
              </div>

              {/* Tarifas */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">Tarifas:</h3>
                <ul className="text-gray-200 space-y-2">
                  <li>• Desde 25 €/hora (alquiler puntual)</li>
                  <li>• Bonos especiales para alquiler fijo mensual</li>
                  <li>• Consulta precios para uso exclusivo</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full inline-block font-bold text-lg shadow-xl mb-6">
              Espacio profesional, sin inversión inicial, sin compromiso a largo plazo
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-white mb-4 text-center">Contacto</h3>
              <p className="text-gray-200 text-center mb-4">Contacta para agendar una visita o reservar tu horario</p>
              <div className="flex justify-center space-x-4">
                <a 
                  href="https://wa.me/34662323282?text=Hola, estoy interesado en alquilar espacio profesional para clases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  WhatsApp
                </a>
                <a 
                  href="tel:+34662323282"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Llamar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {viewMode === 'spaces' ? (
          /* Space Selection */
          <div>
            {/* Testimonials Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Lo que dicen nuestros profesionales</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">🧘‍♀️</div>
                    <div>
                      <h4 className="font-bold text-gray-900">María González</h4>
                      <p className="text-sm text-gray-600">Instructora de Yoga</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"Espacio perfecto para mis clases matutinas. Los espejos y la amplitud hacen que mis estudiantes se sientan cómodos. Sin inversión inicial, pude empezar inmediatamente."</p>
                  <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">💪</div>
                    <div>
                      <h4 className="font-bold text-gray-900">Carlos Ruiz</h4>
                      <p className="text-sm text-gray-600">Entrenador Personal</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"Ideal para entrenamientos funcionales. Los vestuarios y el acceso independiente me permiten ofrecer un servicio profesional a mis clientes."</p>
                  <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">🩺</div>
                    <div>
                      <h4 className="font-bold text-gray-900">Ana Martín</h4>
                      <p className="text-sm text-gray-600">Fisioterapeuta</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"El ambiente tranquilo y profesional es perfecto para terapias. La flexibilidad horaria me permite adaptarme a las necesidades de mis pacientes."</p>
                  <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Elige tu Espacio</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Instalaciones profesionales equipadas con todo lo necesario para entrenamientos de alto nivel.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {spaceRentals.map((space) => (
                <Card key={space.id} className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-blue-200 overflow-hidden transform hover:-translate-y-2">
                  <CardHeader className="p-0 relative">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-gray-200 flex items-center justify-center text-6xl">
                      🏟️
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-500 text-white font-bold">
                        <Star className="w-3 h-3 mr-1" />
                        {space.rating}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                          {space.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">{space.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-blue-600">€{space.pricePerHour}/h</span>
                        <div className="text-right text-sm text-gray-500">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {space.capacity} personas
                          </div>
                          <p>{space.bookingsCount} reservas</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-gray-700 mb-2">Equipamiento incluido:</h4>
                        <div className="flex flex-wrap gap-1">
                          {space.amenities.slice(0, 3).map((amenity, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {space.amenities.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{space.amenities.length - 3} más
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-gray-700 mb-2">Horarios disponibles:</h4>
                        <div className="flex flex-wrap gap-1">
                          {space.availableHours.map((hour, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {hour}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button 
                        onClick={() => {
                          setSelectedSpace(space);
                          setViewMode('calendar');
                        }}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-200"
                      >
                        <CalendarDays className="w-4 h-4 mr-2" />
                        VER DISPONIBILIDAD
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : viewMode === 'calendar' && selectedSpace ? (
          /* Calendar View */
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-2 border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{selectedSpace?.name}</CardTitle>
                    <CardDescription className="text-blue-100">
                      €{selectedSpace?.pricePerHour}/hora | Selecciona fecha y hora
                    </CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setViewMode('spaces');
                      setSelectedSpace(null);
                    }}
                    className="text-white hover:bg-blue-800"
                  >
                    ← Volver
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Calendar Grid */}
                  <div>
                    <h3 className="font-bold text-lg mb-4">📅 Selecciona una fecha:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-2">
                      {generateCalendarDates().map((date, index) => {
                        const availability = selectedSpace ? getAvailabilityForDate(date, selectedSpace.id) : [];
                        const isAvailable = availability.length > 0;
                        const isSelected = selectedDate?.toDateString() === date.toDateString();
                        
                        return (
                          <Button
                            key={index}
                            variant={isSelected ? "default" : "outline"}
                            className={`p-3 h-auto flex flex-col text-xs ${
                              isAvailable 
                                ? isSelected 
                                  ? 'bg-blue-600 text-white' 
                                  : 'hover:bg-blue-50 border-blue-200'
                                : 'opacity-50 cursor-not-allowed bg-gray-100'
                            }`}
                            onClick={() => {
                              if (isAvailable) {
                                setSelectedDate(date);
                                setSelectedTimeSlot('');
                              }
                            }}
                            disabled={!isAvailable}
                          >
                            <span className="font-bold">{date.getDate()}</span>
                            <span className="text-xs">{formatDate(date).split(' ')[0]}</span>
                            {isAvailable ? (
                              <Badge variant="secondary" className="text-xs mt-1">
                                <Check className="w-2 h-2 mr-1" />
                                {availability.length}
                              </Badge>
                            ) : (
                              <Badge variant="destructive" className="text-xs mt-1">
                                <X className="w-2 h-2 mr-1" />
                                0
                              </Badge>
                            )}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <div>
                      <h3 className="font-bold text-lg mb-4">⏰ Horarios disponibles para {formatDate(selectedDate)}:</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedSpace && getAvailabilityForDate(selectedDate, selectedSpace.id).map((timeSlot, index) => (
                          <Button
                            key={index}
                            variant={selectedTimeSlot === timeSlot ? "default" : "outline"}
                            className={`p-4 ${
                              selectedTimeSlot === timeSlot 
                                ? 'bg-green-600 text-white' 
                                : 'hover:bg-green-50 border-green-200'
                            }`}
                            onClick={() => setSelectedTimeSlot(timeSlot)}
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            {timeSlot}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Booking Summary */}
                  {selectedDate && selectedTimeSlot && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-bold text-green-800 mb-2">✅ Resumen de tu reserva:</h4>
                      <div className="text-sm text-green-700">
                        <p><strong>Espacio:</strong> {selectedSpace?.name}</p>
                        <p><strong>Fecha:</strong> {selectedDate.toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</p>
                        <p><strong>Hora:</strong> {selectedTimeSlot}</p>
                        <p><strong>Precio:</strong> €{selectedSpace?.pricePerHour}/hora</p>
                      </div>
                      
                      <Button 
                        onClick={() => setViewMode('booking')}
                        className="w-full mt-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3"
                      >
                        📋 COMPLETAR RESERVA
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Booking Form */
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-2 border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{selectedSpace?.name}</CardTitle>
                    <CardDescription className="text-blue-100">
                      €{selectedSpace?.pricePerHour}/hora | Capacidad: {selectedSpace?.capacity} personas
                    </CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedSpace(null)}
                    className="text-white hover:bg-blue-800"
                  >
                    ← Volver
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Fecha de Reserva *</label>
                      <Input
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                        required
                        className="border-2 hover:border-blue-300 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Número de Participantes *</label>
                      <Input
                        type="number"
                        min="1"
                        max={selectedSpace?.capacity || 10}
                        value={bookingForm.participants}
                        onChange={(e) => setBookingForm({...bookingForm, participants: e.target.value})}
                        required
                        className="border-2 hover:border-blue-300 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Hora de Inicio *</label>
                      <Input
                        type="time"
                        value={bookingForm.startTime}
                        onChange={(e) => setBookingForm({...bookingForm, startTime: e.target.value})}
                        required
                        className="border-2 hover:border-blue-300 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Hora de Fin *</label>
                      <Input
                        type="time"
                        value={bookingForm.endTime}
                        onChange={(e) => setBookingForm({...bookingForm, endTime: e.target.value})}
                        required
                        className="border-2 hover:border-blue-300 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Evento/Entrenamiento *</label>
                    <Input
                      value={bookingForm.purpose}
                      onChange={(e) => setBookingForm({...bookingForm, purpose: e.target.value})}
                      placeholder="Ej: Entrenamiento privado BJJ, Seminario de MMA, Clase corporativa..."
                      required
                      className="border-2 hover:border-blue-300 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo *</label>
                      <Input
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                        required
                        className="border-2 hover:border-blue-300 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                      <Input
                        type="email"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                        required
                        className="border-2 hover:border-blue-300 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono *</label>
                      <Input
                        type="tel"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                        required
                        className="border-2 hover:border-blue-300 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Notas Adicionales</label>
                    <Textarea
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                      placeholder="Equipamiento especial, necesidades específicas, número de instructores..."
                      rows={3}
                      className="border-2 hover:border-blue-300 focus:border-blue-500"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">Resumen de la Reserva:</h4>
                    <div className="text-sm text-blue-700">
                      <p>• Espacio: {selectedSpace?.name}</p>
                      <p>• Precio: €{selectedSpace?.pricePerHour}/hora</p>
                      <p>• Capacidad máxima: {selectedSpace?.capacity} personas</p>
                      <p>• Equipamiento incluido</p>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 text-lg rounded-lg shadow-xl"
                  >
                    📅 ENVIAR SOLICITUD DE RESERVA
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}