import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Shield, Medal, Star, Users, Trophy, Target } from "lucide-react";

export default function BJJPage() {
  return (
    <div className="min-h-screen bg-kaizen-darker text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-kaizen-dark to-kaizen-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                <span className="text-kaizen-gold">Jiu Jitsu Brasileño</span><br />
                en Kaizen Burgos
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Descubre el arte suave del Jiu Jitsu Brasileño bajo la guía de nuestros instructores especializados. 
                Una disciplina que combina técnica, estrategia y filosofía de vida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:662323282" 
                  className="bg-kaizen-red hover:bg-red-700 px-8 py-4 rounded-lg font-bold text-white transition-all duration-300 text-center"
                >
                  Reservar Clase Gratuita
                </a>
                <a 
                  href="https://wa.me/34662323282?text=Hola,%20me%20gustaría%20información%20sobre%20las%20clases%20de%20BJJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-kaizen-gold text-kaizen-gold hover:bg-kaizen-gold hover:text-black px-8 py-4 rounded-lg font-bold transition-all duration-300 text-center"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Image placeholder - will add Rubén's image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-kaizen-red/20 to-kaizen-gold/20 rounded-2xl transform rotate-3"></div>
                <div className="relative w-full h-96 bg-kaizen-dark rounded-2xl shadow-2xl border border-kaizen-gold/30 flex items-center justify-center">
                  <p className="text-gray-400">Imagen de Rubén Sancho próximamente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20 bg-kaizen-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nuestros <span className="text-kaizen-gold">Instructores de BJJ</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Aprende de los mejores instructores de Jiu Jitsu Brasileño en Castilla y León
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Antonio Alonso */}
            <div className="bg-kaizen-darker p-8 rounded-xl border border-gray-800">
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-kaizen-red mr-3" />
                <div>
                  <h3 className="text-2xl font-bold text-white">Antonio Alonso</h3>
                  <p className="text-kaizen-gold font-semibold">BJJ Maestro - Faixa Preta / Black Belt</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Maestro pionero del BJJ en Castilla y León con más de 45 años de experiencia. 
                Cinturón Negro 4° Grado representando al Peposo Fight Team de Brasil.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">• Primer instructor de BJJ en la región</p>
                <p className="text-sm text-gray-400">• Formó a los primeros cinturones negros</p>
                <p className="text-sm text-gray-400">• Maestro entrenador nacional</p>
              </div>
            </div>

            {/* Rubén Sancho */}
            <div className="bg-kaizen-darker p-8 rounded-xl border border-gray-800">
              <div className="flex items-center mb-6">
                <Medal className="w-8 h-8 text-kaizen-gold mr-3" />
                <div>
                  <h3 className="text-2xl font-bold text-white">Rubén Sancho</h3>
                  <p className="text-kaizen-gold font-semibold">Faixa Marrón / Brown Belt</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Estudiante, instructor y competidor de Jiu Jitsu Brasileño. 
                Cinturón marrón con amplia experiencia en competición y enseñanza técnica especializada.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">• Instructor especializado en técnicas de competición</p>
                <p className="text-sm text-gray-400">• Experiencia en torneos nacionales</p>
                <p className="text-sm text-gray-400">• Enfoque en desarrollo técnico y táctico</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BJJ Benefits */}
      <section className="py-20 bg-kaizen-darker">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Beneficios del <span className="text-kaizen-red">Jiu Jitsu Brasileño</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-kaizen-dark p-8 rounded-xl border border-gray-800">
              <Target className="w-12 h-12 text-kaizen-red mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Técnica y Estrategia</h3>
              <p className="text-gray-300">
                Desarrolla habilidades técnicas refinadas y pensamiento estratégico aplicable dentro y fuera del tatami.
              </p>
            </div>

            <div className="bg-kaizen-dark p-8 rounded-xl border border-gray-800">
              <Users className="w-12 h-12 text-kaizen-gold mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Comunidad y Respeto</h3>
              <p className="text-gray-300">
                Únete a una comunidad basada en el respeto mutuo, la humildad y el crecimiento personal continuo.
              </p>
            </div>

            <div className="bg-kaizen-dark p-8 rounded-xl border border-gray-800">
              <Trophy className="w-12 h-12 text-kaizen-red mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Preparación para Competición</h3>
              <p className="text-gray-300">
                Entrena con técnicas de alto nivel para competiciones locales, nacionales e internacionales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing for BJJ */}
      <section className="py-20 bg-kaizen-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Planes de <span className="text-kaizen-gold">Jiu Jitsu</span>
            </h2>
            <p className="text-lg text-gray-300">
              Elige el plan que mejor se adapte a tu ritmo de entrenamiento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 2 días */}
            <div className="bg-kaizen-darker p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-2">BJJ - 2 días</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-kaizen-gold">50€</span>
                <span className="text-gray-400 ml-2">por mes</span>
              </div>
              <p className="text-gray-300 mb-6">Dos días semana más sábados</p>
              <ul className="space-y-2 text-gray-300">
                <li>• 2 días por semana</li>
                <li>• Acceso a clases de sábado</li>
                <li>• Open mat incluido</li>
                <li>• Progresión de cinturones</li>
              </ul>
            </div>

            {/* 3 días */}
            <div className="bg-kaizen-red/10 p-8 rounded-xl border border-kaizen-red">
              <div className="text-center mb-4">
                <span className="bg-kaizen-red px-3 py-1 rounded-full text-white text-sm font-bold">
                  MÁS POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">BJJ - 3 días</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-kaizen-gold">60€</span>
                <span className="text-gray-400 ml-2">por mes</span>
              </div>
              <p className="text-gray-300 mb-6">Tres días semana más sábados</p>
              <ul className="space-y-2 text-gray-300">
                <li>• 3 días por semana</li>
                <li>• Acceso a clases de sábado</li>
                <li>• Técnicas avanzadas</li>
                <li>• Progresión acelerada</li>
              </ul>
            </div>

            {/* 4 días */}
            <div className="bg-kaizen-darker p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-2">BJJ - 4 días</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-kaizen-gold">70€</span>
                <span className="text-gray-400 ml-2">por mes</span>
              </div>
              <p className="text-gray-300 mb-6">Cuatro días semana más sábados</p>
              <ul className="space-y-2 text-gray-300">
                <li>• 4 días por semana</li>
                <li>• Entrenamiento intensivo</li>
                <li>• Técnicas de competición</li>
                <li>• Preparación para torneos</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 mb-6">
              ¿Primera vez? ¡Tu primera clase es completamente gratuita!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:662323282" 
                className="bg-kaizen-red hover:bg-red-700 px-8 py-3 rounded-lg font-bold text-white transition-all duration-300"
              >
                Reservar Clase Gratuita
              </a>
              <a 
                href="https://wa.me/34662323282?text=Hola,%20me%20gustaría%20información%20sobre%20los%20planes%20de%20BJJ"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-kaizen-gold text-kaizen-gold hover:bg-kaizen-gold hover:text-black px-8 py-3 rounded-lg font-bold transition-all duration-300"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}