import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Template } from "@components/index";
import NotFound from "@pages/NotFound";
import Login from "@pages/Auth/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Template>ANA SAYFA</Template>} />
        <Route path="/restoran" element={<Template>restoran</Template>} />
        <Route path="/restoran/menu" element={<Template>menu</Template>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
