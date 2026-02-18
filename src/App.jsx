import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home";
import Login from "./pages/login";
import ChangePassword from "./pages/ChangePassword";
import Registro from "./pages/registro";
import ForgotPassword from "./pages/forgotPassword";
import SongSeachPublic from "./pages/searchPublicSongs";
import VistaPublicaCancion from "./pages/vistaPublicaCancion";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout principal */}
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/search-public-songs" element={<SongSeachPublic />} />
          <Route path="/vista-cancion-publica/:id" element={<VistaPublicaCancion />} />


        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
