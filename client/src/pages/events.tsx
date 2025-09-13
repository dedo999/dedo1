import { Link } from "wouter";
import { useEffect } from "react";
import fighterImage1 from "@assets/ScreenShot Tool -20250913190644_1757783437418.png";
import fighterImage2 from "@assets/ScreenShot Tool -20250913190620_1757783437423.png";

export default function EventsPage() {
  useEffect(() => {
    // Update page meta tags for SEO
    document.title = "Kombat Games Burgos 2025 | Luchadores Kaizen Academy | Evento MMA 20 Septiembre";
    
    const description = "Álvar Romero y Álex Calvo de KaizenAcademy改善 Burgos compiten en Kombat Games Burgos el 20 de Septiembre. Conoce a nuestros luchadores profesionales de MMA.";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Add Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', 'Kombat Games Burgos 2025 | Luchadores Kaizen Academy MMA');
    if (!document.querySelector('meta[property="og:title"]')) {
      document.head.appendChild(ogTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.setAttribute('content', description);
    if (!document.querySelector('meta[property="og:description"]')) {
      document.head.appendChild(ogDescription);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]') || document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.setAttribute('content', 'https://kaizenburgos.com/eventos');
    if (!document.querySelector('meta[property="og:url"]')) {
      document.head.appendChild(ogUrl);
    }

    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://kaizenburgos.com/eventos');

    // Clean up function
    return () => {
      document.title = "MMA Burgos | Academia Artes Marciales KaizenAcademy改善 | BJJ Kickboxing Boxeo";
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-900/20 to-black">
      {/* Navigation */}
      <nav className="bg-black/90 backdrop-blur-sm border-b border-red-500/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/kaizen_logo_transparent.png" alt="Kaizen Logo" className="h-10" />
            <span className="text-white font-bold text-xl">KaizenAcademy改善</span>
          </Link>
          <Link 
            href="/" 
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-red-600/20 to-yellow-500/20 rounded-lg p-8 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              KOMBAT GAMES BURGOS
            </h1>
            <div className="text-2xl md:text-3xl text-yellow-400 font-bold mb-6">
              20 SEPTIEMBRE 2025
            </div>
            <p className="text-xl text-gray-300 mb-8">
              ¡Nuestros luchadores de KaizenAcademy改善 Burgos listos para el combate!
            </p>
            <div className="bg-red-600/30 backdrop-blur-sm rounded-lg p-6 border border-red-500/50">
              <p className="text-lg text-white">
                📍 <strong>Evento:</strong> Kombat Games Burgos 2025<br />
                📅 <strong>Fecha:</strong> Viernes 20 de Septiembre<br />
                🥋 <strong>Academia:</strong> 2 luchadores de Kaizen Burgos compitiendo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fighters Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            NUESTROS LUCHADORES
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Fighter 1: Álvar Romero */}
            <div className="bg-gradient-to-br from-red-900/40 to-black/60 rounded-xl p-6 border border-red-500/30 hover:border-red-400/50 transition-all duration-300">
              <div className="text-center mb-6">
                <img 
                  src={fighterImage1} 
                  alt="Álvar Romero vs Icaro Bruno Sousa - Kombat Games Burgos" 
                  className="w-full rounded-lg shadow-2xl mb-4"
                  data-testid="image-fighter-alvar"
                />
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">ÁLVAR ROMERO</h3>
                  <p className="text-red-400 font-semibold mb-2">🥋 KAIZEN BURGOS</p>
                  <div className="text-white">
                    <p className="text-lg font-bold text-red-300">VS ICARO BRUNO SOUSA</p>
                    <p className="text-gray-300">(CD Tibet)</p>
                    <p className="text-yellow-400 font-bold mt-2">WELTERWEIGHT MMA BOUT</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-black/30 rounded-lg p-3">
                  <span className="text-gray-300">Academia:</span>
                  <span className="text-yellow-400 font-bold">KaizenAcademy改善 Burgos</span>
                </div>
                <div className="flex justify-between items-center bg-black/30 rounded-lg p-3">
                  <span className="text-gray-300">Categoría:</span>
                  <span className="text-white font-semibold">Welterweight</span>
                </div>
                <div className="flex justify-between items-center bg-black/30 rounded-lg p-3">
                  <span className="text-gray-300">Modalidad:</span>
                  <span className="text-red-400 font-semibold">MMA</span>
                </div>
                <button
                  onClick={() => {
                    const message = encodeURIComponent(`¡Hola! Quiero apoyar a Álvar Romero de Kaizen Academy en Kombat Games Burgos. ¿Cómo puedo conseguir entradas para el evento del 20 de septiembre?`);
                    window.open(`https://wa.me/34662323282?text=${message}`, '_blank');
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors font-medium mt-4"
                  data-testid="button-support-alvar"
                >
                  💪 Apoyar a Álvar - Comprar Entrada
                </button>
              </div>
            </div>

            {/* Fighter 2: Álex Calvo */}
            <div className="bg-gradient-to-br from-red-900/40 to-black/60 rounded-xl p-6 border border-red-500/30 hover:border-red-400/50 transition-all duration-300">
              <div className="text-center mb-6">
                <img 
                  src={fighterImage2} 
                  alt="Álex Calvo vs Riqui Andrés Santana - Kombat Games Burgos" 
                  className="w-full rounded-lg shadow-2xl mb-4"
                  data-testid="image-fighter-alex"
                />
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">ÁLEX CALVO</h3>
                  <p className="text-red-400 font-semibold mb-2">🥋 KAIZEN BURGOS</p>
                  <div className="text-white">
                    <p className="text-lg font-bold text-red-300">VS RIQUI ANDRÉS SANTANA</p>
                    <p className="text-gray-300">(Riders Kensei)</p>
                    <p className="text-yellow-400 font-bold mt-2">CATCHWEIGHT MMA BOUT - 75 KG</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-black/30 rounded-lg p-3">
                  <span className="text-gray-300">Academia:</span>
                  <span className="text-yellow-400 font-bold">KaizenAcademy改善 Burgos</span>
                </div>
                <div className="flex justify-between items-center bg-black/30 rounded-lg p-3">
                  <span className="text-gray-300">Peso:</span>
                  <span className="text-white font-semibold">75 KG (Catchweight)</span>
                </div>
                <div className="flex justify-between items-center bg-black/30 rounded-lg p-3">
                  <span className="text-gray-300">Modalidad:</span>
                  <span className="text-red-400 font-semibold">MMA</span>
                </div>
                <button
                  onClick={() => {
                    const message = encodeURIComponent(`¡Hola Álex! Quiero apoyarte en Kombat Games Burgos el 20 de septiembre. ¿Cómo puedo conseguir entradas para ir a verte pelear?`);
                    window.open(`https://wa.me/34657195161?text=${message}`, '_blank');
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors font-medium mt-4"
                  data-testid="button-support-alex"
                >
                  💪 Contactar Álex - Comprar Entrada
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Fight Card Section */}
      <section className="py-16 bg-gradient-to-r from-black/90 to-red-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            🥊 CARTELERA COMPLETA KOMBAT GAMES BURGOS
          </h2>
          
          {/* Main Events/Title Fights */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center text-yellow-400 mb-8">
              🏆 PELEAS POR TÍTULOS - MAIN EVENTS
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-yellow-600/30 to-red-600/30 rounded-xl p-6 border-2 border-yellow-500/50">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-yellow-400 mb-3">LIGHT HEAVYWEIGHT TITLE</h4>
                  <div className="bg-black/50 rounded-lg p-4 mb-4">
                    <p className="text-lg font-bold text-white mb-1">LUCAS SIMIÃO</p>
                    <p className="text-sm text-gray-300">Hybrid Training Center</p>
                    <p className="text-red-400 font-bold text-lg my-2">VS</p>
                    <p className="text-lg font-bold text-white mb-1">RATZA CIPRIAN</p>
                    <p className="text-sm text-gray-300">PGT Spain</p>
                  </div>
                  <div className="bg-yellow-600/20 rounded-lg p-2">
                    <p className="text-yellow-400 font-bold">🏆 Light Heavyweight MMA Title Bout</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-600/30 to-red-600/30 rounded-xl p-6 border-2 border-yellow-500/50">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-yellow-400 mb-3">WELTERWEIGHT TITLE</h4>
                  <div className="bg-black/50 rounded-lg p-4 mb-4">
                    <p className="text-lg font-bold text-white mb-1">MIGUEL ÁNGEL LLANOS</p>
                    <p className="text-sm text-gray-300">Circus Arena</p>
                    <p className="text-red-400 font-bold text-lg my-2">VS</p>
                    <p className="text-lg font-bold text-white mb-1">MIHAI DOGARU</p>
                    <p className="text-sm text-gray-300">Solum Burgos</p>
                  </div>
                  <div className="bg-yellow-600/20 rounded-lg p-2">
                    <p className="text-yellow-400 font-bold">🏆 Welterweight MMA Title Bout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Bouts - Kaizen Fighters */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center text-red-400 mb-8">
              🥋 LUCHADORES KAIZEN ACADEMY - FEATURED BOUTS
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-red-600/30 to-black/50 rounded-xl p-6 border-2 border-red-500/50">
                <div className="text-center">
                  <h4 className="text-lg font-bold text-red-400 mb-3">WELTERWEIGHT MMA BOUT</h4>
                  <div className="bg-black/50 rounded-lg p-4 mb-4">
                    <p className="text-lg font-bold text-white mb-1">ICARO BRUNO SOUSA</p>
                    <p className="text-sm text-gray-300">CD Tibet</p>
                    <p className="text-red-400 font-bold text-lg my-2">VS</p>
                    <p className="text-lg font-bold text-yellow-400 mb-1">ÁLVAR ROMERO</p>
                    <p className="text-sm text-red-400">🥋 KAIZEN BURGOS</p>
                  </div>
                  <div className="bg-red-600/20 rounded-lg p-2">
                    <p className="text-white font-bold">Welterweight MMA Bout</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-red-600/30 to-black/50 rounded-xl p-6 border-2 border-red-500/50">
                <div className="text-center">
                  <h4 className="text-lg font-bold text-red-400 mb-3">CATCHWEIGHT MMA BOUT - 75 KG</h4>
                  <div className="bg-black/50 rounded-lg p-4 mb-4">
                    <p className="text-lg font-bold text-white mb-1">RIQUI ANDRÉS SANTANA</p>
                    <p className="text-sm text-gray-300">Riders Kensei</p>
                    <p className="text-red-400 font-bold text-lg my-2">VS</p>
                    <p className="text-lg font-bold text-yellow-400 mb-1">ÁLEX CALVO</p>
                    <p className="text-sm text-red-400">🥋 KAIZEN BURGOS</p>
                  </div>
                  <div className="bg-red-600/20 rounded-lg p-2">
                    <p className="text-white font-bold">Catchweight MMA - 75KG</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Undercard */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center text-white mb-8">
              ⚡ CARTELERA PRELIMINAR - UNDERCARD BOUTS
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
              
              {/* Fight 1 */}
              <div className="bg-black/50 rounded-lg p-4 border border-gray-500/30">
                <div className="text-center">
                  <p className="text-yellow-400 font-bold text-sm mb-2">FEATHERWEIGHT MMA</p>
                  <p className="text-white font-semibold mb-1">ISMAILA DIEYE</p>
                  <p className="text-xs text-gray-400 mb-2">CD Tibet</p>
                  <p className="text-red-400 font-bold mb-2">VS</p>
                  <p className="text-white font-semibold mb-1">ADRIÁN BARANDA</p>
                  <p className="text-xs text-gray-400">PGT Spain</p>
                </div>
              </div>
              
              {/* Fight 2 */}
              <div className="bg-black/50 rounded-lg p-4 border border-gray-500/30">
                <div className="text-center">
                  <p className="text-yellow-400 font-bold text-sm mb-2">LIGHTWEIGHT MMA</p>
                  <p className="text-white font-semibold mb-1">DOMINGO MANDINGANU</p>
                  <p className="text-xs text-gray-400 mb-2">Blacks Bilbao</p>
                  <p className="text-red-400 font-bold mb-2">VS</p>
                  <p className="text-white font-semibold mb-1">LUCIAN GRIGORE</p>
                  <p className="text-xs text-gray-400">PGT Spain</p>
                </div>
              </div>
              
              {/* Fight 3 */}
              <div className="bg-black/50 rounded-lg p-4 border border-gray-500/30">
                <div className="text-center">
                  <p className="text-yellow-400 font-bold text-sm mb-2">MMA BOUT</p>
                  <p className="text-white font-semibold mb-1">TIAGO VIANA</p>
                  <p className="text-xs text-gray-400 mb-2">Hybrid Training Center</p>
                  <p className="text-red-400 font-bold mb-2">VS</p>
                  <p className="text-white font-semibold mb-1">GIORGI KURDIANI</p>
                  <p className="text-xs text-gray-400">Gaman Haro Fight</p>
                </div>
              </div>
              
              {/* Fight 4 */}
              <div className="bg-black/50 rounded-lg p-4 border border-gray-500/30">
                <div className="text-center">
                  <p className="text-yellow-400 font-bold text-sm mb-2">MMA BOUT</p>
                  <p className="text-white font-semibold mb-1">ISMAEL RUIZ</p>
                  <p className="text-xs text-gray-400 mb-2">Chapimuay Gim</p>
                  <p className="text-red-400 font-bold mb-2">VS</p>
                  <p className="text-white font-semibold mb-1">CARLOS MIGUEL ANDRADE</p>
                  <p className="text-xs text-gray-400">PGT Spain</p>
                </div>
              </div>
              
              {/* Fight 5 */}
              <div className="bg-black/50 rounded-lg p-4 border border-gray-500/30">
                <div className="text-center">
                  <p className="text-yellow-400 font-bold text-sm mb-2">CATCHWEIGHT MMA - 55KG</p>
                  <p className="text-white font-semibold mb-1">ARTURO COLMENAREJO</p>
                  <p className="text-xs text-gray-400 mb-2">Circus Arena</p>
                  <p className="text-red-400 font-bold mb-2">VS</p>
                  <p className="text-white font-semibold mb-1">ORISHA YOTUEL</p>
                  <p className="text-xs text-gray-400">CD Tibet</p>
                </div>
              </div>
              
              {/* Fight 6 */}
              <div className="bg-black/50 rounded-lg p-4 border border-gray-500/30">
                <div className="text-center">
                  <p className="text-yellow-400 font-bold text-sm mb-2">LIGHTWEIGHT MMA</p>
                  <p className="text-white font-semibold mb-1">LEONARDO AZEVEDO</p>
                  <p className="text-xs text-gray-400 mb-2">Hybrid Training Center</p>
                  <p className="text-red-400 font-bold mb-2">VS</p>
                  <p className="text-white font-semibold mb-1">RAWAD HAMFE</p>
                  <p className="text-xs text-gray-400">Team Bardena</p>
                </div>
              </div>
              
              {/* Fight 7 */}
              <div className="bg-black/50 rounded-lg p-4 border border-gray-500/30">
                <div className="text-center">
                  <p className="text-yellow-400 font-bold text-sm mb-2">MMA BOUT</p>
                  <p className="text-white font-semibold mb-1">ABDELBARI LOUCIF</p>
                  <p className="text-xs text-gray-400 mb-2">Team Bardena</p>
                  <p className="text-red-400 font-bold mb-2">VS</p>
                  <p className="text-white font-semibold mb-1">IZAN SANCHO</p>
                  <p className="text-xs text-gray-400">PGT Spain</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-red-600/30 to-black/50 rounded-lg p-4 text-center border border-red-500/30">
              <div className="text-3xl font-bold text-yellow-400 mb-1">11</div>
              <div className="text-sm text-white">Total Peleas MMA</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-600/30 to-red-600/30 rounded-lg p-4 text-center border border-yellow-500/30">
              <div className="text-3xl font-bold text-yellow-400 mb-1">2</div>
              <div className="text-sm text-white">Títulos en Juego</div>
            </div>
            <div className="bg-gradient-to-br from-red-600/30 to-black/50 rounded-lg p-4 text-center border border-red-500/30">
              <div className="text-3xl font-bold text-yellow-400 mb-1">22</div>
              <div className="text-sm text-white">Luchadores</div>
            </div>
            <div className="bg-gradient-to-br from-red-600/30 to-yellow-600/20 rounded-lg p-4 text-center border border-red-500/30">
              <div className="text-3xl font-bold text-yellow-400 mb-1">2</div>
              <div className="text-sm text-white">Kaizen Fighters</div>
            </div>
          </div>
          
          {/* Promotional Text */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-red-600/30 to-yellow-500/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/50 max-w-4xl mx-auto">
              <h4 className="text-2xl font-bold text-yellow-400 mb-4">🔥 LA ESPERA HA TERMINADO 🔥</h4>
              <p className="text-lg text-white mb-4">
                Este 20 de septiembre, el Polideportivo de Villagonzalo Pedernales (Burgos) será el epicentro de la batalla.
              </p>
              <p className="text-xl font-bold text-red-400 mb-4">Llega KOMBAT GAMES BURGOS 🥊💥</p>
              <p className="text-lg text-gray-200 mb-4">
                Un evento único donde solo los guerreros más valientes se atreven a entrar en la jaula.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-black/50 rounded-lg p-3">
                  <p className="text-yellow-400 font-bold">⚡ Peleas explosivas</p>
                </div>
                <div className="bg-black/50 rounded-lg p-3">
                  <p className="text-yellow-400 font-bold">⚡ Luchadores locales y estrellas invitadas</p>
                </div>
                <div className="bg-black/50 rounded-lg p-3">
                  <p className="text-yellow-400 font-bold">⚡ La tensión, la adrenalina y el rugido de la grada</p>
                </div>
              </div>
              <p className="text-lg text-white font-semibold">
                Cuando las luces se enciendan y la puerta de la jaula se cierre… no habrá marcha atrás.
              </p>
              <p className="text-xl text-yellow-400 font-bold mt-4">
                ¿Estás listo para ser testigo de la noche más intensa del año?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Info Section */}
      <section className="py-16 bg-gradient-to-r from-red-900/20 to-yellow-500/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            INFORMACIÓN DEL EVENTO
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Fecha</h3>
              <p className="text-white">Viernes 20 de Septiembre 2025</p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Lugar</h3>
              <p className="text-white">Polideportivo Villagonzalo Pedernales</p>
              <p className="text-gray-300 text-sm">Burgos</p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
              <div className="text-4xl mb-4">🥋</div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Academia</h3>
              <p className="text-white">KaizenAcademy改善 Burgos</p>
              <p className="text-gray-300 text-sm">2 Luchadores Compitiendo</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-600/30 to-yellow-500/20 backdrop-blur-sm rounded-xl p-8 border border-red-500/50">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¡Apoya a Nuestros Luchadores!
            </h3>
            <p className="text-lg text-gray-200 mb-6">
              Álvar Romero y Álex Calvo representarán con orgullo a KaizenAcademy改善 Burgos 
              en este prestigioso evento de MMA. ¡Ven a entrenar con los mismos métodos que 
              han llevado a nuestros atletas a competir a nivel profesional!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const message = encodeURIComponent(`¡Hola! Me interesa comprar entradas para ver a Álvar Romero y Álex Calvo de Kaizen Academy en Kombat Games Burgos el 20 de septiembre. ¿Podrían ayudarme con la información de tickets?`);
                  window.open(`https://wa.me/34662323282?text=${message}`, '_blank');
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                data-testid="button-buy-tickets-whatsapp"
              >
                🎟️ Comprar Entradas por WhatsApp
              </button>
              <Link 
                href="/#contact"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                data-testid="button-contact-from-events"
              >
                Entrenar en Kaizen
              </Link>
              <a 
                href="https://www.instagram.com/kombatgamesburgos2025/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                data-testid="button-instagram-event"
              >
                Seguir Evento en Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-500/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/kaizen_logo_transparent.png" alt="Kaizen Logo" className="h-8" />
            <span className="text-white font-bold text-lg">KaizenAcademy改善 Burgos</span>
          </div>
          <p className="text-gray-400">
            C. Esteban Sáez Alvarado, 8 · 09007 Burgos · Tel: 662 323 282
          </p>
          <p className="text-gray-500 mt-2">
            Entrenando campeones · Forjando carácter · Mejora continua
          </p>
        </div>
      </footer>
    </div>
  );
}