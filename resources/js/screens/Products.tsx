import React, { useCallback, useEffect, useState } from "react";
import { Product, ProductVariant } from "../types";
import { Plus, Edit2, Trash2, Search, Layers, X, Percent } from "lucide-react";
import callApi from "@/services";
import { toast } from "react-toastify";
import AddProduct from "./AddProduct";

export const Products: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [products, setProducts] = useState<any>({});

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
        } else {
            setEditingProduct(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await callApi(`admin/product/${slug}`, "POST", {
                data: { _method: "DELETE" },
            });

            toast.success(res.message || "Successfully deleted.");
            setProducts((prev) => ({
                ...prev,
                data: prev.data.filter((p) => p.slug !== slug),
            }));
        } catch (error) {
            toast.error(error || "Delete failed.");
        }
    };

    const filteredProducts = products;

    const fetchProducts = useCallback(async () => {
        try {
            let res = await callApi(`admin/product?search=${searchTerm}`);
            setProducts(res);
        } catch (error) {
            toast.error("Product fetch error: " + error);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">
                    Products Inventory
                </h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-bakery-600 hover:bg-bakery-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    Add Product
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 transition-all"
                        />
                    </div>
                </div>

                {products?.data?.length ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">GST</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.data.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-gray-50/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={product.main_image}
                                                    alt={product.name}
                                                    className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                                                />
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {product.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                                        {product.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-bakery-50 text-bakery-700">
                                                {product?.category?.name || ""}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                                                {product.gst_rate}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">
                                            {product.variants &&
                                            product.variants.length > 0 ? (
                                                <span className="text-bakery-700">
                                                    ₹
                                                    {Math.min(
                                                        ...product.variants.map(
                                                            (v) => v.trade_price
                                                        )
                                                    )}
                                                    <span className="text-gray-400 mx-1">
                                                        -
                                                    </span>
                                                    ₹
                                                    {Math.max(
                                                        ...product.variants.map(
                                                            (v) => v.trade_price
                                                        )
                                                    )}
                                                </span>
                                            ) : (
                                                `₹${product.trade_price}`
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() =>
                                                    handleOpenModal(product)
                                                }
                                                className="text-gray-400 hover:text-bakery-600 transition-colors"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(product.slug)
                                                }
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-5 text-gray-500">No products found.</div>
                )}
            </div>

            {/* Product Modal */}
            {isModalOpen && (
                <AddProduct
                    editingProduct={editingProduct}
                    handleCloseModal={handleCloseModal}
                    setProducts={setProducts}
                />
            )}
        </div>
    );
};
