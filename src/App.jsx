import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { navItems } from "./nav-items";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import SignIn from "./pages/SignIn";
import GroupDetail from "./pages/GroupDetail";
import PromptDetail from "./pages/PromptDetail";
import ChainDetail from "./pages/ChainDetail";

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
      <Route path="/signin" element={<SignIn />} />
      {Array.isArray(navItems) && navItems.map((item) => (
        <Route 
          key={item.to} 
          path={item.to} 
          element={
            <PrivateRoute>
              {item.page}
            </PrivateRoute>
          } 
        />
      ))}
      <Route 
        path="/groups/:groupId" 
        element={
          <PrivateRoute>
            <GroupDetail />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/prompts/:promptId" 
        element={
          <PrivateRoute>
            <PromptDetail />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/chains/:chainId" 
        element={
          <PrivateRoute>
            <ChainDetail />
          </PrivateRoute>
        } 
      />
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