import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickActions?: string[];
  showBookingCalendar?: boolean;
}

const quickResponses = {
  'horarios': `🕐 **Horarios:**

L-V: 6:00-23:00
S: 8:00-21:00  
D: 9:00-20:00`,
  
  'precios': `💶 **Precios:**

Kickboxing: €45/mes
Combinar 2 disciplinas: €60/mes
BJJ - 2 días: €50/mes
BJJ - 3 días: €60/mes
BJJ - 4 días: €70/mes
Boxeo: €40/mes
MMA: €40/mes
Tarifa Plana: €80/mes

*Primera clase GRATIS*`,

  'alquiler': `Alquila un espacio profesional en Gamonal (Burgos) 🧘‍♀️🕺
¿Eres instructor de yoga, danza, pilates, o entrenador personal?
Te ofrecemos un espacio exclusivo y de alta calidad para tus clases.

🏢 100 m² de sala diáfana
🪞 Espejos de pared completa
🚿 Vestuarios masculinos y femeninos
🌞 Disponibilidad por las mañanas y tardes
📍 En el corazón de Gamonal – excelente ubicación

💼 Ideal para:
✅ Clases dirigidas
✅ Sesiones privadas
✅ Talleres y eventos

💸 Tarifas:
🔹 Desde 25 €/hora (alquiler puntual)
🔹 Bonos especiales para alquiler fijo mensual o por franjas horarias
🔹 Consulta precios para uso exclusivo de mañana o tarde

Espacio profesional, sin inversión inicial, sin compromiso a largo plazo

📩 Escríbeme para agendar una visita o reservar tu horario`,

  'ubicacion': `📍 **Ubicación:**

C. Esteban Sáez Alvarado, 8
09007 Burgos, España
Tel: +34 662 323 282

🚗 Parking disponible
🚌 Transporte público accesible`,

  'reservar': `📅 **Reserva tu Primera Clase GRATIS:**

🥋 **Disciplinas disponibles:**
• Brazilian Jiu-Jitsu con Rubén Sancho (Cinturón Marrón)
• Kickboxing con Eduardo (Instructor Certificado)
• MMA - Artes Marciales Mixtas
• Boxeo - Técnica y acondicionamiento

⏰ **Horarios:**
• Lunes a Viernes: 18:00-22:30
• Sábados: 11:00-13:00 (Open Mat)
• Clases matutinas: Mar/Jue 9:00-11:00

¿Qué disciplina te interesa probar?`,

  'disciplinas': `🥋 **Nuestras Disciplinas:**

🇧🇷 **Brazilian Jiu-Jitsu**
Instructor: Rubén Sancho (Cinturón Marrón)
• Técnicas de grappling y sumisión
• Competidor con múltiples podios nacionales
• Clases Gi y No-Gi

👊 **Kickboxing**
Instructor: Eduardo
• Combinaciones de puños y patadas
• Acondicionamiento físico completo
• Técnicas de defensa personal

🥊 **MMA - Artes Marciales Mixtas**
• Combinación de striking y grappling
• Preparación integral de combate
• Técnicas de todas las distancias

🥊 **Boxeo**
• Arte del pugilismo clásico
• Técnica de golpeo con manos
• Trabajo de saco y sparring controlado

👶 **Jiu Jitsu Kids/Infantil**
• Programa especializado 6-12 años
• Valores: respeto, disciplina, anti-bullying
• Desarrollo físico y mental`
};

