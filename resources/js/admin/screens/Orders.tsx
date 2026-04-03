import React, { useEffect, useState } from "react";
import { Order, OrderStatus } from "../../types";
import { Clock, CheckCircle2, Truck, Package, XCircle, Loader2, ShoppingCart, Phone, MapPin, CreditCard, ExternalLink, ChevronDown, ChevronUp, Eye, X } from "lucide-react";
import callApi from "../services";
import { toast } from "react-toastify";

export const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Order</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Customer</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Date</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">Total</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {sortedOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-mono font-bold text-bakery-600">
                                            {order.order_number || `#${String(order.id).slice(0, 8)}`}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 text-sm">{order.customerName}</span>
                                            <span className="text-[10px] text-gray-400 font-mono tracking-tight">{order.customerPhone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(order.status)} uppercase tracking-tight`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <Clock size={12} className="text-gray-400" />
                                            {new Date(order.timestamp).toLocaleDateString()}
                                            <span className="text-[10px] text-gray-300">|</span>
                                            <span className="text-[10px]">{new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-sm font-black text-gray-900">₹{order.total.toFixed(2)}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => setSelectedOrder(order)}
                                                className="p-1.5 bg-bakery-50 text-bakery-600 rounded-lg hover:bg-bakery-100 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className="text-xl font-black text-gray-900">Order Details</h2>
                                    <span className="px-2 py-0.5 bg-bakery-100 text-bakery-700 rounded text-[10px] font-bold font-mono">
                                        {selectedOrder.order_number || `#${String(selectedOrder.id).slice(0, 8)}`}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400">Placed on {new Date(selectedOrder.timestamp).toLocaleString()}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 hover:bg-gray-200/50 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Side: Customer & Address */}
                                <div className="space-y-6">
                                    <section>
                                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-3 flex items-center gap-2">
                                            <ShoppingCart size={12} /> Customer Information
                                        </h4>
                                        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                            <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{selectedOrder.customerName}</h3>
                                            <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                                                <Phone size={14} />
                                                <a href={`tel:${selectedOrder.customerPhone}`} className="hover:underline tracking-tight">{selectedOrder.customerPhone}</a>
                                            </div>
                                        </div>
                                    </section>

                                    {selectedOrder.address && (
                                        <section>
                                            <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-3 flex items-center gap-2">
                                                <MapPin size={12} /> Delivery Address
                                            </h4>
                                            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                                                <span className="inline-block px-1.5 py-0.5 bg-bakery-100 text-bakery-700 rounded text-[9px] font-bold uppercase mb-2">
                                                    {selectedOrder.address.label}
                                                </span>
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                    {selectedOrder.address.address_line1}
                                                    {selectedOrder.address.address_line2 && <>, {selectedOrder.address.address_line2}</>}
                                                    {selectedOrder.address.landmark && <span className="block italic text-xs text-gray-500 mt-1">Near: {selectedOrder.address.landmark}</span>}
                                                    <span className="font-bold block mt-1">{selectedOrder.address.city} - {selectedOrder.address.pincode}</span>
                                                </p>
                                            </div>
                                        </section>
                                    )}
                                </div>

                                {/* Right Side: Summary & Items */}
                                <div className="space-y-6 text-sm">
                                    <section>
                                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-3 flex items-center gap-2">
                                            <Package size={12} /> Order Summary
                                        </h4>
                                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                            <div className="p-4 space-y-3">
                                                {selectedOrder.items.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between items-start gap-4">
                                                        <div className="flex gap-2 min-w-0">
                                                            <span className="font-bold text-bakery-600 bg-bakery-50 px-1.5 py-0.5 rounded text-xs h-fit">
                                                                {item.quantity}x
                                                            </span>
                                                            <span className="text-gray-700 font-medium truncate">{item.name}</span>
                                                        </div>
                                                        <span className="text-gray-400 font-mono text-xs whitespace-nowrap">₹{(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="bg-gray-50 p-4 border-t border-gray-100 space-y-2">
                                                <div className="flex justify-between text-xs text-gray-500">
                                                    <span>Subtotal</span>
                                                    <span className="font-mono">₹{selectedOrder.subtotal.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-500">
                                                    <span>Delivery Fee</span>
                                                    <span className="font-mono">₹{selectedOrder.delivery_fee.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-black text-gray-900 text-base">Total</span>
                                                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[8px] font-bold uppercase ring-1 ring-blue-100">
                                                            <CreditCard size={10} />
                                                            {selectedOrder.payment_method || 'CASH'}
                                                        </span>
                                                    </div>
                                                    <span className="font-black text-bakery-600 text-lg">₹{selectedOrder.total.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer: Actions */}
                        <div className="px-8 py-6 bg-white border-t border-gray-100">
                            <div className="flex flex-col sm:flex-row gap-3">
                                {selectedOrder.status === OrderStatus.PENDING && (
                                    <>
                                        <button
                                            onClick={() => {
                                                updateStatus(String(selectedOrder.id), OrderStatus.CANCELLED);
                                                setSelectedOrder(null);
                                            }}
                                            className="flex-1 py-3 px-6 rounded-2xl border-2 border-red-50 text-red-500 hover:bg-red-50 font-black text-xs uppercase tracking-widest transition-all"
                                        >
                                            Reject Order
                                        </button>
                                        <button
                                            onClick={() => {
                                                updateStatus(String(selectedOrder.id), OrderStatus.PREPARING);
                                                setSelectedOrder(null);
                                            }}
                                            className="flex-1 py-3 px-6 rounded-2xl bg-bakery-600 text-white hover:bg-bakery-700 font-black text-xs uppercase tracking-widest shadow-xl shadow-bakery-100 transition-all hover:-translate-y-0.5 active:translate-y-0"
                                        >
                                            Accept & Start Baking
                                        </button>
                                    </>
                                )}
                                {selectedOrder.status === OrderStatus.PREPARING && (
                                    <button
                                        onClick={() => {
                                            updateStatus(String(selectedOrder.id), OrderStatus.READY);
                                            setSelectedOrder(null);
                                        }}
                                        className="w-full py-4 px-6 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 transition-all hover:-translate-y-0.5"
                                    >
                                        Mark as Ready for Pick-up
                                    </button>
                                )}
                                {selectedOrder.status === OrderStatus.READY && (
                                    <button
                                        onClick={() => {
                                            updateStatus(String(selectedOrder.id), OrderStatus.DELIVERED);
                                            setSelectedOrder(null);
                                        }}
                                        className="w-full py-4 px-6 rounded-2xl bg-green-600 text-white hover:bg-green-700 font-black text-xs uppercase tracking-widest shadow-xl shadow-green-100 transition-all hover:-translate-y-0.5"
                                    >
                                        Handover / Complete Delivery
                                    </button>
                                )}
                                {(selectedOrder.status === OrderStatus.DELIVERED || selectedOrder.status === OrderStatus.CANCELLED) && (
                                    <button
                                        disabled
                                        className="w-full py-4 px-6 rounded-2xl bg-gray-50 text-gray-400 border border-gray-100 font-black text-xs uppercase tracking-widest opacity-60 flex items-center justify-center gap-2"
                                    >
                                        {selectedOrder.status === OrderStatus.DELIVERED ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                        Order {selectedOrder.status.toLowerCase()}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
