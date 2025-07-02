import { Trophy } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 bg-kaizen-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              La Filosofía <span className="text-kaizen-red">Kaizen</span>
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              En Kaizen creemos en la <strong className="text-kaizen-gold">mejora continua</strong>. Cada día es una oportunidad para ser mejor que ayer, tanto dentro como fuera del tatami.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Nuestro gimnasio en Burgos ofrece entrenamiento de nivel mundial en MMA, kickboxing, Brazilian Jiu-Jitsu y boxeo. Desde principiantes hasta luchadores profesionales, todos encuentran su lugar en nuestra familia.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-kaizen-red">100%</div>
                <div className="text-sm text-gray-400">Satisfacción</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kaizen-gold">5★</div>
                <div className="text-sm text-gray-400">Valoración</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <svg className="w-full rounded-xl shadow-2xl" viewBox="0 0 400 300" style={{aspectRatio: '4/3'}}>
              <rect width="400" height="300" fill="#1a1a1a" rx="12"/>
              <circle cx="150" cy="120" r="25" fill="#dc2626" opacity="0.6"/>
              <circle cx="250" cy="140" r="20" fill="#dc2626" opacity="0.8"/>
              <ellipse cx="200" cy="180" rx="60" ry="30" fill="#eab308" opacity="0.3"/>
              <path d="M 120 100 Q 200 80 280 120" stroke="#eab308" strokeWidth="3" fill="none" opacity="0.7"/>
              <text x="200" y="250" textAnchor="middle" fill="#eab308" fontSize="18" fontWeight="bold">KAIZEN BJJ</text>
            </svg>
            <div className="absolute -bottom-6 -left-6 bg-kaizen-red p-6 rounded-xl shadow-lg">
              <Trophy className="text-kaizen-gold text-2xl mb-2" />
              <div className="text-white font-bold">Campeones</div>
              <div className="text-sm text-red-200">Entrenan Aquí</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
