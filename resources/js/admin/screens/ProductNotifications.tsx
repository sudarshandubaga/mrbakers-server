import React, { useState, useEffect, useCallback } from "react";
import { Trash2, Bell, User, Package, Calendar } from "lucide-react";
import callApi from "../services/index";
import { toast } from "react-toastify";

export const ProductNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = useCallback(async () => {
        try {
            setLoading(true);
            const response = await callApi("admin/product-notifications", "GET");
            setNotifications(response);
        } catch (error) {
            console.error("Fetch Notifications Error:", error);
            toast.error("Failed to load notification requests");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this request?")) return;
        try {
            const response = await callApi(`admin/product-notifications/${id}`, "DELETE");
            if (response.status) {
                toast.success(response.message);
                setNotifications(notifications.filter((n) => n.id !== id));
            }
        } catch (error) {
            console.error("Delete Notification Error:", error);
            toast.error("Failed to delete request");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Bell className="text-primary" />
                        Product Notifications
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Users waiting for out-of-stock products
                    </p>
                </div>
                <button
                    onClick={fetchNotifications}
                    className="p-2 text-gray-500 hover:text-primary transition-colors"
                    title="Refresh"
                >
                    <Calendar size={20} />
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Requested At
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {notifications.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-10 text-center text-gray-400"
                                    >
                                        No notification requests found.
                                    </td>
                                </tr>
                            ) : (
                                notifications.map((n) => (
                                    <tr
                                        key={n.id}
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                                    <User size={18} />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {n.user?.first_name} {n.user?.last_name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {n.user?.phone}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                                                    <Package size={18} />
                                                </div>
                                                <div className="font-medium text-gray-700">
                                                    {n.product?.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(n.created_at).toLocaleDateString()}
                                            <br />
                                            <span className="text-xs opacity-70">
                                                {new Date(n.created_at).toLocaleTimeString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                n.product?.is_in_stock 
                                                ? "bg-green-100 text-green-700" 
                                                : "bg-red-100 text-red-700"
                                            }`}>
                                                {n.product?.is_in_stock ? "Back in Stock" : "Out of Stock"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(n.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
