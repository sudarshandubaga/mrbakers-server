import FormSelect from "@/components/FormSelect";
import ImagePicker from "@/components/ImagePicker";
import callApi from "@/services";
import { Product, ProductVariant } from "@/types";
import { Layers, Percent, Plus, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddProduct({
    editingProduct,
    handleCloseModal,
    setProducts,
}: any) {
    const [categories, setCategories] = useState([]);

    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: "",
        category_id: null,
        regular_price: 0,
        trade_price: 0,
        stock: 0,
        gst_rate: 5,
        description: "",
        ingredients: [],
        main_image: null,
        variants: [],
    });

    const [hasVariants, setHasVariants] = useState(
        editingProduct?.variants?.length || false
    );

    // Variant Helpers
    const addVariant = () => {
        const newVariant: ProductVariant = {
            id: crypto.randomUUID(),
            name: "",
            regular_price: 0,
            trade_price: 0,
            stock: 0,
        };
        setFormData((prev) => ({
            ...prev,
            variants: [...(prev.variants || []), newVariant],
        }));
    };

    const removeVariant = (id: string) => {
        setFormData((prev) => ({
            ...prev,
            variants: prev.variants?.filter((v) => v.id !== id) || [],
        }));
    };

    const updateVariant = (
        id: string,
        field: keyof ProductVariant,
        value: any
    ) => {
        setFormData((prev) => ({
            ...prev,
            variants:
                prev.variants?.map((v) =>
                    v.id === id ? { ...v, [field]: value } : v
                ) || [],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare payload for API
        const payload: any = {
            name: formData.name,
            regular_price: !hasVariants ? formData.regular_price || 0 : null,
            trade_price: !hasVariants ? formData.trade_price || 0 : null,
            has_variants: hasVariants,
            main_image: formData.main_image || null,
            description: formData.description || null,
            gst_rate: formData.gst_rate,
            category_id: formData.category_id || null,
        };

        if (hasVariants) {
            if (!formData.variants || formData.variants.length === 0) {
                alert("Please add at least one variant or disable variants.");
                return;
            }

            payload.variants = formData.variants.map((v) => ({
                name: v.name,
                regular_price: v.regular_price || null,
                trade_price: v.trade_price || 0,
                // attributes: v.attributes || [],
            }));
        }

        try {
            if (editingProduct) {
                // Call API to update
                const res = await callApi(
                    `admin/product/${editingProduct.slug}`,
                    "PUT",
                    { data: payload }
                );
                setProducts((prev) => ({
                    ...prev,
                    data: prev.data.map((p) =>
                        p.id === res.data.id ? res.data : p
                    ),
                }));
            } else {
                // Call API to create
                const res = await callApi("admin/product", "POST", {
                    data: payload,
                });
                setProducts((prev) => ({
                    ...prev,
                    data: [res.data, ...prev.data], // add at top (optional)
                    total: prev.total + 1,
                    to: prev.to + 1,
                }));
            }
            handleCloseModal();
        } catch (err: any) {
            toast.error(err?.message || "Something went wrong.");
        }
    };

    useEffect(() => {
        if (editingProduct) {
            setFormData(editingProduct);
            setHasVariants(
                !!(
                    editingProduct.variants &&
                    editingProduct.variants.length > 0
                )
            );
        } else {
            setHasVariants(false);
            setFormData({
                name: "",
                category_id: null,
                regular_price: 0,
                trade_price: 0,
                stock: 0,
                gst_rate: 5,
                description: "",
                ingredients: [],
                main_image: null,
                variants: [],
            });
        }
    }, [editingProduct]);

    const fetchCategories = useCallback(async () => {
        try {
            let res = await callApi("admin/category");
            setCategories(res || []);
        } catch (error) {
            toast.error(error || "Something went wrong.");
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-900">
                        {editingProduct ? "Edit Product" : "New Product"}
                    </h2>
                    <button
                        onClick={handleCloseModal}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        &times;
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-6 overflow-y-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Product Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none transition-all"
                                    placeholder="e.g. Croissant"
                                />
                            </div>
                            <div>
                                <FormSelect
                                    label="Category"
                                    value={formData.category_id}
                                    onChange={(value: number) =>
                                        setFormData({
                                            ...formData,
                                            category_id: value || 0,
                                        })
                                    }
                                    searchable
                                    placeholder="Select category"
                                    options={categories.map((c) => ({
                                        label: c.name,
                                        value: c.id,
                                    }))}
                                />
                            </div>

                            {/* GST Rate Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    GST Rate (%)
                                </label>
                                <div className="relative">
                                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        required
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={formData.gst_rate}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                gst_rate: parseFloat(
                                                    e.target.value
                                                ),
                                            })
                                        }
                                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 py-2">
                                <button
                                    type="button"
                                    onClick={() => setHasVariants(!hasVariants)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        hasVariants
                                            ? "bg-bakery-600"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                            hasVariants
                                                ? "translate-x-6"
                                                : "translate-x-1"
                                        }`}
                                    />
                                </button>
                                <span className="text-sm font-medium text-gray-700">
                                    This product has variants (Size, Weight,
                                    etc.)
                                </span>
                            </div>

                            {/* Standard Price/Stock (Only if no variants) */}
                            {!hasVariants && (
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Regular Price (₹)
                                        </label>
                                        <input
                                            required={!hasVariants}
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={formData.regular_price}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    regular_price: parseFloat(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Trade Price (₹)
                                        </label>
                                        <input
                                            required={!hasVariants}
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={formData.trade_price}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    trade_price: parseFloat(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                        />
                                    </div>
                                    {/* <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Stock
                                        </label>
                                        <input
                                            required={!hasVariants}
                                            type="number"
                                            min="0"
                                            value={formData.stock}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    stock: parseInt(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                        />
                                    </div> */}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image
                                </label>
                                <div>
                                    <ImagePicker
                                        image={formData.main_image || null}
                                        done={(img) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                main_image: img,
                                            }));
                                        }}
                                        width={300}
                                        height={300}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Variants Editor */}
                    {hasVariants && (
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <Layers
                                        size={16}
                                        className="text-bakery-600"
                                    />
                                    Product Variants
                                </label>
                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="text-xs bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-colors"
                                >
                                    <Plus size={14} /> Add Variant
                                </button>
                            </div>

                            <div className="space-y-2">
                                {(!formData.variants ||
                                    formData.variants.length === 0) && (
                                    <div className="text-center py-4 text-sm text-gray-500 italic">
                                        No variants added yet. Add sizes like
                                        "Small", "Large" or weights "500g",
                                        "1kg".
                                    </div>
                                )}
                                {formData.variants?.map((variant) => (
                                    <div
                                        key={variant.id}
                                        className="flex gap-2 items-center animate-in fade-in slide-in-from-left-2 duration-200"
                                    >
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                placeholder="Name (e.g. 500g)"
                                                required
                                                value={variant.name}
                                                onChange={(e) =>
                                                    updateVariant(
                                                        variant.id,
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-bakery-500 focus:ring-1 focus:ring-bakery-500 outline-none"
                                            />
                                        </div>
                                        <div className="w-50">
                                            <input
                                                type="number"
                                                placeholder="Regular Price (₹)"
                                                required
                                                min="0"
                                                step="0.01"
                                                value={
                                                    variant.regular_price || ""
                                                }
                                                onChange={(e) =>
                                                    updateVariant(
                                                        variant.id,
                                                        "regular_price",
                                                        parseFloat(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-bakery-500 focus:ring-1 focus:ring-bakery-500 outline-none"
                                            />
                                        </div>
                                        <div className="w-50">
                                            <input
                                                type="number"
                                                placeholder="Trade Price (₹)"
                                                required
                                                min="0"
                                                step="0.01"
                                                value={
                                                    variant.trade_price || ""
                                                }
                                                onChange={(e) =>
                                                    updateVariant(
                                                        variant.id,
                                                        "trade_price",
                                                        parseFloat(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-bakery-500 focus:ring-1 focus:ring-bakery-500 outline-none"
                                            />
                                        </div>
                                        {/* <div className="w-24">
                                            <input
                                                type="number"
                                                placeholder="Stock"
                                                required
                                                min="0"
                                                value={variant.stock || ""}
                                                onChange={(e) =>
                                                    updateVariant(
                                                        variant.id,
                                                        "stock",
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-bakery-500 focus:ring-1 focus:ring-bakery-500 outline-none"
                                            />
                                        </div> */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeVariant(variant.id)
                                            }
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">
                                Description & Ingredients
                            </label>
                        </div>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none resize-none"
                            placeholder="Enter a tasty description..."
                        />
                        {formData.ingredients &&
                            formData.ingredients.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.ingredients.map((ing, i) => (
                                        <span
                                            key={i}
                                            className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-md"
                                        >
                                            {ing}
                                        </span>
                                    ))}
                                </div>
                            )}
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-lg bg-bakery-600 text-white hover:bg-bakery-700 font-medium shadow-md hover:shadow-lg transition-all"
                        >
                            {editingProduct
                                ? "Update Product"
                                : "Create Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
