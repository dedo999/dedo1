import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Users, Calendar, Target } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-red-900">
      {/* Header */}
      <header className="border-b border-red-800/30 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-400 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Kaizen Burgos</h1>
                <p className="text-xs text-red-300">Gimnasio de Artes Marciales</p>
              </div>
            </div>
            <Button onClick={handleLogin} className="bg-red-600 hover:bg-red-700 text-white">
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="text-red-500">Kaizen</span> Burgos
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Tu app de gestión de entrenamientos. Reserva clases, sigue tu progreso y conecta con la comunidad de artes marciales más fuerte de Burgos.
          </p>
          <Button 
            onClick={handleLogin}
            size="lg" 
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg"
          >
            Acceder a la App
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Gestiona tu entrenamiento como nunca antes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader className="text-center">
                <Calendar className="w-12 h-12 mx-auto text-red-400 mb-4" />
                <CardTitle className="text-white">Reservar Clases</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center">
                  Reserva tus clases favoritas de MMA, BJJ, Boxing y más con unos pocos clicks.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 mx-auto text-red-400 mb-4" />
                <CardTitle className="text-white">Capacidad en Tiempo Real</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center">
                  Ve cuánta gente hay en el gimnasio ahora mismo y planifica tu visita.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader className="text-center">
                <Target className="w-12 h-12 mx-auto text-red-400 mb-4" />
                <CardTitle className="text-white">Seguimiento Personal</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center">
                  Registra tus entrenamientos y sigue tu progreso con notas personalizadas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader className="text-center">
                <Dumbbell className="w-12 h-12 mx-auto text-red-400 mb-4" />
                <CardTitle className="text-white">Check-in Rápido</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center">
                  Registra tu entrada y salida del gimnasio de forma automática.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para entrenar más inteligente?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a la app oficial de Kaizen Burgos y lleva tu entrenamiento al siguiente nivel.
          </p>
          <Button 
            onClick={handleLogin}
            size="lg" 
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg"
          >
            Comenzar Ahora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-red-800/30 bg-black/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Kaizen Burgos. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}