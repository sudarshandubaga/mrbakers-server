import React, { useEffect, useState } from "react";
import { Order, OrderStatus } from "../../types";
import { Clock, CheckCircle2, Truck, Package, XCircle, Loader2, ShoppingCart, Phone, MapPin, CreditCard, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import callApi from "../services";
import { toast } from "react-toastify";

export const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const data = await callApi("admin/orders");
            setOrders(data);
        } catch (error) {
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
        try {
            await callApi(`admin/orders/${orderId}/status`, "POST", {
                data: { status: newStatus.toLowerCase() }
            });
            setOrders((prev) =>
                prev.map((o) =>
                    o.id === orderId ? { ...o, status: newStatus } : o,
                ),
            );
            toast.success("Order status updated");
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.PENDING:
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case OrderStatus.PREPARING:
                return "bg-orange-100 text-orange-800 border-orange-200";
            case OrderStatus.READY:
                return "bg-blue-100 text-blue-800 border-blue-200";
            case OrderStatus.DELIVERED:
                return "bg-green-100 text-green-800 border-green-200";
            case OrderStatus.CANCELLED:
                return "bg-gray-100 text-gray-800 border-gray-200";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.PENDING:
                return <Clock size={16} />;
            case OrderStatus.PREPARING:
                return <Package size={16} />;
            case OrderStatus.READY:
                return <CheckCircle2 size={16} />;
            case OrderStatus.DELIVERED:
                return <Truck size={16} />;
            case OrderStatus.CANCELLED:
                return <XCircle size={16} />;
        }
    };

    // Sort orders: Pending first, then by date
    const sortedOrders = [...orders].sort((a, b) => {
        if (
            a.status === OrderStatus.PENDING &&
            b.status !== OrderStatus.PENDING
        )
            return -1;
        if (
            a.status !== OrderStatus.PENDING &&
            b.status === OrderStatus.PENDING
        )
            return 1;
        return (
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
    });

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
                <Loader2 className="w-12 h-12 animate-spin mb-4 text-bakery-600" />
                <p className="text-lg font-medium">Baking your orders data...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-sm">
                <ShoppingCart className="w-20 h-20 mx-auto text-gray-100 mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
                <p className="text-gray-500 max-w-sm mx-auto">When customers place orders via the app, they will appear here in real-time.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    Orders Management
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                {sortedOrders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col transition-all hover:shadow-md"
                    >
                        <div className="p-6 border-b border-gray-50 bg-gray-50/30 rounded-t-xl">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-mono font-bold text-bakery-600">
                                    {order.order_number || `#${String(order.id).slice(0, 8)}`}
                                </span>
                                <div
                                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border-2 flex items-center gap-1.5 ${getStatusColor(
                                        order.status,
                                    )} shadow-sm`}
                                >
                                    {getStatusIcon(order.status)}
                                    {order.status}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">
                                        {order.customerName}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Clock size={12} />
                                        {new Date(order.timestamp).toLocaleString()}
                                    </div>
                                </div>
                                <a 
                                    href={`tel:${order.customerPhone}`}
                                    className="p-2.5 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors shadow-sm"
                                    title="Call Customer"
                                >
                                    <Phone size={18} />
                                </a>
                            </div>
                        </div>

                        <div className="p-6 flex-1 space-y-5">
                            {/* Address Section */}
                            {order.address && (
                                <div className="space-y-2">
                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2">
                                        <MapPin size={10} /> Delivery Address
                                    </h4>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] px-1.5 py-0.5 bg-bakery-100 text-bakery-700 rounded-md font-bold">
                                                {order.address.label}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            {order.address.address_line1}, {order.address.address_line2 && `${order.address.address_line2}, `}
                                            {order.address.landmark && <span className="italic block mt-0.5">Near: {order.address.landmark}</span>}
                                            <span className="font-medium block">{order.address.city} - {order.address.pincode}</span>
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Items Section */}
                            <div className="space-y-3">
                                <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2">
                                    <Package size={10} /> Order Items
                                </h4>
                                <div className="max-h-48 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                    {order.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between items-start text-sm group"
                                        >
                                            <div className="flex gap-2">
                                                <span className="min-w-[24px] text-center font-bold text-bakery-600 bg-bakery-50 rounded px-1 text-xs">
                                                    {item.quantity}
                                                </span>
                                                <span className="text-gray-700 font-medium">
                                                    {item.name}
                                                </span>
                                            </div>
                                            <span className="text-gray-400 text-xs font-mono tabular-nums">
                                                ₹{(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Billing Section */}
                            <div className="pt-4 border-t border-dashed border-gray-200">
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Subtotal</span>
                                        <span className="font-mono">₹{order.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Delivery Fee</span>
                                        <span className="font-mono">₹{order.delivery_fee.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-900 font-black text-lg pt-2">
                                        <div className="flex items-center gap-2">
                                            <span>Total</span>
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-bold uppercase ring-1 ring-blue-100">
                                                <CreditCard size={10} />
                                                {order.payment_method || 'CASH'}
                                            </div>
                                        </div>
                                        <span className="text-bakery-600">₹{order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3">
                            {order.status === OrderStatus.PENDING && (
                                <>
                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                String(order.id),
                                                OrderStatus.CANCELLED,
                                            )
                                        }
                                        className="py-2.5 px-4 rounded-xl border-2 border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 text-xs font-bold uppercase tracking-wider transition-all"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                String(order.id),
                                                OrderStatus.PREPARING,
                                            )
                                        }
                                        className="py-2.5 px-4 rounded-xl bg-bakery-600 text-white hover:bg-bakery-700 text-xs font-bold uppercase tracking-wider shadow-lg shadow-bakery-100 transition-all hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        Start Baking
                                    </button>
                                </>
                            )}
                            {order.status === OrderStatus.PREPARING && (
                                <button
                                    onClick={() =>
                                        updateStatus(
                                            String(order.id),
                                            OrderStatus.READY,
                                        )
                                    }
                                    className="col-span-2 w-full py-3 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-100 transition-all hover:-translate-y-0.5"
                                >
                                    Mark Ready for Pick-up
                                </button>
                            )}
                            {order.status === OrderStatus.READY && (
                                <button
                                    onClick={() =>
                                        updateStatus(
                                            String(order.id),
                                            OrderStatus.DELIVERED,
                                        )
                                    }
                                    className="col-span-2 w-full py-3 px-4 rounded-xl bg-green-600 text-white hover:bg-green-700 text-xs font-bold uppercase tracking-wider shadow-lg shadow-green-100 transition-all hover:-translate-y-0.5"
                                >
                                    Complete Delivery
                                </button>
                            )}
                            {(order.status === OrderStatus.DELIVERED ||
                                order.status === OrderStatus.CANCELLED) && (
                                <button
                                    disabled
                                    className="col-span-2 w-full py-3 px-4 rounded-xl bg-gray-50 text-gray-400 border border-gray-100 text-xs font-bold uppercase tracking-wider cursor-not-allowed opacity-60"
                                >
                                    Order Completed
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
