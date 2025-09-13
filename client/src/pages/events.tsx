import { Link } from "wouter";
import { useEffect } from "react";

// Fighter promotional images
import alvarRomeroFight from "@assets/ScreenShot Tool -20250913190644_1757785030165.png";
import alexCalvoFight from "@assets/ScreenShot Tool -20250913190620_1757785030166.png";
import lucasSimiaoFight from "@assets/ScreenShot Tool -20250913191214_1757785030165.png";
import miguelLlanosFight from "@assets/ScreenShot Tool -20250913193459_1757785030161.png";
import ismailaDieyeFight from "@assets/ScreenShot Tool -20250913193637_1757785030159.png";
import domingoMandinganuFight from "@assets/ScreenShot Tool -20250913193517_1757785030161.png";
import tiagoVianaFight from "@assets/ScreenShot Tool -20250913193427_1757785030162.png";
import ismaelRuizFight from "@assets/ScreenShot Tool -20250913193441_1757785030162.png";
import arturoColmenarejFight from "@assets/ScreenShot Tool -20250913193412_1757785030162.png";
import leonardoAzevedoFight from "@assets/ScreenShot Tool -20250913193355_1757785030163.png";
import abdelbaridLoucifFight from "@assets/ScreenShot Tool -20250913193338_1757785030163.png";

