import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { navItems } from "./nav-items";
import GroupDetail from "./pages/GroupDetail";
import PromptDetail from "./pages/PromptDetail";
import ChainDetail from "./pages/ChainDetail";

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {Array.isArray(navItems) && navItems.map((item) => (
            <Route key={item.to} path={item.to} element={item.page} />
          ))}
          <Route path="/groups/:groupId" element={<GroupDetail />} />
          <Route path="/prompts/:promptId" element={<PromptDetail />} />
          <Route path="/chains/:chainId" element={<ChainDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;