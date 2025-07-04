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

Individual: €15/mes
Completo: €45/mes  
Ilimitado: €80/mes

*Primera clase GRATIS*`,

  'alquiler': `🏢 **Alquila Espacio Profesional en Gamonal (Burgos)**

¿Eres instructor de yoga, danza, pilates, o entrenador personal?
Te ofrecemos un espacio exclusivo y de alta calidad.

**🏢 Instalaciones:**
• 100 m² de sala diáfana
• Espejos de pared completa
• Vestuarios masculinos y femeninos
• Excelente ubicación en Gamonal

**💼 Ideal para:**
✅ Clases dirigidas
✅ Sesiones privadas  
✅ Talleres y eventos

**💸 Tarifas:**
• Desde 25€/hora (alquiler puntual)
• Bonos especiales para uso mensual
• Sin inversión inicial
• Sin compromiso a largo plazo

**Disponibilidad mañanas y tardes**
WhatsApp: +34 662 323 282`,

  'ubicacion': `📍 **Ubicación:**

C. Esteban Sáez Alvarado, 8
09007 Burgos, España
Tel: +34 662 323 282`,

  'reservar': `📅 **Reservar Clase:**

Elige el tipo de reserva:
• Clases regulares (tarde)
• Clases mañana (6:00-11:00)
• Clases particulares

¿Qué tipo prefieres?`
};

export function SimpleChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! 👋\n\n¿En qué puedo ayudarte?',
      isBot: true,
      timestamp: new Date(),
      quickActions: ['Horarios', 'Precios', 'Reservar', 'Alquiler']
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
        actions = ['Precios', 'Clase gratis'];
      } else if (actionText.includes('precio')) {
        response = quickResponses.precios;
        actions = ['Clase gratis', 'Horarios'];
      } else if (actionText.includes('alquiler')) {
        response = quickResponses.alquiler;
        actions = ['WhatsApp', 'Más info'];
      } else if (actionText.includes('ubicacion') || actionText.includes('donde')) {
        response = quickResponses.ubicacion;
        actions = ['Google Maps', 'Llamar'];
      } else if (actionText.includes('reservar')) {
        response = quickResponses.reservar;
        actions = ['Clases regulares', 'Clases mañana', 'Clase particular'];
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
    <Card className="fixed bottom-4 right-4 w-80 h-[450px] shadow-2xl z-50 flex flex-col">
      <CardHeader className="bg-red-600 text-white rounded-t-lg p-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">💬 Kaizen Chat</CardTitle>
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

      <CardContent className="flex-1 flex flex-col p-0 min-h-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ maxHeight: '320px' }}>
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
        <div className="border-t p-2 bg-gray-50 flex-shrink-0">
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