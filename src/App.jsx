import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { navItems } from "./nav-items";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import SignIn from "./pages/SignIn";
import GroupDetail from "./pages/GroupDetail";
import PromptDetail from "./pages/PromptDetail";
import ChainDetail from "./pages/ChainDetail";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/Home";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

const FloatingShapes = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {/* Large shapes */}
    <div className="gradient-shape gradient-circle w-64 h-64 top-1/4 left-1/4" 
         style={{ animationDelay: "0s" }} />
    <div className="gradient-shape gradient-blob w-56 h-56 top-3/4 right-1/4" 
         style={{ animationDelay: "-5s" }} />
    
    {/* Medium shapes */}
    <div className="gradient-shape gradient-circle w-48 h-48 top-1/2 left-1/2" 
         style={{ animationDelay: "-10s" }} />
    <div className="gradient-shape gradient-blob w-40 h-40 bottom-1/4 right-1/3" 
         style={{ animationDelay: "-7s" }} />
    
    {/* Small shapes */}
    <div className="gradient-shape gradient-circle w-32 h-32 top-1/3 right-1/4" 
         style={{ animationDelay: "-3s" }} />
    <div className="gradient-shape gradient-blob w-24 h-24 bottom-1/3 left-1/3" 
         style={{ animationDelay: "-8s" }} />
  </div>
);

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/signin" />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />

      {/* Protected routes */}
      <Route path="/app" element={<PrivateRoute><Index /></PrivateRoute>}>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* Dynamic routes from navItems */}
        {navItems.filter(item => item.to !== 'dashboard').map((item) => (
          <Route 
            key={item.to} 
            path={item.to} 
            element={<item.component />} 
          />
        ))}
      </Route>

      {/* Detail pages */}
      <Route
        path="/app/groups/:groupId"
        element={<PrivateRoute><GroupDetail /></PrivateRoute>}
      />
      <Route
        path="/app/prompts/:promptId"
        element={<PrivateRoute><PromptDetail /></PrivateRoute>}
      />
      <Route
        path="/app/chains/:chainId"
        element={<PrivateRoute><ChainDetail /></PrivateRoute>}
      />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background relative">
        <FloatingShapes />
        <Toaster />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;