import React, { useState } from "react";
import { Order, OrderStatus } from "../types";
import { Clock, CheckCircle2, Truck, Package, XCircle } from "lucide-react";
import { INITIAL_ORDERS } from "@/constants";

export const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

    const updateStatus = (orderId: string, newStatus: OrderStatus) => {
        setOrders((prev) =>
            prev.map((o) =>
                o.id === orderId ? { ...o, status: newStatus } : o
            )
        );
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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    Orders Management
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedOrders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col transition-all hover:shadow-md"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-xs font-mono text-gray-400">
                                    #{order.id.slice(0, 8)}
                                </span>
                                <h3 className="font-bold text-gray-900">
                                    {order.customerName}
                                </h3>
                                <p className="text-xs text-gray-500">
                                    {new Date(order.timestamp).toLocaleString()}
                                </p>
                            </div>
                            <div
                                className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getStatusColor(
                                    order.status
                                )}`}
                            >
                                {getStatusIcon(order.status)}
                                {order.status}
                            </div>
                        </div>

                        <div className="flex-1 space-y-3 mb-4">
                            {order.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between items-center text-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-700">
                                            {item.quantity}x
                                        </span>
                                        <span className="text-gray-600">
                                            {item.name}
                                        </span>
                                    </div>
                                    <span className="text-gray-900 font-medium">
                                        ₹
                                        {(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                    </span>
                                </div>
                            ))}
                            <div className="border-t border-gray-100 pt-3 flex justify-between items-center font-bold text-gray-900">
                                <span>Total</span>
                                <span>₹{order.total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-auto">
                            {order.status === OrderStatus.PENDING && (
                                <>
                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                order.id,
                                                OrderStatus.CANCELLED
                                            )
                                        }
                                        className="w-full py-2 px-4 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium transition-colors"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                order.id,
                                                OrderStatus.PREPARING
                                            )
                                        }
                                        className="w-full py-2 px-4 rounded-lg bg-bakery-600 text-white hover:bg-bakery-700 text-sm font-medium shadow-sm transition-colors"
                                    >
                                        Start Baking
                                    </button>
                                </>
                            )}
                            {order.status === OrderStatus.PREPARING && (
                                <button
                                    onClick={() =>
                                        updateStatus(
                                            order.id,
                                            OrderStatus.READY
                                        )
                                    }
                                    className="col-span-2 w-full py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium shadow-sm transition-colors"
                                >
                                    Mark Ready
                                </button>
                            )}
                            {order.status === OrderStatus.READY && (
                                <button
                                    onClick={() =>
                                        updateStatus(
                                            order.id,
                                            OrderStatus.DELIVERED
                                        )
                                    }
                                    className="col-span-2 w-full py-2 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm font-medium shadow-sm transition-colors"
                                >
                                    Complete Delivery
                                </button>
                            )}
                            {(order.status === OrderStatus.DELIVERED ||
                                order.status === OrderStatus.CANCELLED) && (
                                <button
                                    disabled
                                    className="col-span-2 w-full py-2 px-4 rounded-lg bg-gray-100 text-gray-400 text-sm font-medium cursor-not-allowed"
                                >
                                    Order Closed
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
