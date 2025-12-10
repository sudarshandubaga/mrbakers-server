import React, { useState } from "react";
import { Download, Search, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { INITIAL_CUSTOMERS } from "@/constants";

export const Customers: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const [customers] = useState(INITIAL_CUSTOMERS);

    const filteredCustomers = customers.filter(
        (c) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExportCSV = () => {
        const headers = [
            "ID",
            "Name",
            "Email",
            "Phone",
            "Location",
            "Total Orders",
            "Total Spent",
            "Last Order Date",
        ];
        const rows = filteredCustomers.map((c) => [
            c.id,
            c.name,
            c.email,
            c.phone,
            `"${c.location}"`, // Quote to handle commas in address
            c.totalOrders,
            c.totalSpent.toFixed(2),
            c.lastOrderDate,
        ]);

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "customers_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                <button
                    onClick={handleExportCSV}
                    className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Download size={18} />
                    Export CSV
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search customers by name, email or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 transition-all"
                        />
                    </div>
                    <div className="text-sm text-gray-500">
                        Showing {filteredCustomers.length} customers
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Orders</th>
                                <th className="px-6 py-4">Total Spent</th>
                                <th className="px-6 py-4">Last Order</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCustomers.map((customer) => (
                                <tr
                                    key={customer.id}
                                    className="hover:bg-gray-50/50 transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-bakery-100 text-bakery-700 flex items-center justify-center font-bold text-xs">
                                                {customer.name
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    {customer.name}
                                                </div>
                                                <div className="text-xs text-gray-400 font-mono">
                                                    #{customer.id.slice(0, 8)}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 text-xs text-gray-500">
                                            <div className="flex items-center gap-1.5">
                                                <Mail size={12} />{" "}
                                                {customer.email}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Phone size={12} />{" "}
                                                {customer.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin
                                                size={14}
                                                className="text-gray-400"
                                            />
                                            {customer.location}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                            {customer.totalOrders} orders
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        ₹{customer.totalSpent.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar
                                                size={14}
                                                className="text-gray-400"
                                            />
                                            {new Date(
                                                customer.lastOrderDate
                                            ).toLocaleDateString()}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredCustomers.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-8 text-center text-gray-500 italic"
                                    >
                                        No customers found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
