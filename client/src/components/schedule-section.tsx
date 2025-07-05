import { Phone } from "lucide-react";

export default function ScheduleSection() {
  // Mobile-optimized schedule data organized by day
  const weekSchedule = [
    {
      day: "Lunes",
      classes: [
        { time: "18:00-19:00", name: "Jiu Jitsu Kids/Infantil", type: "kids" },
        { time: "19:00-20:30", name: "Brazilian Jiu Jitsu", type: "grappling" },
        { time: "20:30-21:45", name: "MMA", type: "striking" }
      ]
    },
    {
      day: "Martes", 
      classes: [
        { time: "09:00-11:00", name: "MMA Mañana", type: "striking" },
        { time: "19:00-20:00", name: "Boxeo", type: "striking" },
        { time: "20:00-21:30", name: "Kickboxing / K1", type: "striking" }
      ]
    },
    {
      day: "Miércoles",
      classes: [
        { time: "18:00-19:00", name: "MMA", type: "striking" },
        { time: "19:00-20:30", name: "Brazilian Jiu Jitsu", type: "grappling" },
        { time: "20:30-21:45", name: "Boxeo", type: "striking" }
      ]
    },
    {
      day: "Jueves",
      classes: [
        { time: "09:00-11:00", name: "MMA Mañana", type: "striking" },
        { time: "19:00-20:00", name: "Boxeo", type: "striking" },
        { time: "20:00-21:30", name: "Kickboxing / K1", type: "striking" }
      ]
    },
    {
      day: "Viernes",
      classes: [
        { time: "19:00-20:30", name: "MMA", type: "striking" }
      ]
    },
    {
      day: "Sábado",
      classes: [
        { time: "11:00-13:00", name: "Open Mat", type: "grappling" }
      ]
    }
  ];

  const getClassStyle = (type: string) => {
    switch (type) {
      case "grappling":
        return "bg-kaizen-gold/20 text-kaizen-gold border-kaizen-gold/30";
      case "striking":
        return "bg-kaizen-red/20 text-kaizen-red border-kaizen-red/30";
      case "kids":
        return "bg-blue-500/20 text-blue-400 border-blue-400/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-400/30";
    }
  };

  return (
    <section id="horarios" className="py-20 bg-kaizen-darker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Horarios de <span className="text-kaizen-red">Clases</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Encuentra el horario perfecto para ti. Clases para todos los niveles y edades.
          </p>
        </div>

        {/* Mobile-optimized daily schedule */}
        <div className="space-y-6">
          {weekSchedule.map((day, dayIndex) => (
            <div key={dayIndex} className="bg-kaizen-dark rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-kaizen-gold mb-4 text-center">
                {day.day}
              </h3>
              
              {day.classes.length > 0 ? (
                <div className="space-y-3">
                  {day.classes.map((classItem, classIndex) => (
                    <div 
                      key={classIndex}
                      className={`p-4 rounded-lg border-2 ${getClassStyle(classItem.type)}`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-sm md:text-base">
                            {classItem.name}
                          </div>
                          <div className="text-sm opacity-90 mt-1">
                            {classItem.time}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs opacity-75 capitalize">
                            {classItem.type === 'grappling' ? 'Grappling' : 
                             classItem.type === 'striking' ? 'Striking' : 'Infantil'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Sin clases programadas
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-300 mb-6">
            ¿Necesitas un horario personalizado? Contáctanos para clases particulares.
          </p>
          <a 
            href="tel:662323282" 
            className="bg-kaizen-red hover:bg-red-700 px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            <Phone className="mr-2" size={20} />
            Llamar Ahora
          </a>
        </div>
      </div>
    </section>
  );
}
