import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Send, X, Clock, MapPin, Euro, Calendar, Phone } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickActions?: string[];
  showBookingForm?: boolean;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  discipline: string;
  preferredTime: string;
  message: string;
}

interface FAQ {
  keywords: string[];
  response: string;
  quickActions?: string[];
}

const gymFAQs: FAQ[] = [
  {
    keywords: ['horarios', 'horario', 'hora', 'abierto', 'cerrado', 'cuando', 'opening', 'schedule'],
    response: `🕐 **Horarios de Kaizen Burgos:**
    
**Lunes a Viernes:** 6:00 - 23:00
**Sábados:** 8:00 - 21:00  
**Domingos:** 9:00 - 20:00

*Clases matutinas disponibles martes y jueves 9:00-11:00*`,
    quickActions: ['Ver horarios de clases', 'Reservar clase']
  },
  {
    keywords: ['precio', 'precios', 'cuanto', 'cuesta', 'mensualidad', 'price', 'cost'],
    response: `💶 **Precios Kaizen Burgos:**

**🥊 Plan Individual** (1 disciplina): €15/mes
**🏆 Plan Completo** (2 disciplinas): €45/mes  
**👑 Plan Ilimitado** (todas las disciplinas): €80/mes
**👶 Plan Niños:** €35/mes

*Primera clase GRATIS para nuevos miembros*`,
    quickActions: ['Reservar clase gratis', 'Ver todas las disciplinas']
  },
  {
    keywords: ['ubicacion', 'direccion', 'donde', 'como llegar', 'location', 'address'],
    response: `📍 **Ubicación Kaizen Burgos:**

**Dirección:** Calle de la Puebla, 9, 09003 Burgos
**Teléfono:** +34 947 123 456
**Email:** info@kaizenburgos.com

🚗 Parking disponible
🚌 Transporte público: Líneas 5, 7, 12`,
    quickActions: ['Ver en Google Maps', 'Contactar por WhatsApp']
  },
  {
    keywords: ['disciplinas', 'clases', 'artes marciales', 'mma', 'bjj', 'jiu jitsu', 'kickboxing', 'boxeo', 'karate'],
    response: `🥋 **Disciplinas en Kaizen Burgos:**

**🔥 MMA** - Artes marciales mixtas
**🇧🇷 Brazilian Jiu-Jitsu** - Arte suave brasileño
**👊 Kickboxing** - Boxeo con piernas
**🥊 Boxeo** - Noble arte del pugilismo
**👶 Clases para Niños** - Todas las edades

*Instructores certificados y competidores activos*`,
    quickActions: ['Reservar clase gratis', 'Ver instructores']
  },
  {
    keywords: ['reservar', 'reserva', 'cita', 'clase', 'book', 'appointment', 'trial'],
    response: `📅 **Reservar tu clase en Kaizen:**

1️⃣ Elige tu disciplina favorita
2️⃣ Selecciona horario disponible  
3️⃣ Proporciona tus datos
4️⃣ ¡Confirma tu reserva!

**Primera clase GRATIS** para nuevos miembros 🎉`,
    quickActions: ['Reservar ahora', 'Ver horarios disponibles']
  },
  {
    keywords: ['entrenadores', 'instructores', 'profesores', 'trainers', 'coaches'],
    response: `👨‍🏫 **Equipo de Instructores:**

**🏆 Carlos Mendoza** - MMA & BJJ
*Campeón Nacional MMA 2019*

**🥊 Ana García** - Kickboxing & Boxeo  
*Ex-campeona europea kickboxing*

**🇧🇷 Miguel Santos** - Brazilian Jiu-Jitsu
*Cinturón negro 3er Dan*

*Todos nuestros instructores están certificados internacionalmente*`,
    quickActions: ['Ver más detalles', 'Conocer al equipo']
  },
  {
    keywords: ['equipamiento', 'material', 'que traer', 'equipment', 'gear'],
    response: `🎒 **¿Qué necesitas traer?**

**Para tu primera clase:**
✅ Ropa cómoda deportiva
✅ Toalla 
✅ Botella de agua
✅ Ganas de aprender

**Equipamiento disponible:**
🥊 Guantes de boxeo
🦺 Protecciones
🥋 Kimonos (alquiler)

*Todo el material básico está incluido*`,
    quickActions: ['Ver tienda', 'Reservar clase']
  }
];

