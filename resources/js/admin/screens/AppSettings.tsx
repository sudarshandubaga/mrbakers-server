import React, { useEffect, useState } from "react";
import { Save, Loader2, Store, Smartphone, Mail, Phone, FileText } from "lucide-react";
import callApi from "../services";
import { toast } from "react-toastify";

export const AppSettings: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState({
        store_name: "",
        app_version: "",
        email: "",
        phone: "",
        help_support: "",
        privacy_policy: "",
        terms_conditions: "",
        disclaimer: "",
    });

    const fetchSettings = async () => {
        try {
            const data = await callApi("admin/settings");
            if (data) {
                setSettings({
                    store_name: data.store_name || "",
                    app_version: data.app_version || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    help_support: data.help_support || "",
                    privacy_policy: data.privacy_policy || "",
                    terms_conditions: data.terms_conditions || "",
                    disclaimer: data.disclaimer || "",
                });
            }
        } catch (error) {
            toast.error("Failed to load settings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await callApi("admin/settings", "POST", { data: settings });
            toast.success("Settings saved successfully!");
        } catch (error) {
            toast.error("Failed to save settings");
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (key: string, value: any) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
                <Loader2 className="w-12 h-12 animate-spin mb-4 text-bakery-600" />
                <p className="text-lg font-medium">
                    Loading app configurations...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    App Settings
                </h1>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* General Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                        <Store className="text-bakery-600" size={20} />
                        <h2 className="font-semibold text-gray-900">
                            Store Information
                        </h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Store Name
                            </label>
                            <input
                                type="text"
                                value={settings.store_name}
                                onChange={(e) =>
                                    handleChange("store_name", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                placeholder="e.g. Mr Bakers"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                App Version
                            </label>
                            <div className="relative">
                                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    value={settings.app_version}
                                    onChange={(e) =>
                                        handleChange(
                                            "app_version",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                    placeholder="e.g. 1.0.0"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                        <Mail className="text-bakery-600" size={20} />
                        <h2 className="font-semibold text-gray-900">
                            Contact Details
                        </h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Support Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) =>
                                        handleChange("email", e.target.value)
                                    }
                                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                    placeholder="contact@mrbakersjodhpur.in"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contact Phone
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    value={settings.phone}
                                    onChange={(e) =>
                                        handleChange("phone", e.target.value)
                                    }
                                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                    placeholder="+91 12345 67890"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Pages */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                        <FileText className="text-bakery-600" size={20} />
                        <h2 className="font-semibold text-gray-900">
                            App Content Pages (HTML Supported)
                        </h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Help & Support
                            </label>
                            <textarea
                                value={settings.help_support}
                                onChange={(e) =>
                                    handleChange("help_support", e.target.value)
                                }
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none font-mono text-sm"
                                placeholder="Support contact info, FAQs, etc."
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Privacy Policy
                                </label>
                                <textarea
                                    value={settings.privacy_policy}
                                    onChange={(e) =>
                                        handleChange("privacy_policy", e.target.value)
                                    }
                                    rows={10}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none font-mono text-sm"
                                    placeholder="Privacy policy content..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Terms & Conditions
                                </label>
                                <textarea
                                    value={settings.terms_conditions}
                                    onChange={(e) =>
                                        handleChange("terms_conditions", e.target.value)
                                    }
                                    rows={10}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none font-mono text-sm"
                                    placeholder="Terms and conditions..."
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Disclaimer
                            </label>
                            <textarea
                                value={settings.disclaimer}
                                onChange={(e) =>
                                    handleChange("disclaimer", e.target.value)
                                }
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none font-mono text-sm"
                                placeholder="Legal disclaimers..."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-bakery-600 hover:bg-bakery-700 text-white px-8 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-md disabled:opacity-70"
                    >
                        {isSaving ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <Save size={20} />
                        )}
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
};
