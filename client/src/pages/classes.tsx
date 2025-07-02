import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/app-navigation";
import { Dumbbell, ArrowLeft, Clock, Users, Target } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Classes() {
  const { data: classes, isLoading } = useQuery({
    queryKey: ["/api/classes"],
  });

  const { data: schedules } = useQuery({
    queryKey: ["/api/schedules"],
  });

  const getClassSchedules = (classId: number) => {
    return schedules?.filter((schedule: any) => schedule.classId === classId) || [];
  };

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5);
  };

  const getDayName = (dayNumber: number) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[dayNumber];
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
              <Dumbbell className="w-6 h-6 text-red-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Clases Disponibles</h1>
                <p className="text-xs text-red-300">Nuestras disciplinas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-white">Cargando clases...</p>
          </div>
        ) : classes && classes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {classes.map((classItem: any) => {
              const classSchedules = getClassSchedules(classItem.id);
              return (
                <Card key={classItem.id} className="bg-red-900/30 border-red-800/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{classItem.name}</CardTitle>
                      <Badge 
                        variant="secondary" 
                        className="bg-red-900/50 text-red-300"
                      >
                        {classItem.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400">
                      {classItem.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Instructor:</span>
                      <span className="text-white">{classItem.instructor}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Duración:
                      </span>
                      <span className="text-white">{classItem.duration} min</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300 flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        Capacidad:
                      </span>
                      <span className="text-white">{classItem.maxCapacity} personas</span>
                    </div>

                    {classItem.equipment && classItem.equipment.length > 0 && (
                      <div>
                        <p className="text-gray-300 text-sm mb-2">Equipamiento:</p>
                        <div className="flex flex-wrap gap-1">
                          {classItem.equipment.map((equipment: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs border-red-800 text-red-300">
                              {equipment}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {classSchedules.length > 0 && (
                      <div>
                        <p className="text-gray-300 text-sm mb-2">Horarios:</p>
                        <div className="space-y-1">
                          {classSchedules.map((schedule: any) => (
                            <div key={schedule.id} className="text-xs text-white bg-black/30 p-2 rounded">
                              {getDayName(schedule.dayOfWeek)}: {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Dumbbell className="w-12 h-12 mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400">No hay clases disponibles</p>
          </div>
        )}

        <div className="mt-8">
          <Navigation />
        </div>
      </div>
    </div>
  );
}