import "./App.css";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import AllBookingsPage from "./pages/AllBookingsPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import BookingPage from "./pages/BookingPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import DetailPlacePage from "./pages/DetailPlacePage";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<DetailPlacePage />} />
          <Route path="/account/bookings" element={<AllBookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
