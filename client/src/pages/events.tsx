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
    
    const description = "Primer evento profesional de MMA en Burgos con Álvar Romero y Álex Calvo de Kaizen Academy compitiendo el 20 de Septiembre 2025 en Polideportivo Villagonzalo Pedernales.";
    
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
        <div className="container mx-auto px-3 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/kaizen-logo-transparent.png" alt="Kaizen Logo" className="h-8" />
            <span className="text-white font-bold text-lg">KaizenAcademy改善</span>
          </Link>
          <Link 
            href="/" 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 text-sm rounded-lg transition-colors"
          >
            Inicio
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-6 text-center">
        <div className="container mx-auto px-3">
          <div className="bg-gradient-to-r from-red-600/20 to-yellow-500/20 rounded-lg p-4 mb-6">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
              KOMBAT GAMES BURGOS
            </h1>
            <div className="text-lg md:text-xl text-yellow-400 font-bold mb-4">
              SÁBADO, 20 SEPTIEMBRE 2025
            </div>
            <div className="bg-red-600/30 backdrop-blur-sm rounded-lg p-3 border border-red-500/50">
              <p className="text-sm text-white">
                <strong>Fecha:</strong> 20 de Septiembre, 2025<br />
                <strong>Lugar:</strong> Polideportivo Villagonzalo, Burgos<br />
                <strong>Luchadores Kaizen:</strong> Álvar Romero & Álex Calvo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fighters Section */}
      <section className="py-6">
        <div className="container mx-auto px-3">
          <h2 className="text-xl md:text-2xl font-bold text-center text-white mb-6">
            LUCHADORES KAIZEN ACADEMY
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {/* Fighter 1: Álvar Romero */}
            <div className="bg-gradient-to-br from-red-900/40 to-black/60 rounded-lg p-3 border border-red-500/30">
              <div className="text-center mb-3">
                <img 
                  src={alvarRomeroFight} 
                  alt="Álvar Romero vs Icaro Bruno Sousa - Kombat Games Burgos" 
                  className="w-full rounded-lg shadow-lg mb-3"
                  data-testid="image-fighter-alvar"
                />
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                  <h3 className="text-lg font-bold text-yellow-400 mb-1">ÁLVAR ROMERO</h3>
                  <p className="text-red-400 font-semibold mb-1 text-sm">KAIZEN ACADEMY</p>
                  <div className="text-white">
                    <p className="text-sm font-bold text-red-300">VS ICARO BRUNO SOUSA</p>
                    <p className="text-gray-300 text-xs">(CD Tibet)</p>
                    <p className="text-yellow-400 font-bold mt-1 text-xs">WELTERWEIGHT MMA</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const message = encodeURIComponent(`¡Hola! Quiero apoyar a Álvar Romero de Kaizen Academy en Kombat Games Burgos. ¿Cómo puedo conseguir entradas para el evento del 20 de septiembre?`);
                  window.open(`https://wa.me/34662323282?text=${message}`, '_blank');
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors font-medium text-sm"
                data-testid="button-support-alvar"
              >
                Apoyar Álvar - Comprar Entradas
              </button>
            </div>

            {/* Fighter 2: Álex Calvo */}
            <div className="bg-gradient-to-br from-red-900/40 to-black/60 rounded-lg p-3 border border-red-500/30">
              <div className="text-center mb-3">
                <img 
                  src={alexCalvoFight} 
                  alt="Álex Calvo vs Riqui Andrés Santana - Kombat Games Burgos" 
                  className="w-full rounded-lg shadow-lg mb-3"
                  data-testid="image-fighter-alex"
                />
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                  <h3 className="text-lg font-bold text-yellow-400 mb-1">ÁLEX CALVO</h3>
                  <p className="text-red-400 font-semibold mb-1 text-sm">KAIZEN ACADEMY</p>
                  <div className="text-white">
                    <p className="text-sm font-bold text-red-300">VS RIQUI ANDRÉS SANTANA</p>
                    <p className="text-gray-300 text-xs">(Riders Kensei)</p>
                    <p className="text-yellow-400 font-bold mt-1 text-xs">CATCHWEIGHT - 75 KG</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const message = encodeURIComponent(`¡Hola Álex! Quiero apoyarte en Kombat Games Burgos el 20 de septiembre. ¿Cómo puedo conseguir entradas para ir a verte pelear?`);
                  window.open(`https://wa.me/34657195161?text=${message}`, '_blank');
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors font-medium text-sm"
                data-testid="button-support-alex"
              >
                Apoyar Álex - Comprar Entradas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Fight Card Section */}
      <section className="py-6 bg-black">
        <div className="container mx-auto px-3">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">FIGHT CARD</h2>
            <p className="text-gray-400 text-sm">KOMBAT GAMES BURGOS</p>
          </div>
          
          {/* Main Card - Title Fights */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-white mb-2">CARTELERA PRINCIPAL</h3>
              <p className="text-yellow-400 uppercase tracking-wide text-xs">Championship Bouts</p>
            </div>
            
            {/* Light Heavyweight Title */}
            <div className="bg-gray-900 rounded-lg p-3 mb-4 border border-gray-800">
              <div className="flex items-center justify-center mb-3">
                <img 
                  src={lucasSimiaoFight} 
                  alt="Lucas Simiao vs Ratza Ciprian - Light Heavyweight Title"
                  className="w-full max-w-lg rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <p className="text-yellow-400 font-bold mb-2 text-sm">LIGHT HEAVYWEIGHT CHAMPIONSHIP</p>
                <div className="text-white text-sm">
                  <span className="font-bold">LUCAS SIMIÃO</span> <span className="text-gray-400">vs</span> <span className="font-bold">RATZA CIPRIAN</span>
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  Hybrid Training Center vs PGT Spain
                </div>
              </div>
            </div>
            
            {/* Welterweight Title */}
            <div className="bg-gray-900 rounded-lg p-3 mb-4 border border-gray-800">
              <div className="flex items-center justify-center mb-3">
                <img 
                  src={miguelLlanosFight} 
                  alt="Miguel Angel Llanos vs Mihai Dogaru - Welterweight Title"
                  className="w-full max-w-lg rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <p className="text-yellow-400 font-bold mb-2 text-sm">WELTERWEIGHT CHAMPIONSHIP</p>
                <div className="text-white text-sm">
                  <span className="font-bold">MIGUEL ÁNGEL LLANOS</span> <span className="text-gray-400">vs</span> <span className="font-bold">MIHAI DOGARU</span>
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  Circus Arena vs Solum Burgos
                </div>
              </div>
            </div>
          </div>

          {/* Featured Bouts - Kaizen Academy */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-white mb-2">PELEAS DESTACADAS</h3>
              <p className="text-red-400 uppercase tracking-wide text-xs">Kaizen Academy Fighters</p>
            </div>
            
            {/* Alvar Romero Fight */}
            <div className="bg-gray-900 rounded-lg p-3 mb-4 border border-gray-800 border-l-4 border-l-red-500">
              <div className="flex items-center justify-center mb-3">
                <img 
                  src={alvarRomeroFight} 
                  alt="Icaro Bruno Sousa vs Alvar Romero - Welterweight"
                  className="w-full max-w-lg rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <p className="text-white font-bold mb-2 text-sm">WELTERWEIGHT BOUT</p>
                <div className="text-white text-sm mb-2">
                  <span className="font-bold">ICARO BRUNO SOUSA</span> <span className="text-gray-400">vs</span> <span className="font-bold text-red-400">ÁLVAR ROMERO</span>
                </div>
                <div className="text-gray-400 text-xs">
                  CD Tibet vs <span className="text-red-400 font-semibold">KAIZEN ACADEMY</span>
                </div>
              </div>
            </div>
            
            {/* Alex Calvo Fight */}
            <div className="bg-gray-900 rounded-lg p-3 mb-4 border border-gray-800 border-l-4 border-l-red-500">
              <div className="flex items-center justify-center mb-3">
                <img 
                  src={alexCalvoFight} 
                  alt="Riqui Andres Santana vs Alex Calvo - Catchweight 75kg"
                  className="w-full max-w-lg rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <p className="text-white font-bold mb-2 text-sm">CATCHWEIGHT BOUT - 75 KG</p>
                <div className="text-white text-sm mb-2">
                  <span className="font-bold">RIQUI ANDRÉS SANTANA</span> <span className="text-gray-400">vs</span> <span className="font-bold text-red-400">ÁLEX CALVO</span>
                </div>
                <div className="text-gray-400 text-xs">
                  Riders Kensei vs <span className="text-red-400 font-semibold">KAIZEN ACADEMY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preliminary Card */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-white mb-2">CARTELERA PRELIMINAR</h3>
              <p className="text-gray-400 uppercase tracking-wide text-xs">Undercard Bouts</p>
            </div>
            
            <div className="grid gap-3 max-w-3xl mx-auto">
              {/* Featherweight */}
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
                <div className="flex items-center justify-center mb-2">
                  <img 
                    src={ismailaDieyeFight} 
                    alt="Ismaila Dieye vs Adrian Baranda - Featherweight"
                    className="w-full max-w-sm rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-xs mb-1">FEATHERWEIGHT</p>
                  <div className="text-white text-sm">
                    <span className="font-semibold">ISMAILA DIEYE</span> <span className="text-gray-400 mx-1">vs</span> <span className="font-semibold">ADRIÁN BARANDA</span>
                  </div>
                </div>
              </div>
              
              {/* Lightweight */}
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
                <div className="flex items-center justify-center mb-2">
                  <img 
                    src={domingoMandinganuFight} 
                    alt="Domingo Mandinganu vs Lucian Grigore - Lightweight"
                    className="w-full max-w-sm rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-xs mb-1">LIGHTWEIGHT</p>
                  <div className="text-white text-sm">
                    <span className="font-semibold">DOMINGO MANDINGANU</span> <span className="text-gray-400 mx-1">vs</span> <span className="font-semibold">LUCIAN GRIGORE</span>
                  </div>
                </div>
              </div>
              
              {/* Additional Bouts Grid */}
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                <div className="bg-gray-900 rounded-lg p-2 border border-gray-800">
                  <div className="flex items-center justify-center mb-2">
                    <img 
                      src={tiagoVianaFight} 
                      alt="Tiago Viana vs Giorgi Kurdiani"
                      className="w-full rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-white text-xs">
                      <div className="font-semibold">TIAGO VIANA</div>
                      <div className="text-gray-400 text-xs">vs</div>
                      <div className="font-semibold">GIORGI KURDIANI</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-2 border border-gray-800">
                  <div className="flex items-center justify-center mb-2">
                    <img 
                      src={ismaelRuizFight} 
                      alt="Ismael Ruiz vs Carlos Miguel Andrade"
                      className="w-full rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-white text-xs">
                      <div className="font-semibold">ISMAEL RUIZ</div>
                      <div className="text-gray-400 text-xs">vs</div>
                      <div className="font-semibold">CARLOS MIGUEL ANDRADE</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-2 border border-gray-800">
                  <div className="flex items-center justify-center mb-2">
                    <img 
                      src={arturoColmenarejFight} 
                      alt="Arturo Colmenarejo vs Orisha Yotuel - Catchweight 55kg"
                      className="w-full rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-white text-xs">
                      <div className="font-semibold">ARTURO COLMENAREJO</div>
                      <div className="text-gray-400 text-xs">vs</div>
                      <div className="font-semibold">ORISHA YOTUEL</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-2 border border-gray-800">
                  <div className="flex items-center justify-center mb-2">
                    <img 
                      src={leonardoAzevedoFight} 
                      alt="Leonardo Azevedo vs Rawad Hamfe - Lightweight"
                      className="w-full rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-white text-xs">
                      <div className="font-semibold">LEONARDO AZEVEDO</div>
                      <div className="text-gray-400 text-xs">vs</div>
                      <div className="font-semibold">RAWAD HAMFE</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Final Bout */}
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 mt-3">
                <div className="flex items-center justify-center mb-2">
                  <img 
                    src={abdelbaridLoucifFight} 
                    alt="Abdelbari Loucif vs Izan Sancho"
                    className="w-full max-w-sm rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
                <div className="text-center">
                  <div className="text-white text-sm">
                    <span className="font-semibold">ABDELBARI LOUCIF</span> <span className="text-gray-400 mx-1">vs</span> <span className="font-semibold">IZAN SANCHO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-red-600/30 to-yellow-500/20 backdrop-blur-sm rounded-lg p-4 border border-red-500/50 max-w-2xl mx-auto">
              <p className="text-yellow-400 font-bold text-sm mb-2">11 PELEAS MMA • 2 TÍTULOS • 22 LUCHADORES</p>
              <p className="text-white text-sm">
                Kombat Games Burgos - La noche más intensa del año
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Info Section */}
      <section className="py-6 bg-gradient-to-r from-red-900/20 to-yellow-500/10">
        <div className="container mx-auto px-3 text-center">
          <h2 className="text-lg md:text-xl font-bold text-white mb-6">
            INFORMACIÓN DEL EVENTO
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-6">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-red-500/30">
              <h3 className="text-sm font-bold text-yellow-400 mb-1">Fecha</h3>
              <p className="text-white text-sm">Sábado 20 Sept 2025</p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-red-500/30">
              <h3 className="text-sm font-bold text-yellow-400 mb-1">Lugar</h3>
              <p className="text-white text-sm">Polideportivo Villagonzalo</p>
              <p className="text-gray-300 text-xs">Burgos</p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-red-500/30">
              <h3 className="text-sm font-bold text-yellow-400 mb-1">Academia</h3>
              <p className="text-white text-sm">KaizenAcademy改善</p>
              <p className="text-gray-300 text-xs">2 Luchadores</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-600/30 to-yellow-500/20 backdrop-blur-sm rounded-lg p-4 border border-red-500/50">
            <h3 className="text-lg font-bold text-white mb-3">
              ¡Apoya a Nuestros Luchadores!
            </h3>
            <p className="text-sm text-gray-200 mb-4">
              Álvar Romero y Álex Calvo representan a KaizenAcademy改善 Burgos
            </p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  const message = encodeURIComponent(`¡Hola! Me interesa comprar entradas para ver a Álvar Romero y Álex Calvo de Kaizen Academy en Kombat Games Burgos el 20 de septiembre. ¿Podrían ayudarme con la información de tickets?`);
                  window.open(`https://wa.me/34662323282?text=${message}`, '_blank');
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition-colors text-sm"
                data-testid="button-buy-tickets-whatsapp"
              >
                Comprar Entradas WhatsApp
              </button>
              <Link 
                href="/#contact"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold transition-colors text-sm"
                data-testid="button-contact-from-events"
              >
                Entrenar en Kaizen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-500/30 py-4">
        <div className="container mx-auto px-3 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <img src="/kaizen_logo_transparent.png" alt="Kaizen Logo" className="h-6" />
            <span className="text-white font-bold text-sm">KaizenAcademy改善 Burgos</span>
          </div>
          <p className="text-gray-400 text-xs">
            C. Esteban Sáez Alvarado, 8 · 09007 Burgos · Tel: 662 323 282
          </p>
        </div>
      </footer>
    </div>
  );
}