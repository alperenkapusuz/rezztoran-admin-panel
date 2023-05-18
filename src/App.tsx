import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Template } from "@components/index";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template>ev</Template>} />
        <Route path="/restoran" element={<Template>restoran</Template>} />
        <Route path="/restoran/menu" element={<Template>menu</Template>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
