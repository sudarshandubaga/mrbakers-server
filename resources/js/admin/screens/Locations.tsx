import React, { useState } from "react";
import { LocationState } from "../types";
import {
    Plus,
    Trash2,
    MapPin,
    ChevronDown,
    ChevronRight,
    X,
} from "lucide-react";
import { INITIAL_LOCATIONS } from "@/constants";

export const Locations: React.FC = () => {
    const [locations, setLocations] =
        useState<LocationState[]>(INITIAL_LOCATIONS);

    const [newStateName, setNewStateName] = useState("");
    const [newCityName, setNewCityName] = useState<{ [key: string]: string }>(
        {}
    );
    const [expandedStates, setExpandedStates] = useState<Set<string>>(
        new Set()
    );

    const addState = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newStateName.trim()) return;
        const newState: LocationState = {
            id: crypto.randomUUID(),
            name: newStateName,
            cities: [],
        };
        setLocations([...locations, newState]);
        setNewStateName("");
    };

    const removeState = (id: string) => {
        if (
            confirm(
                "Are you sure you want to delete this state and all its cities?"
            )
        ) {
            setLocations(locations.filter((l) => l.id !== id));
        }
    };

    const addCity = (stateId: string) => {
        const city = newCityName[stateId];
        if (!city || !city.trim()) return;

        setLocations(
            locations.map((loc) => {
                if (loc.id === stateId) {
                    return { ...loc, cities: [...loc.cities, city] };
                }
                return loc;
            })
        );
        setNewCityName({ ...newCityName, [stateId]: "" });
    };

    const removeCity = (stateId: string, city: string) => {
        setLocations(
            locations.map((loc) => {
                if (loc.id === stateId) {
                    return {
                        ...loc,
                        cities: loc.cities.filter((c) => c !== city),
                    };
                }
                return loc;
            })
        );
    };

    const toggleExpand = (id: string) => {
        const newExpanded = new Set(expandedStates);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedStates(newExpanded);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">
                    Locations Management
                </h1>
                <form
                    onSubmit={addState}
                    className="flex gap-2 w-full md:w-auto"
                >
                    <input
                        type="text"
                        placeholder="New State Name"
                        value={newStateName}
                        onChange={(e) => setNewStateName(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 w-full"
                    />
                    <button
                        type="submit"
                        className="bg-bakery-600 hover:bg-bakery-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
                    >
                        <Plus size={18} />
                        Add State
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {locations.map((location) => {
                    const isExpanded = expandedStates.has(location.id);
                    return (
                        <div
                            key={location.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            <div
                                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => toggleExpand(location.id)}
                            >
                                <div className="flex items-center gap-3">
                                    {isExpanded ? (
                                        <ChevronDown
                                            size={20}
                                            className="text-gray-400"
                                        />
                                    ) : (
                                        <ChevronRight
                                            size={20}
                                            className="text-gray-400"
                                        />
                                    )}
                                    <div className="flex items-center gap-2">
                                        <MapPin
                                            size={18}
                                            className="text-bakery-600"
                                        />
                                        <span className="font-semibold text-gray-900">
                                            {location.name}
                                        </span>
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                            {location.cities.length} Cities
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeState(location.id);
                                    }}
                                    className="text-gray-400 hover:text-red-500 p-1"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            {isExpanded && (
                                <div className="bg-gray-50 p-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                                    <div className="flex gap-2 mb-4">
                                        <input
                                            type="text"
                                            placeholder={`Add city to ${location.name}`}
                                            value={
                                                newCityName[location.id] || ""
                                            }
                                            onChange={(e) =>
                                                setNewCityName({
                                                    ...newCityName,
                                                    [location.id]:
                                                        e.target.value,
                                                })
                                            }
                                            onKeyDown={(e) =>
                                                e.key === "Enter" &&
                                                addCity(location.id)
                                            }
                                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 bg-white"
                                        />
                                        <button
                                            onClick={() => addCity(location.id)}
                                            className="bg-white border border-gray-200 text-bakery-700 hover:bg-bakery-50 hover:border-bakery-200 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {location.cities.length === 0 && (
                                            <span className="text-sm text-gray-400 italic">
                                                No cities added yet.
                                            </span>
                                        )}
                                        {location.cities.map((city) => (
                                            <div
                                                key={city}
                                                className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-700 shadow-sm"
                                            >
                                                {city}
                                                <button
                                                    onClick={() =>
                                                        removeCity(
                                                            location.id,
                                                            city
                                                        )
                                                    }
                                                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-0.5"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {locations.length === 0 && (
                    <div className="text-center py-10 bg-white rounded-xl border border-gray-100 border-dashed text-gray-400">
                        No locations found. Add a state to get started.
                    </div>
                )}
            </div>
        </div>
    );
};
