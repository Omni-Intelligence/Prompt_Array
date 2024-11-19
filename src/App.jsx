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

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/signin" />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
      
      {/* Public routes */}
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
      <Route path="/app/groups/:groupId" element={<PrivateRoute><GroupDetail /></PrivateRoute>} />
      <Route path="/app/prompts/:promptId" element={<PrivateRoute><PromptDetail /></PrivateRoute>} />
      <Route path="/app/chains/:chainId" element={<PrivateRoute><ChainDetail /></PrivateRoute>} />

      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Toaster />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;