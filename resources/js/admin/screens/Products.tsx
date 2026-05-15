import React, { useCallback, useEffect, useState } from "react";
import { Product } from "../../types";
import {
    Plus,
    Edit2,
    Trash2,
    Search,
    Star,
    ChevronLeft,
    ChevronRight,
    Filter,
} from "lucide-react";
import callApi from "../services/index";
import { toast } from "react-toastify";
import AddProduct from "./AddProduct";

export const Products: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

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
        fetchProducts();
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

    const fetchProducts = useCallback(async () => {
        try {
            const params = new URLSearchParams();
            if (searchTerm) params.set("search", searchTerm);
            if (selectedCategory) params.set("category_id", selectedCategory);
            params.set("page", currentPage.toString());

            let res = await callApi(`admin/product?${params.toString()}`);
            setProducts(res);
        } catch (error) {
            toast.error("Product fetch error: " + error);
        }
    }, [searchTerm, selectedCategory, currentPage]);

    const fetchCategories = useCallback(async () => {
        try {
            let res = await callApi("admin/category");
            setCategories(res || []);
        } catch (error) {
            console.log("Category fetch error:", error);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    const totalPages = products?.last_page || 1;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");
            for (
                let i = Math.max(2, currentPage - 1);
                i <= Math.min(totalPages - 1, currentPage + 1);
                i++
            ) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };

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
                {/* Filters Bar */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    {/* Search */}
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

                    {/* Category Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                            className="pl-10 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 transition-all appearance-none cursor-pointer min-w-[180px]"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Results count */}
                    {products?.total !== undefined && (
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                            {products.total} product
                            {products.total !== 1 ? "s" : ""}
                        </span>
                    )}
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
                                                    <div className="font-medium text-gray-900 flex items-center gap-1.5">
                                                        {product.name}
                                                        {product.is_bestseller && (
                                                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                                                                <Star
                                                                    size={10}
                                                                    className="fill-amber-500 text-amber-500"
                                                                />
                                                                Bestseller
                                                            </span>
                                                        )}
                                                        {!product.is_in_stock && (
                                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                                                                Out of Stock
                                                            </span>
                                                        )}
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
                                                            (v) =>
                                                                v.trade_price,
                                                        ),
                                                    )}
                                                    <span className="text-gray-400 mx-1">
                                                        -
                                                    </span>
                                                    ₹
                                                    {Math.max(
                                                        ...product.variants.map(
                                                            (v) =>
                                                                v.trade_price,
                                                        ),
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

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="text-sm text-gray-500">
                            Showing {products?.from || 0} to{" "}
                            {products?.to || 0} of {products?.total || 0}{" "}
                            products
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() =>
                                    setCurrentPage((p) => Math.max(1, p - 1))
                                }
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={16} />
                            </button>

                            {getPageNumbers().map((page, idx) =>
                                page === "..." ? (
                                    <span
                                        key={`dots-${idx}`}
                                        className="px-2 text-gray-400"
                                    >
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={page}
                                        onClick={() =>
                                            setCurrentPage(page as number)
                                        }
                                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                                            currentPage === page
                                                ? "bg-bakery-600 text-white shadow-sm"
                                                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ),
                            )}

                            <button
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.min(totalPages, p + 1),
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
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
