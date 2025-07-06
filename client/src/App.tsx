import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Home from "@/pages/home";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Bookings from "@/pages/bookings";
import Profile from "@/pages/profile";
import Classes from "@/pages/classes";
import GymCapacity from "@/pages/gym-capacity";
import CheckIn from "@/pages/check-in";
import BarbershopDesigner from "@/pages/barbershop-designer";
import Store from "@/pages/store";
import SpaceRental from "@/pages/space-rental";
import About from "@/pages/about";
import BJJ from "@/pages/bjj";
import BJJKids from "@/pages/bjj-kids";
import Pablo from "@/pages/pablo";
import Community from "@/pages/community";
import AppLogin from "@/pages/app-login";
import AppDashboard from "@/pages/app-dashboard";
import AppPhotos from "@/pages/app-photos";
import AppChat from "@/pages/app-chat";
import MobileApp from "@/pages/mobile-app";
import QRCodePage from "@/pages/qr-code";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      <Route path="/barbershop" component={BarbershopDesigner} />
      <Route path="/tienda" component={Store} />
      <Route path="/store" component={Store} />
      <Route path="/alquiler-espacios" component={SpaceRental} />
      <Route path="/space-rental" component={SpaceRental} />
      <Route path="/about" component={About} />
      <Route path="/bjj" component={BJJ} />
      <Route path="/jiu-jitsu" component={BJJ} />
      <Route path="/bjj-kids" component={BJJKids} />
      <Route path="/jiu-jitsu-kids" component={BJJKids} />
      <Route path="/pablo" component={Pablo} />
      <Route path="/community" component={Community} />
      <Route path="/comunidad" component={Community} />
      <Route path="/app/login" component={AppLogin} />
      <Route path="/app/dashboard" component={MobileApp} />
      <Route path="/app/photos" component={AppPhotos} />
      <Route path="/app/chat" component={AppChat} />
      <Route path="/qr" component={QRCodePage} />
      <Route path="/qr-code" component={QRCodePage} />
      <Route path="/" component={Home} />
      <Route path="/app" component={isLoading || !isAuthenticated ? Landing : Dashboard} />
      <Route path="/app/bookings" component={Bookings} />
      <Route path="/app/profile" component={Profile} />
      <Route path="/app/classes" component={Classes} />
      <Route path="/app/capacity" component={GymCapacity} />
      <Route path="/app/checkin" component={CheckIn} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
