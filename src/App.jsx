import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { navItems } from "./nav-items";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import GroupDetail from "./pages/GroupDetail";
import PromptDetail from "./pages/PromptDetail";
import ChainDetail from "./pages/ChainDetail";
import CreateChain from "./pages/CreateChain";
import ViewChain from "./pages/ViewChain";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/Home";
import Account from "./pages/Account";
import PricingPage from "./pages/Pricing";
import PaymentSuccess from "./pages/PaymentSuccess";
import Techniques from "./pages/Techniques";
import Chains from "./pages/Chains";
import RegisterSuccess from "./pages/RegisterSuccess";
import ResetPassword from "./pages/ResetPassword";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return user ? children : <Navigate to="/signin" />;
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
      <Route path="/signup" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/register-success" element={<RegisterSuccess />} />

      {/* Protected routes */}
      <Route path="/app" element={<PrivateRoute><Index /></PrivateRoute>}>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* Account Settings */}
        <Route path="account" element={<Account />} />
        
        {/* Prompt Detail Route */}
        <Route path="prompts/:id" element={<PromptDetail />} />

        {/* Dynamic routes from navItems */}
        {navItems.map((item) => {
          if (item.dynamicRoutes === false) {
            return (
              <Route
                key={item.to}
                path={item.to}
                element={<item.component />}
              />
            );
          }
          return (
            <Route key={item.to} path={item.to}>
              <Route index element={<item.component />} />
              {item.to === 'groups' && <Route path=":id" element={<GroupDetail />} />}
              {item.to === 'library' && <Route path="prompt/:id" element={<PromptDetail />} />}
            </Route>
          );
        })}
        
        {/* Chain routes */}
        <Route path="chains">
          <Route index element={<Chains />} />
          <Route path="create" element={<CreateChain />} />
          <Route path=":id" element={<ViewChain />} />
          <Route path=":id/edit" element={<ChainDetail />} />
        </Route>
        
        {/* Detail pages */}
        <Route path="techniques" element={<Techniques />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background relative">
        <Toaster />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;