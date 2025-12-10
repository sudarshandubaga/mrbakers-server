import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { User } from "../types";
import {
    LayoutDashboard,
    ShoppingBag,
    ShoppingCart,
    Settings,
    ChefHat,
    Users,
    MapPin,
    Tags,
    LogOut,
    User as UserIcon,
    Lock,
} from "lucide-react";
import { SITE_INFO } from "@/utils/constants.utils";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface SidebarProps {
    onNavigate?: () => void; // optional callback for closing mobile menu
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const { user } = useSelector((state: RootState) => state.auth);

    const onLogout = () => {
        //
    };

    const navItems = [
        { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/products", label: "Products", icon: ShoppingBag },
        { path: "/categories", label: "Categories", icon: Tags },
        { path: "/orders", label: "Orders", icon: ShoppingCart },
        { path: "/customers", label: "Customers", icon: Users },
        { path: "/locations", label: "Locations", icon: MapPin },
        { path: "/settings", label: "App Settings", icon: Settings },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDropdownNavigation = (path: string) => {
        navigate(path);
        setIsDropdownOpen(false);
        if (onNavigate) onNavigate();
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm z-10 flex flex-col">
            <div className="flex items-center justify-center h-16 border-b border-gray-100 shrink-0">
                <div className="flex items-center gap-2 text-bakery-600 font-bold text-xl">
                    <ChefHat size={28} />
                    <span>{SITE_INFO.TITLE}</span>
                </div>
            </div>

            <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                    isActive
                                        ? "bg-bakery-50 text-bakery-700 font-medium shadow-sm ring-1 ring-bakery-200"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`
                            }
                            onClick={onNavigate}
                        >
                            <Icon size={20} className="text-gray-400" />
                            {item.label}
                        </NavLink>
                    );
                })}
            </nav>

            {/* User Section with Dropdown */}
            <div
                className="p-4 border-t border-gray-100 bg-white relative"
                ref={dropdownRef}
            >
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 w-full hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                    <img
                        src={user.avatar}
                        alt="User"
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                    />
                    <div className="flex flex-col items-start">
                        <span className="text-sm font-semibold text-gray-700">
                            {user.name}
                        </span>
                        <span className="text-xs text-gray-500">
                            {user.role}
                        </span>
                    </div>
                </button>

                {isDropdownOpen && (
                    <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
                        <div className="py-1">
                            <button
                                onClick={() =>
                                    handleDropdownNavigation("/profile/edit")
                                }
                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                                <UserIcon size={16} /> Edit Profile
                            </button>
                            <button
                                onClick={() =>
                                    handleDropdownNavigation(
                                        "/profile/password"
                                    )
                                }
                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                                <Lock size={16} /> Change Password
                            </button>
                            <div className="h-px bg-gray-100 my-1" />
                            <button
                                onClick={onLogout}
                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};
