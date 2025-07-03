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
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {/* Barbershop designer as main page */}
      <Route path="/" component={BarbershopDesigner} />
      <Route path="/barbershop" component={BarbershopDesigner} />
      
      {/* Gym website routes */}
      <Route path="/gym" component={isLoading || !isAuthenticated ? Landing : Dashboard} />
      <Route path="/gym/bookings" component={Bookings} />
      <Route path="/gym/profile" component={Profile} />
      <Route path="/gym/classes" component={Classes} />
      <Route path="/gym/capacity" component={GymCapacity} />
      <Route path="/gym/checkin" component={CheckIn} />
      <Route path="/gym/website" component={Home} />
      
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
