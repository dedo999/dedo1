import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/app-navigation";
import { Users, TrendingUp, ArrowLeft, Activity } from "lucide-react";
import { Link } from "wouter";

export default function GymCapacity() {
  const { data: capacity, isLoading } = useQuery({
    queryKey: ["/api/capacity"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const currentCount = capacity?.currentCount || 0;
  const maxCapacity = capacity?.maxCapacity || 50;
  const occupancyPercentage = Math.round((currentCount / maxCapacity) * 100);

  const getCapacityStatus = () => {
    if (occupancyPercentage < 30) return { text: "Muy tranquilo", color: "text-green-400", bg: "bg-green-500" };
    if (occupancyPercentage < 60) return { text: "Moderado", color: "text-yellow-400", bg: "bg-yellow-500" };
    if (occupancyPercentage < 85) return { text: "Ocupado", color: "text-orange-400", bg: "bg-orange-500" };
    return { text: "Muy ocupado", color: "text-red-400", bg: "bg-red-500" };
  };

  const status = getCapacityStatus();

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
              <Users className="w-6 h-6 text-red-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Capacidad del Gimnasio</h1>
                <p className="text-xs text-red-300">En tiempo real</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Main Capacity Display */}
        <Card className="bg-red-900/30 border-red-800/50 mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-white">
              {isLoading ? "..." : currentCount}
              <span className="text-2xl text-gray-400">/{maxCapacity}</span>
            </CardTitle>
            <CardDescription className="text-lg">
              <span className={status.color}>
                {status.text}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Capacity Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Ocupación actual</span>
                <span className="text-white">{occupancyPercentage}%</span>
              </div>
              <Progress 
                value={occupancyPercentage} 
                className="h-3"
              />
            </div>

            {/* Status Indicator */}
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${status.bg} animate-pulse`}></div>
              <span className="text-white">Actualizado en tiempo real</span>
            </div>

            {/* Last Updated */}
            {capacity?.lastUpdated && (
              <p className="text-center text-gray-400 text-sm">
                Última actualización: {new Date(capacity.lastUpdated).toLocaleTimeString('es-ES')}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Capacity Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-red-900/30 border-red-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-red-400" />
                ¿Cuándo es mejor ir?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Mañanas (7-10h)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm">Tranquilo</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Tarde (17-20h)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-400 text-sm">Ocupado</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Noche (20-22h)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-yellow-400 text-sm">Moderado</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-900/30 border-red-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-red-400" />
                Recomendaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-green-900/30 border border-green-800/50 rounded-lg">
                <p className="text-green-300 text-sm">
                  <strong>Mejor momento:</strong> Evita las horas punta (17-20h) para tener más espacio y equipamiento disponible.
                </p>
              </div>
              <div className="p-3 bg-blue-900/30 border border-blue-800/50 rounded-lg">
                <p className="text-blue-300 text-sm">
                  <strong>Tip:</strong> Reserva tus clases con antelación para garantizar tu plaza.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-red-900/30 border-red-800/50">
          <CardHeader>
            <CardTitle className="text-white">Acciones</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Link href="/bookings" className="flex-1">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                Reservar Clase
              </Button>
            </Link>
            <Link href="/checkin" className="flex-1">
              <Button variant="outline" className="w-full text-red-300 border-red-800 hover:bg-red-900/50">
                Check-in
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Navigation />
        </div>
      </div>
    </div>
  );
}