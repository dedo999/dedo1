import { Phone } from "lucide-react";

export default function ScheduleSection() {
  const schedule = [
    {
      time: "10:00-11:00",
      classes: ["", "", "", "", "", "BJJ Principiantes"]
    },
    {
      time: "11:00-12:00",
      classes: ["", "", "", "", "", "MMA Open Mat"]
    },
    {
      time: "18:00-19:00",
      classes: ["Kickboxing", "BJJ Gi", "MMA", "Boxeo", "Kickboxing", ""]
    },
    {
      time: "19:00-20:00",
      classes: ["BJJ No-Gi", "MMA", "BJJ Avanzado", "MMA", "BJJ Open", ""]
    },
    {
      time: "20:00-21:00",
      classes: ["MMA Principiantes", "Kickboxing", "Boxeo", "BJJ Competición", "MMA Avanzado", ""]
    },
    {
      time: "21:00-22:30",
      classes: ["Sparring", "Open Mat", "Grappling", "Libre", "Sparring", ""]
    }
  ];

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  const getClassStyle = (className: string) => {
    if (className.includes("BJJ") || className.includes("Grappling") || className.includes("Open")) {
      return "bg-kaizen-gold/20 text-kaizen-gold";
    }
    if (className.includes("MMA") || className.includes("Kickboxing") || className.includes("Boxeo") || className.includes("Sparring")) {
      return "bg-kaizen-red/20 text-kaizen-red";
    }
    return "";
  };

  return (
    <section id="horarios" className="py-20 bg-kaizen-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Horarios de <span className="text-kaizen-red">Clases</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Encuentra el horario perfecto para ti. Clases para todos los niveles y edades.
          </p>
        </div>

        <div className="bg-kaizen-dark rounded-xl p-8 border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-4 text-kaizen-gold font-bold min-w-[100px]">Horario</th>
                  {days.map((day) => (
                    <th key={day} className="pb-4 text-kaizen-gold font-bold min-w-[120px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {schedule.map((row, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="py-3 text-gray-300 font-medium">{row.time}</td>
                    {row.classes.map((className, classIndex) => (
                      <td key={classIndex} className="py-3">
                        {className ? (
                          <div className={`px-2 py-1 rounded text-xs font-medium ${getClassStyle(className)}`}>
                            {className}
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-kaizen-red/20 rounded mr-2"></div>
              <span className="text-sm text-gray-300">Striking / Boxeo</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-kaizen-gold/20 rounded mr-2"></div>
              <span className="text-sm text-gray-300">Grappling / BJJ</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
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
