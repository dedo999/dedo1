import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  Users, 
  Calendar, 
  Trophy, 
  Heart, 
  MessageSquare, 
  Camera, 
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
  Star,
  Award
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

interface CommunityPost {
  id: number;
  userId: string;
  content: string;
  imageUrl?: string;
  type: string;
  likes: number;
  discipline?: string;
  createdAt: string;
}

interface LeaderboardEntry {
  userId: string;
  firstName: string;
  lastName: string;
  attendanceCount: number;
}

export default function CommunityPage() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = useState('general');
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);

  // Queries
  const { data: todayAttendance } = useQuery<AttendanceData>({
    queryKey: ['/api/attendance/today'],
  });

  const { data: userAttendance } = useQuery<{
    id: number;
    userId: string;
    date: string;
    isGoing: boolean;
    disciplines: string[];
    checkedIn: boolean;
  }>({
    queryKey: ['/api/attendance/user'],
    enabled: isAuthenticated,
  });

  const { data: communityPosts } = useQuery<CommunityPost[]>({
    queryKey: ['/api/community/posts'],
  });

  const { data: leaderboard } = useQuery<LeaderboardEntry[]>({
    queryKey: ['/api/leaderboard'],
  });

  const { data: userAchievements } = useQuery<Array<{
    id: number;
    title: string;
    description?: string;
    achievementType: string;
    earnedAt: string;
  }>>({
    queryKey: ['/api/achievements'],
    enabled: isAuthenticated,
  });

  // Mutations
  const attendanceMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('POST', '/api/attendance', data);
    },
    onSuccess: () => {
      toast({
        title: "¡Perfecto!",
        description: "Has confirmado tu asistencia para hoy",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/attendance/today'] });
      queryClient.invalidateQueries({ queryKey: ['/api/attendance/user'] });
    },
  });

  const postMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('POST', '/api/community/posts', data);
    },
    onSuccess: () => {
      toast({
        title: "¡Publicado!",
        description: "Tu post se ha compartido con la comunidad",
      });
      setPostContent('');
      setPostType('general');
      queryClient.invalidateQueries({ queryKey: ['/api/community/posts'] });
    },
  });

  const handleAttendanceSubmit = () => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión",
        description: "Necesitas estar registrado para confirmar tu asistencia",
        variant: "destructive",
      });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    attendanceMutation.mutate({
      date: today,
      isGoing: true,
      disciplines: selectedDisciplines,
    });
  };

  const handlePostSubmit = () => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión",
        description: "Necesitas estar registrado para publicar",
        variant: "destructive",
      });
      return;
    }

    if (!postContent.trim()) {
      toast({
        title: "Contenido requerido",
        description: "Escribe algo antes de publicar",
        variant: "destructive",
      });
      return;
    }

    postMutation.mutate({
      content: postContent,
      type: postType,
      discipline: selectedDisciplines[0] || null,
    });
  };

  const getDisciplineColor = (discipline: string) => {
    const colors: Record<string, string> = {
      'BJJ': 'bg-blue-500',
      'MMA': 'bg-red-500',
      'Kickboxing': 'bg-green-500',
      'Boxeo': 'bg-yellow-500',
    };
    return colors[discipline] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-kaizen-gold">
            Comunidad KaizenAcademy改善
          </h1>
          <p className="text-xl text-gray-300">
            Conecta con tus compañeros de entrenamiento
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Attendance & Stats */}
          <div className="space-y-6">
            {/* Today's Attendance */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-kaizen-gold">
                  <Users className="mr-2" size={20} />
                  Hoy en el Gym
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-kaizen-red">
                    {todayAttendance?.count || 0}
                  </div>
                  <div className="text-gray-400">personas entrenando</div>
                </div>
                
                {!userAttendance && isAuthenticated && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">¿Qué vas a entrenar?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['BJJ', 'MMA', 'Kickboxing', 'Boxeo'].map((discipline) => (
                          <Button
                            key={discipline}
                            variant={selectedDisciplines.includes(discipline) ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                              setSelectedDisciplines(prev => 
                                prev.includes(discipline)
                                  ? prev.filter(d => d !== discipline)
                                  : [...prev, discipline]
                              );
                            }}
                          >
                            {discipline}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={handleAttendanceSubmit}
                      disabled={attendanceMutation.isPending || selectedDisciplines.length === 0}
                      className="w-full bg-kaizen-red hover:bg-red-700"
                    >
                      <CheckCircle className="mr-2" size={16} />
                      ¡Voy hoy al gym!
                    </Button>
                  </div>
                )}

                {userAttendance && (
                  <div className="text-center p-4 bg-green-900/20 rounded-lg">
                    <CheckCircle className="mx-auto mb-2 text-green-500" size={24} />
                    <div className="font-medium text-green-400">¡Ya confirmaste tu asistencia!</div>
                    <div className="text-sm text-gray-400">
                      Disciplinas: {userAttendance.disciplines?.join(', ') || 'General'}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Weekly Leaderboard */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-kaizen-gold">
                  <Trophy className="mr-2" size={20} />
                  Ranking Semanal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard?.slice(0, 5).map((entry, index) => (
                    <div key={entry.userId} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-yellow-500' : 
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-amber-600' : 'bg-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{entry.firstName} {entry.lastName}</div>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {entry.attendanceCount} días
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Achievements */}
            {isAuthenticated && userAchievements && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-kaizen-gold">
                    <Award className="mr-2" size={20} />
                    Mis Logros
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {userAchievements && userAchievements.length > 0 ? (
                      userAchievements.map((achievement) => (
                        <div key={achievement.id} className="flex items-center space-x-3 p-2 bg-gray-700 rounded-lg">
                          <Star className="text-yellow-500" size={16} />
                          <div>
                            <div className="font-medium">{achievement.title}</div>
                            <div className="text-xs text-gray-400">{achievement.description}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-400 py-4">
                        ¡Sigue entrenando para desbloquear logros!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Middle Column - Community Posts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            {isAuthenticated && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-kaizen-gold">Comparte con la comunidad</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="¿Cómo ha ido tu entrenamiento hoy? Comparte tus logros, fotos o motivación..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="bg-gray-700 border-gray-600"
                  />
                  <div className="flex flex-wrap gap-3">
                    <Select value={postType} onValueChange={setPostType}>
                      <SelectTrigger className="w-40 bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="achievement">Logro</SelectItem>
                        <SelectItem value="progress">Progreso</SelectItem>
                        <SelectItem value="motivation">Motivación</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={handlePostSubmit}
                      disabled={postMutation.isPending}
                      className="bg-kaizen-red hover:bg-red-700"
                    >
                      <MessageSquare className="mr-2" size={16} />
                      Publicar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Community Posts Feed */}
            <div className="space-y-4">
              {communityPosts?.map((post) => (
                <Card key={post.id} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-kaizen-red">
                          {post.userId.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium">Miembro</span>
                          <Badge variant="secondary" className={`text-xs ${post.discipline ? getDisciplineColor(post.discipline) : ''}`}>
                            {post.type === 'achievement' ? '🏆 Logro' :
                             post.type === 'progress' ? '📈 Progreso' :
                             post.type === 'motivation' ? '💪 Motivación' : '💬 General'}
                          </Badge>
                          {post.discipline && (
                            <Badge variant="outline" className="text-xs">
                              {post.discipline}
                            </Badge>
                          )}
                          <span className="text-xs text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-3">{post.content}</p>
                        {post.imageUrl && (
                          <img src={post.imageUrl} alt="Post" className="rounded-lg max-w-full h-64 object-cover mb-3" />
                        )}
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                            <Heart className="mr-1" size={16} />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400">
                            <MessageSquare className="mr-1" size={16} />
                            Comentar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {communityPosts?.length === 0 && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="text-center py-12">
                    <MessageSquare className="mx-auto mb-4 text-gray-500" size={48} />
                    <h3 className="text-lg font-medium text-gray-300 mb-2">
                      ¡Sé el primero en publicar!
                    </h3>
                    <p className="text-gray-500">
                      Comparte tu progreso, logros o motivación con la comunidad
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}