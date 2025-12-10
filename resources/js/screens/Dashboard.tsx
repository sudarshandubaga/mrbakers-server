import React, { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
} from "recharts";
import { IndianRupee, ShoppingBag, Users, Clock, Sparkles } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { Order, OrderStatus } from "../types";
import { generateDashboardInsights } from "../services/geminiService";
import { INITIAL_ORDERS } from "@/constants";

const DAILY_DATA = [
    { name: "Mon", sales: 40000 },
    { name: "Tue", sales: 30000 },
    { name: "Wed", sales: 20000 },
    { name: "Thu", sales: 27800 },
    { name: "Fri", sales: 18900 },
    { name: "Sat", sales: 63900 },
    { name: "Sun", sales: 44900 },
];

const CATEGORY_DATA = [
    { name: "Bread", value: 400 },
    { name: "Pastry", value: 300 },
    { name: "Cakes", value: 300 },
    { name: "Fast Food", value: 200 },
];

const COLORS = ["#8a6a5d", "#a18072", "#d2bab0", "#e0cec7"];

export const Dashboard: React.FC = () => {
    const [insight, setInsight] = useState<string>(
        "Analyzing your bakery data..."
    );
    const [loadingInsight, setLoadingInsight] = useState(false);

    const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

    // Calculate stats
    const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
    const pendingOrders = orders.filter(
        (o) => o.status === OrderStatus.PENDING
    ).length;
    const completedOrders = orders.filter(
        (o) => o.status === OrderStatus.DELIVERED
    ).length;

    useEffect(() => {
        let mounted = true;
        const fetchInsight = async () => {
            setLoadingInsight(true);
            const result = await generateDashboardInsights(
                DAILY_DATA,
                pendingOrders
            );
            if (mounted) {
                setInsight(result);
                setLoadingInsight(false);
            }
        };
        fetchInsight();
        return () => {
            mounted = false;
        };
    }, [pendingOrders]); // Re-run if pending orders change significantly

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="text-gray-500">
                        Welcome back, here's what's happening at Crumb & Crust
                        today.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Revenue"
                    value={`₹${totalSales.toLocaleString()}`}
                    icon={IndianRupee}
                    trend="+12.5%"
                    trendUp={true}
                />
                <StatsCard
                    title="Active Orders"
                    value={pendingOrders}
                    icon={ShoppingBag}
                    color="bg-orange-50"
                />
                <StatsCard
                    title="Delivered"
                    value={completedOrders}
                    icon={Clock}
                    trend="+4.3%"
                    trendUp={true}
                />
                <StatsCard
                    title="New Customers"
                    value="1,203"
                    icon={Users}
                    trend="+8.2%"
                    trendUp={true}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">
                        Weekly Revenue Analytics
                    </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={DAILY_DATA}>
                                <defs>
                                    <linearGradient
                                        id="colorSales"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#8a6a5d"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#8a6a5d"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#f0f0f0"
                                />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#9ca3af" }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#9ca3af" }}
                                    tickFormatter={(value) => `₹${value}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "none",
                                        boxShadow:
                                            "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                    }}
                                    cursor={{
                                        stroke: "#8a6a5d",
                                        strokeWidth: 1,
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#8a6a5d"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">
                        Sales by Category
                    </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={CATEGORY_DATA} layout="vertical">
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    horizontal={true}
                                    vertical={false}
                                    stroke="#f0f0f0"
                                />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    width={80}
                                    tick={{ fill: "#4b5563", fontSize: 12 }}
                                />
                                <Tooltip
                                    cursor={{ fill: "transparent" }}
                                    contentStyle={{ borderRadius: "8px" }}
                                />
                                <Bar
                                    dataKey="value"
                                    radius={[0, 4, 4, 0]}
                                    barSize={32}
                                >
                                    {CATEGORY_DATA.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};
