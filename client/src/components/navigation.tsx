import { useState, useEffect } from "react";
import { Menu, X, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { href: "#inicio", label: "Inicio" },
    { href: "/about", label: "Sobre Nosotros", external: true },
    { href: "#servicios", label: "Servicios" },
    { href: "#instructores", label: "Instructores" },
    { href: "#horarios", label: "Horarios" },
    { href: "#precios", label: "Precios" },
    { href: "/tienda", label: "Tienda", external: true },
    { href: "/alquiler-espacios", label: "Alquiler", external: true },
  ];

  const handleNavClick = (href: string, external?: boolean) => {
    if (external) {
      window.location.href = href;
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-kaizen-darker/95 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="/kaizen-logo-transparent.png" 
              alt="Kaizen Logo"
              className="h-12 sm:h-14 w-auto"
              loading="eager"
              decoding="async"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href, item.external)}
                  className="text-gray-300 hover:text-kaizen-red transition-colors duration-200 font-medium"
                >
                  {item.label}
                </button>
              ))}
              {/* QR Code Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-kaizen-gold text-kaizen-gold hover:bg-kaizen-gold hover:text-black"
                  >
                    <QrCode className="mr-2" size={16} />
                    App QR
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black border-gray-700 max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-kaizen-gold text-center">
                      KaizenApp - Código QR
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center space-y-4 p-4">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(window.location.origin + '/app/login')}`}
                      alt="QR Code para KaizenApp"
                      className="w-64 h-64 border border-gray-300 rounded-lg"
                    />
                    <div className="text-center space-y-2">
                      <p className="text-white font-medium">
                        Escanea para acceder a KaizenApp
                      </p>
                      <p className="text-gray-400 text-sm">
                        Solo para miembros del gimnasio
                      </p>
                      <p className="text-xs text-gray-500">
                        {window.location.origin}/app/login
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <button
                onClick={() => handleNavClick("#contacto")}
                className="bg-kaizen-red hover:bg-red-700 px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105"
              >
                Contactar
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-kaizen-dark border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href, item.external)}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-kaizen-red font-medium"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#contacto")}
                className="block w-full text-left px-3 py-2 bg-kaizen-red hover:bg-red-700 text-white font-semibold rounded-lg mt-2"
              >
                Contactar
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
