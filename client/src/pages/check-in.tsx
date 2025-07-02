import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Navigation } from "@/components/app-navigation";
import { MapPin, ArrowLeft, Clock, Activity } from "lucide-react";
import { Link } from "wouter";

export default function CheckIn() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: checkIns, isLoading } = useQuery({
    queryKey: ["/api/checkins"],
  });

  const { data: classes } = useQuery({
    queryKey: ["/api/classes"],
  });

  const checkInMutation = useMutation({
    mutationFn: async (checkInData: any) => {
      return await apiRequest("/api/checkins", {
        method: "POST",
        body: JSON.stringify(checkInData),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      toast({
        title: "¡Check-in exitoso!",
        description: "Has registrado tu entrada al gimnasio.",
      });
      setIsCheckedIn(true);
      queryClient.invalidateQueries({ queryKey: ["/api/checkins"] });
      queryClient.invalidateQueries({ queryKey: ["/api/capacity"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error en check-in",
        description: error.message || "No se pudo registrar tu entrada.",
        variant: "destructive",
      });
    },
  });

  const checkOutMutation = useMutation({
    mutationFn: async (checkInId: number) => {
      return await apiRequest(`/api/checkins/${checkInId}/checkout`, {
        method: "PATCH",
      });
    },
    onSuccess: () => {
      toast({
        title: "¡Check-out exitoso!",
        description: "Has registrado tu salida del gimnasio.",
      });
      setIsCheckedIn(false);
      queryClient.invalidateQueries({ queryKey: ["/api/checkins"] });
      queryClient.invalidateQueries({ queryKey: ["/api/capacity"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error en check-out",
        description: error.message || "No se pudo registrar tu salida.",
        variant: "destructive",
      });
    },
  });

  const handleCheckIn = () => {
    checkInMutation.mutate({
      notes: "Check-in desde la app",
    });
  };

  const handleCheckOut = () => {
    const activeCheckIn = checkIns?.find((ci: any) => !ci.checkOutTime);
    if (activeCheckIn) {
      checkOutMutation.mutate(activeCheckIn.id);
    }
  };

  const activeCheckIn = checkIns?.find((ci: any) => !ci.checkOutTime);
  const recentCheckIns = checkIns?.slice(0, 10) || [];

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timeString: string) => {
    return new Date(timeString).toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-red-900">
      {/* Header */}
      <header className="border-b border-red-800/30 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-red-300 hover:bg-red-900/50">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-red-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Check-in/Check-out</h1>
                <p className="text-xs text-red-300">Registra tu visita</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Check-in/Check-out */}
          <div className="space-y-6">
            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader className="text-center">
                <CardTitle className="text-white">
                  {activeCheckIn ? "Estás en el gimnasio" : "Registrar entrada"}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {activeCheckIn 
                    ? `Entrada registrada a las ${formatTime(activeCheckIn.checkInTime)}`
                    : "Haz check-in para registrar tu visita"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeCheckIn ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                        <Activity className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-green-400 font-medium">Sesión activa</p>
                      <p className="text-gray-400 text-sm">
                        Duración: {/* Calculate duration here */}
                      </p>
                    </div>
                    <Button 
                      onClick={handleCheckOut}
                      disabled={checkOutMutation.isPending}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      {checkOutMutation.isPending ? "Registrando salida..." : "Check-out"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
                        <MapPin className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <Button 
                      onClick={handleCheckIn}
                      disabled={checkInMutation.isPending}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      {checkInMutation.isPending ? "Registrando..." : "Check-in"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-white">Información</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Horario actual</span>
                  <span className="text-white">{new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Estado</span>
                  <Badge variant={activeCheckIn ? "default" : "secondary"} className={activeCheckIn ? "bg-green-600" : "bg-gray-600"}>
                    {activeCheckIn ? "En el gimnasio" : "Fuera"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Visitas este mes</span>
                  <span className="text-white">{recentCheckIns.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Check-in History */}
          <div>
            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-white">Historial de visitas</CardTitle>
                <CardDescription className="text-gray-400">
                  Tus últimas entradas al gimnasio
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-gray-400">Cargando historial...</p>
                ) : recentCheckIns.length > 0 ? (
                  <div className="space-y-3">
                    {recentCheckIns.map((checkIn: any) => (
                      <div key={checkIn.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${checkIn.checkOutTime ? 'bg-gray-500' : 'bg-green-500'}`}></div>
                          <div>
                            <p className="text-white text-sm">
                              {formatDate(checkIn.checkInTime)}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {formatTime(checkIn.checkInTime)}
                              {checkIn.checkOutTime && (
                                ` - ${formatTime(checkIn.checkOutTime)}`
                              )}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`${checkIn.checkOutTime ? 'bg-gray-600' : 'bg-green-600'} text-white`}
                        >
                          {checkIn.checkOutTime ? 'Completado' : 'Activo'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                    <p className="text-gray-400">No hay historial de visitas</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Navigation />
        </div>
      </div>
    </div>
  );
}