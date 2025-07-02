import { Link, useLocation } from "wouter";
import { 
  Home, 
  Calendar, 
  Users, 
  User, 
  Dumbbell, 
  MapPin,
  BarChart3
} from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/bookings", icon: Calendar, label: "Reservas" },
    { href: "/capacity", icon: Users, label: "Capacidad" },
    { href: "/checkin", icon: MapPin, label: "Check-in" },
    { href: "/classes", icon: Dumbbell, label: "Clases" },
    { href: "/profile", icon: User, label: "Perfil" },
  ];

  return (
    <nav className="bg-red-900/30 border border-red-800/50 rounded-lg p-4">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-red-600/50 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-red-900/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Navigation;