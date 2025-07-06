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
  'horarios': `📅 **Horarios de Clases:**

**Lunes a Viernes:**
• 17:00-18:00: BJJ Infantil (6-12 años)
• 18:00-19:30: BJJ Adultos
• 19:30-21:00: Kickboxing/MMA
• 21:00-22:30: BJJ Avanzado

**Sábados:**
• 11:00-13:00: Open Mat/Sparring

**Domingos: CERRADO**

**Clases Matutinas:**
• Martes/Jueves: 9:00-11:00 (MMA)

¿Qué disciplina te interesa?`,
  
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

  'ubicacion': `📍 **Nuestra Ubicación:**

**KaizenAcademy改善Burgos**
C. Esteban Sáez Alvarado, 8
09007 Burgos, España

📞 Teléfono: +34 662 323 282
📧 Email: info@kaizenburgos.com

🚗 Parking disponible
🚌 Transporte público accesible
🗺️ Zona Gamonal - Fácil acceso

¿Necesitas indicaciones específicas?`,

  'reservar': `📅 **Reserva tu Primera Clase GRATIS:**

🥋 **Disciplinas disponibles:**
• Brazilian Jiu-Jitsu (Rubén Sancho, Pablo Mate)
• Kickboxing (Eduardo)
• MMA - Artes Marciales Mixtas
• Boxeo - Técnica y acondicionamiento

⏰ **Horarios disponibles:**
• Lunes a Viernes: 17:00-22:30
• Sábados: 11:00-13:00
• Domingos: CERRADO

📞 **Reserva ahora:**
• Llama: +34 662 323 282
• WhatsApp: +34 662 323 282

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
• Desarrollo físico y mental`,

  'instructores': `👨‍🏫 **Nuestro Equipo de Instructores:**

🥋 **Antonio Alonso - Fundador**
• Profesor de Artes Marciales
• Faixa Preta BJJ y Cinturón Negro Judo
• +45 años de experiencia
• Maestro Entrenador Nacional

🥋 **Pablo Mate - Profesor**  
• Faixa Preta BJJ 1° Grado
• Cinturón Negro Judo 1° Dan
• 15 años en la academia

🥊 **Eduardo - Instructor Kickboxing**
• Especialista en striking
• Campeón nacional
• Técnicas de defensa personal

🇧🇷 **Rubén Sancho - Instructor BJJ**
• Faixa Marrón (Brown Belt)
• Competidor activo
• Especialista Gi y No-Gi`,

  'mas_informacion': `ℹ️ **Más Información:**

📍 **Ubicación:** C. Esteban Sáez Alvarado, 8, Burgos
📞 **Teléfono:** +34 662 323 282
📧 **Email:** info@kaizenburgos.com

🌟 **Beneficios únicos:**
• Primera clase GRATIS
• Instructores certificados
• Ambiente familiar y profesional
• Equipamiento de alta calidad
• Filosofía Kaizen (mejora continua)

💪 **Para todos los niveles:**
• Principiantes bienvenidos
• Clases adaptadas por edades
• Programas de competición
• Desarrollo personal y físico`
};

