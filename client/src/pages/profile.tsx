import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/app-navigation";
import { User, ArrowLeft, Edit, Save, X } from "lucide-react";
import { Link } from "wouter";

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    emergencyContact: user?.emergencyContact || "",
    medicalNotes: user?.medicalNotes || "",
  });

  const { data: userBookings } = useQuery({
    queryKey: ["/api/bookings"],
  });

  const { data: checkIns } = useQuery({
    queryKey: ["/api/checkins"],
  });

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const getMembershipStatus = () => {
    if (!user?.membershipExpiry) return { text: "Sin membresía", color: "bg-gray-600" };
    
    const expiry = new Date(user.membershipExpiry);
    const now = new Date();
    const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return { text: "Expirada", color: "bg-red-600" };
    if (daysLeft < 7) return { text: `${daysLeft} días restantes`, color: "bg-orange-600" };
    return { text: "Activa", color: "bg-green-600" };
  };

  const membershipStatus = getMembershipStatus();
  const totalBookings = Array.isArray(userBookings) ? userBookings.length : 0;
  const totalCheckIns = Array.isArray(checkIns) ? checkIns.length : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-red-900">
      {/* Header */}
      <header className="border-b border-red-800/30 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-red-300 hover:bg-red-900/50">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6 text-red-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Mi Perfil</h1>
                <p className="text-xs text-red-300">Información personal</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Información Personal</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-red-300 hover:bg-red-900/50"
                  >
                    {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Nombre</Label>
                    {isEditing ? (
                      <Input
                        value={editForm.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="bg-black/30 border-red-800/50 text-white"
                      />
                    ) : (
                      <p className="text-white">{user?.firstName || "No especificado"}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-gray-300">Apellidos</Label>
                    {isEditing ? (
                      <Input
                        value={editForm.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="bg-black/30 border-red-800/50 text-white"
                      />
                    ) : (
                      <p className="text-white">{user?.lastName || "No especificado"}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Email</Label>
                  <p className="text-white">{user?.email}</p>
                </div>

                <div>
                  <Label className="text-gray-300">Teléfono</Label>
                  {isEditing ? (
                    <Input
                      value={editForm.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-black/30 border-red-800/50 text-white"
                    />
                  ) : (
                    <p className="text-white">{user?.phone || "No especificado"}</p>
                  )}
                </div>

                <div>
                  <Label className="text-gray-300">Contacto de emergencia</Label>
                  {isEditing ? (
                    <Input
                      value={editForm.emergencyContact}
                      onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                      className="bg-black/30 border-red-800/50 text-white"
                    />
                  ) : (
                    <p className="text-white">{user?.emergencyContact || "No especificado"}</p>
                  )}
                </div>

                <div>
                  <Label className="text-gray-300">Notas médicas</Label>
                  {isEditing ? (
                    <Textarea
                      value={editForm.medicalNotes}
                      onChange={(e) => handleInputChange("medicalNotes", e.target.value)}
                      className="bg-black/30 border-red-800/50 text-white"
                      rows={3}
                    />
                  ) : (
                    <p className="text-white">{user?.medicalNotes || "Ninguna"}</p>
                  )}
                </div>

                {isEditing && (
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Cambios
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Membership Info */}
            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-white">Membresía</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Tipo de membresía</span>
                  <Badge className="bg-red-600 text-white">
                    {user?.membershipType || "Individual"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Estado</span>
                  <Badge className={membershipStatus.color}>
                    {membershipStatus.text}
                  </Badge>
                </div>
                {user?.membershipExpiry && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Vencimiento</span>
                    <span className="text-white">
                      {new Date(user.membershipExpiry).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Disciplinas preferidas</span>
                  <div className="flex flex-wrap gap-1">
                    {user?.preferredDisciplines && user.preferredDisciplines.length > 0 ? (
                      user.preferredDisciplines.map((discipline: string, index: number) => (
                        <Badge key={index} variant="secondary" className="bg-red-900/50 text-red-300">
                          {discipline}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">Ninguna seleccionada</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-white">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{totalBookings}</div>
                  <p className="text-gray-400 text-sm">Reservas totales</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{totalCheckIns}</div>
                  <p className="text-gray-400 text-sm">Check-ins</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    {user?.createdAt ? 
                      Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) 
                      : 0
                    }
                  </div>
                  <p className="text-gray-400 text-sm">Días como miembro</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-red-900/30 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-white">Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/bookings">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Ver Reservas
                  </Button>
                </Link>
                <Link href="/checkin">
                  <Button variant="outline" className="w-full text-red-300 border-red-800 hover:bg-red-900/50">
                    Historial Check-ins
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Navigation />
        </div>
      </div>
    </div>
  );
}