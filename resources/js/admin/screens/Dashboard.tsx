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
import { IndianRupee, ShoppingBag, Users, Clock, Sparkles, Loader2 } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { Order, OrderStatus } from "../../types";
import { generateDashboardInsights } from "../services/geminiService";
import callApi from "../services";
import { toast } from "react-toastify";

export const Dashboard: React.FC = () => {
    const [insight, setInsight] = useState<string>(
        "Analyzing your bakery data...",
    );
    const [loadingInsight, setLoadingInsight] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<{
        stats: {
            total_revenue: number;
            active_orders: number;
            delivered_orders: number;
            new_customers: number;
        };
        weekly_revenue: { name: string; sales: number }[];
        category_sales: { name: string; value: number }[];
    } | null>(null);

    const fetchDashboardData = async () => {
        try {
            const data = await callApi("admin/dashboard");
            setDashboardData(data);
            
            // Fetch Gemini Insights
            setLoadingInsight(true);
            const geminiResult = await generateDashboardInsights(
                data.weekly_revenue,
                data.stats.active_orders,
            );
            setInsight(geminiResult);
        } catch (error) {
            toast.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
            setLoadingInsight(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading || !dashboardData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
                <Loader2 className="w-12 h-12 animate-spin mb-4 text-bakery-600" />
                <p className="text-lg font-medium">Baking your dashboard data...</p>
            </div>
        );
    }

    const { stats, weekly_revenue, category_sales } = dashboardData;
    const COLORS = ["#8a6a5d", "#a18072", "#d2bab0", "#e0cec7"];

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
                    value={`₹${stats.total_revenue.toLocaleString()}`}
                    icon={IndianRupee}
                    trend="+12.5%"
                    trendUp={true}
                />
                <StatsCard
                    title="Active Orders"
                    value={stats.active_orders}
                    icon={ShoppingBag}
                    color="bg-orange-50"
                />
                <StatsCard
                    title="Delivered"
                    value={stats.delivered_orders}
                    icon={Clock}
                    trend="+4.3%"
                    trendUp={true}
                />
                <StatsCard
                    title="New Customers"
                    value={stats.new_customers.toLocaleString()}
                    icon={Users}
                    trend="+8.2%"
                    trendUp={true}
                />
            </div>

            {/* AI Insights Section */}
            <div className="bg-gradient-to-r from-bakery-600 to-bakery-700 rounded-2xl p-6 shadow-lg border border-bakery-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Sparkles size={120} className="text-white" />
                </div>
                <div className="relative z-10 flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
                        <Sparkles className="text-bakery-100" size={24} />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-white font-bold text-lg">Bakery AI Insights</h3>
                            {loadingInsight && <Loader2 size={16} className="text-bakery-200 animate-spin" />}
                        </div>
                        <p className="text-bakery-50 leading-relaxed max-w-4xl italic">
                            "{insight}"
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">
                            Weekly Revenue Analytics
                        </h3>
                        <span className="text-xs text-gray-400 font-medium px-2.5 py-1 bg-gray-50 rounded-lg">Last 7 Days</span>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weekly_revenue}>
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
                                        borderRadius: "12px",
                                        border: "none",
                                        boxShadow:
                                            "0 10px 15px -3px rgb(0 0 0 / 0.1)",
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
                            <BarChart data={category_sales} layout="vertical">
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
                                    {category_sales.map((entry, index) => (
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
