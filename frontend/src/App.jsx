import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";
import LeaderLayout from "./layouts/LeaderLayout";

import HomeLeader from "./features/admin/pages/homeLeader";
import RecordSong from "./features/admin/pages/recordSong";

import Login from "./features/auth/pages/login";
import ChangePassword from "./features/auth/pages/ChangePassword";
import Registro from "./features/auth/pages/registro";
import ForgotPassword from "./features/auth/pages/forgotPassword";

import SongSeachPublic from "./features/songs/pages/searchPublicSongs";
import VistaPublicaCancion from "./features/songs/pages/vistaPublicaCancion";

import Home from "./pages/home";
import TestBackend from "./pages/TestBackend";
import MusicianManagement from "./features/admin/pages/musicianManagement";
import Profile from "./features/admin/pages/profile";
import Instruments from "./features/admin/pages/instruments";
import BandProfile from "./features/admin/pages/bandProfile";
import HomeUser from "./features/users/pages/homeUser";
import UserLayout from "./layouts/UserLayout";
import ProfileBandUser from "./features/users/pages/profileBandUser";
import ProfileUser from "./features/users/pages/profileUser";
import InstrumentsUser from "./features/users/pages/instrumentsUser";
import MusicianUser from "./features/users/pages/musicianUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout general */}
        <Route element={<MainLayout />}>

          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/search-public-songs" element={<SongSeachPublic />} />
          <Route path="/vista-cancion-publica/:id" element={<VistaPublicaCancion />} />
          <Route path="/test-backend" element={<TestBackend />} />


          {/* Rutas protegidas LEADER */}
          {/*<Route element={<ProtectedRoute allowedRoles={["LEADER"]} />}>

            {/* Layout exclusivo del líder */}
          <Route element={<LeaderLayout />}>
            <Route path="/home-leader" element={<HomeLeader />} />
            <Route path="/record-song" element={<RecordSong />} />
            <Route path="/musician-management" element={<MusicianManagement />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/instruments-management" element={<Instruments />} />
            <Route path="/band-profile" element={<BandProfile />} />
          </Route>

          <Route element={<UserLayout />}>
            <Route path="/home-user" element={<HomeUser />} />
            <Route path="/musician-user" element={<MusicianUser />} />
            <Route path="/instruments-user" element={<InstrumentsUser />} />
            <Route path="/profile-user" element={<ProfileUser />} />
            <Route path="/band-profile-user" element={<ProfileBandUser />} />

          </Route>


          {/*</Route>*/}

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;