export function SimpleChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bienvenido a KaizenAcademy改善Burgos 🥋\n\nSoy tu asistente virtual. ¿Cómo puedo ayudarte hoy?',
      isBot: true,
      timestamp: new Date(),
      quickActions: ['Horarios', 'Precios', 'Clase gratis', 'Alquiler espacio']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simple keyword matching
    setTimeout(() => {
      const text = inputText.toLowerCase();
      let response = '';
      let actions: string[] = [];

      if (text.includes('horario') || text.includes('hora')) {
        response = quickResponses.horarios;
        actions = ['Precios', 'Clase gratis'];
      } else if (text.includes('precio') || text.includes('cuesta')) {
        response = quickResponses.precios;
        actions = ['Clase gratis', 'Horarios'];
      } else if (text.includes('alquiler') || text.includes('entrenador')) {
        response = quickResponses.alquiler;
        actions = ['WhatsApp', 'Más info'];
      } else if (text.includes('donde') || text.includes('ubicacion')) {
        response = quickResponses.ubicacion;
        actions = ['Google Maps', 'Llamar'];
      } else if (text.includes('reservar') || text.includes('cita') || text.includes('calendario')) {
        response = quickResponses.reservar;
        actions = ['Clases regulares', 'Clases mañana', 'Clase particular'];
      } else {
        response = 'No entendí tu pregunta.\n\nPuedo ayudarte con:\n• Horarios\n• Precios\n• Reservar\n• Alquiler';
        actions = ['Horarios', 'Precios', 'Reservar'];
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
        quickActions: actions
      };

      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleQuickAction = (action: string) => {
    const actionText = action.toLowerCase();
    
    // Handle external actions immediately
    if (actionText.includes('gratis')) {
      window.location.href = '#contacto';
      return;
    } else if (actionText.includes('whatsapp reserva')) {
      window.open('https://wa.me/34662323282?text=Hola, quiero reservar una clase particular. ¿Cuándo podemos coordinar?', '_blank');
      return;
    } else if (actionText.includes('whatsapp')) {
      window.open('https://wa.me/34662323282?text=Hola, estoy interesado en alquilar espacio', '_blank');
      return;
    } else if (actionText.includes('google maps')) {
      window.open('https://maps.google.com/?q=C.+Esteban+Sáez+Alvarado+8+Burgos', '_blank');
      return;
    } else if (actionText.includes('llamar')) {
      window.open('tel:+34662323282', '_blank');
      return;
    }

    // Add user message first
    const userMessage: Message = {
      id: Date.now().toString(),
      text: action,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Generate automatic response based on action
    setTimeout(() => {
      let response = '';
      let actions: string[] = [];

      if (actionText.includes('horario')) {
        response = quickResponses.horarios;
        actions = ['Precios', 'Disciplinas', 'Clase gratis'];
      } else if (actionText.includes('precio')) {
        response = quickResponses.precios;
        actions = ['Clase gratis', 'Disciplinas', 'Ubicación'];
      } else if (actionText.includes('alquiler')) {
        response = quickResponses.alquiler;
        actions = ['WhatsApp alquiler', 'Más información', 'Ubicación'];
      } else if (actionText.includes('ubicacion') || actionText.includes('donde')) {
        response = quickResponses.ubicacion;
        actions = ['Google Maps', 'Llamar', 'Horarios'];
      } else if (actionText.includes('reservar') || actionText.includes('clase gratis')) {
        response = quickResponses.reservar;
        actions = ['BJJ', 'Kickboxing', 'MMA', 'Boxeo'];
      } else if (actionText.includes('disciplinas')) {
        response = quickResponses.disciplinas;
        actions = ['Clase gratis', 'Precios', 'Instructores'];
      } else if (actionText.includes('clases regulares')) {
        response = `📅 **Clases Regulares:**

Horarios disponibles hoy:
• 19:00-20:00 - Boxeo
• 19:00-20:30 - Brazilian Jiu Jitsu  
• 20:00-21:30 - Kickboxing
• 20:30-21:45 - MMA

¿Qué clase te interesa?`;
        actions = ['BJJ 19:00', 'Boxeo 19:00', 'Kickboxing 20:00', 'MMA 20:30'];
      } else if (actionText.includes('clases mañana')) {
        response = `🌅 **Clases Mañana:**

Horarios disponibles:
• Martes 09:00-11:00 - MMA Mañana
• Jueves 09:00-11:00 - MMA Mañana  
• Sábado 11:00-13:00 - Open Mat

¿Cuál prefieres?`;
        actions = ['MMA Mar 9:00', 'MMA Jue 9:00', 'Open Mat Sab 11:00'];
      } else if (actionText.includes('clase particular')) {
        response = `👨‍🏫 **Clase Particular:**

Entrenamientos personalizados:
• 1 hora individual: €30
• Horarios flexibles 
• Todos los niveles

¿Te interesa reservar?`;
        actions = ['WhatsApp reserva', 'Llamar'];
      } else if (actionText.includes('bjj') || actionText.includes('boxeo') || actionText.includes('kickboxing') || actionText.includes('mma') || actionText.includes('open mat')) {
        response = `✅ **Reserva Confirmada:**

Tu clase ha sido registrada.
Recibirás confirmación por WhatsApp.

¡Te esperamos en Kaizen!`;
        actions = ['WhatsApp', 'Más clases', 'Horarios'];
      } else {
        response = 'Perfecto. ¿En qué más puedo ayudarte?';
        actions = ['Horarios', 'Precios', 'Reservar'];
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
        quickActions: actions
      };

      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 shadow-2xl z-50 p-0"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 sm:w-96 h-[450px] sm:h-[500px] shadow-2xl z-50 flex flex-col">
      <CardHeader className="bg-red-600 text-white rounded-t-lg p-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">💬 KaizenAcademy改善Burgos</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-red-700 p-1"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 min-h-0 bg-gradient-to-br from-white to-gray-50 relative">
        {/* Subtle BJJ Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.08'%3E%3Cpath d='M20 20m-3 0a3 3 0 1 1 6 0a3 3 0 1 1 -6 0'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px'
          }}>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 relative z-10" style={{ maxHeight: '320px' }}>
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-2 rounded-lg text-xs ${
                message.isBot 
                  ? 'bg-gray-100 text-gray-800' 
                  : 'bg-red-600 text-white'
              }`}>
                <div className="whitespace-pre-line">{message.text}</div>
                
                {message.quickActions && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {message.quickActions.map((action, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-red-100 text-xs px-2 py-1"
                        onClick={() => handleQuickAction(action)}
                      >
                        {action}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-2 bg-white/80 backdrop-blur-sm flex-shrink-0 relative z-10">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Pregunta..."
              className="flex-1 text-xs"
            />
            <Button type="submit" size="sm" className="bg-red-600 hover:bg-red-700 p-2">
              <Send className="h-3 w-3" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}