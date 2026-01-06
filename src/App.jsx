import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import MemesPage from "./pages/MemesPage.jsx";
import MemeDetailPage from "./pages/MemeDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Navbar />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="memes" element={<MemesPage />} />
                    <Route path="memes/:id" element={<MemeDetailPage />} />
                    <Route path="cart" element={<CartPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}
