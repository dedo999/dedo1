import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/app-navigation";
import { 
  Calendar, 
  Users, 
  Activity, 
  TrendingUp, 
  Clock,
  MapPin,
  LogOut
} from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: capacity } = useQuery({
    queryKey: ["/api/capacity"],
  });

  const { data: userBookings } = useQuery({
    queryKey: ["/api/bookings"],
  });

  const { data: checkIns } = useQuery({
    queryKey: ["/api/checkins"],
  });

  const { data: classes } = useQuery({
    queryKey: ["/api/classes"],
  });

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const todayBookings = userBookings?.filter((booking: any) => {
    const today = new Date().toISOString().split('T')[0];
    return booking.bookingDate === today && booking.status === 'confirmed';
  });

  const recentCheckIns = checkIns?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-red-900">
      {/* Header */}
      <header className="border-b border-red-800/30 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-400 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Hola, {user?.firstName || user?.email?.split('@')[0]}
                </h1>
                <p className="text-xs text-red-300">Kaizen Burgos App</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              size="sm"
              className="text-red-300 border-red-800 hover:bg-red-900/50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-red-900/30 border-red-800/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Capacidad Actual
              </CardTitle>
              <Users className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {capacity?.currentCount || 0}/{capacity?.maxCapacity || 50}
              </div>
              <p className="text-xs text-gray-400">
                personas en el gimnasio
              </p>
            </CardContent>
          </Card>

          <Card className="bg-red-900/30 border-red-800/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Clases Hoy
              </CardTitle>
              <Calendar className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {todayBookings?.length || 0}
              </div>
              <p className="text-xs text-gray-400">
                reservas confirmadas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-red-900/30 border-red-800/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Check-ins
              </CardTitle>
              <Clock className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {checkIns?.length || 0}
              </div>
              <p className="text-xs text-gray-400">
                este mes
              </p>
            </CardContent>
          </Card>

          <Card className="bg-red-900/30 border-red-800/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Disciplinas
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {classes?.length || 0}
              </div>
              <p className="text-xs text-gray-400">
                disponibles
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-white">Tu horario de hoy</CardTitle>
                <CardDescription className="text-gray-400">
                  Clases reservadas para hoy
                </CardDescription>
              </CardHeader>
              <CardContent>
                {todayBookings && todayBookings.length > 0 ? (
                  <div className="space-y-3">
                    {todayBookings.map((booking: any) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <div>
                            <p className="text-white font-medium">Clase reservada</p>
                            <p className="text-gray-400 text-sm">ID: {booking.scheduleId}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-red-900/50 text-red-300">
                          {booking.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                    <p className="text-gray-400 mb-4">No tienes clases reservadas para hoy</p>
                    <Link href="/bookings">
                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        Reservar Clase
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Quick Check-in */}
            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-white">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/checkin">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    Check-in
                  </Button>
                </Link>
                <Link href="/bookings">
                  <Button variant="outline" className="w-full text-red-300 border-red-800 hover:bg-red-900/50">
                    <Calendar className="w-4 h-4 mr-2" />
                    Reservar Clase
                  </Button>
                </Link>
                <Link href="/capacity">
                  <Button variant="outline" className="w-full text-red-300 border-red-800 hover:bg-red-900/50">
                    <Users className="w-4 h-4 mr-2" />
                    Ver Capacidad
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-white">Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                {recentCheckIns.length > 0 ? (
                  <div className="space-y-3">
                    {recentCheckIns.map((checkIn: any) => (
                      <div key={checkIn.id} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-white text-sm">Check-in</p>
                          <p className="text-gray-400 text-xs">
                            {new Date(checkIn.checkInTime).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No hay actividad reciente</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8">
          <Navigation />
        </div>
      </div>
    </div>
  );
}