import { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    document.title = "Sobre Nosotros - Antonio Alonso | Kaizen Burgos";
  }, []);

  return (
    <div className="min-h-screen bg-kaizen-darker">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-kaizen-darker via-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              Sobre <span className="text-kaizen-gold">Nosotros</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Conoce la historia y experiencia detrás de Kaizen Burgos
            </p>
          </div>
        </div>
      </section>

      {/* Antonio Alonso Section */}
      <section className="py-20 bg-kaizen-darker">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-kaizen-red/20 to-kaizen-gold/20 rounded-2xl transform rotate-3"></div>
                <img
                  src="/antonio-about-photo.jpg"
                  alt="Antonio Alonso - Maestro Kaizen"
                  className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                {/* Jiu Jitsu Logo Badge */}
                <div className="absolute top-4 right-4 bg-white/95 p-3 rounded-full shadow-lg border-2 border-kaizen-gold">
                  <img
                    src="/jiu-jitsu-logo.jpg"
                    alt="Jiu Jitsu Logo"
                    className="w-16 h-16 object-contain rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="text-kaizen-gold">Antonio Alonso</span>
                <br />
                Maestro de Artes Marciales
              </h2>
              
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  <strong className="text-kaizen-gold">Propietario de la Academia Kaizen</strong>, el profesor con mayor graduación de Castilla y León, pionero del Jiu Jitsu Brasileño y las MMA en nuestra comunidad.
                </p>
                
                <p>
                  Representa al equipo <strong className="text-white">Peposo Fight Team</strong> bajo la tutela de los Maestros <strong className="text-kaizen-red">Paulo Peposo Curi</strong> Faixa preta 6° Grau y <strong className="text-kaizen-red">Hitler Curi</strong> - Cinturón Rojo (Faixa vermelha) con sede en Brasil.
                </p>

                <p>
                  Alonso proviene de una familia con profunda tradición marcial, los cuales también fueron los pioneros del judo. Aún continúa bajo la supervisión de su padre y Maestro, especialista en Ne Waza, del cual sigue formándose constantemente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              <span className="text-kaizen-gold">45+ Años</span> de Experiencia
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Una trayectoria excepcional como estudiante, competidor, formador y divulgador del arte
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pionero */}
            <div className="bg-kaizen-darker p-8 rounded-xl border border-gray-800">
              <div className="w-16 h-16 bg-kaizen-red rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-white">🥋</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Pionero en la Región</h4>
              <p className="text-gray-300">
                Realizó las primeras competiciones de Jiu Jitsu y MMA en Castilla y León para dar a conocer el arte.
              </p>
            </div>

            {/* Formador */}
            <div className="bg-kaizen-darker p-8 rounded-xl border border-gray-800">
              <div className="w-16 h-16 bg-kaizen-gold rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-black">👨‍🏫</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Formador de Campeones</h4>
              <p className="text-gray-300">
                Formó a los primeros cintos negros de la comunidad y a los primeros competidores tanto de Jiu Jitsu como en MMA.
              </p>
            </div>

            {/* Legado */}
            <div className="bg-kaizen-darker p-8 rounded-xl border border-gray-800">
              <div className="w-16 h-16 bg-kaizen-red rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-white">🏆</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Legado de Éxito</h4>
              <p className="text-gray-300">
                Sus estudiantes han conseguido títulos desde nacionales a mundiales, y hoy tienen sus propias academias y equipos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 bg-kaizen-darker">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Credenciales y <span className="text-kaizen-gold">Graduaciones</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-kaizen-gold/30">
              <h4 className="text-xl font-bold text-kaizen-gold mb-4">Jiu Jitsu Brasileño</h4>
              <p className="text-2xl font-bold text-white mb-2">Cinto Negro</p>
              <p className="text-kaizen-red font-semibold">Faixa Preta 4° Grau</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-kaizen-gold/30">
              <h4 className="text-xl font-bold text-kaizen-gold mb-4">Judo</h4>
              <p className="text-2xl font-bold text-white mb-2">Cinto Negro</p>
              <p className="text-kaizen-red font-semibold">Maestro Entrenador Nacional</p>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-gradient-to-r from-kaizen-red/10 to-kaizen-gold/10 rounded-xl border border-kaizen-gold/30">
            <p className="text-lg text-gray-300 italic">
              "La dedicación constante al perfeccionamiento técnico y la formación de nuevas generaciones de artistas marciales define mi pasión por las artes marciales."
            </p>
            <p className="text-kaizen-gold font-semibold mt-4">- Antonio Alonso</p>
          </div>
        </div>
      </section>
    </div>
  );
}