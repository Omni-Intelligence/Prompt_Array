import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import GroupDetail from "./pages/GroupDetail";
import Account from "./pages/Account";

// Initialize the QueryClient outside of the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* First ensure navItems exists and is an array before mapping */}
            {Array.isArray(navItems) && navItems.map((item) => (
              <Route key={item.to} path={item.to} element={item.page} />
            ))}
            <Route path="/groups/:groupId" element={<GroupDetail />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;