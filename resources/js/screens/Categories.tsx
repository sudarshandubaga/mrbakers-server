import React, { useState, useEffect, useCallback } from "react";
import { Trash2, Edit2, Tag } from "lucide-react";
import callApi from "@/services";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CategorySchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string(),
});

export const Categories: React.FC = () => {
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [initialValues, setInitialValues] = useState({
        name: "",
        description: "",
    });

    const handleEdit = (category: any) => {
        setIsEditing(category.slug);
        setInitialValues({
            name: category.name,
            description: category.description || "",
        });
    };

    const handleCancel = () => {
        setIsEditing(null);
        setInitialValues({ name: "", description: "" });
    };

    const handleDelete = async (slug: string) => {
        if (
            confirm(
                "Are you sure? This might affect products using this category."
            )
        ) {
            try {
                let res = await callApi(`admin/category/${slug}`, "POST", {
                    data: { _method: "DELETE" },
                });

                setCategories((prev) => prev.filter((c) => c.slug !== slug));
                toast.success(res.message);
            } catch (error) {
                toast.error("Delete failed: " + error);
            }
        }
    };

    const handleSubmitForm = async (values: any, { resetForm }: any) => {
        if (isEditing) {
            // Update category
            try {
                const updatedCategory = await callApi(
                    `admin/category/${isEditing}`,
                    "POST",
                    {
                        data: {
                            ...values,
                            _method: "PUT",
                        },
                    }
                );

                setCategories((prev) =>
                    prev.map((c) =>
                        c.slug === isEditing ? updatedCategory.data : c
                    )
                );

                toast.success(updatedCategory.message);

                handleCancel();
                resetForm();
            } catch (error) {
                toast.error("Update failed");
            }
        } else {
            // Create category
            try {
                const newCategory = await callApi("admin/category", "POST", {
                    data: values,
                });

                setCategories((prev) => [...prev, newCategory.data]);
                toast.success(newCategory.message);

                resetForm();
            } catch (error) {
                toast.error("Create failed");
            }
        }
    };

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
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">
                Categories Management
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                            {isEditing ? "Edit Category" : "Add New Category"}
                        </h2>

                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            validationSchema={CategorySchema}
                            onSubmit={handleSubmitForm}
                        >
                            <Form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <Field
                                        name="name"
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                        placeholder="e.g. Vegan"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description (optional)
                                    </label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none resize-none"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-bakery-600 hover:bg-bakery-700 text-white py-2 rounded-lg font-medium transition-colors shadow-sm"
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
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-bakery-200 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-bakery-50 text-bakery-600 rounded-lg">
                                    <Tag size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        {category.name}
                                    </h3>
                                    {category.description && (
                                        <p className="text-sm text-gray-500">
                                            {category.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="p-2 text-gray-400 hover:text-bakery-600 hover:bg-bakery-50 rounded-lg transition-colors"
                                >
                                    <Edit2 size={18} />
                                </button>

                                <button
                                    onClick={() => handleDelete(category.slug)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {categories.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 border-dashed text-gray-400">
                            No categories yet. Create one to get started.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
