import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import CategoryPage from "./pages/CategoryPage";
import PersonalizedPick from "./components/PersonalizedPick";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/personalizedpick/:category"
            element={
              <>
                <Home />
                <PersonalizedPick />
              </>
            }
          />
        </Routes>
        <Footer />
        <Chatbot />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
