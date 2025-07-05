import { Shield, Zap, Medal } from "lucide-react";

export default function InstructorsSection() {
  const instructors = [
    {
      name: "Antonio Alonso",
      title: "BJJ Maestro - Faixa Preta / Black Belt",
      description: "Maestro de Artes Marciales con más de 45 años de experiencia. Pionero del Jiu Jitsu Brasileño y MMA en Castilla y León. Cinturón Negro 4° Grado (Faixa preta) representando al Peposo Fight Team bajo Paulo Peposo Curi y Hitler Curi de Brasil.",
      specialties: ["MMA", "BJJ", "Judo", "Ne Waza"],
      icon: Shield,
      instagram: "https://www.instagram.com/kaizen_burgos?igsh=YW9qcnNtN3ZkdWJw",
      achievements: [
        "Profesor con mayor graduación de Castilla y León",
        "Pionero del BJJ y MMA en la comunidad",
        "Formó a los primeros cinturones negros de la región",
        "Maestro entrenador nacional"
      ]
    },
    {
      name: "Eduardo",
      title: "Instructor de Kickboxing",
      description: "Campeón nacional de kickboxing especializado en técnicas de striking y acondicionamiento físico.",
      specialties: ["Kickboxing", "Boxeo"],
      icon: Zap
    },
    {
      name: "Rubén Sancho",
      title: "Instructor de BJJ - Faixa Marrón / Brown Belt",
      description: "Estudiante, instructor y competidor de Jiu Jitsu Brasileño. Cinturón marrón con amplia experiencia en competición y enseñanza.",
      specialties: ["BJJ", "Grappling", "Competición"],
      icon: Medal
    }
  ];

  return (
    <section id="instructores" className="py-20 bg-kaizen-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros <span className="text-kaizen-red">Instructores</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Liderados por Antonio Alonso, Maestro pionero del BJJ y MMA en Castilla y León con 45 años de experiencia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => {
            const IconComponent = instructor.icon;
            return (
              <div 
                key={index}
                className="bg-kaizen-darker rounded-xl p-8 border border-gray-700 text-center relative overflow-hidden group"
              >
                <div className="relative z-10">
                  {instructor.name === "Antonio Alonso" ? (
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-kaizen-gold">
                      <img 
                        src="/antonio-profile.jpg" 
                        alt="Antonio Alonso"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <IconComponent className="text-4xl text-kaizen-gold" size={48} />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">{instructor.name}</h3>
                  <p className="text-kaizen-red font-semibold mb-4">{instructor.title}</p>
                  <p className="text-gray-300 mb-6">
                    {instructor.description}
                  </p>
                  <div className="flex justify-center flex-wrap gap-2 mb-4">
                    {instructor.specialties.map((specialty, specialtyIndex) => (
                      <span 
                        key={specialtyIndex}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          specialtyIndex % 2 === 0 
                            ? 'bg-kaizen-red text-white' 
                            : 'bg-kaizen-gold text-black'
                        }`}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  {instructor.instagram && (
                    <a 
                      href={instructor.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-kaizen-gold hover:text-yellow-400 transition-colors inline-block"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                  
                  {/* Show achievements for Antonio Alonso */}
                  {instructor.achievements && (
                    <div className="mt-6 text-left">
                      <h4 className="text-kaizen-gold font-bold mb-3">Logros Destacados:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {instructor.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start">
                            <span className="text-kaizen-red mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Button for Rubén Sancho */}
                  {instructor.name === "Rubén Sancho" && (
                    <div className="mt-6">
                      <a 
                        href="/bjj"
                        className="bg-kaizen-gold hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 inline-block"
                      >
                        Conoce a Rubén
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
