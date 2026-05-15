import React, { useState, useEffect, useCallback } from "react";
import { Trash2, Edit2, Ticket, Percent, Hash } from "lucide-react";
import callApi from "../services/index";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const VoucherSchema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
    type: Yup.string().required("Type is required"),
    value: Yup.number().required("Value is required").min(0),
    min_order_amount: Yup.number().min(0),
    max_discount: Yup.number().min(0),
    expires_at: Yup.date().nullable(),
    usage_limit: Yup.number().min(1).nullable(),
});

export const Vouchers: React.FC = () => {
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [vouchers, setVouchers] = useState<any[]>([]);
    const [initialValues, setInitialValues] = useState({
        code: "",
        type: "fixed",
        value: 0,
        min_order_amount: 0,
        max_discount: 0,
        expires_at: "",
        usage_limit: "",
    });

    const fetchVouchers = useCallback(async () => {
        try {
            let res = await callApi("admin/vouchers");
            setVouchers(res || []);
        } catch (error) {
            toast.error("Failed to fetch vouchers.");
        }
    }, []);

    useEffect(() => {
        fetchVouchers();
    }, [fetchVouchers]);

    const handleEdit = (voucher: any) => {
        setIsEditing(voucher.id);
        setInitialValues({
            code: voucher.code,
            type: voucher.type,
            value: voucher.value,
            min_order_amount: voucher.min_order_amount || 0,
            max_discount: voucher.max_discount || 0,
            expires_at: voucher.expires_at ? new Date(voucher.expires_at).toISOString().split('T')[0] : "",
            usage_limit: voucher.usage_limit || "",
        });
    };

    const handleCancel = () => {
        setIsEditing(null);
        setInitialValues({
            code: "",
            type: "fixed",
            value: 0,
            min_order_amount: 0,
            max_discount: 0,
            expires_at: "",
            usage_limit: "",
        });
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this voucher?")) {
            try {
                await callApi(`admin/vouchers/${id}`, "DELETE");
                setVouchers((prev) => prev.filter((v) => v.id !== id));
                toast.success("Voucher deleted successfully.");
            } catch (error) {
                toast.error("Delete failed.");
            }
        }
    };

    const handleSubmitForm = async (values: any, { resetForm }: any) => {
        try {
            const payload = { ...values };
            if (!payload.expires_at) delete payload.expires_at;
            if (!payload.usage_limit) delete payload.usage_limit;

            if (isEditing) {
                const res = await callApi(`admin/vouchers/${isEditing}`, "PUT", {
                    data: payload,
                });
                setVouchers((prev) =>
                    prev.map((v) => (v.id === isEditing ? res : v))
                );
                toast.success("Voucher updated successfully.");
                handleCancel();
            } else {
                const res = await callApi("admin/vouchers", "POST", {
                    data: payload,
                });
                setVouchers((prev) => [res, ...prev]);
                toast.success("Voucher created successfully.");
                resetForm();
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to save voucher.");
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">
                Promo Codes & Vouchers
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                            {isEditing ? "Edit Voucher" : "Add New Voucher"}
                        </h2>

                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            validationSchema={VoucherSchema}
                            onSubmit={handleSubmitForm}
                        >
                            <Form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Promo Code
                                    </label>
                                    <Field
                                        name="code"
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                        placeholder="e.g. WELCOME10"
                                    />
                                    <ErrorMessage name="code" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Type
                                        </label>
                                        <Field
                                            as="select"
                                            name="type"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                        >
                                            <option value="fixed">Fixed Amount</option>
                                            <option value="percentage">Percentage (%)</option>
                                        </Field>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Value
                                        </label>
                                        <Field
                                            name="value"
                                            type="number"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Min Order Amount (₹)
                                    </label>
                                    <Field
                                        name="min_order_amount"
                                        type="number"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Max Discount (₹) (for percentage)
                                    </label>
                                    <Field
                                        name="max_discount"
                                        type="number"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Expiry Date
                                    </label>
                                    <Field
                                        name="expires_at"
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Usage Limit
                                    </label>
                                    <Field
                                        name="usage_limit"
                                        type="number"
                                        placeholder="No limit"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                    />
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-[#8a6a5d] hover:bg-bakery-700 text-white py-2 rounded-lg font-medium transition-colors shadow-sm"
                                    >
                                        {isEditing ? "Update" : "Create"}
                                    </button>
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2 space-y-3">
                    {vouchers.map((voucher) => (
                        <div
                            key={voucher.id}
                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-bakery-200 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-bakery-50 text-bakery-600 rounded-lg">
                                    {voucher.type === 'percentage' ? <Percent size={20} /> : <Ticket size={20} />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        {voucher.code}
                                        {!voucher.is_active && (
                                            <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold uppercase">
                                                Inactive
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {voucher.type === 'fixed' ? `₹${voucher.value} off` : `${voucher.value}% off`} 
                                        {voucher.min_order_amount > 0 && ` • Min ₹${voucher.min_order_amount}`}
                                        {voucher.usage_limit && ` • ${voucher.usage_count}/${voucher.usage_limit} used`}
                                    </p>
                                    {voucher.expires_at && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            Expires: {new Date(voucher.expires_at).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(voucher)}
                                    className="p-2 text-gray-400 hover:text-bakery-600 hover:bg-bakery-50 rounded-lg transition-colors"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(voucher.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {vouchers.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 border-dashed text-gray-400">
                            No vouchers yet. Create one to get started.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
