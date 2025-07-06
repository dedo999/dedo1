import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Home, 
  Calendar, 
  Users, 
  Camera, 
  MessageCircle, 
  Settings, 
  Bell, 
  CheckCircle2, 
  Clock, 
  MapPin,
  TrendingUp,
  Award,
  Target,
  Zap,
  Heart,
  Star,
  Phone
} from 'lucide-react';
import kaizenLogo from '@assets/kaizen_logo_transparent_1751749979875.png';

export default function AppSimple() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [checkedIn, setCheckedIn] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "¡Clase de BJJ en 1 hora!",
      message: "Tu clase favorita empieza pronto. ¿Vienes a entrenar duro? 🥋",
      time: "hace 5 min",
      type: "class"
    },
    {
      id: 2,
      title: "Gimnasio al 60% de capacidad",
      message: "¡Perfecto momento para entrenar! Menos gente = más espacio para ti",
      time: "hace 10 min",
      type: "capacity"
    }
  ]);

  // Demo user data - no authentication needed
  const user = {
    firstName: "Demo",
    lastName: "Member",
    profileImageUrl: "/api/placeholder/user-avatar.jpg",
    preferredDisciplines: ["BJJ", "MMA", "Kickboxing"],
    membershipType: "premium"
  };

  // Mock data for demo
  const todaySchedule = [
    {
      id: 1,
      class: "Brazilian Jiu-Jitsu",
      instructor: "Carlos Mendoza",
      time: "18:00 - 19:30",
      maxCapacity: 20,
      currentBookings: 12,
      isUserBooked: true
    },
    {
      id: 2,
      class: "MMA Sparring",
      instructor: "Ana Rodriguez",
      time: "19:30 - 21:00",
      maxCapacity: 16,
      currentBookings: 8,
      isUserBooked: false
    }
  ];

  const gymCount = { count: 18, capacity: 30 };

  const recentAttendance = [
    { id: 1, date: "2025-01-06", discipline: "BJJ", duration: "90 min" },
    { id: 2, date: "2025-01-04", discipline: "MMA", duration: "60 min" },
    { id: 3, date: "2025-01-02", discipline: "Kickboxing", duration: "75 min" }
  ];

  const motivationalMessages = [
    "¡Hoy es el día perfecto para superar tus límites! 💪",
    "El tatami te está esperando, ¡vamos a entrenar! 🥋",
    "Cada entreno te acerca más a tu mejor versión 🔥",
    "En Kaizen Burgos, cada día es una oportunidad de mejorar ⭐",
    "¡Tu disciplina de hoy es tu fortaleza de mañana! 🏆"
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % motivationalMessages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    setCheckedIn(!checkedIn);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user.profileImageUrl} />
            <AvatarFallback className="bg-kaizen-red text-white">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold text-white">
              ¡Hola, {user.firstName}!
            </h2>
            <p className="text-gray-400 text-sm">
              {user.firstName} {user.lastName}
            </p>
          </div>
        </div>
        <Button
          onClick={() => setNotifications([])}
          className="relative bg-gray-800 hover:bg-gray-700"
        >
          <Bell className="w-5 h-5" />
          {notifications && notifications.length > 0 && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 bg-kaizen-red text-xs">
              {notifications.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Motivational Message */}
      <Card className="bg-gradient-to-r from-kaizen-red to-orange-600 border-none">
        <div className="p-4 text-center">
          <Zap className="w-8 h-8 text-white mx-auto mb-2" />
          <p className="text-white font-medium">
            {motivationalMessages[currentMessage]}
          </p>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-4 text-center">
            <CheckCircle2 className={`w-8 h-8 mx-auto mb-2 ${checkedIn ? 'text-green-400' : 'text-gray-400'}`} />
            <p className="text-white text-sm mb-3">
              {checkedIn ? 'Dentro del gym' : 'Check-in'}
            </p>
            <Button 
              onClick={handleCheckIn}
              className={`w-full ${checkedIn ? 'bg-green-600 hover:bg-green-700' : 'bg-kaizen-red hover:bg-red-700'}`}
            >
              {checkedIn ? 'Check Out' : 'Check In'}
            </Button>
          </div>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <div className="p-4 text-center">
            <Users className="w-8 h-8 text-kaizen-gold mx-auto mb-2" />
            <p className="text-white text-sm">Ocupación</p>
            <p className="text-2xl font-bold text-white">
              {Math.round((gymCount.count / gymCount.capacity) * 100)}%
            </p>
            <p className="text-gray-400 text-xs">
              {gymCount.count}/{gymCount.capacity} personas
            </p>
          </div>
        </Card>
      </div>

      {/* Notifications */}
      {notifications && notifications.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <Bell className="w-4 h-4 mr-2 text-kaizen-gold" />
              Notificaciones
            </h3>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg">
                  <div className="flex-shrink-0">
                    {notification.type === 'class' && <Calendar className="w-5 h-5 text-kaizen-gold" />}
                    {notification.type === 'capacity' && <Users className="w-5 h-5 text-green-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{notification.title}</p>
                    <p className="text-gray-300 text-xs">{notification.message}</p>
                    <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Today's Schedule */}
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-4">
          <h3 className="text-white font-semibold mb-3 flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-kaizen-gold" />
            Clases de Hoy
          </h3>
          <div className="space-y-3">
            {todaySchedule.map((class_item) => (
              <div key={class_item.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium">{class_item.class}</p>
                    {class_item.isUserBooked && (
                      <Badge className="bg-kaizen-red text-xs">Apuntado</Badge>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{class_item.instructor}</p>
                  <p className="text-gray-400 text-sm">{class_item.time}</p>
                  <Progress 
                    value={(class_item.currentBookings / class_item.maxCapacity) * 100} 
                    className="mt-2 h-1"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    {class_item.currentBookings}/{class_item.maxCapacity} plazas
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-4">
          <h3 className="text-white font-semibold mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-kaizen-gold" />
            Actividad Reciente
          </h3>
          <div className="space-y-3">
            {recentAttendance && recentAttendance.slice(0, 3).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-kaizen-gold" />
                  <div>
                    <p className="text-white text-sm font-medium">{session.discipline}</p>
                    <p className="text-gray-400 text-xs">{session.date}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-kaizen-gold border-kaizen-gold">
                  {session.duration}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );

  const renderPhotos = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center">
        <Camera className="w-6 h-6 mr-2 text-kaizen-gold" />
        Galería Kaizen
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {[1,2,3,4,5,6].map((i) => (
          <Card key={i} className="bg-gray-800 border-gray-700 overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-kaizen-red to-orange-600 flex items-center justify-center">
              <Camera className="w-8 h-8 text-white opacity-50" />
            </div>
            <div className="p-2">
              <p className="text-white text-xs">Entreno {i}</p>
              <p className="text-gray-400 text-xs">Ene 2025</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center">
        <MessageCircle className="w-6 h-6 mr-2 text-kaizen-gold" />
        Chat Kaizen
      </h2>
      
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-4 text-center">
          <MessageCircle className="w-12 h-12 text-kaizen-gold mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">Chat en Vivo</h3>
          <p className="text-gray-400 text-sm mb-4">
            Conecta con instructores y otros miembros de Kaizen Burgos
          </p>
          <Button className="bg-kaizen-red hover:bg-red-700">
            Iniciar Chat
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center">
        <Calendar className="w-6 h-6 mr-2 text-kaizen-gold" />
        Horarios
      </h2>
      
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-4">
          <h3 className="text-white font-semibold mb-4">Esta Semana</h3>
          <div className="space-y-4">
            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((day, index) => (
              <div key={day} className="border-l-4 border-kaizen-red pl-4">
                <h4 className="text-white font-medium">{day}</h4>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">BJJ</span>
                    <span className="text-gray-400 text-sm">18:00-19:30</span>
                  </div>
                  {index % 2 === 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">MMA</span>
                      <span className="text-gray-400 text-sm">19:30-21:00</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center">
        <Settings className="w-6 h-6 mr-2 text-kaizen-gold" />
        Mi Perfil
      </h2>
      
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-4 text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage src={user.profileImageUrl} />
            <AvatarFallback className="bg-kaizen-red text-white text-lg">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-white font-semibold text-lg">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-gray-400 text-sm mb-4">Miembro Premium</p>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Disciplinas:</span>
              <div className="flex space-x-2">
                {user.preferredDisciplines?.map((discipline: string) => (
                  <Badge key={discipline} className="bg-kaizen-red text-xs">
                    {discipline}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Estado:</span>
              <Badge className={`${checkedIn ? 'bg-green-600' : 'bg-gray-600'} text-xs`}>
                {checkedIn ? 'En el gym' : 'Fuera'}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <div className="p-4">
          <h3 className="text-white font-semibold mb-4">Contacto Kaizen</h3>
          <div className="space-y-3">
            <Button 
              onClick={() => window.open('tel:+34662323282', '_self')}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Phone className="w-4 h-4 mr-2" />
              Llamar: 662 32 32 82
            </Button>
            <Button 
              onClick={() => window.open('https://wa.me/34662323282', '_blank')}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              💬 WhatsApp
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={kaizenLogo} alt="Kaizen" className="w-8 h-8" />
            <div>
              <h1 className="text-lg font-bold text-kaizen-gold">KaizenApp</h1>
              <p className="text-xs text-gray-400">KaizenAcademy改善Burgos</p>
            </div>
          </div>
          <MapPin className="w-5 h-5 text-kaizen-gold" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'schedule' && renderSchedule()}
        {currentView === 'photos' && renderPhotos()}
        {currentView === 'chat' && renderChat()}
        {currentView === 'profile' && renderProfile()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
        <div className="grid grid-cols-5 py-2">
          {[
            { id: 'dashboard', icon: Home, label: 'Inicio' },
            { id: 'schedule', icon: Calendar, label: 'Horarios' },
            { id: 'photos', icon: Camera, label: 'Fotos' },
            { id: 'chat', icon: MessageCircle, label: 'Chat' },
            { id: 'profile', icon: Settings, label: 'Perfil' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setCurrentView(id)}
              className={`flex flex-col items-center py-2 px-1 ${
                currentView === id ? 'text-kaizen-gold' : 'text-gray-400'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}