"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

interface Option {
    label: string;
    value: string | number;
}

interface FormSelectProps {
    label?: string;
    options: Option[];
    value: string | number;
    onChange: (value: string | number) => void;
    placeholder?: string;
    searchable?: boolean;
}

export default function FormSelect({
    label,
    options,
    value,
    onChange,
    placeholder = "Select an option",
    searchable = true,
}: FormSelectProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const selected = options.find((o) => o.value === value);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full relative" ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}

            {/* Select Box */}
            <div
                onClick={() => {
                    setOpen(!open);
                    setSearch(""); // Reset search when re-opening
                }}
                className="
                    w-full px-4 py-2 bg-white border border-gray-300 
                    rounded-lg flex items-center justify-between cursor-pointer 
                    hover:border-bakery-400 transition-all shadow-sm
                "
            >
                <span className={selected ? "text-gray-900" : "text-gray-400"}>
                    {selected ? selected.label : placeholder}
                </span>
                <ChevronDown
                    size={20}
                    className={`transform transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </div>

            {/* Dropdown */}
            {open && (
                <div
                    className="
                        absolute left-0 right-0 mt-2 bg-white border border-gray-200 
                        rounded-lg shadow-lg z-50 max-h-64 overflow-hidden 
                        animate-fadeIn
                    "
                >
                    {/* Search input */}
                    {searchable && (
                        <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
                            <Search size={16} className="text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-transparent outline-none text-sm"
                                placeholder="Search..."
                                autoFocus
                            />
                        </div>
                    )}

                    {/* Options */}
                    <div className="max-h-52 overflow-y-auto">
                        {filteredOptions.length === 0 ? (
                            <div className="p-3 text-gray-500 text-sm text-center">
                                No results found
                            </div>
                        ) : (
                            filteredOptions.map((opt) => (
                                <div
                                    key={opt.value}
                                    onClick={() => {
                                        onChange(opt.value);
                                        setOpen(false);
                                    }}
                                    className={`
                                        px-4 py-2 cursor-pointer transition-colors
                                        ${
                                            value === opt.value
                                                ? "bg-bakery-100 text-bakery-700 font-semibold"
                                                : "text-gray-700 hover:bg-bakery-50 hover:text-bakery-600"
                                        }
                                    `}
                                >
                                    {opt.label}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