export function SimpleChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bienvenido a KaizenAcademy改善Burgos 🥋\n\nSoy tu asistente virtual. ¿Cómo puedo ayudarte hoy?',
      isBot: true,
      timestamp: new Date(),
      quickActions: ['Horarios', 'Precios', 'Ubicación', 'Clase gratis']
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
    if (actionText.includes('gratis') || actionText.includes('clase gratis')) {
      window.open('https://wa.me/34662323282?text=¡Hola%20KaizenAcademy改善Burgos!%20🥋%0A%0AQuiero%20reservar%20mi%20CLASE%20GRATUITA%20de%20prueba.%0A%0A¿Podrían%20ayudarme%20con:%0A•%20Horarios%20disponibles%20esta%20semana%0A•%20Qué%20disciplina%20me%20recomiendan%0A•%20Qué%20debo%20traer%20a%20mi%20primera%20clase%0A•%20Confirmar%20que%20es%20100%25%20gratis%0A%0AMis%20horarios%20preferidos:%20_______%0AEstoy%20interesado/a%20en:%20_______%0A%0A¡Muchas%20gracias!', '_blank');
      return;
    } else if (actionText.includes('whatsapp reserva')) {
      window.open('https://wa.me/34662323282?text=¡Hola%20KaizenAcademy改善Burgos!%20🥋%0A%0AQuiero%20reservar%20una%20clase%20particular%20personalizada.%0A%0A¿Podrían%20ayudarme%20con:%0A•%20Disponibilidad%20de%20instructores%0A•%20Horarios%20para%20clases%20privadas%0A•%20Precios%20por%20sesión%0A•%20Qué%20disciplina%20recomiendan%0A%0AMis%20horarios%20preferidos:%20_______%0AObjetivos:%20_______%0A%0A¡Gracias!', '_blank');
      return;
    } else if (actionText.includes('whatsapp alquiler')) {
      window.open('https://wa.me/34662323282?text=¡Hola%20KaizenAcademy改善Burgos!%20🏋️‍♀️💼%0A%0ASoy%20entrenador%20personal%20y%20estoy%20interesado%20en%20alquilar%20espacio%20para%20mis%20clientes.%0A%0A¿Podrían%20informarme%20sobre:%0A•%20Horarios%20matutinos%20disponibles%0A•%20Precios%20por%20hora/sesión%0A•%20Equipamiento%20incluido%0A•%20Proceso%20de%20reserva%0A%0AMi%20especialidad:%20_______%0AClientes%20estimados:%20_______%0A%0A¡Espero%20trabajar%20juntos!', '_blank');
      return;
    } else if (actionText.includes('whatsapp')) {
      window.open('https://wa.me/34662323282?text=¡Hola%20KaizenAcademy改善Burgos!%20👋%0A%0ATengo%20consultas%20sobre%20la%20academia%20y%20las%20clases.%0A%0A¿Podrían%20ayudarme%20con:%0A•%20Información%20general%0A•%20Horarios%20y%20precios%0A•%20Primera%20clase%20gratuita%0A•%20Disciplinas%20disponibles%0A%0A¡Muchas%20gracias!', '_blank');
      return;
    } else if (actionText.includes('google maps')) {
      window.open('https://maps.google.com/?q=C.+Esteban+Sáez+Alvarado+8+Burgos', '_blank');
      return;
    } else if (actionText.includes('llamar')) {
      window.open('tel:+34662323282', '_blank');
      return;
    } else if (actionText.includes('bjj')) {
      window.open('https://wa.me/34662323282?text=¡Hola%20KaizenAcademy改善Burgos!%20🥋%0A%0AQuiero%20probar%20mi%20CLASE%20GRATUITA%20de%20Brazilian%20Jiu-Jitsu.%0A%0A¿Podrían%20ayudarme%20con:%0A•%20Horarios%20de%20BJJ%20disponibles%0A•%20Qué%20debo%20traer%20a%20mi%20primera%20clase%0A•%20Si%20hay%20clases%20para%20principiantes%0A•%20Confirmar%20que%20es%20100%25%20gratis%0A%0AMi%20experiencia:%20_______%0AHorarios%20preferidos:%20_______%0A%0A¡Muchas%20gracias!', '_blank');
      return;
    } else if (actionText.includes('kickboxing')) {
      window.open('https://wa.me/34662323282?text=¡Hola%20KaizenAcademy改善Burgos!%20🥊%0A%0AQuiero%20probar%20mi%20CLASE%20GRATUITA%20de%20Kickboxing.%0A%0A¿Podrían%20ayudarme%20con:%0A•%20Horarios%20de%20Kickboxing%20disponibles%0A•%20Qué%20debo%20traer%20a%20mi%20primera%20clase%0A•%20Si%20hay%20clases%20para%20principiantes%0A•%20Confirmar%20que%20es%20100%25%20gratis%0A%0AMi%20experiencia:%20_______%0AHorarios%20preferidos:%20_______%0A%0A¡Muchas%20gracias!', '_blank');
      return;
    } else if (actionText.includes('mma')) {
      window.open('https://wa.me/34662323282?text=¡Hola%20KaizenAcademy改善Burgos!%20🥊🥋%0A%0AQuiero%20probar%20mi%20CLASE%20GRATUITA%20de%20MMA%20(Artes%20Marciales%20Mixtas).%0A%0A¿Podrían%20ayudarme%20con:%0A•%20Horarios%20de%20MMA%20disponibles%0A•%20Qué%20debo%20traer%20a%20mi%20primera%20clase%0A•%20Si%20hay%20clases%20para%20principiantes%0A•%20Confirmar%20que%20es%20100%25%20gratis%0A%0AMi%20experiencia:%20_______%0AHorarios%20preferidos:%20_______%0A%0A¡Muchas%20gracias!', '_blank');
      return;
    } else if (actionText.includes('boxeo')) {
      window.open('https://wa.me/34662323282?text=¡Hola%20KaizenAcademy改善Burgos!%20🥊%0A%0AQuiero%20probar%20mi%20CLASE%20GRATUITA%20de%20Boxeo.%0A%0A¿Podrían%20ayudarme%20con:%0A•%20Horarios%20de%20Boxeo%20disponibles%0A•%20Qué%20debo%20traer%20a%20mi%20primera%20clase%0A•%20Si%20hay%20clases%20para%20principiantes%0A•%20Confirmar%20que%20es%20100%25%20gratis%0A%0AMi%20experiencia:%20_______%0AHorarios%20preferidos:%20_______%0A%0A¡Muchas%20gracias!', '_blank');
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
      } else if (actionText.includes('ubicacion') || actionText.includes('ubicación') || actionText.includes('donde') || actionText.includes('dirección') || actionText.includes('direccion')) {
        response = quickResponses.ubicacion;
        actions = ['Google Maps', 'Llamar', 'Horarios'];
      } else if (actionText.includes('reservar') || actionText.includes('clase gratis')) {
        response = quickResponses.reservar;
        actions = ['BJJ', 'Kickboxing', 'MMA', 'Boxeo'];
      } else if (actionText.includes('disciplinas')) {
        response = quickResponses.disciplinas;
        actions = ['Clase gratis', 'Precios', 'Instructores'];
      } else if (actionText.includes('instructores')) {
        response = quickResponses.instructores;
        actions = ['Antonio Alonso', 'Pablo Mate', 'Rubén Sancho'];
      } else if (actionText.includes('más información') || actionText.includes('mas informacion')) {
        response = quickResponses.mas_informacion;
        actions = ['WhatsApp', 'Llamar', 'Clase gratis'];
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
      } else if (actionText.includes('antonio alonso')) {
        response = `👨‍🏫 **Antonio Alonso - Fundador**

🥋 **Credenciales:**
• Profesor de Artes Marciales
• Faixa Preta Brazilian Jiu-Jitsu
• Cinturón Negro Judo  
• +45 años de experiencia
• Maestro Entrenador Nacional

🏆 **Especialidades:**
• Fundador de KaizenAcademy
• Técnicas tradicionales y modernas
• Filosofía Kaizen aplicada al entrenamiento
• Formación integral de luchadores`;
        actions = ['Pablo Mate', 'Rubén Sancho', 'Clase gratis'];
      } else if (actionText.includes('pablo mate')) {
        response = `🥋 **Pablo Mate - Profesor**

🏆 **Credenciales:**
• Faixa Preta BJJ 1° Grado
• Cinturón Negro Judo 1° Dan
• 15 años en la academia
• Especialista en competición

📚 **Su historia:**
Comenzó practicando artes marciales hace 15 años y se ha convertido en uno de nuestros instructores más respetados. Su dedicación y técnica son ejemplares.

💪 **Especialidades:**
• Brazilian Jiu-Jitsu avanzado
• Técnicas de competición
• Preparación física específica`;
        actions = ['Antonio Alonso', 'Rubén Sancho', 'Clase gratis'];
      } else if (actionText.includes('rubén sancho') || actionText.includes('ruben sancho')) {
        response = `🇧🇷 **Rubén Sancho - Instructor BJJ**

🥋 **Credenciales:**
• Faixa Marrón (Brown Belt)
• Competidor activo
• Especialista Gi y No-Gi
• Experiencia internacional

🏆 **Especialidades:**
• Brazilian Jiu-Jitsu técnico
• Modalidades Gi y No-Gi
• Preparación para competiciones
• Defensa personal aplicada`;
        actions = ['Antonio Alonso', 'Pablo Mate', 'Clase gratis'];
      } else if (actionText.includes('google maps')) {
        response = `🗺️ **Abrir en Google Maps:**

Te estoy dirigiendo a nuestra ubicación en Google Maps.
📍 C. Esteban Sáez Alvarado, 8, Burgos

¡Nos vemos pronto!`;
        actions = ['Llamar', 'WhatsApp', 'Horarios'];
        // Open Google Maps
        setTimeout(() => {
          window.open('https://maps.google.com/?q=C.+Esteban+Sáez+Alvarado,+8,+Burgos', '_blank');
        }, 1000);
      } else if (actionText.includes('llamar')) {
        response = `📞 **Llamar Ahora:**

Te estoy conectando con nuestro teléfono.
📞 +34 662 323 282

¡Hablamos en un momento!`;
        actions = ['WhatsApp', 'Google Maps', 'Horarios'];
        // Initiate phone call
        setTimeout(() => {
          window.open('tel:+34662323282', '_self');
        }, 1000);
      } else if (actionText.includes('whatsapp')) {
        response = `💬 **Abrir WhatsApp:**

Te estoy redirigiendo a WhatsApp.
Mensaje preparado para enviar.

¡Hablamos por WhatsApp!`;
        actions = ['Llamar', 'Google Maps', 'Más clases'];
        // Open WhatsApp
        setTimeout(() => {
          window.open('https://wa.me/34662323282?text=Hola%20KaizenAcademy%2C%20me%20interesa%20información%20sobre%20las%20clases%20de%20artes%20marciales', '_blank');
        }, 1000);
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