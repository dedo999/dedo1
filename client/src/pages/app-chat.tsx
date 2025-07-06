import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  MessageSquare, 
  Send, 
  Users, 
  Plus,
  Search,
  Camera,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video
} from 'lucide-react';

interface Conversation {
  id: number;
  name?: string;
  type: string;
  discipline?: string;
  participants: Array<{
    id: string;
    firstName: string;
    lastName: string;
    profileImageUrl?: string;
  }>;
  lastMessage?: {
    content: string;
    sentAt: string;
    sender: string;
  };
  unreadCount: number;
  isActive: boolean;
}

interface ChatMessage {
  id: number;
  conversationId: number;
  senderId: string;
  content: string;
  messageType: string;
  fileUrl?: string;
  createdAt: string;
  sender: {
    firstName: string;
    lastName: string;
    profileImageUrl?: string;
  };
}

export default function AppChat() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: conversations } = useQuery<Conversation[]>({
    queryKey: ['/api/conversations'],
  });

  const { data: messages } = useQuery<ChatMessage[]>({
    queryKey: ['/api/conversations', selectedConversation?.id, 'messages'],
    enabled: !!selectedConversation,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data: { conversationId: number; content: string; messageType: string }) => {
      return await apiRequest('POST', '/api/conversations/messages', data);
    },
    onSuccess: () => {
      setMessageText('');
      queryClient.invalidateQueries({ queryKey: ['/api/conversations'] });
      queryClient.invalidateQueries({ 
        queryKey: ['/api/conversations', selectedConversation?.id, 'messages'] 
      });
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedConversation) return;

    sendMessageMutation.mutate({
      conversationId: selectedConversation.id,
      content: messageText,
      messageType: 'text'
    });
  };

  const getConversationName = (conversation: Conversation) => {
    if (conversation.name) return conversation.name;
    if (conversation.type === 'discipline') {
      return `${conversation.discipline} - Grupo`;
    }
    const otherParticipants = conversation.participants.filter(p => p.id !== user?.id);
    if (otherParticipants.length === 1) {
      return `${otherParticipants[0].firstName} ${otherParticipants[0].lastName}`;
    }
    return `Grupo (${conversation.participants.length})`;
  };

  const getConversationAvatar = (conversation: Conversation) => {
    const otherParticipants = conversation.participants.filter(p => p.id !== user?.id);
    if (otherParticipants.length === 1) {
      return otherParticipants[0].profileImageUrl;
    }
    return null;
  };

  const getConversationInitials = (conversation: Conversation) => {
    if (conversation.type === 'discipline') {
      return conversation.discipline?.slice(0, 2) || 'GR';
    }
    const otherParticipants = conversation.participants.filter(p => p.id !== user?.id);
    if (otherParticipants.length === 1) {
      const participant = otherParticipants[0];
      return `${participant.firstName[0]}${participant.lastName[0]}`;
    }
    return 'GR';
  };

  const getDisciplineEmoji = (discipline: string) => {
    const emojis: Record<string, string> = {
      'BJJ': '🥋',
      'MMA': '🥊',
      'Kickboxing': '🦵',
      'Boxeo': '👊'
    };
    return emojis[discipline] || '💬';
  };

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    }
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  const filteredConversations = conversations?.filter(conv => 
    getConversationName(conv).toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (!selectedConversation) {
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
                <h1 className="text-white font-bold text-lg">Conversaciones</h1>
                <p className="text-gray-400 text-sm">
                  {filteredConversations.length} conversaciones
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Plus size={20} className="text-kaizen-red" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
            <Input
              placeholder="Buscar conversaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white"
            />
          </div>

          {/* Discipline Groups */}
          <div className="space-y-2">
            <h3 className="text-gray-400 text-sm font-medium">Grupos por Disciplina</h3>
            <div className="grid grid-cols-2 gap-3">
              {['BJJ', 'MMA', 'Kickboxing', 'Boxeo'].map((discipline) => (
                <Card 
                  key={discipline}
                  className="bg-gray-800/50 border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors"
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">
                      {getDisciplineEmoji(discipline)}
                    </div>
                    <div className="text-white font-medium text-sm">
                      {discipline}
                    </div>
                    <div className="text-gray-400 text-xs">
                      Grupo general
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Conversations List */}
          <div className="space-y-2">
            <h3 className="text-gray-400 text-sm font-medium">Conversaciones Recientes</h3>
            {filteredConversations.map((conversation) => (
              <Card 
                key={conversation.id}
                className="bg-gray-800/50 border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors"
                onClick={() => setSelectedConversation(conversation)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={getConversationAvatar(conversation) || undefined} />
                        <AvatarFallback className="bg-kaizen-red text-white">
                          {getConversationInitials(conversation)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.type === 'group' && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                          <Users size={8} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-medium truncate">
                          {getConversationName(conversation)}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {conversation.lastMessage && (
                            <span className="text-xs text-gray-400">
                              {formatMessageTime(conversation.lastMessage.sentAt)}
                            </span>
                          )}
                          {conversation.unreadCount > 0 && (
                            <Badge className="bg-kaizen-red text-white text-xs">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {conversation.lastMessage && (
                        <p className="text-gray-400 text-sm truncate">
                          {conversation.lastMessage.content}
                        </p>
                      )}
                      <div className="flex items-center space-x-2 mt-1">
                        {conversation.type === 'discipline' && (
                          <Badge variant="outline" className="text-xs">
                            {getDisciplineEmoji(conversation.discipline || '')} {conversation.discipline}
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">
                          {conversation.participants.length} miembros
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredConversations.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto mb-4 text-gray-500" size={48} />
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                No hay conversaciones
              </h3>
              <p className="text-gray-500 mb-4">
                Únete a los grupos de disciplinas o inicia una conversación
              </p>
              <Button className="bg-kaizen-red hover:bg-red-700">
                <Plus className="mr-2" size={16} />
                Nueva conversación
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Chat View
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
      {/* Chat Header */}
      <div className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedConversation(null)}
            >
              <ArrowLeft size={20} className="text-gray-300" />
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage src={getConversationAvatar(selectedConversation) || undefined} />
              <AvatarFallback className="bg-kaizen-red text-white">
                {getConversationInitials(selectedConversation)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-white font-medium">
                {getConversationName(selectedConversation)}
              </h2>
              <p className="text-gray-400 text-sm">
                {selectedConversation.participants.length} miembros • En línea
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone size={18} className="text-gray-300" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video size={18} className="text-gray-300" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical size={18} className="text-gray-300" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => {
          const isOwn = message.senderId === user?.id;
          return (
            <div
              key={message.id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse' : 'flex-row'} space-x-2`}>
                {!isOwn && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={message.sender.profileImageUrl} />
                    <AvatarFallback className="bg-gray-600 text-white text-xs">
                      {message.sender.firstName[0]}{message.sender.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div>
                  {!isOwn && (
                    <p className="text-xs text-gray-400 mb-1 ml-2">
                      {message.sender.firstName} {message.sender.lastName}
                    </p>
                  )}
                  <div className={`rounded-lg p-3 ${
                    isOwn 
                      ? 'bg-kaizen-red text-white' 
                      : 'bg-gray-800 text-gray-100'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      isOwn ? 'text-red-100' : 'text-gray-400'
                    }`}>
                      {formatMessageTime(message.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-gray-800/50 border-t border-gray-700 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" type="button">
            <Paperclip size={18} className="text-gray-400" />
          </Button>
          <Button variant="ghost" size="sm" type="button">
            <Camera size={18} className="text-gray-400" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Escribe un mensaje..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white pr-12"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Smile size={16} className="text-gray-400" />
            </Button>
          </div>
          <Button 
            type="submit"
            disabled={!messageText.trim() || sendMessageMutation.isPending}
            className="bg-kaizen-red hover:bg-red-700"
          >
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
}