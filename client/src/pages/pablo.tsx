import { Calendar, Medal, Trophy, Target } from "lucide-react";

export default function PabloPage() {
  return (
    <div className="min-h-screen bg-kaizen-darker">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-kaizen-darker via-kaizen-dark to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="text-kaizen-gold">Pablo Mate</span>
                <br />
                Profesor de BJJ y Judo
              </h1>
              
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  <strong className="text-kaizen-gold">Profesor Pablo Mate</strong> - Faixa Preta/Black Belt 1° Grado y Cinturón Negro de Judo 1° Dan, representa la dedicación y evolución constante en las artes marciales.
                </p>
                
                <p>
                  Hace 15 años empezó una de las clases de Alonso y se enamoró del jiu jitsu desde el primer día, quedándose a su lado hasta el día de hoy y pasando por todas las fases, estudiante, competidor participando en numerosos campeonatos con kimono y sin Kimono No Gi y hoy como profesor, siempre aportando al equipo y sus alumnos su gran experiencia de una forma seria y divertida al mismo tiempo.
                </p>
              </div>

              {/* Professional Credentials Section */}
              <div className="mt-8 p-8 bg-gradient-to-br from-kaizen-darker/80 to-black/40 rounded-2xl border-2 border-kaizen-gold/30 shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-kaizen-gold mr-4"></div>
                  <h3 className="text-2xl font-bold text-kaizen-gold">Graduaciones y Certificaciones Profesionales</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-kaizen-dark/50 p-4 rounded-lg border-l-4 border-kaizen-red">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-kaizen-red rounded-full mr-3"></div>
                      <span className="text-white font-semibold text-lg">Faixa preta/black Belt 1°Grado</span>
                    </div>
                  </div>
                  <div className="bg-kaizen-dark/50 p-4 rounded-lg border-l-4 border-kaizen-red">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-kaizen-red rounded-full mr-3"></div>
                      <span className="text-white font-semibold text-lg">Cinto negro de judo 1° Dan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-kaizen-red/20 to-kaizen-gold/20 rounded-2xl transform rotate-3"></div>
                <img
                  src="/attached_assets/WhatsApp Image 2025-07-06 at 2.52.00 PM_1751807903180.jpeg"
                  alt="Pablo Mate - Profesor BJJ y Judo"
                  className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                {/* BJJ Logo Badge */}
                <div className="absolute top-4 right-4 bg-white/95 p-3 rounded-full shadow-lg border-2 border-kaizen-gold">
                  <img
                    src="/jiu-jitsu-logo.jpg"
                    alt="BJJ Logo"
                    className="w-16 h-16 object-contain rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey & Philosophy Section */}
      <section className="py-20 bg-kaizen-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Trayectoria y <span className="text-kaizen-red">Filosofía</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Phase */}
            <div className="bg-gradient-to-br from-kaizen-darker to-kaizen-dark p-8 rounded-xl border border-kaizen-gold/20 hover:border-kaizen-gold/40 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-kaizen-gold mr-3" />
                <h3 className="text-2xl font-bold text-white">Estudiante</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Comenzó su camino hace 15 años bajo la tutela de Antonio Alonso, enamorándose del jiu jitsu desde el primer día y demostrando una dedicación excepcional al arte.
              </p>
            </div>

            {/* Competitor Phase */}
            <div className="bg-gradient-to-br from-kaizen-darker to-kaizen-dark p-8 rounded-xl border border-kaizen-red/20 hover:border-kaizen-red/40 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Medal className="w-8 h-8 text-kaizen-red mr-3" />
                <h3 className="text-2xl font-bold text-white">Competidor</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Participó activamente en numerosos campeonatos tanto en modalidad Gi como No-Gi, adquiriendo valiosa experiencia competitiva que hoy transmite a sus estudiantes.
              </p>
            </div>

            {/* Instructor Phase */}
            <div className="bg-gradient-to-br from-kaizen-darker to-kaizen-dark p-8 rounded-xl border border-kaizen-gold/20 hover:border-kaizen-gold/40 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Trophy className="w-8 h-8 text-kaizen-gold mr-3" />
                <h3 className="text-2xl font-bold text-white">Profesor</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Hoy como profesor, aporta al equipo y sus alumnos su gran experiencia de una forma seria y divertida, manteniendo vivo el espíritu de mejora continua del Kaizen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-20 bg-gradient-to-br from-kaizen-darker to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Filosofía de <span className="text-kaizen-gold">Enseñanza</span>
          </h2>
          
          <div className="bg-gradient-to-r from-kaizen-dark/50 to-kaizen-darker/50 p-8 rounded-2xl border border-kaizen-gold/20">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              "La evolución constante y la pasión por el aprendizaje son los pilares de mi enseñanza. Desde estudiante hasta profesor, cada fase me ha enseñado que el jiu jitsu no es solo técnica, sino un camino de crecimiento personal."
            </p>
            <p className="text-lg text-kaizen-gold font-semibold">
              - Pablo Mate, Profesor BJJ & Judo
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-kaizen-red">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Entrena con Pablo Mate
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Descubre el BJJ y Judo con un instructor que ha vivido todas las fases del arte marcial
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white text-kaizen-red px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
            >
              <Calendar className="mr-2" size={20} />
              Reserva tu Clase
            </button>
            <a 
              href="tel:662323282" 
              className="border-2 border-white text-white hover:bg-white hover:text-kaizen-red px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center"
            >
              Llama Ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}