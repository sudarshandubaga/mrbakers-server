import React, { useState } from "react";
import { User } from "../types";
import { Camera, User as UserIcon, Lock, Save, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface ProfileProps {
    view: "EDIT_PROFILE" | "CHANGE_PASSWORD";
}

export const Profile: React.FC<ProfileProps> = ({ view }) => {
    const { user } = useSelector((state: RootState) => state.auth);

    const [activeTab, setActiveTab] = useState<"profile" | "security">(
        view === "EDIT_PROFILE" ? "profile" : "security"
    );
    const [isSaving, setIsSaving] = useState(false);

    // Profile State
    const [profileData, setProfileData] = useState(user);

    // Password State
    const [passwordData, setPasswordData] = useState({
        current: "",
        new: "",
        confirm: "",
    });

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert("Profile updated successfully!");
        }, 1000);
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.new !== passwordData.confirm) {
            alert("New passwords don't match!");
            return;
        }
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert("Password changed successfully!");
            setPasswordData({ current: "", new: "", confirm: "" });
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">
                Account Settings
            </h1>

            <div className="flex gap-2 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("profile")}
                    className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                        activeTab === "profile"
                            ? "border-bakery-600 text-bakery-700"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                    Edit Profile
                </button>
                <button
                    onClick={() => setActiveTab("security")}
                    className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                        activeTab === "security"
                            ? "border-bakery-600 text-bakery-700"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                    Change Password
                </button>
            </div>

            {activeTab === "profile" && (
                <form
                    onSubmit={handleProfileSubmit}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in duration-300"
                >
                    <div className="p-8">
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative group cursor-pointer">
                                <img
                                    src={profileData.avatar}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                                />
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="text-white" size={24} />
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                Click to change avatar
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Role
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    value={profileData.role}
                                    className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg outline-none cursor-not-allowed"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Bio
                                </label>
                                <textarea
                                    rows={3}
                                    value={profileData.bio || ""}
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            bio: e.target.value,
                                        })
                                    }
                                    placeholder="Tell us a little about yourself..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none resize-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="bg-bakery-600 hover:bg-bakery-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-70"
                        >
                            {isSaving ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <Save size={18} />
                            )}
                            Save Profile
                        </button>
                    </div>
                </form>
            )}

            {activeTab === "security" && (
                <form
                    onSubmit={handlePasswordSubmit}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in duration-300"
                >
                    <div className="p-8 space-y-6">
                        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm border border-yellow-100 flex gap-3">
                            <Lock className="shrink-0" size={20} />
                            <p>
                                Ensure your account is using a long, random
                                password to stay secure.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Current Password
                            </label>
                            <input
                                type="password"
                                required
                                value={passwordData.current}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        current: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    minLength={8}
                                    value={passwordData.new}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            new: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    minLength={8}
                                    value={passwordData.confirm}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            confirm: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="bg-bakery-600 hover:bg-bakery-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-70"
                        >
                            {isSaving ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <Save size={18} />
                            )}
                            Update Password
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};
