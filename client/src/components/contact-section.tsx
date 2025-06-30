import { useState } from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    discipline: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/contact", formData);
      toast({
        title: "Mensaje enviado",
        description: "Te contactaremos pronto. ¡Gracias!",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        discipline: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contacto" className="py-20 bg-kaizen-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-kaizen-red">Contacta</span> con Nosotros
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comienza tu journey en las artes marciales hoy. Primera clase gratuita.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Información de Contacto</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-kaizen-red p-3 rounded-lg mr-4">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Dirección</h4>
                  <p className="text-gray-300">C. Esteban Sáez Alvarado, N° 8</p>
                  <p className="text-gray-300">09007 Burgos, España</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-kaizen-red p-3 rounded-lg mr-4">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Teléfono</h4>
                  <a href="tel:662323282" className="text-kaizen-gold hover:text-yellow-400 transition-colors">
                    662 323 282
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-kaizen-red p-3 rounded-lg mr-4">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Instagram</h4>
                  <a href="https://instagram.com/antonioalonsoantonioalonso" target="_blank" rel="noopener noreferrer" className="text-kaizen-gold hover:text-yellow-400 transition-colors">
                    @antonioalonsoantonioalonso
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-kaizen-red p-3 rounded-lg mr-4">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Horarios</h4>
                  <p className="text-gray-300">Lun-Jue: 18:00-22:30</p>
                  <p className="text-gray-300">Vie: 18:30-22:30</p>
                  <p className="text-gray-300">Sáb: 10:00-13:00</p>
                  <p className="text-gray-300">Dom: Cerrado</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="mt-8 space-y-4">
              <a href="tel:662323282" className="flex items-center justify-center bg-kaizen-red hover:bg-red-700 px-6 py-4 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105">
                <Phone className="mr-3" size={20} />
                Llamar Ahora
              </a>
              <a href="https://wa.me/34662323282?text=Hola,%20me%20gustaría%20información%20sobre%20las%20clases%20en%20Kaizen" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-green-600 hover:bg-green-700 px-6 py-4 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105">
                <svg className="mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.306"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Envíanos un Mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nombre *</label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-kaizen-dark border-gray-700 text-white placeholder-gray-400 focus:border-kaizen-red"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-kaizen-dark border-gray-700 text-white placeholder-gray-400 focus:border-kaizen-red"
                    placeholder="Tu teléfono"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-kaizen-dark border-gray-700 text-white placeholder-gray-400 focus:border-kaizen-red"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Disciplina de Interés</label>
                <Select value={formData.discipline} onValueChange={(value) => handleInputChange("discipline", value)}>
                  <SelectTrigger className="bg-kaizen-dark border-gray-700 text-white focus:border-kaizen-red">
                    <SelectValue placeholder="Selecciona una disciplina" />
                  </SelectTrigger>
                  <SelectContent className="bg-kaizen-dark border-gray-700">
                    <SelectItem value="mma">MMA</SelectItem>
                    <SelectItem value="kickboxing">Kickboxing</SelectItem>
                    <SelectItem value="bjj">Brazilian Jiu-Jitsu</SelectItem>
                    <SelectItem value="boxeo">Boxeo</SelectItem>
                    <SelectItem value="karate">Karate</SelectItem>
                    <SelectItem value="infantiles">Clases Infantiles</SelectItem>
                    <SelectItem value="no-seguro">No estoy seguro/a</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Mensaje</label>
                <Textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="bg-kaizen-dark border-gray-700 text-white placeholder-gray-400 focus:border-kaizen-red"
                  placeholder="Cuéntanos sobre tu experiencia previa y objetivos..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-kaizen-red hover:bg-red-700 text-white font-bold py-4 transition-all duration-300 transform hover:scale-105"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Nuestra Ubicación</h3>
          <div className="bg-kaizen-dark rounded-xl p-4 border border-gray-700">
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2901.1234567890123!2d-3.6667891845!3d42.3581829791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd45fd071b248299%3A0xfafdee5edc80dca6!2sKaizen%20-%20Sports%20Fight%20Academy!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Kaizen Sports Fight Academy en Burgos"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
