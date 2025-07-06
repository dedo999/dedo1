import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Trophy, 
  TrendingUp, 
  MessageSquare, 
  Calendar,
  Star,
  ArrowRight
} from 'lucide-react';

interface AttendanceData {
  attendance: Array<{
    id: number;
    userId: string;
    date: string;
    isGoing: boolean;
    disciplines: string[];
    checkedIn: boolean;
  }>;
  count: number;
}

interface LeaderboardEntry {
  userId: string;
  firstName: string;
  lastName: string;
  attendanceCount: number;
}

export default function CommunitySection() {
  const { data: todayAttendance } = useQuery<AttendanceData>({
    queryKey: ['/api/attendance/today'],
  });

  const { data: leaderboard } = useQuery<LeaderboardEntry[]>({
    queryKey: ['/api/leaderboard'],
  });

  const stats = [
    {
      icon: Users,
      label: "Miembros activos hoy",
      value: todayAttendance?.count || 0,
      color: "text-kaizen-red"
    },
    {
      icon: Trophy,
      label: "Récord semanal",
      value: leaderboard?.[0]?.attendanceCount || 0,
      color: "text-kaizen-gold"
    },
    {
      icon: TrendingUp,
      label: "Entrenamientos esta semana",
      value: leaderboard?.reduce((total, entry) => total + entry.attendanceCount, 0) || 0,
      color: "text-green-400"
    }
  ];

  return (
    <section id="comunidad" className="py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-kaizen-gold">Comunidad</span> KaizenAcademy改善
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Únete a una comunidad comprometida con la mejora continua. 
            Comparte tu progreso, celebra tus logros y conecta con compañeros de entrenamiento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-gray-800/50 border-gray-700 text-center">
                <CardContent className="p-6">
                  <Icon className={`mx-auto mb-4 ${stat.color}`} size={40} />
                  <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weekly Leaders */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-kaizen-gold">
                <Trophy className="mr-2" size={24} />
                Top Guerreros de la Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard?.slice(0, 3).map((entry, index) => (
                  <div key={entry.userId} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500 text-black' : 
                        index === 1 ? 'bg-gray-400 text-black' :
                        index === 2 ? 'bg-amber-600 text-black' : 'bg-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {entry.firstName} {entry.lastName}
                        </div>
                        <div className="text-sm text-gray-400">
                          {entry.attendanceCount} entrenamientos
                        </div>
                      </div>
                    </div>
                    {index === 0 && (
                      <Star className="text-yellow-500" size={20} />
                    )}
                  </div>
                ))}
                {(!leaderboard || leaderboard.length === 0) && (
                  <div className="text-center text-gray-400 py-8">
                    <Trophy className="mx-auto mb-4 text-gray-500" size={48} />
                    <p>¡Sé el primero en aparecer en el ranking!</p>
                    <p className="text-sm">Confirma tu asistencia y entrena consistentemente</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Community Features */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-kaizen-gold">
                <MessageSquare className="mr-2" size={24} />
                Únete a la Comunidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-gray-700/30 rounded-lg">
                  <Calendar className="text-kaizen-red mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-white mb-1">Confirma tu Asistencia</h4>
                    <p className="text-sm text-gray-400">
                      Dile a tus compañeros que vas a entrenar hoy y en qué disciplinas
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-gray-700/30 rounded-lg">
                  <Trophy className="text-kaizen-gold mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-white mb-1">Compite en Rankings</h4>
                    <p className="text-sm text-gray-400">
                      Escala posiciones en el ranking semanal de entrenamientos
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-gray-700/30 rounded-lg">
                  <MessageSquare className="text-green-400 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-white mb-1">Comparte tu Progreso</h4>
                    <p className="text-sm text-gray-400">
                      Publica fotos, logros y motiva a otros miembros
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-gray-700/30 rounded-lg">
                  <Star className="text-purple-400 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-white mb-1">Desbloquea Logros</h4>
                    <p className="text-sm text-gray-400">
                      Gana insignias por consistencia, progreso y participación
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={() => window.location.href = '/comunidad'}
                  className="w-full bg-kaizen-red hover:bg-red-700 mt-6"
                >
                  Explorar Comunidad
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <Users size={20} />
            <span>Únete a {todayAttendance?.count || 0} miembros entrenando hoy</span>
          </div>
        </div>
      </div>
    </section>
  );
}