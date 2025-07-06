import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import kaizenLogo from '@assets/kaizen_logo_transparent_1751749979875.png';
import { 
  Users, 
  Calendar, 
  Trophy, 
  Bell, 
  Camera, 
  Target,
  Clock,
  Star,
  Zap,
  Heart,
  CheckCircle,
  TrendingUp,
  MessageCircle,
  Settings,
  LogOut
} from 'lucide-react';

interface MobileUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  profileImageUrl?: string;
  preferredDisciplines: string[];
  membershipType: string;
  streak: number;
  totalClasses: number;
}

interface TodaySchedule {
  id: number;
  discipline: string;
  startTime: string;
  endTime: string;
  instructor: string;
  isBooked: boolean;
  spotsLeft: number;
}

interface MotivationMessage {
  id: number;
  discipline: string;
  message: string;
  type: 'pre_class' | 'motivational' | 'technique' | 'funny';
  emoji: string;
}

export default function MobileApp() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Set default discipline from user preferences
  useEffect(() => {
    if (user?.preferredDisciplines?.length > 0 && !selectedDiscipline) {
      setSelectedDiscipline(user.preferredDisciplines[0]);
    }
  }, [user, selectedDiscipline]);

  // Mobile-specific queries
  const { data: todaySchedule } = useQuery<TodaySchedule[]>({
    queryKey: ['/api/mobile/schedule/today'],
    enabled: isAuthenticated,
  });

  const { data: gymCount } = useQuery<{ count: number; capacity: number }>({
    queryKey: ['/api/mobile/gym/count'],
    refetchInterval: 30000, // Update every 30 seconds
  });

  const { data: myStreak } = useQuery<{ streak: number; totalClasses: number }>({
    queryKey: ['/api/mobile/user/streak'],
    enabled: isAuthenticated,
  });

  const { data: motivationMessage } = useQuery<MotivationMessage>({
    queryKey: ['/api/mobile/motivation', selectedDiscipline],
    enabled: !!selectedDiscipline,
    refetchInterval: 300000, // Update every 5 minutes
  });

  const { data: upcomingClass } = useQuery<{
    class: TodaySchedule;
    timeUntil: number; // minutes until class
    message?: MotivationMessage;
  }>({
    queryKey: ['/api/mobile/upcoming-class'],
    enabled: isAuthenticated,
    refetchInterval: 60000, // Check every minute
  });

  const confirmAttendanceMutation = useMutation({
    mutationFn: async (data: { classId: number; discipline: string }) => {
      return await apiRequest('POST', '/api/mobile/attendance/confirm', data);
    },
    onSuccess: () => {
      toast({
        title: "¡Confirmado! 🥋",
        description: "Te vemos en el tatami",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/mobile/schedule/today'] });
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm bg-gray-800 border-gray-700">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <img 
                src={kaizenLogo} 
                alt="Kaizen Burgos" 
                className="w-20 h-20 mx-auto mb-4 object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-kaizen-gold mb-2">
              KaizenAcademy改善
            </h1>
            <p className="text-gray-400 mb-2">
              Burgos • Martial Arts
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Tu entrenamiento en la palma de tu mano
            </p>
            <Button 
              onClick={() => window.location.href = '/app/login'}
              className="w-full bg-kaizen-red hover:bg-red-700"
            >
              Acceso de Miembros
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getDisciplineEmoji = (discipline: string) => {
    const emojis: Record<string, string> = {
      'BJJ': '🥋',
      'MMA': '🥊',
      'Kickboxing': '🦵',
      'Boxeo': '👊'
    };
    return emojis[discipline] || '💪';
  };

  const getDisciplineColor = (discipline: string) => {
    const colors: Record<string, string> = {
      'BJJ': 'from-blue-600 to-blue-800',
      'MMA': 'from-red-600 to-red-800', 
      'Kickboxing': 'from-green-600 to-green-800',
      'Boxeo': 'from-yellow-600 to-yellow-800'
    };
    return colors[discipline] || 'from-gray-600 to-gray-800';
  };

  const getGymStatus = () => {
    if (!gymCount) return { text: 'Conectando...', color: 'text-gray-400', emoji: '🔄' };
    
    const percentage = (gymCount.count / gymCount.capacity) * 100;
    if (percentage < 30) return { text: 'Tranquilo', color: 'text-green-400', emoji: '😌' };
    if (percentage < 70) return { text: 'Activo', color: 'text-yellow-400', emoji: '🔥' };
    return { text: 'Lleno', color: 'text-red-400', emoji: '🚀' };
  };

  const getTimeGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { greeting: 'Buenos días', emoji: '🌅' };
    if (hour < 18) return { greeting: 'Buenas tardes', emoji: '☀️' };
    return { greeting: 'Buenas noches', emoji: '🌙' };
  };

  const formatTime = (dateString: string) => {
    return new Date(`2000-01-01T${dateString}`).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const gymStatus = getGymStatus();
  const timeGreeting = getTimeGreeting();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-700">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-kaizen-gold">
              <AvatarImage src={user?.profileImageUrl} />
              <AvatarFallback className="bg-kaizen-red text-white font-bold">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-white font-bold text-lg">
                {timeGreeting.emoji} {timeGreeting.greeting}
              </div>
              <div className="text-kaizen-gold text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <img 
              src={kaizenLogo} 
              alt="Kaizen Burgos" 
              className="w-8 h-8 object-contain opacity-80"
            />
            <Button variant="ghost" size="sm">
              <Bell size={20} className="text-gray-300" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings size={20} className="text-gray-300" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Upcoming Class Alert */}
        {upcomingClass && upcomingClass.timeUntil <= 60 && (
          <Card className="bg-gradient-to-r from-kaizen-red/20 to-orange-600/20 border-kaizen-red/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl animate-pulse">⏰</div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">
                    ¡Tu clase en {upcomingClass.timeUntil} minutos!
                  </h3>
                  <p className="text-kaizen-gold">
                    {getDisciplineEmoji(upcomingClass.class.discipline)} {upcomingClass.class.discipline} con {upcomingClass.class.instructor}
                  </p>
                  {upcomingClass.message && (
                    <div className="mt-2 p-2 bg-black/20 rounded-lg">
                      <p className="text-white text-sm italic">
                        {upcomingClass.message.emoji} "{upcomingClass.message.message}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Daily Motivation Quote */}
        {motivationMessage && (
          <Card className={`bg-gradient-to-r ${getDisciplineColor(selectedDiscipline)} border-none`}>
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">{motivationMessage.emoji}</div>
              <p className="text-white font-bold text-lg mb-2 italic">
                "{motivationMessage.message}"
              </p>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {getDisciplineEmoji(motivationMessage.discipline)} {motivationMessage.discipline}
              </Badge>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">{gymStatus.emoji}</div>
              <div className={`text-xl font-bold ${gymStatus.color}`}>
                {gymCount?.count || 0}
              </div>
              <div className="text-gray-400 text-sm">en el gym</div>
              <div className={`text-xs ${gymStatus.color} font-medium`}>
                {gymStatus.text}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🔥</div>
              <div className="text-xl font-bold text-orange-400">
                {myStreak?.streak || 0}
              </div>
              <div className="text-gray-400 text-sm">días seguidos</div>
              <div className="text-xs text-orange-400 font-medium">
                Racha
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-xl font-bold text-kaizen-gold">
                {myStreak?.totalClasses || 0}
              </div>
              <div className="text-gray-400 text-sm">clases total</div>
              <div className="text-xs text-kaizen-gold font-medium">
                Experiencia
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Discipline Selector */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-lg">Mi Entrenamiento</h3>
          <div className="grid grid-cols-2 gap-3">
            {user?.preferredDisciplines?.map((discipline) => (
              <Button
                key={discipline}
                variant={selectedDiscipline === discipline ? 'default' : 'outline'}
                onClick={() => setSelectedDiscipline(discipline)}
                className={`h-16 ${
                  selectedDiscipline === discipline
                    ? 'bg-kaizen-red hover:bg-red-700 border-kaizen-red'
                    : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{getDisciplineEmoji(discipline)}</div>
                  <div className="text-sm font-medium">{discipline}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Today's Classes */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-lg flex items-center">
            <Calendar className="mr-2 text-kaizen-red" size={20} />
            Clases de Hoy
          </h3>
          {todaySchedule?.filter(cls => !selectedDiscipline || cls.discipline === selectedDiscipline)
            .map((classItem) => (
            <Card key={classItem.id} className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {getDisciplineEmoji(classItem.discipline)}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{classItem.discipline}</h4>
                      <p className="text-gray-400 text-sm">
                        {formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}
                      </p>
                      <p className="text-gray-400 text-sm">Con {classItem.instructor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {classItem.isBooked ? (
                      <div className="flex items-center text-green-400">
                        <CheckCircle size={16} className="mr-1" />
                        <span className="text-sm font-medium">Confirmado</span>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => confirmAttendanceMutation.mutate({
                          classId: classItem.id,
                          discipline: classItem.discipline
                        })}
                        disabled={confirmAttendanceMutation.isPending}
                        className="bg-kaizen-red hover:bg-red-700"
                      >
                        Confirmar
                      </Button>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      {classItem.spotsLeft} lugares
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            className="h-20 bg-gray-800/50 border border-gray-700 hover:bg-gray-700 flex-col space-y-2"
            onClick={() => window.location.href = '/app/photos'}
          >
            <Camera className="text-purple-400" size={28} />
            <span className="text-white text-sm font-medium">Fotos del Gym</span>
          </Button>
          
          <Button 
            className="h-20 bg-gray-800/50 border border-gray-700 hover:bg-gray-700 flex-col space-y-2"
            onClick={() => window.location.href = '/app/leaderboard'}
          >
            <Trophy className="text-kaizen-gold" size={28} />
            <span className="text-white text-sm font-medium">Rankings</span>
          </Button>
        </div>

        {/* Kaizen Contact */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-3">
              <img 
                src={kaizenLogo} 
                alt="Kaizen Burgos" 
                className="w-6 h-6 object-contain mr-2 opacity-80"
              />
              <h3 className="text-white font-medium">KaizenAcademy改善</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              ¿Necesitas ayuda? Contacta con nosotros
            </p>
            <div className="flex space-x-3">
              <Button 
                size="sm" 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => window.open('https://wa.me/34662323282?text=Hola%20desde%20la%20app%20de%20KaizenAcademy%20🥋', '_blank')}
              >
                <MessageCircle className="mr-2" size={16} />
                WhatsApp
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 border-gray-600"
                onClick={() => window.open('tel:+34662323282', '_blank')}
              >
                📞 Llamar
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Calle Vitoria 190, Burgos
            </p>
          </CardContent>
        </Card>

        {/* Logout */}
        <div className="pb-8">
          <Button 
            variant="outline" 
            className="w-full border-gray-600 text-gray-400 hover:bg-gray-700"
            onClick={() => window.location.href = '/api/logout'}
          >
            <LogOut className="mr-2" size={16} />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
}