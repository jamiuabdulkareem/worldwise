import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./components/pages/Product";
import Pricing from "./components/pages/Pricing";
import Homepage from "./components/pages/Homepage";
import PageNotFound from "./components/pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
