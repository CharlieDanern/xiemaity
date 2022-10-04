import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { Home, Tool, Library } from "./pages/index";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="tools" element={<Tool />} />
            <Route path="library" element={<Library />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
