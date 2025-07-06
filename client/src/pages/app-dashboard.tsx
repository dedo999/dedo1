import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, 
  Calendar, 
  Trophy, 
  Bell, 
  MessageSquare, 
  Camera, 
  Target,
  Clock,
  Star,
  Zap,
  ChevronRight,
  Heart,
  TrendingUp,
  Award,
  MapPin
} from 'lucide-react';

interface QuickStat {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  action?: string;
}

interface DisciplineQuote {
  id: number;
  discipline: string;
  quote: string;
  author?: string;
  type: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  discipline?: string;
  isRead: boolean;
  createdAt: string;
}

export default function AppDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Queries for dashboard data
  const { data: todayAttendance } = useQuery({
    queryKey: ['/api/attendance/today'],
  });

  const { data: userAttendance } = useQuery({
    queryKey: ['/api/attendance/user'],
    enabled: isAuthenticated,
  });

  const { data: notifications } = useQuery<Notification[]>({
    queryKey: ['/api/notifications'],
    enabled: isAuthenticated,
  });

  const { data: leaderboard } = useQuery({
    queryKey: ['/api/leaderboard'],
  });

  const { data: gymPhotos } = useQuery({
    queryKey: ['/api/gym/photos'],
  });

  const { data: disciplineQuote } = useQuery<DisciplineQuote>({
    queryKey: ['/api/discipline/quote', user?.preferredDisciplines?.[0]],
    enabled: isAuthenticated && user?.preferredDisciplines?.length > 0,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Acceso Requerido</h1>
          <Button onClick={() => window.location.href = '/app/login'}>
            Iniciar Sesión
          </Button>
        </div>
      </div>
    );
  }

  const quickStats: QuickStat[] = [
    {
      icon: Users,
      label: "En el gym ahora",
      value: todayAttendance?.count || 0,
      color: "text-kaizen-red",
      action: "Ver quién está"
    },
    {
      icon: Trophy,
      label: "Tu posición",
      value: "#" + (leaderboard?.findIndex((member: any) => member.userId === user?.id) + 1 || '?'),
      color: "text-kaizen-gold",
      action: "Ver ranking"
    },
    {
      icon: Calendar,
      label: "Esta semana",
      value: userAttendance?.checkedIn ? "✓" : "0",
      color: "text-green-400",
      action: "Confirmar hoy"
    },
    {
      icon: Bell,
      label: "Notificaciones",
      value: notifications?.filter(n => !n.isRead).length || 0,
      color: "text-blue-400",
      action: "Ver todas"
    }
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const getDisciplineEmoji = (discipline: string) => {
    const emojis: Record<string, string> = {
      'BJJ': '🥋',
      'MMA': '🥊',
      'Kickboxing': '🦵',
      'Boxeo': '👊'
    };
    return emojis[discipline] || '💪';
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.profileImageUrl} />
              <AvatarFallback className="bg-kaizen-red text-white">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-white font-medium">
                {getGreeting()}, {user?.firstName}
              </div>
              <div className="text-gray-400 text-sm flex items-center">
                <Clock size={12} className="mr-1" />
                {formatTime(currentTime)}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = '/app/notifications'}
              className="relative"
            >
              <Bell size={20} className="text-gray-300" />
              {notifications?.filter(n => !n.isRead).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-kaizen-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.filter(n => !n.isRead).length}
                </span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = '/app/profile'}
            >
              <MapPin size={20} className="text-gray-300" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Daily Quote */}
        {disciplineQuote && (
          <Card className="bg-gradient-to-r from-kaizen-red/20 to-kaizen-gold/20 border-kaizen-red/30">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">
                  {getDisciplineEmoji(disciplineQuote.discipline)}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium italic mb-2">
                    "{disciplineQuote.quote}"
                  </p>
                  {disciplineQuote.author && (
                    <p className="text-kaizen-gold text-sm">
                      — {disciplineQuote.author}
                    </p>
                  )}
                  <Badge 
                    variant="outline" 
                    className="mt-2 border-kaizen-gold text-kaizen-gold"
                  >
                    {disciplineQuote.discipline}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`${stat.color}`} size={20} />
                    <span className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </span>
                  </div>
                  <div className="text-gray-300 text-sm font-medium mb-1">
                    {stat.label}
                  </div>
                  {stat.action && (
                    <div className="text-xs text-gray-400 flex items-center">
                      {stat.action}
                      <ChevronRight size={12} className="ml-1" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Today's Training */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-white">
              <Target className="mr-2 text-kaizen-red" size={20} />
              Tu Entrenamiento Hoy
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!userAttendance ? (
              <div className="text-center py-6">
                <div className="text-gray-400 mb-4">
                  ¿Qué vas a entrenar hoy?
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {['BJJ', 'MMA', 'Kickboxing', 'Boxeo'].map((discipline) => (
                    <Button
                      key={discipline}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-kaizen-red hover:border-kaizen-red"
                    >
                      {getDisciplineEmoji(discipline)} {discipline}
                    </Button>
                  ))}
                </div>
                <Button 
                  className="w-full bg-kaizen-red hover:bg-red-700"
                  onClick={() => window.location.href = '/app/attendance'}
                >
                  <Calendar className="mr-2" size={16} />
                  Confirmar Asistencia
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="flex items-center justify-center mb-3">
                  <Zap className="text-green-400 mr-2" size={24} />
                  <span className="text-green-400 font-medium">¡Confirmado para hoy!</span>
                </div>
                <div className="text-gray-300 text-sm">
                  Disciplinas: {userAttendance.disciplines?.join(', ') || 'General'}
                </div>
                {!userAttendance.checkedIn && (
                  <Button 
                    size="sm" 
                    className="mt-3 bg-green-600 hover:bg-green-700"
                    onClick={() => window.location.href = '/app/checkin'}
                  >
                    Check-in en el gym
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            className="h-20 bg-gray-800/50 border border-gray-700 hover:bg-gray-700 flex-col space-y-2"
            onClick={() => window.location.href = '/app/photos'}
          >
            <Camera className="text-kaizen-gold" size={24} />
            <span className="text-white text-sm">Fotos del Gym</span>
          </Button>
          
          <Button 
            className="h-20 bg-gray-800/50 border border-gray-700 hover:bg-gray-700 flex-col space-y-2"
            onClick={() => window.location.href = '/app/chat'}
          >
            <MessageSquare className="text-blue-400" size={24} />
            <span className="text-white text-sm">Conversaciones</span>
          </Button>
          
          <Button 
            className="h-20 bg-gray-800/50 border border-gray-700 hover:bg-gray-700 flex-col space-y-2"
            onClick={() => window.location.href = '/app/leaderboard'}
          >
            <Trophy className="text-kaizen-gold" size={24} />
            <span className="text-white text-sm">Rankings</span>
          </Button>
          
          <Button 
            className="h-20 bg-gray-800/50 border border-gray-700 hover:bg-gray-700 flex-col space-y-2"
            onClick={() => window.location.href = '/app/reminders'}
          >
            <Bell className="text-purple-400" size={24} />
            <span className="text-white text-sm">Recordatorios</span>
          </Button>
        </div>

        {/* Recent Activity */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-white">
              <TrendingUp className="mr-2 text-green-400" size={20} />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard?.slice(0, 3).map((member: any, index: number) => (
                <div key={member.userId} className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-500 text-black' : 
                      index === 1 ? 'bg-gray-400 text-black' :
                      'bg-amber-600 text-black'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-white text-sm">
                      {member.firstName} {member.lastName}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {member.attendanceCount} días
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Contact */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-white font-medium mb-2">¿Necesitas ayuda?</h3>
              <p className="text-gray-400 text-sm mb-4">
                Contacta directamente con la academia
              </p>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => window.open('https://wa.me/34662323282', '_blank')}
                >
                  <MessageSquare className="mr-2" size={16} />
                  WhatsApp
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 border-gray-600"
                  onClick={() => window.open('tel:+34662323282', '_blank')}
                >
                  <Phone className="mr-2" size={16} />
                  Llamar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}