import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

// Import Styles
import "../css/app.css";

import { Sidebar } from "./screens/Sidebar";
import { Dashboard } from "./screens/Dashboard";
import { Products } from "./screens/Products";
import { Orders } from "./screens/Orders";
import { Locations } from "./screens/Locations";
import { Categories } from "./screens/Categories";
import { Customers } from "./screens/Customers";
import { Auth } from "./screens/Auth";
import { AppSettings } from "./screens/AppSettings";
import { Profile } from "./screens/Profile";

import { Menu } from "lucide-react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "./redux/store";
import { ToastContainer } from "react-toastify";
import { SITE_INFO } from "./utils/constants.utils";
import { getUserInfo } from "./redux/actions/authAction";
import FullScreenLoading from "./components/FullScreenLoading";

function InitApp() {
    const { isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth
    );

    const [isAppLoaded, setIsAppLoaded] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const checkLogin = useCallback(async () => {
        await dispatch(getUserInfo());
        setIsAppLoaded(true);
    }, [dispatch]);

    useEffect(() => {
        checkLogin();
    }, [checkLogin]);

    if (!isAppLoaded) return <FullScreenLoading />;

    if (!isAuthenticated) return <Auth />;

    return (
        <Router>
            <div className="min-h-screen bg-[#f9fafb]">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-30">
                    <span className="font-bold text-lg text-bakery-700">
                        {SITE_INFO.TITLE}
                    </span>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-600"
                    >
                        <Menu />
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 z-50 bg-black/50 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <div
                            className="bg-white w-64 h-full shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Sidebar
                                onNavigate={() => setIsMobileMenuOpen(false)}
                            />
                        </div>
                    </div>
                )}

                {/* Desktop Sidebar */}
                <div className="hidden md:block">
                    <Sidebar onNavigate={() => {}} />
                </div>

                {/* Main Content */}
                <main className="md:ml-64 p-4 md:p-8 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="/dashboard" />}
                            />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/products" element={<Products />} />
                            <Route
                                path="/categories"
                                element={<Categories />}
                            />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/customers" element={<Customers />} />
                            <Route path="/locations" element={<Locations />} />
                            <Route path="/settings" element={<AppSettings />} />
                            <Route
                                path="/profile/edit"
                                element={<Profile view="EDIT_PROFILE" />}
                            />
                            <Route
                                path="/profile/password"
                                element={<Profile view="CHANGE_PASSWORD" />}
                            />
                            {/* Catch all → dashboard */}
                            <Route
                                path="*"
                                element={<Navigate to="/dashboard" />}
                            />
                        </Routes>
                    </div>
                </main>
            </div>
        </Router>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <ToastContainer aria-label="toast" />
            <InitApp />
        </Provider>
    );
}
