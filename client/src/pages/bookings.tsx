import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Navigation } from "@/components/app-navigation";
import { Calendar as CalendarIcon, Clock, Users, ArrowLeft, X } from "lucide-react";
import { Link } from "wouter";

export default function Bookings() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: userBookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["/api/bookings"],
  });

  const { data: classes } = useQuery({
    queryKey: ["/api/classes"],
  });

  const { data: schedules } = useQuery({
    queryKey: ["/api/schedules"],
  });

  // Get schedules for selected day
  const dayOfWeek = selectedDate.getDay();
  const daySchedules = schedules?.filter((schedule: any) => 
    schedule.dayOfWeek === dayOfWeek && schedule.isActive
  ) || [];

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      return await apiRequest("/api/bookings", {
        method: "POST",
        body: JSON.stringify(bookingData),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      toast({
        title: "¡Reserva confirmada!",
        description: "Tu clase ha sido reservada exitosamente.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      setSelectedScheduleId("");
    },
    onError: (error: any) => {
      toast({
        title: "Error al reservar",
        description: error.message || "No se pudo completar la reserva.",
        variant: "destructive",
      });
    },
  });

  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: number) => {
      return await apiRequest(`/api/bookings/${bookingId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      toast({
        title: "Reserva cancelada",
        description: "Tu reserva ha sido cancelada exitosamente.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error al cancelar",
        description: error.message || "No se pudo cancelar la reserva.",
        variant: "destructive",
      });
    },
  });

  const handleBooking = () => {
    if (!selectedScheduleId) {
      toast({
        title: "Selecciona una clase",
        description: "Por favor selecciona una clase para reservar.",
        variant: "destructive",
      });
      return;
    }

    createBookingMutation.mutate({
      scheduleId: parseInt(selectedScheduleId),
      bookingDate: selectedDate.toISOString().split('T')[0],
    });
  };

  const getClassName = (scheduleId: number) => {
    const schedule = schedules?.find((s: any) => s.id === scheduleId);
    const classData = classes?.find((c: any) => c.id === schedule?.classId);
    return classData?.name || "Clase";
  };

  const getScheduleInfo = (scheduleId: number) => {
    const schedule = schedules?.find((s: any) => s.id === scheduleId);
    if (!schedule) return null;
    
    const classData = classes?.find((c: any) => c.id === schedule.classId);
    return {
      ...schedule,
      className: classData?.name || "Clase",
      instructor: classData?.instructor || "Instructor",
      duration: classData?.duration || 60,
    };
  };

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5); // Remove seconds
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
              <CalendarIcon className="w-6 h-6 text-red-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Reservar Clases</h1>
                <p className="text-xs text-red-300">Gestiona tus entrenamientos</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar & Class Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Selection */}
            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-white">Seleccionar Fecha</CardTitle>
                <CardDescription className="text-gray-400">
                  Elige el día para tu entrenamiento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border border-red-800/50 bg-black/30"
                />
              </CardContent>
            </Card>

            {/* Available Classes */}
            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-white">
                  Clases Disponibles - {formatDate(selectedDate.toISOString())}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Selecciona la clase que quieres reservar
                </CardDescription>
              </CardHeader>
              <CardContent>
                {daySchedules.length > 0 ? (
                  <div className="space-y-3">
                    {daySchedules.map((schedule: any) => {
                      const classData = classes?.find((c: any) => c.id === schedule.classId);
                      return (
                        <div 
                          key={schedule.id}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedScheduleId === schedule.id.toString()
                              ? 'bg-red-600/30 border-red-500'
                              : 'bg-black/30 border-red-800/50 hover:bg-red-900/20'
                          }`}
                          onClick={() => setSelectedScheduleId(schedule.id.toString())}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-white font-medium">{classData?.name}</h3>
                              <p className="text-gray-400 text-sm">{classData?.instructor}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="flex items-center text-red-300 text-sm">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                                </span>
                                <span className="flex items-center text-red-300 text-sm">
                                  <Users className="w-4 h-4 mr-1" />
                                  {classData?.maxCapacity} max
                                </span>
                              </div>
                            </div>
                            <Badge variant="secondary" className="bg-red-900/50 text-red-300">
                              {classData?.difficulty || 'Todos los niveles'}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                    {selectedScheduleId && (
                      <Button 
                        onClick={handleBooking}
                        disabled={createBookingMutation.isPending}
                        className="w-full bg-red-600 hover:bg-red-700 text-white mt-4"
                      >
                        {createBookingMutation.isPending ? "Reservando..." : "Confirmar Reserva"}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                    <p className="text-gray-400">No hay clases disponibles para este día</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* My Bookings */}
          <div>
            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-white">Mis Reservas</CardTitle>
                <CardDescription className="text-gray-400">
                  Tus próximas clases
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bookingsLoading ? (
                  <p className="text-gray-400">Cargando reservas...</p>
                ) : userBookings && userBookings.length > 0 ? (
                  <div className="space-y-3">
                    {userBookings
                      .filter((booking: any) => booking.status === 'confirmed')
                      .slice(0, 5)
                      .map((booking: any) => {
                        const scheduleInfo = getScheduleInfo(booking.scheduleId);
                        return (
                          <div key={booking.id} className="p-3 bg-black/30 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="text-white text-sm font-medium">
                                  {scheduleInfo?.className || 'Clase'}
                                </h4>
                                <p className="text-gray-400 text-xs">
                                  {formatDate(booking.bookingDate)}
                                </p>
                                {scheduleInfo && (
                                  <p className="text-red-300 text-xs">
                                    {formatTime(scheduleInfo.startTime)} - {formatTime(scheduleInfo.endTime)}
                                  </p>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => cancelBookingMutation.mutate(booking.id)}
                                disabled={cancelBookingMutation.isPending}
                                className="text-red-400 hover:bg-red-900/50 h-auto p-1"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                    <p className="text-gray-400">No tienes reservas activas</p>
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