export default function EventsPage() {
  useEffect(() => {
    // Update page meta tags for SEO
    document.title = "Kombat Games Burgos - Fight Card | 20 Sep 2025 | Kaizen Academy";
    
    const description = "Professional MMA event featuring Álvar Romero and Álex Calvo from Kaizen Academy Burgos competing on September 20, 2025 at Polideportivo Villagonzalo Pedernales.";
    
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
    ogTitle.setAttribute('content', 'Kombat Games Burgos - Fight Card | 20 Sep 2025');
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
              SÁBADO, 20 SEPTIEMBRE 2025
            </div>
            <p className="text-xl text-gray-300 mb-8">
              Professional MMA event featuring fighters from KaizenAcademy改善 Burgos
            </p>
            <div className="bg-red-600/30 backdrop-blur-sm rounded-lg p-6 border border-red-500/50">
              <p className="text-lg text-white">
                <strong>Event:</strong> Kombat Games Burgos 2025<br />
                <strong>Date:</strong> Saturday, September 20th<br />
                <strong>Venue:</strong> Polideportivo Villagonzalo Pedernales, Burgos<br />
                <strong>Academy:</strong> 2 fighters from Kaizen Burgos competing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fighters Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            KAIZEN ACADEMY FIGHTERS
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Fighter 1: Álvar Romero */}
            <div className="bg-gradient-to-br from-red-900/40 to-black/60 rounded-xl p-6 border border-red-500/30 hover:border-red-400/50 transition-all duration-300">
              <div className="text-center mb-6">
                <img 
                  src={alvarRomeroFight} 
                  alt="Álvar Romero vs Icaro Bruno Sousa - Kombat Games Burgos" 
                  className="w-full rounded-lg shadow-2xl mb-4"
                  data-testid="image-fighter-alvar"
                />
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">ÁLVAR ROMERO</h3>
                  <p className="text-red-400 font-semibold mb-2">KAIZEN ACADEMY</p>
                  <div className="text-white">
                    <p className="text-lg font-bold text-red-300">VS ICARO BRUNO SOUSA</p>
                    <p className="text-gray-300">(CD Tibet)</p>
                    <p className="text-yellow-400 font-bold mt-2">WELTERWEIGHT MMA BOUT</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-black/30 rounded-lg p-3">
                  <span className="text-gray-300">Academy:</span>
                  <span className="text-red-400 font-bold">KaizenAcademy改善 Burgos</span>
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
                  Support Alvar - Buy Tickets
                </button>
              </div>
            </div>

            {/* Fighter 2: Álex Calvo */}
            <div className="bg-gradient-to-br from-red-900/40 to-black/60 rounded-xl p-6 border border-red-500/30 hover:border-red-400/50 transition-all duration-300">
              <div className="text-center mb-6">
                <img 
                  src={alexCalvoFight} 
                  alt="Álex Calvo vs Riqui Andrés Santana - Kombat Games Burgos" 
                  className="w-full rounded-lg shadow-2xl mb-4"
                  data-testid="image-fighter-alex"
                />
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">ÁLEX CALVO</h3>
                  <p className="text-red-400 font-semibold mb-2">KAIZEN ACADEMY</p>
                  <div className="text-white">
                    <p className="text-lg font-bold text-red-300">VS RIQUI ANDRÉS SANTANA</p>
                    <p className="text-gray-300">(Riders Kensei)</p>
                    <p className="text-yellow-400 font-bold mt-2">CATCHWEIGHT MMA BOUT - 75 KG</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-black/30 rounded-lg p-3">
                  <span className="text-gray-300">Academy:</span>
                  <span className="text-red-400 font-bold">KaizenAcademy改善 Burgos</span>
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
                  Contact Alex - Buy Tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Fight Card Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">FIGHT CARD</h2>
            <p className="text-gray-400 text-lg">KOMBAT GAMES BURGOS</p>
          </div>
          
          {/* Main Card - Title Fights */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">MAIN CARD</h3>
              <p className="text-yellow-400 uppercase tracking-wide">Championship Bouts</p>
            </div>
            
            {/* Light Heavyweight Title */}
            <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={lucasSimiaoFight} 
                  alt="Lucas Simiao vs Ratza Ciprian - Light Heavyweight Title"
                  className="w-full max-w-2xl rounded-lg shadow-xl"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <p className="text-yellow-400 font-bold mb-2">LIGHT HEAVYWEIGHT CHAMPIONSHIP</p>
                <div className="text-white text-lg">
                  <span className="font-bold">LUCAS SIMIÃO</span> <span className="text-gray-400">vs</span> <span className="font-bold">RATZA CIPRIAN</span>
                </div>
                <div className="text-gray-400 text-sm mt-1">
                  Hybrid Training Center vs PGT Spain
                </div>
              </div>
            </div>
            
            {/* Welterweight Title */}
            <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={miguelLlanosFight} 
                  alt="Miguel Angel Llanos vs Mihai Dogaru - Welterweight Title"
                  className="w-full max-w-2xl rounded-lg shadow-xl"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <p className="text-yellow-400 font-bold mb-2">WELTERWEIGHT CHAMPIONSHIP</p>
                <div className="text-white text-lg">
                  <span className="font-bold">MIGUEL ÁNGEL LLANOS</span> <span className="text-gray-400">vs</span> <span className="font-bold">MIHAI DOGARU</span>
                </div>
                <div className="text-gray-400 text-sm mt-1">
                  Circus Arena vs Solum Burgos
                </div>
              </div>
            </div>
          </div>

          {/* Featured Bouts - Kaizen Academy */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">FEATURED BOUTS</h3>
              <p className="text-red-400 uppercase tracking-wide">Kaizen Academy Fighters</p>
            </div>
            
            {/* Alvar Romero Fight */}
            <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800 border-l-4 border-l-red-500">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={alvarRomeroFight} 
                  alt="Icaro Bruno Sousa vs Alvar Romero - Welterweight"
                  className="w-full max-w-2xl rounded-lg shadow-xl"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <p className="text-white font-bold mb-2">WELTERWEIGHT BOUT</p>
                <div className="text-white text-lg mb-2">
                  <span className="font-bold">ICARO BRUNO SOUSA</span> <span className="text-gray-400">vs</span> <span className="font-bold text-red-400">ÁLVAR ROMERO</span>
                </div>
                <div className="text-gray-400 text-sm">
                  CD Tibet vs <span className="text-red-400 font-semibold">KAIZEN ACADEMY</span>
                </div>
              </div>
            </div>
            
            {/* Alex Calvo Fight */}
            <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800 border-l-4 border-l-red-500">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={alexCalvoFight} 
                  alt="Riqui Andres Santana vs Alex Calvo - Catchweight 75kg"
                  className="w-full max-w-2xl rounded-lg shadow-xl"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <p className="text-white font-bold mb-2">CATCHWEIGHT BOUT - 75 KG</p>
                <div className="text-white text-lg mb-2">
                  <span className="font-bold">RIQUI ANDRÉS SANTANA</span> <span className="text-gray-400">vs</span> <span className="font-bold text-red-400">ÁLEX CALVO</span>
                </div>
                <div className="text-gray-400 text-sm">
                  Riders Kensei vs <span className="text-red-400 font-semibold">KAIZEN ACADEMY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preliminary Card */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">PRELIMINARY CARD</h3>
              <p className="text-gray-400 uppercase tracking-wide">Undercard Bouts</p>
            </div>
            
            <div className="grid gap-4 max-w-4xl mx-auto">
              {/* Featherweight */}
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <div className="flex items-center justify-center mb-3">
                  <img 
                    src={ismailaDieyeFight} 
                    alt="Ismaila Dieye vs Adrian Baranda - Featherweight"
                    className="w-full max-w-lg rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-1">FEATHERWEIGHT BOUT</p>
                  <div className="text-white">
                    <span className="font-semibold">ISMAILA DIEYE</span> <span className="text-gray-400 mx-2">vs</span> <span className="font-semibold">ADRIÁN BARANDA</span>
                  </div>
                  <div className="text-gray-500 text-sm">CD Tibet vs PGT Spain</div>
                </div>
              </div>
              
              {/* Lightweight */}
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <div className="flex items-center justify-center mb-3">
                  <img 
                    src={domingoMandinganuFight} 
                    alt="Domingo Mandinganu vs Lucian Grigore - Lightweight"
                    className="w-full max-w-lg rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-1">LIGHTWEIGHT BOUT</p>
                  <div className="text-white">
                    <span className="font-semibold">DOMINGO MANDINGANU</span> <span className="text-gray-400 mx-2">vs</span> <span className="font-semibold">LUCIAN GRIGORE</span>
                  </div>
                  <div className="text-gray-500 text-sm">Blacks Bilbao vs PGT Spain</div>
                </div>
              </div>
              
              {/* Additional Bouts Grid */}
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <div className="flex items-center justify-center mb-3">
                    <img 
                      src={tiagoVianaFight} 
                      alt="Tiago Viana vs Giorgi Kurdiani"
                      className="w-full rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-1">MMA BOUT</p>
                    <div className="text-white text-sm">
                      <div className="font-semibold">TIAGO VIANA</div>
                      <div className="text-gray-400 text-xs">vs</div>
                      <div className="font-semibold">GIORGI KURDIANI</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <div className="flex items-center justify-center mb-3">
                    <img 
                      src={ismaelRuizFight} 
                      alt="Ismael Ruiz vs Carlos Miguel Andrade"
                      className="w-full rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-1">MMA BOUT</p>
                    <div className="text-white text-sm">
                      <div className="font-semibold">ISMAEL RUIZ</div>
                      <div className="text-gray-400 text-xs">vs</div>
                      <div className="font-semibold">CARLOS MIGUEL ANDRADE</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <div className="flex items-center justify-center mb-3">
                    <img 
                      src={arturoColmenarejFight} 
                      alt="Arturo Colmenarejo vs Orisha Yotuel - Catchweight 55kg"
                      className="w-full rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-1">CATCHWEIGHT - 55KG</p>
                    <div className="text-white text-sm">
                      <div className="font-semibold">ARTURO COLMENAREJO</div>
                      <div className="text-gray-400 text-xs">vs</div>
                      <div className="font-semibold">ORISHA YOTUEL</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <div className="flex items-center justify-center mb-3">
                    <img 
                      src={leonardoAzevedoFight} 
                      alt="Leonardo Azevedo vs Rawad Hamfe - Lightweight"
                      className="w-full rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-1">LIGHTWEIGHT BOUT</p>
                    <div className="text-white text-sm">
                      <div className="font-semibold">LEONARDO AZEVEDO</div>
                      <div className="text-gray-400 text-xs">vs</div>
                      <div className="font-semibold">RAWAD HAMFE</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Final Bout */}
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 mt-4">
                <div className="flex items-center justify-center mb-3">
                  <img 
                    src={abdelbaridLoucifFight} 
                    alt="Abdelbari Loucif vs Izan Sancho"
                    className="w-full max-w-lg rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-1">MMA BOUT</p>
                  <div className="text-white">
                    <span className="font-semibold">ABDELBARI LOUCIF</span> <span className="text-gray-400 mx-2">vs</span> <span className="font-semibold">IZAN SANCHO</span>
                  </div>
                  <div className="text-gray-500 text-sm">Team Bardena vs PGT Spain</div>
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