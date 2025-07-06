import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { 
  ArrowLeft, 
  Camera, 
  Heart, 
  Share, 
  Download,
  Search,
  Filter,
  Grid,
  List,
  Play,
  Users,
  Trophy,
  Zap
} from 'lucide-react';

interface GymPhoto {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  discipline?: string;
  uploadedBy?: string;
  createdAt: string;
  likes?: number;
}

export default function AppPhotos() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<GymPhoto | null>(null);

  const { data: gymPhotos } = useQuery<GymPhoto[]>({
    queryKey: ['/api/gym/photos'],
  });

  const categories = [
    { id: 'all', label: 'Todas', icon: Grid, color: 'text-white' },
    { id: 'training', label: 'Entrenamientos', icon: Users, color: 'text-kaizen-red' },
    { id: 'events', label: 'Eventos', icon: Trophy, color: 'text-kaizen-gold' },
    { id: 'facilities', label: 'Instalaciones', icon: Camera, color: 'text-blue-400' },
    { id: 'general', label: 'General', icon: Zap, color: 'text-green-400' }
  ];

  const disciplines = ['BJJ', 'MMA', 'Kickboxing', 'Boxeo'];

  const filteredPhotos = gymPhotos?.filter(photo => {
    const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory;
    const matchesSearch = photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         photo.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  const getDisciplineEmoji = (discipline: string) => {
    const emojis: Record<string, string> = {
      'BJJ': '🥋',
      'MMA': '🥊',
      'Kickboxing': '🦵',
      'Boxeo': '👊'
    };
    return emojis[discipline] || '📸';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'training': 'bg-kaizen-red',
      'events': 'bg-kaizen-gold',
      'facilities': 'bg-blue-600',
      'general': 'bg-green-600'
    };
    return colors[category] || 'bg-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = '/app/dashboard'}
            >
              <ArrowLeft size={20} className="text-gray-300" />
            </Button>
            <div>
              <h1 className="text-white font-bold text-lg">Galería del Gym</h1>
              <p className="text-gray-400 text-sm">{filteredPhotos.length} fotos</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
            </Button>
            <Button variant="ghost" size="sm">
              <Camera size={20} className="text-kaizen-red" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
            <Input
              placeholder="Buscar fotos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white"
            />
          </div>

          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 ${
                    selectedCategory === category.id 
                      ? 'bg-kaizen-red hover:bg-red-700' 
                      : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon size={14} className="mr-1" />
                  {category.label}
                </Button>
              );
            })}
          </div>

          {/* Discipline Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {disciplines.map((discipline) => (
              <Badge
                key={discipline}
                variant="outline"
                className="flex-shrink-0 border-gray-600 text-gray-300 cursor-pointer hover:bg-gray-700"
              >
                {getDisciplineEmoji(discipline)} {discipline}
              </Badge>
            ))}
          </div>
        </div>

        {/* Photos Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredPhotos.map((photo) => (
              <Card 
                key={photo.id} 
                className="bg-gray-800/50 border-gray-700 overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative aspect-square">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge 
                      className={`${getCategoryColor(photo.category)} text-white text-xs`}
                    >
                      {photo.category}
                    </Badge>
                  </div>
                  {photo.discipline && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="text-xs">
                        {getDisciplineEmoji(photo.discipline)}
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <h3 className="text-white text-sm font-medium truncate">
                      {photo.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-gray-300 text-xs">
                        {new Date(photo.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Heart size={12} className="text-red-400" />
                        <span className="text-xs text-gray-300">{photo.likes || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPhotos.map((photo) => (
              <Card 
                key={photo.id} 
                className="bg-gray-800/50 border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors"
                onClick={() => setSelectedPhoto(photo)}
              >
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-medium truncate">{photo.title}</h3>
                        <div className="flex items-center space-x-2 ml-2">
                          <Heart size={14} className="text-red-400" />
                          <span className="text-sm text-gray-300">{photo.likes || 0}</span>
                        </div>
                      </div>
                      {photo.description && (
                        <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                          {photo.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-2">
                        <Badge 
                          className={`${getCategoryColor(photo.category)} text-white text-xs`}
                        >
                          {photo.category}
                        </Badge>
                        {photo.discipline && (
                          <Badge variant="secondary" className="text-xs">
                            {getDisciplineEmoji(photo.discipline)} {photo.discipline}
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">
                          {new Date(photo.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <Camera className="mx-auto mb-4 text-gray-500" size={48} />
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              No se encontraron fotos
            </h3>
            <p className="text-gray-500">
              Prueba cambiando los filtros o la búsqueda
            </p>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="max-w-4xl w-full max-h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="bg-gray-800 border-gray-700">
              <div className="relative">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full max-h-96 object-contain"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                >
                  ✕
                </Button>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      {selectedPhoto.title}
                    </h2>
                    {selectedPhoto.description && (
                      <p className="text-gray-300">
                        {selectedPhoto.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge 
                      className={`${getCategoryColor(selectedPhoto.category)} text-white`}
                    >
                      {selectedPhoto.category}
                    </Badge>
                    {selectedPhoto.discipline && (
                      <Badge variant="secondary">
                        {getDisciplineEmoji(selectedPhoto.discipline)} {selectedPhoto.discipline}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                    <div className="text-sm text-gray-400">
                      {new Date(selectedPhoto.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button variant="ghost" size="sm">
                        <Heart className="mr-2" size={16} />
                        {selectedPhoto.likes || 0}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="mr-2" size={16} />
                        Compartir
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="mr-2" size={16} />
                        Descargar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}