export function KaizenChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy el asistente virtual de Kaizen Burgos 🥋\n\n¿En qué puedo ayudarte hoy? Puedo responder sobre horarios, precios, clases y hacer reservas.',
      isBot: true,
      timestamp: new Date(),
      quickActions: ['Ver horarios', 'Ver precios', 'Reservar clase', 'Ubicación']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    discipline: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestResponse = (userMessage: string): FAQ | null => {
    const normalizedInput = userMessage.toLowerCase();
    
    // Find FAQ with most keyword matches
    let bestMatch = null;
    let maxMatches = 0;

    for (const faq of gymFAQs) {
      const matches = faq.keywords.filter(keyword => 
        normalizedInput.includes(keyword.toLowerCase())
      ).length;
      
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = faq;
      }
    }

    return maxMatches > 0 ? bestMatch : null;
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Find and add bot response
    setTimeout(() => {
      const faqResponse = findBestResponse(text);
      
      let botResponse: Message;
      
      if (faqResponse) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: faqResponse.response,
          isBot: true,
          timestamp: new Date(),
          quickActions: faqResponse.quickActions
        };
      } else {
        // Default response for unmatched queries
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: `Lo siento, no entendí tu consulta. ¿Podrías ser más específico?\n\nPuedo ayudarte con:\n• Horarios y clases\n• Precios y planes\n• Ubicación del gimnasio\n• Reservas y citas\n• Información sobre disciplinas`,
          isBot: true,
          timestamp: new Date(),
          quickActions: ['Hablar con humano', 'Ver horarios', 'Ver precios', 'Reservar clase']
        };
      }

      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    if (action.toLowerCase().includes('reservar')) {
      setShowBookingForm(true);
      const bookingMessage: Message = {
        id: Date.now().toString(),
        text: '📅 ¡Perfecto! Te ayudo a reservar tu clase.\n\nCompleta el formulario y te contactaremos para confirmar tu primera clase GRATUITA.',
        isBot: true,
        timestamp: new Date(),
        showBookingForm: true
      };
      setMessages(prev => [...prev, bookingMessage]);
    } else {
      sendMessage(action);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await apiRequest('POST', '/api/chatbot/booking', bookingData);
      
      if (response.ok) {
        const result = await response.json();
        
        const confirmationMessage: Message = {
          id: Date.now().toString(),
          text: result.confirmationMessage,
          isBot: true,
          timestamp: new Date(),
          quickActions: ['Hacer otra consulta', 'Ver horarios', 'Cerrar chat']
        };
        
        setMessages(prev => [...prev, confirmationMessage]);
        setShowBookingForm(false);
        setBookingData({
          name: '',
          email: '',
          phone: '',
          discipline: '',
          preferredTime: '',
          message: ''
        });
      } else {
        throw new Error('Error al enviar reserva');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Lo siento, hubo un error al procesar tu reserva. Por favor intenta de nuevo o contáctanos directamente al +34 947 123 456.',
        isBot: true,
        timestamp: new Date(),
        quickActions: ['Intentar de nuevo', 'Contactar por teléfono']
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    
    setIsSubmitting(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-96 shadow-2xl z-50 flex flex-col">
      <CardHeader className="bg-red-600 text-white rounded-t-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <CardTitle className="text-lg">Kaizen Assistant</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.isBot 
                  ? 'bg-gray-100 text-gray-800' 
                  : 'bg-red-600 text-white'
              }`}>
                <div className="whitespace-pre-line text-sm">{message.text}</div>
                
                {message.quickActions && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {message.quickActions.map((action, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-red-100 text-xs"
                        onClick={() => handleQuickAction(action)}
                      >
                        {action}
                      </Badge>
                    ))}
                  </div>
                )}

                {message.showBookingForm && showBookingForm && (
                  <form onSubmit={handleBookingSubmit} className="mt-4 space-y-3 bg-white p-3 rounded border">
                    <div>
                      <Input
                        placeholder="Tu nombre completo"
                        value={bookingData.name}
                        onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={bookingData.email}
                        onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="tel"
                        placeholder="Teléfono (opcional)"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Select value={bookingData.discipline} onValueChange={(value) => setBookingData(prev => ({ ...prev, discipline: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Elige disciplina" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MMA">MMA - Artes Marciales Mixtas</SelectItem>
                          <SelectItem value="BJJ">Brazilian Jiu-Jitsu</SelectItem>
                          <SelectItem value="Kickboxing">Kickboxing</SelectItem>
                          <SelectItem value="Boxeo">Boxeo</SelectItem>
                          <SelectItem value="Niños">Clases para Niños</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select value={bookingData.preferredTime} onValueChange={(value) => setBookingData(prev => ({ ...prev, preferredTime: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Horario preferido" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mañana (9:00-12:00)">Mañana (9:00-12:00)</SelectItem>
                          <SelectItem value="Tarde (16:00-19:00)">Tarde (16:00-19:00)</SelectItem>
                          <SelectItem value="Noche (19:00-22:00)">Noche (19:00-22:00)</SelectItem>
                          <SelectItem value="Fin de semana">Fin de semana</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Input
                        placeholder="Mensaje adicional (opcional)"
                        value={bookingData.message}
                        onChange={(e) => setBookingData(prev => ({ ...prev, message: e.target.value }))}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={isSubmitting || !bookingData.name || !bookingData.email || !bookingData.discipline} className="flex-1 bg-red-600 hover:bg-red-700">
                        {isSubmitting ? 'Enviando...' : 'Enviar Reserva'}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowBookingForm(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t p-3">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1"
            />
            <Button type="submit" size="icon" className="bg-red-600 hover:bg-red-700">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          
          <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
            Asistente online 24/7
          </div>
        </div>
      </CardContent>
    </Card>
  );
}